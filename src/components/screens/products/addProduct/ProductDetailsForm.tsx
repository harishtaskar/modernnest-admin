import InputText from "../../../HOC/InputText";
import classes from "./index.module.css";
import SelectBox from "../../../HOC/SelectBox";
import TextArea from "../../../HOC/TextArea";
import { useCallback, useEffect, useMemo, useState } from "react";
import InputTag from "../../../HOC/InputTag";
import InputImages from "../../../HOC/InputImages";
import useUsers from "../../../../hooks/Users/useUsers";
import { useRecoilState } from "recoil";
//@ts-ignore
import { productDetailState } from "../state/index.js";
import { toast } from "react-toastify";
import MultiSelectorInput from "../../../HOC/MultiSelectorInput.js";
import useImages from "../../../../hooks/Other/useImages.js";
import { LoadingIcon } from "../../../shared/loadingIcon.js";

const Categories = [
  "Furniture",
  "Home Decor",
  "Kitchen & Dining",
  "Appliances",
  "Other",
];

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const ProductDetailsForm = () => {
  const [productDetails, setProductDetails] =
    useRecoilState<Product>(productDetailState);
  const [imagesList, setImagesList] = useState<any[]>([]);
  const [discount, setDiscount] = useState<any>(0);
  const [imagesLoading, setImagesLoading] = useState<boolean>(false);
  const [documentLoading, setDocumentLoading] = useState<boolean>(false);
  const [deletingState, setDeletingState] = useState<boolean>(false);
  const { uploadImageFirebase, getImageViaUrl, deleteImageViaUrl } = useUsers();
  const { toBase64 } = useImages();


  useEffect(() => {
    setProductDetails((prev: any) => {
      return {
        ...prev,
        images: imagesList,
      };
    });
  }, [imagesList]);

  const selectedImages = useCallback(
    async (images: any[]) => {
      setImagesLoading(true);
      let imagesArray = Object.values(images);
      await Promise.all(
        imagesArray.map(async (image: any) => {
          let base64 = await toBase64(image);

          if (image && base64) {
            const type: string = image.type;
            if (
              type.toLowerCase() !==
              ("image/jpeg" || "image/jpg" || "image/png")
            ) {
              setImagesLoading(false);
              toast.info(
                "Valid Images Formate is image.jpeg/image.jpg./image.png"
              );
              return;
            } else {
              const imagePath = await uploadImageFirebase(
                image,
                base64,
                "product",
                2097152
              );
              if (imagePath) {
                setImagesList((prev: any) => {
                  return [
                    ...prev,
                    { path: imagePath, name: image.name, type: image.type },
                  ];
                });
              }
              setImagesLoading(false);
            }
          }
        })
      );
    },
    [imagesList, imagesLoading]
  );

  const openImage = useCallback(async (path: string) => {
    const url: any = await getImageViaUrl(path);
    window.open(url, "_blank");
  }, []);

  const deleteImage = useCallback(
    async (
      event: React.MouseEvent<HTMLElement, MouseEvent>,
      path: string,
      index: number
    ) => {
      event.preventDefault();
      event.stopPropagation();
      setDeletingState(true);
      let isDeleted = await deleteImageViaUrl(path);
      if (isDeleted) {
        setDeletingState(false);
        setImagesList(() => {
          return imagesList.filter((image, i) => {
            return i !== index;
          });
        });
      }
    },
    [imagesList, deletingState]
  );

  const inputChangeHandler = useCallback((key: string, value: string) => {
    setProductDetails((prev: any) => {
      return { ...prev, [key]: value };
    });
  }, []);

  const documentUploadHandler = useCallback(
    async (id: string, event: any) => {
      setDocumentLoading(true);
      const document = event.target.files[0];
      const documentBase64 = await toBase64(document);
      const documentPath = await uploadImageFirebase(
        document,
        documentBase64,
        "product-docs",
        5120000
      );
      if (documentPath) {
        setProductDetails((prev: any) => {
          return {
            ...prev,
            document: {
              path: documentPath,
              type: document.type,
              name: document.name,
            },
          };
        });
        setDocumentLoading(false);
      }
      setDocumentLoading(false);
    },
    [productDetails]
  );

  const selectHandler = useCallback((e: any) => {
    const key = e.target.id;
    const value = e.target.value;
    setProductDetails((prev: any) => {
      return { ...prev, [key]: value };
    });
  }, []);

  const stateHandler = useCallback((states: any[]) => {
    setProductDetails((prev: any) => {
      return { ...prev, availability: states };
    });
  }, []);

  const tagsHandler = useCallback((tags: any[]) => {
    setProductDetails((prev: any) => {
      return { ...prev, productTags: tags };
    });
  }, []);

  const linksHandler = useCallback((links: any[]) => {
    setProductDetails((prev: any) => {
      return { ...prev, productLinks: links };
    });
  }, []);

  return (
    <div className={classes.form}>
      {/* <span className="normal-text">Product Details</span> */}
      <div className={classes.images}>
        <InputImages
          id="images"
          name="images"
          require={true}
          label="Product Images (minimum 2)"
          images={selectedImages}
        />
        <ul className={classes.list}>
          {imagesLoading ? (
            <LoadingIcon />
          ) : (
            productDetails?.images?.map((image: any, index: number) => {
              if (image.path) {
                return (
                  <li
                    key={image.path}
                    className={`${classes.listItem} ${
                      classes.listItemSuccess
                    } ${deletingState && classes.listItemFailed}`}
                    onClick={() => openImage(image.path)}
                  >
                    {image.name}{" "}
                    <i
                      className={`${"ri-close-line"} ${classes.closeIcon}`}
                      onClick={(e) => deleteImage(e, image.path, index)}
                    />
                  </li>
                );
              }
            })
          )}
        </ul>
      </div>
      <div className="horizontaldiv">
        <InputText
          id="name"
          onChange={inputChangeHandler}
          label="Product Name"
          inputType="text"
        />
        <InputText
          id="brand"
          onChange={inputChangeHandler}
          label="Brand Name"
          inputType="text"
        />
      </div>
      <TextArea
        id="description"
        onChange={(e) => inputChangeHandler(e.target.id, e.target.value)}
        label="Description"
        name="description"
        rows={3}
      />
      <div className="horizontaldiv">
        <InputText
          id="quantity"
          onChange={inputChangeHandler}
          label="Quantity"
          inputType="number"
        />
        <SelectBox
          id="category"
          name="category"
          onChange={selectHandler}
          options={Categories}
          label="Category"
        />
      </div>
      <div className="horizontaldiv">
        <InputText
          id="price"
          onChange={inputChangeHandler}
          label="Price"
          inputType="number"
        />
        <InputText
          onBlur={() =>
            setDiscount((prev: any) => {
              const arr = prev.toString().split("");
              if (arr[arr?.length - 1] !== "%") {
                return `${prev}%`;
              } else {
                return prev;
              }
            })
          }
          id="discount"
          onChange={(id: any, value: any) => setDiscount(value)}
          label="Discount after price"
          inputType="text"
          value={discount}
          maxLength={2}
          warning={"Invalid Discount"}
          require={false}
        />
        <MultiSelectorInput
          inputLabel="States"
          label="Available States"
          options={indianStates}
          id="availibility"
          checkedList={stateHandler}
        />
      </div>
      <InputTag
        smallLabel="Tags"
        id="tag"
        label={"Product Tags"}
        prefix={"#"}
        tagList={tagsHandler}
        warning="Tags Required"
      />
      <InputText
        id="warrantyinfo"
        inputType="text"
        onChange={inputChangeHandler}
        label="Warranty Information"
        warning="This field is require"
        minLength={1}
      />
      <InputText
        id="returnpolicy"
        inputType="text"
        onChange={inputChangeHandler}
        label="Return Policy"
        warning="This field is require"
        minLength={1}
      />
      <InputTag
        id="urls"
        label="Product Url's"
        require={true}
        randomColor={true}
        smallLabel="url"
        warning="Atleast One URL required"
        tagList={linksHandler}
      />
      <TextArea
        id="specification"
        label="Product Specification"
        require={false}
        name="spacification"
        onChange={(e) => inputChangeHandler(e.target.id, e.target.value)}
        rows={3}
      />
      <InputText
        id="document"
        label="Document (such as manual)"
        inputType="file"
        require={true}
        onChange={documentUploadHandler}
        filename={
          documentLoading ? (
            <LoadingIcon />
          ) : (
            productDetails.document && productDetails.document.name
          )
        }
      />
    </div>
  );
};

export default ProductDetailsForm;
