import React, { useEffect } from 'react';
import RNBootSplash from "react-native-bootsplash";
import Todo from './Components/Todo';
import Progress from './Components/InProgress';
import Done from './Components/Done';
const App = () => {
  useEffect(() => {
    RNBootSplash.hide(); // fade
  }, []);
  return (
    <>
      <Todo />
      <Progress />
      <Done />
    </>
  );
}

export default App;