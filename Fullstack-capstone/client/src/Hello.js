import React, { useContext, useEffect, useState } from "react";
import { UserProfileContext } from "./providers/UserProfileProvider"
import Home from "./Home/Home";






export default function Hello() {

  const { activeUser } = useState(UserProfileContext)
  let [localActiveUser, setLocalActiveUser] = useState(activeUser)



  let user = JSON.parse(sessionStorage.userProfile)
  localActiveUser = user









  let time = new Date();
  if (time.getHours() < 12) {
    return (
      <>
        <div style={{
          position: "relative",
          left: 0,
          right: 0,
          top: "50%",
          marginTop: "-0.5rem",
          textAlign: "center",
        }}>Hello, Good Morning {localActiveUser.DisplayName != undefined ? localActiveUser.DisplayName : localActiveUser.displayName}

        </div>
        <Home />
      </>

    );
  }
  else if ((time.getHours() < 18 && time.getHours() >= 12)) {
    return (
      <>
        <div style={{
          position: "relative",
          left: 0,
          right: 0,
          top: "50%",
          marginTop: "-0.5rem",
          textAlign: "center",
        }}>Hello, Good Afternoon {localActiveUser.DisplayName != undefined ? localActiveUser.DisplayName : localActiveUser.displayName}



        </div>
        <Home />
      </>
    );
  }
  else {
    return (
      <>
        <div style={{
          position: "relative",
          left: 0,
          right: 0,
          top: "50%",
          marginTop: "-0.5rem",
          textAlign: "center",
        }}>Hello, Good Evening {localActiveUser.DisplayName != undefined ? localActiveUser.DisplayName : localActiveUser.displayName}





        </div>
        <Home />
      </>
    );

  }



}