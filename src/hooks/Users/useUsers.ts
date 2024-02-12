import { useNavigate } from "react-router-dom";
import React, { useCallback, useState } from "react";
import { useSetRecoilState } from "recoil";
// @ts-ignore
import { currentUserState } from "../../state/atoms/screen.js";
// @ts-ignore
import { registrationDataState } from "../../components/registration/state/index.js";
import { toast } from "react-toastify";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
// @ts-ignore
import { storage } from "../../firebase.js";
// @ts-ignore
import { v4 } from "uuid";

const useUsers = () => {
  const setRegisterData = useSetRecoilState(registrationDataState);
  const setCurrentUser = useSetRecoilState(currentUserState);

  const Navigate = useNavigate();

  const onSetRegisterState = useCallback((key: string, input: string) => {
    console.log("key--->" + key, "  input--->", input);
    setRegisterData((prev: any) => {
      return { ...prev, [key]: input };
    });
  }, []);

  const onSetCurrentUser = useCallback((token: string) => {
    const fetchCurrentUser = async () => {
      const res = await fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const CurrentUser = await res.json();
      if (res.status === 200) {
        if (CurrentUser.messege === "ok") {
          console.log(CurrentUser);
          setCurrentUser(CurrentUser.user);
        } else {
          console.log(CurrentUser.messege);
          setCurrentUser("");
          Navigate("/");
        }
      } else {
        console.log(CurrentUser.messege);
        setCurrentUser("");
        Navigate("/");
      }
    };
    fetchCurrentUser();
  }, []);

  const onUserLogin = useCallback(async (email: string, password: string) => {
    const res = await fetch("/api/users/login", {
      method: "GET",
      headers: {
        email: email,
        password: password,
      },
    });
    const data = await res.json();
    if (res.status === 200) {
      if (data.messege === "ok") {
        localStorage?.setItem("Authorization", data.token);
        onSetCurrentUser(data.token);
        return data.messege;
      } else {
        return data.messege;
      }
    } else {
      return data.messege;
    }
  }, []);

  const onSellerRegister = useCallback(async (user: Object) => {
    const res = await fetch("http://localhost:3000/api/sellers/new", {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({ seller: user }),
    });
    const data = await res.json();

    if (res.status === 200) {
      if (data.messege === "ok") {
        return data.messege;
      } else {
        return data.messege;
      }
    } else {
      return data.messege;
    }
  }, []);

  const isUserAuthorized = () => {
    let authorized = false;
    const token = localStorage.getItem("Authorization") || "";
    const authenticateUser = async () => {
      const res = await fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const CurrentUser = await res.json();
      if (res.status === 200) {
        if (CurrentUser.messege === "ok") {
          authorized = true;
        } else {
          setCurrentUser("");
          Navigate("/users/1213123");
        }
      } else {
        setCurrentUser("");
        Navigate("/users/1212132131");
      }
    };
    authenticateUser();
    return authorized;
  };

  const onUserLogout = useCallback(() => {
    localStorage.setItem("Authorization", "");
    Navigate("/");
    window.location.reload();
  }, []);

  const uploadImageFirebase = useCallback(
    async (image: any, base64: any, path: string, limitsize: number) => {
      if (image.size > limitsize) {
        toast.error(
          "Image size should be less than " + limitsize / 1024 + "KB"
        );
      } else {
        console.log(image.name);
        const imagePath = `${path}/${image.name + v4()}`;
        const imageRef = ref(storage, imagePath);
        return new Promise(async (resolve) => {
          const upload: any = await uploadString(imageRef, base64, "data_url");
          console.log(upload);
          resolve(upload.metadata.fullPath);
        });
      }
    },
    []
  );

  const getImageViaUrl = useCallback((url: string) => {
    const storage = getStorage();
    return new Promise((resolve: any) => {
      getDownloadURL(ref(storage, url))
        .then((url) => {
          const xhr = new XMLHttpRequest();
          xhr.responseType = "blob";
          xhr.onload = (event) => {
            const blob = xhr.response;
          };
          xhr.open("GET", url);
          xhr.send();
          resolve(url);
        })
        .catch((error) => {
          return new Response(error);
        });
    });
  }, []);

  const deleteImageViaUrl = useCallback((url: string) => {
    const storage = getStorage();
    const desertRef = ref(storage, url);
    return new Promise((resolve) => {
      deleteObject(desertRef)
        .then(() => resolve(true))
        .catch(() => resolve(false));
    });
  }, []);

  return {
    onSetRegisterState,
    onSetCurrentUser,
    onUserLogin,
    onSellerRegister,
    isUserAuthorized,
    onUserLogout,
    uploadImageFirebase,
    getImageViaUrl,
    deleteImageViaUrl,
  };
};

export default useUsers;
