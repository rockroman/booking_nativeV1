// utils/tokenUtils.js

import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export const storeTokens = async (
  accessToken,
  refreshToken
) => {
  try {
    await SecureStore.setItemAsync(
      ACCESS_TOKEN_KEY,
      String(accessToken)
    );
    await SecureStore.setItemAsync(
      REFRESH_TOKEN_KEY,
      String(refreshToken)
    );
  } catch (error) {
    console.error("Error storing tokens", error);
  }
};

export const getAccessToken = async () => {
  try {
    return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  } catch (error) {
    console.error("Error retrieving access token", error);
  }
};

export const getRefreshToken = async () => {
  try {
    return await SecureStore.getItemAsync(
      REFRESH_TOKEN_KEY
    );
  } catch (error) {
    console.error("Error retrieving refresh token", error);
  }
};

export const deleteTokens = async () => {
  try {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    await SecureStore.deleteItemAsync(
      "accessTokenTimestamp"
    );
  } catch (error) {
    console.error("Error deleting tokens", error);
  }
};

// Function to set the token expiration timestamp
export const setTokenTimestamp = async (data) => {
  const refreshTokenTimestamp = jwtDecode(
    data?.refresh
  ).exp;
  await SecureStore.setItemAsync(
    "refreshTokenTimestamp",
    String(refreshTokenTimestamp)
  );
};

// Function to set the token expiration timestamp
// export const setTokenTimestamp = async (data) => {
//   const accessTokenTimestamp = jwtDecode(data?.access).exp;
//   await SecureStore.setItemAsync(
//     "accessTokenTimestamp",
//     String(accessTokenTimestamp)
//   );
//   console.log(
//     "acces token timestamp set to = ",
//     accessTokenTimestamp
//   );
// };

// export const shouldRefreshToken = async () => {
//   try {
//     const accessTokenTimestamp =
//       await SecureStore.getItemAsync(
//         "accessTokenTimestamp"
//       );
//     if (!accessTokenTimestamp) return true; // Token expired if timestamp is not available

//     const currentTime = Math.floor(Date.now() / 1000);
//     return currentTime > parseInt(accessTokenTimestamp, 10); // Compare current time with stored timestamp
//   } catch (error) {
//     console.error("Error checking token expiry", error);
//     return false; // Return false if there's an error (for safe handling)
//   }
// };

// Function to check if the token should be refreshed
// export const shouldRefreshToken = async () => {
//   const refreshTokenTimestamp =
//     await SecureStore.getItemAsync("refreshTokenTimestamp");
//   if (!refreshTokenTimestamp) return false;

//   const currentTime = Math.floor(Date.now() / 1000);
//   return currentTime > refreshTokenTimestamp;
// };
export const shouldRefreshToken = async () => {
  try {
    const refreshTokenTimestamp =
      await SecureStore.getItemAsync(
        "refreshTokenTimestamp"
      );
    if (!refreshTokenTimestamp) return true; // Token expired if timestamp is not available

    const currentTime = Math.floor(Date.now() / 1000);
    return (
      currentTime > parseInt(refreshTokenTimestamp, 10)
    ); // Compare current time with stored timestamp
  } catch (error) {
    console.error("Error checking token expiry", error);
    return false; // Return false if there's an error (for safe handling)
  }
};

// Function to remove the token expiration timestamp

export const removeTokenTimestamp = async () => {
  await SecureStore.deleteItemAsync(
    "refreshTokenTimestamp"
  );
};
