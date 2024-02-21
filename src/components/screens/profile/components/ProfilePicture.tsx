import classes from "../index.module.css";
// @ts-ignore
import user from "../../../../public/assets/images/user.svg";
import { useRecoilState, useSetRecoilState } from "recoil";
//@ts-ignore
import { activeModal } from "./../../../../state/atoms/screen";
import { useCallback, useEffect, useState } from "react";
import useUsers from "../../../../hooks/Users/useUsers";
import SkeletonLoading from "../../../shared/SkeletonLoading";
import useImages from "../../../../hooks/Other/useImages";
//@ts-ignore
import { currentUserState } from "../../../../state/atoms/screen.js";
import useAPI from "../../../../hooks/Other/useAPI";
import { PORT } from "../../../../../config";

type Props = {
  user: RegisterData;
};

const ProfilePicture = ({ user }: Props) => {
  const [currentUser, setCurrentUser] =
    useRecoilState<RegisterData>(currentUserState);
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<any>("");
  const setActiveModal = useSetRecoilState(activeModal);

  const { getImageViaUrl, uploadImageFirebase } = useUsers();
  const { toBase64 } = useImages();
  const { patchRequest } = useAPI();

  useEffect(() => {
    const documentHandler = async (path: string) => {
      setLoading(true);
      //   return await new Promise((r) => setTimeout(() => r(url), 5000));
      const url: any = await getImageViaUrl(path);
      setLoading(false);
      setImage(url);
    };

    documentHandler(user.store.logo.path);
  }, [currentUser]);

  const uploadImage = useCallback(
    async (event: any) => {
      const image = event.target.files[0];

      const imageBase64 = await toBase64(image);
      const imageUrl = await uploadImageFirebase(
        image,
        imageBase64,
        "admin-docs",
        1024000
      );

      if (imageUrl !== (undefined || "")) {
        const response = await patchRequest(`${PORT}/seller/update`, {
          update: {
            "store.logo": {
              type: image.type,
              name: image.name,
              path: imageUrl,
            },
          },
        });

        if (response.res === "ok") {
          setCurrentUser(response.update);
        }
      }
    },
    [currentUser, user]
  );

  return (
    <div className={classes.top}>
      {loading ? (
        <SkeletonLoading
          style={{ width: "110px", height: "90px", borderRadius: "50%" }}
        />
      ) : (
        <img
          src={image || user}
          alt="user-proifle"
          className={classes.profile}
        />
      )}
      <div className={classes.buttons}>
        <label
          htmlFor="upload"
          className="btn-3"
          style={{ width: "fit-content" }}
        >
          Update photo
        </label>
        <input
          type="file"
          id="upload"
          style={{ display: "none" }}
          onChange={uploadImage}
        />
        <button
          className="btn-3"
          onClick={() => setActiveModal("edit-profile")}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfilePicture;
