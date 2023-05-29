import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMyLocation } from "../MapPage/mapSlice";
import { getFakeLocation } from "./FAKE_LOCATION";
import { connectWithSocketIOServer } from "../socketConnection/socketConn";
import { proceedWithLogin } from "../store/actions/loginPageActions";

import LoginButton from "./LoginButton";
import LoginInput from "./LoginInput";
import Logo from "./Logo";

import "./LoginPage.css";
import { connectWithPeerServer } from "../realtimeCommunication/webRTCHandler";

const isUsernameValid = (username) => {
  return username.length > 0 && username.length < 10 && !username.includes(" ");
};


const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [locationErrorOccurred] = useState(false);

  const myLocation = useSelector((state) => state.map.myLocation);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    proceedWithLogin({
      username,
      coords: {
        lng: myLocation.lng,
        lat: myLocation.lat,
      },
    });
    navigate("/map");
  };

  const onSuccess = useCallback((position) => {
    dispatch(
      setMyLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    );
  }, [dispatch]);


  useEffect(() => {
    onSuccess(getFakeLocation());
  }, [onSuccess]);

  useEffect(() => {
    if (myLocation) {
      connectWithSocketIOServer();
      connectWithPeerServer();
    }
  }, [myLocation]);

  return (
    <div className="l_page_main_container">
      <div className="l_page_box">
        <Logo />
        <LoginInput username={username} setUsername={setUsername} />
        <LoginButton
          disabled={!isUsernameValid(username) || locationErrorOccurred}
          onClickHandler={handleLogin}
        />
      </div>
    </div>
  );
};

export default LoginPage;
