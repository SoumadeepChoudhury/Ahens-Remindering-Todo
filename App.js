import React, { useEffect } from 'react';
import RNBootSplash from "react-native-bootsplash";
import Home from './Components/Home';
const App = () => {
  useEffect(() => {
    RNBootSplash.hide(); // fade
  }, []);
  return (
    <>
      <Home />
    </>
  );
}

export default App;