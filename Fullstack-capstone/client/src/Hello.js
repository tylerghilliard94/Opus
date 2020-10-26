import React, { useContext, useEffect } from "react";
import { UserProfileContext } from "./providers/UserProfileProvider"
import Home from "./Home/Home";






export default function Hello() {
  const { activeUser } = useContext(UserProfileContext);








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
        }}>Hello, Good Morning {activeUser.displayName}

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
        }}>Hello, Good Afternoon {activeUser.displayName}



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
        }}>Hello, Good Evening {activeUser.displayName}





        </div>
        <Home />
      </>
    );

  }



}