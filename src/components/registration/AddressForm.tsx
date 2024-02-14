import React, { useCallback, useMemo, useState } from "react";
import classes from "./index.module.css";
import style from "../HOC/index.module.css";
import InputText from "../HOC/InputText";
import { Country, State, City } from "country-state-city";
import { useRecoilState } from "recoil";
//@ts-ignore
import { registrationDataState } from "./state/index.js";

const AddressForm = ({ title }: { title?: string }) => {
  const [regData, setRegData] = useRecoilState<RegisterData>(
    registrationDataState
  );
  const [selCountry, setSelCountry] = useState("");
  const [selState, setSelState] = useState("");
  const [selCity, setSelCity] = useState("");

  const inputChangeHandler = useCallback((key: string, value: any) => {
    setRegData((prev: RegisterData) => {
      return { ...prev, address: { ...prev.address, [key]: value } };
    });
  }, []);

  const countrySelectHandler = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRegData((prev: RegisterData) => {
        return {
          ...prev,
          address: { ...prev.address, country: e.target.value },
        };
      });
      setSelCountry(e.target.value);
    },
    []
  );

  const stateSelectHandler = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelState(e.target.value);
      setRegData((prev: RegisterData) => {
        return { ...prev, address: { ...prev.address, state: e.target.value } };
      });
    },
    []
  );

  const citySelectHandler = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelCity(e.target.value);
      setRegData((prev: RegisterData) => {
        return { ...prev, address: { ...prev.address, city: e.target.value } };
      });
    },
    []
  );

  const renderCountries = useMemo(() => {
    return Country.getAllCountries().map((country) => {
      return (
        <option key={country.isoCode} value={country.isoCode}>
          {country.name}
        </option>
      );
    });
  }, []);

  const renderStates = useMemo(() => {
    return State.getStatesOfCountry(selCountry).map((state) => {
      return (
        <option key={state.isoCode} value={state.isoCode}>
          {state.name}
        </option>
      );
    });
  }, [selCountry]);

  const renderCities = useMemo(() => {
    return City.getCitiesOfState(selCountry, selState).map((city) => {
      return (
        <option key={city.name} value={city.name}>
          {city.name}
        </option>
      );
    });
  }, [selState, selCountry]);

  return (
    <form action="post" className={classes.innerForm}>
      <span className={classes.subheading}>{title}</span>
      <InputText
        id="personaladdress"
        inputType="text"
        label="Personal Address"
        placeHolder=""
        warning="Personal Address is required"
        onChange={inputChangeHandler}
        value={regData?.address?.personaladdress}
      />
      <InputText
        id="streetaddress"
        inputType="text"
        label="Street Address"
        placeHolder=""
        warning="street Address is required"
        onChange={inputChangeHandler}
        value={regData?.address?.streetaddress}
      />
      <div className={classes.horizontaldiv}>
        <div className={style.select}>
          <label htmlFor="country" className={style.inputLabel}>
            {" "}
            Country
          </label>
          <select
            id="country"
            className={`${style.dropdown} ${style.input}`}
            onChange={countrySelectHandler}
            style={{ width: "95%" }}
            value={regData?.address?.country}
          >
            {renderCountries}
          </select>
        </div>
        <div className={style.select}>
          <label htmlFor="state" className={style.inputLabel}>
            State
          </label>
          <select
            id="state"
            className={`${style.dropdown} ${style.input}`}
            onChange={stateSelectHandler}
            value={regData?.address?.state}
          >
            {renderStates}
          </select>
        </div>
      </div>
      <div className={classes.horizontaldiv}>
        <div className={style.select}>
          <label htmlFor="country" className={style.inputLabel}>
            City
          </label>
          <select
            id="city"
            className={`${style.dropdown} ${style.input}`}
            onChange={citySelectHandler}
            style={{ width: "95%" }}
            value={regData?.address?.city}
          >
            {renderCities}
          </select>
        </div>
        <InputText
          id="pin"
          inputType="text"
          label="pincode"
          placeHolder=""
          warning="Pin code is too small"
          minLength={6}
          onChange={inputChangeHandler}
          value={regData?.address?.pin}
        />
      </div>
    </form>
  );
};

export default AddressForm;

// api key
// AIzaSyCPcsk8-F8WCNl9VbRmPqt7NnJXf9C-F4g
