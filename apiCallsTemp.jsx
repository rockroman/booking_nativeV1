const [services, setServices] = useState([]);

const fetchServices = async () => {
  try {
    const response = await axiosInstance.get("/services/");
    console.log("this is response", response.data);
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};

useEffect(() => {
  fetchServices();
});
