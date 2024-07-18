import { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import { axiosReq } from "../api/axiosDefault";
const useService = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeService, setActiveService] = useState(1);

  const fetchServices = async () => {
    try {
      setLoading(true);

      const { data } = await axiosReq.get("/services");

      //   console.log(
      //     "this is data from services = ",
      //     data.results
      //   );

      setServices(data.results);
    } catch (error) {
      setLoading(false);
      Alert.alert("error", error);
      console.log(error);
    }
  };

  // handling active service to update UI
  // and display just one obj on the screen
  const handleActiveService = (id) => {
    setActiveService(id);
    // console.log(id);
  };

  const currentService = services.find(
    (target) => target.id === activeService
  );
  //   console.log("this is current service= ", currentService);

  useEffect(() => {
    console.log("appointments component rendering");
    fetchServices();
  }, []);

  return {
    services,
    setActiveService,
    loading,
    setLoading,
    activeService,
    currentService,
    handleActiveService,
  };
};
export default useService;
