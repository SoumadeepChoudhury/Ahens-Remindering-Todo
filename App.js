import React, { useEffect } from 'react';
import RNBootSplash from "react-native-bootsplash";
// import { Calendar } from 'react-native-calendars';
import Home from './Components/Home';
// import Progress from './Components/InProgress';
// import Done from './Components/Done';
const App = () => {
  useEffect(() => {
    RNBootSplash.hide(); // fade
  }, []);
  return (
    <>
      <Home />
      {/* <Progress />
      <Done />
      <Calendar /> */}
    </>
  );
}

export default App;