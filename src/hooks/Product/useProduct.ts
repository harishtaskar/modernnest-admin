import axios from "axios";
import { useCallback } from "react";
import { PORT } from "../../../config";

const useProduct = () => {
  const deleteProduct = useCallback(async (id: string) => {
    const token = localStorage.getItem("authorization");
    const response = await axios.delete(`${PORT}/product/delete`, {
      headers: { Authorization: token, id: id },
    });
    return await response.data;
  }, []);

  return { deleteProduct };
};

export default useProduct;
