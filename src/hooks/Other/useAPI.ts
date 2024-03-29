import axios from "axios";
import { useCallback, useState } from "react";
import { useRecoilValue } from "recoil";

//@ts-ignore
import { currentUserState } from "../../state/atoms/screen.js";

const useAPI = () => {
  const [data, setData] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>("");

  const currentUser: any = useRecoilValue(currentUserState);

  const postRequest = useCallback(
    async (path: string, body: any, header: any) => {
      try {
        setLoading(true);
        const response = await axios.post(path, body, {
          headers: {
            ...header,
            Authorization: localStorage.getItem("authorization"),
          },
        });
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

  const patchRequest = useCallback(
    async (path: string, body: any, header?: any) => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authorization");
        const response = await axios.patch(path, body, {
          headers: { ...header, Authorization: token, id: currentUser._id },
        });
        const update = await response.data;
        setData(update);
        setLoading(false);
        return update;
      } catch (error) {
        setLoading(false);
        setError(Error);
        return error;
      }
    },
    [data, loading, error]
  );
  return { postRequest, getRequest, patchRequest, data, loading, error };
};

export default useAPI;
