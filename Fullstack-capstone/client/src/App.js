import React, { useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";

import Header from "./Header";
import ApplicationViews from "./ApplicationViews/ApplicationViews";
import { PrimaryFocusProvider } from './providers/PrimaryFocusProvider';


//"object undefined" error on browser if you do not include the provider in App.js
function App() {

  return (

    <Router>
      <UserProfileProvider>
        <PrimaryFocusProvider>


          <Header />
          <ApplicationViews />

        </PrimaryFocusProvider>
      </UserProfileProvider>
    </Router>


  );
}

export default App;
