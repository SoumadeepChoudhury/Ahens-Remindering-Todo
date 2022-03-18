import React from 'react';
import Todo from './Components/Todo';
import Progress from './Components/InProgress';
import Done from './Components/Done';
const App = () => {
  return (
    <>
      <Todo />
      <Progress />
      <Done />
    </>
  );
}

export default App;