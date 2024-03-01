import { useEffect, useMemo, useState } from "react";
import Card from "../../HOC/Card";
import classes from "./index.module.css";
//@ts-ignore
import PersonalDetails from "./components/PersonalDetails";
import LegalDetails from "./components/LegalDetails";
import Address from "./components/Address";
import BusinessDetails from "./components/BusinessDetails";
import StoreDetails from "./components/StoreDetails";
import DeleteProfile from "./components/DeleteProfile";
import ProfilePicture from "./components/ProfilePicture";
import { useRecoilValueLoadable } from "recoil";
// @ts-ignore
import { currentUserState } from "../../../state/atoms/screen.js";

type Props = {};

const Profile = ({}: Props) => {
  const currentUser = useRecoilValueLoadable(currentUserState);
  const user: RegisterData = currentUser.contents;

  const renderProfile = useMemo(() => {
    return (
      <div className={classes.cardBody}>
        <ProfilePicture user={user} />
        <div className={classes.details}>
          <PersonalDetails user={user} />
          <Address user={user} />
          <LegalDetails user={user} />
          <BusinessDetails user={user} />
          <StoreDetails user={user} />
          <DeleteProfile user={user} />
        </div>
      </div>
    );
  }, [currentUser, user]);

  return (
    <div className={classes.screen}>
      <div className={classes.body}>
        <Card
          body={renderProfile}
          style={{ width: "fit-content", height: "calc(100vh - 141px)" }}
        />
      </div>
    </div>
  );
};

export default Profile;
