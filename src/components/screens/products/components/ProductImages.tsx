import React, { useEffect, useMemo, useState } from "react";
import Modal from "../../../render-model/Modal";
import classes from "./index.module.css";
import SkeletonLoading from "../../../shared/SkeletonLoading";
import { PORT } from "../../../../../config";
import { useRecoilValue } from "recoil";
// @ts-ignore
import { currentUserState } from "../../../../state/atoms/screen.js";
// @ts-ignore
import { productImagesId } from "../../../../state/atoms/screen.js";
import useAPI from "../../../../hooks/Other/useAPI";
import useUsers from "../../../../hooks/Users/useUsers.js";

type Props = {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
};

const ProductImages = ({ onClose }: Props) => {
  const id: any = useRecoilValue(productImagesId);
  const currentUser: any = useRecoilValue(currentUserState);
  const [images, setImages] = useState<string[]>([]);
  const [imageLoading, setImageLoading] = useState(true);
  const [previewIndex, setpreviewIndex] = useState(0);

  const { getRequest } = useAPI();
  const { getImageViaUrl } = useUsers();

  useEffect(() => {
    const getProductDetails = async (id: string) => {
      const response = await getRequest(`${PORT}/product/${id}`, {
        _id: currentUser._id,
      });
      const images: any = await response.product.images;

      const getImages = async (path: string) => {
        const image = await getImageViaUrl(path);
        setImages((prev: any) => {
          if (prev.includes(image)) {
            return [...prev];
          } else {
            return [...prev, image];
          }
        });
      };

      images.map((image: any) => {
        getImages(image.path);
      });
    };

    getProductDetails(id);
  }, []);

  const renderBody = useMemo(() => {
    console.log(images);

    return (
      <div className={classes["images-container"]}>
        <div className={classes["images-body"]}>
          {images?.map((image, index) => {
            return (
              <>
                {imageLoading && (
                  <SkeletonLoading
                    style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "8px",
                    }}
                  />
                )}
                <img
                  style={imageLoading ? { height: "0px" } : {}}
                  src={image}
                  className={classes["modal-image"]}
                  key={image}
                  onLoad={() => setImageLoading(false)}
                  onClick={() => setpreviewIndex(index)}
                  loading="lazy"
                />
              </>
            );
          })}
        </div>
        <div className={classes["image-preview-container"]}>
          {imageLoading && (
            <SkeletonLoading
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "8px",
              }}
            />
          )}
          <img
            src={images[previewIndex]}
            alt="image-preview"
            className={classes["image-preview"]}
            onLoad={() => setImageLoading(false)}
          />
        </div>
      </div>
    );
  }, [images, imageLoading, previewIndex]);

  return (
    <Modal
      body={renderBody}
      onClose={onClose}
      closeBtn={true}
      modalstyle={{ margin: "40px", width: "100%" }}
    />
  );
};

export default ProductImages;
