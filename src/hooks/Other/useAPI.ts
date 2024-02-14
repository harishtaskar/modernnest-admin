import axios from "axios";
import { useCallback, useState } from "react";

const useAPI = () => {
  const [data, setData] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>("");

  const postRequest = useCallback(
    async (path: string, body: any) => {
      try {
        setLoading(true);
        const response = await axios.post(path, body);
        const data = await response.data;
        console.log(data);
        setData(data);
        setLoading(false);
        return data;
      } catch (error) {
        setLoading(false);
        setError(Error);
        return error;
      }
    },
    [data, loading, error]
  );
  const getRequest = useCallback(
    async (path: string, header: any) => {
      try {
        setLoading(true);
        const response = await axios.get(path, { headers: header });
        const data = await response.data;
        setData(data);
        setLoading(false);
        return data;
      } catch (error) {
        setLoading(false);
        setError(Error);
        return error;
      }
    },
    [data, loading, error]
  );
  return { postRequest, getRequest, data, loading, error };
};

export default useAPI;
