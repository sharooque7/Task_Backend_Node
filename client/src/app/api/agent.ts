import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use((config) => {
  const user: any = localStorage.getItem("user");
  const userData = JSON.parse(user);
  const token = userData.data.login.token;
  console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error: AxiosError) => {
    console.log(error);
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 500:
        // router.navigate("/server-error", { state: { error: data } });
        break;
      case 404:
        toast.error(data.title);
        break;
      default:
        break;
    }
  }
);

const request = {
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
};

const singlepoint = {
  api: (values: any) => request.post("graphql", values),
};

const agent = { singlepoint };

export default agent;
