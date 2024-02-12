import React, { useCallback } from "react";

const useImages = () => {
  const toBase64 = useCallback(async (image: any) => {
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onloadend = () => {
        const base64String = reader.result;
        resolve(base64String);
      };
      reader.readAsDataURL(image);
    });
  }, []);
  return { toBase64 };
};

export default useImages;
