import React, { useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";

import Header from "./Header";
import ApplicationViews from "./ApplicationViews/ApplicationViews";
import { PrimaryFocusProvider } from './providers/PrimaryFocusProvider';
import { ArtPostProvider } from './providers/ArtPostProvider';
import { CategoryProvider } from './providers/CategoryProvider';
import { LikeProvider } from './providers/LikeProvider';
import { FollowingProvider } from './providers/FollowingProvider';
import { FavoriteProvider } from './providers/FavoriteProvider';


//"object undefined" error on browser if you do not include the provider in App.js
function App() {

  return (

    <Router>
      <UserProfileProvider>
        <PrimaryFocusProvider>
          <CategoryProvider>
            <LikeProvider>
              <FollowingProvider>
                <FavoriteProvider>
                  <ArtPostProvider>


                    <Header />
                    <ApplicationViews />


                  </ArtPostProvider>
                </FavoriteProvider>
              </FollowingProvider>
            </LikeProvider>
          </CategoryProvider>
        </PrimaryFocusProvider>
      </UserProfileProvider>
    </Router>


  );
}

export default App;
