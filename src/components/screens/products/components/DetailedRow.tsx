import { useCallback, useEffect, useState } from "react";
import classes from "./index.module.css";
import useUsers from "../../../../hooks/Users/useUsers";
import SkeletonLoading from "../../../shared/SkeletonLoading";
import { useSetRecoilState } from "recoil";
// @ts-ignore
import { activeModal } from "../../../../state/atoms/screen.js";
// @ts-ignore
import { productImagesId } from "../../../../state/atoms/screen.js";

type Props = {
  visible: boolean;
  data: any;
};

const DetailedRow = ({ visible, data }: Props) => {
  const [imagesVisible, setImagesVisible] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [imageLoading, setImageLoading] = useState(true);
  const setActiveModal = useSetRecoilState(activeModal);
  const setProductImagesId = useSetRecoilState(productImagesId);
  const { getImageViaUrl } = useUsers();

  const downloadDocumentHandler = useCallback(async (data: any) => {
    const url: any = await getImageViaUrl(data.path);
    window.open(url, "_blank");
  }, []);

  console.log(data);

  useEffect(() => {
    const getImage = async (path: string) => {
      const url: any = await getImageViaUrl(path);
      setImages((prev: string[]) => {
        if (prev.includes(url)) {
          return [...prev];
        } else {
          return [...prev, url];
        }
      });
    };

    if (imagesVisible && images.length === 0) {
      data?.images?.map(async (image: any) => {
        getImage(image.path);
      });
    }
  }, [imagesVisible, visible]);

  if (visible) {
    return (
      <div className={classes["detailed-row"]}>
        <div className={classes["row"]}>
          {Object.entries(data).map((item: any) => {
            switch (item[0]) {
              case "name":
              case "brand":
              case "price":
              case "category":
              case "description":
              case "quantity":
              case "returnpolicy":
              case "warrantyinfo":
              case "discount":
                return (
                  <div className={classes.details}>
                    <span className={`${classes.key}`}>{item[0]}</span>{" "}
                    <span className={classes["value"]}>:</span>
                    <span
                      className={`${classes.value} "text-2"`}
                    >{`${item[1]}`}</span>
                  </div>
                );

              case "productTags":
              case "availability":
                return (
                  <div className={classes.details}>
                    <span className={`${classes.key}`}>{item[0]}</span>
                    <span className={classes["value"]}>:</span>
                    {item[1].map((item: any) => (
                      <span className={`${classes.value} "text-2"`}>
                        {`${item}`},{" "}
                      </span>
                    ))}
                  </div>
                );
              case "productLinks":
                return (
                  <div className={classes.details}>
                    <span className={`${classes.key}`}>{item[0]}</span>{" "}
                    <span className={classes["value"]}>:</span>
                    <div className={classes.links}>
                      {item[1].map((item: any) => (
                        <a
                          href={item}
                          target="_blank"
                          className={`${classes.link}`}
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  </div>
                );
              case "document":
                return (
                  <div className={classes.details}>
                    <span className={`${classes.key}`}>{item[0]}</span>
                    <span className={classes["value"]}>:</span>
                    <div className={classes.document}>
                      <span
                        className={`${classes.value} "text-2"`}
                      >{`${item[1].name}`}</span>
                      <button
                        className="btn-download-small"
                        onClick={() => downloadDocumentHandler(item[1])}
                      >
                        View
                      </button>
                    </div>
                  </div>
                );
              case "images":
                return (
                  <div
                    className={classes["details"]}
                    style={{ flexDirection: "column" }}
                  >
                    <div className={classes["images-title"]}>
                      <div
                        className={classes["line-div"]}
                        onClick={() => setImagesVisible((prev) => !prev)}
                      >
                        <span className={`${classes.key}`}>{item[0]}</span>
                        <span className={classes["value"]}>:</span>
                        <a className={classes.line} />
                        {imagesVisible ? (
                          <i
                            className={`ri-arrow-down-s-line ri-xl ${classes["line-icon"]}`}
                          />
                        ) : (
                          <i
                            className={`ri-arrow-up-s-line ri-xl ${classes["line-icon"]}`}
                          />
                        )}
                      </div>
                    </div>
                    {imagesVisible && (
                      <div className={classes.images}>
                        {images.length > 0 &&
                          images.map((image: any, index: number) => {
                            if (index < 3) {
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
                                    style={imageLoading ? { width: "0px" } : {}}
                                    src={image}
                                    className={classes["image"]}
                                    key={image}
                                    onLoad={() => setImageLoading(false)}
                                    loading="lazy"
                                  />
                                </>
                              );
                            }
                          })}

                        {images.length > 3 && !imageLoading && (
                          <div className={classes["btn-div"]}>
                            <button
                              className={classes["btn-more"]}
                              onClick={() => {
                                setProductImagesId(data._id);
                                setActiveModal("product-images");
                              }}
                            >
                              see all
                            </button>
                          </div>
                        )}
                        {!imageLoading && (
                          <div className={classes["btn-div"]}>
                            <button
                              className={classes["btn-more"]}
                              onClick={() => {
                                setProductImagesId(data._id);
                                setActiveModal("product-images");
                              }}
                            >
                              Preview
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              default:
                return <></>;
            }
          })}
        </div>
      </div>
    );
  }
};

export default DetailedRow;
