declare module "*.module.css" {
  const content: Record<string, string>;
  export default content;
}

type RegisterData = {
  personal: {
    firstname: string;
    lastname: string;
    mobile: number;
    email: string;
  };
  business: {
    name: string;
    taxid: string;
    registration: string;
    contact: string;
    email: string;
    document: string;
  };
  store: {
    name: string;
    description: string;
    logo: {
      name: string;
      path: string;
      type: string;
    };
    shiping: string;
    estimatedeliverytime: number;
    shipingrates: number;
  };
  address: {
    personaladdress: string;
    streetaddress: string;
    country: string;
    state: string;
    city: string;
    pin: number;
  };
  idverification: string;
  email: string;
  password: string;
  confirmpassword: string;
};

type Product = {
  availability: string[];
  brand: string;
  category: string;
  description: string;
  document: {
    name: string;
    path: string;
    type: string;
  };
  images: {
    name: string;
    path: string;
    type: string;
  }[];
  price: number;
  productLinks: string[];
  productTags: string[];
  name: string;
  returnpolicy: string;
  quantity: number;
  specification: string;
  warrantyinfo: string;
  discount?: string;
};
