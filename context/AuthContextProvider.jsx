import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import axiosInstance, {
  axiosReq,
  axiosRes,
} from "../api/axiosDefault";
import {
  deleteTokens,
  getAccessToken,
  getRefreshToken,
  removeTokenTimestamp,
  setTokenTimestamp,
  shouldRefreshToken,
  storeTokens,
} from "../utils/storageUtils";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getCurrentUser = async () => {
    try {
      const accessToken = await getAccessToken();
      console.log(
        "access token in context = ",
        accessToken
      );
      if (!accessToken) return;
      axiosRes.defaults.headers.Authorization = `Bearer ${accessToken}`;
      console.log("get current user is called.....");
      const { data } = await axiosRes.get(
        "/dj-rest-auth/user/"
      );
      console.log("data in auth context = ", data);

      setUser(data);
      setIsLoggedIn(true);
    } catch (error) {
      console.log("current user fetching error = ", error);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    console.log("useefect in context called ");
    // deleteTokens();
    getCurrentUser();
  }, []);

  useEffect(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        try {
          const isTokenExpired = await shouldRefreshToken();

          if (isTokenExpired) {
            try {
              const refreshToken = await getRefreshToken();

              if (refreshToken) {
                const response = await axiosInstance.post(
                  "/dj-rest-auth/token/refresh/",
                  { refresh: refreshToken }
                );
                const newAccessToken = response.data.access;
                const newRefreshToken =
                  response.data.refresh;

                await storeTokens(
                  newAccessToken,
                  newRefreshToken
                );
                await setTokenTimestamp(response.data);

                config.headers.Authorization = `Bearer ${newAccessToken}`;
              } else {
                await deleteTokens();
                await removeTokenTimestamp();
                setUser(null);
                router.replace("/login"); // Redirect to login page if no refresh token is found
                return config;
              }
            } catch (err) {
              console.error("Error refreshing token", err);
              await deleteTokens();
              await removeTokenTimestamp();
              setUser(null);
              router.replace("/login"); // Redirect to login page if token refresh fails
              return config;
            }
          } else {
            const accessToken = await getAccessToken();
            if (accessToken) {
              config.headers.Authorization = `Bearer ${accessToken}`;
            }
          }

          return config;
        } catch (err) {
          console.error(
            "Error in request interceptor",
            err
          );
          return Promise.reject(err);
        }
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        console.log("axios res called");

        if (error.response.status === 401) {
          console.log(
            "logging error response in axiosRes ",
            error.response
          );

          try {
            const refreshToken = await getRefreshToken();

            if (!refreshToken) {
              throw new Error("No refresh token available");
            }
            // console.log(
            //   "making call to refresh endpoint...."
            // );

            const response = await axiosReq.post(
              "/dj-rest-auth/token/refresh/",
              { refresh: refreshToken }
            );

            // console.log(
            //   "response after refresh call = ",
            //   response.data
            // );

            const newAccessToken = response.data.access;
            const newRefreshToken = response.data.refresh;

            // Store the new tokens
            await storeTokens(
              newAccessToken,
              newRefreshToken
            );
            // console.log(
            //   "new access token in resInterceptor = ",
            //   newAccessToken
            // );
            // console.log(
            //   "new refresh token in resInterceptor = ",
            //   newRefreshToken
            // );
            // Update the original request headers with new access token
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            // Retry the original request
            // console.log("retrying original request.....");
            return axiosReq(originalRequest);
          } catch (refreshError) {
            console.error(
              "Error refreshing token",
              refreshError
            );
            // Handle token refresh failure, delete tokens and redirect to login
            await deleteTokens();
            setUser(null);
            router.replace("/login");
            return Promise.reject(refreshError);
          }
        }
        // If error is not 401 or token refresh fails, return the error
        return Promise.reject(error);
      }
    );
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, setIsLoggedIn, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
