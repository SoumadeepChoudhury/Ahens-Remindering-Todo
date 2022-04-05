import React, { useEffect } from 'react';
import RNBootSplash from "react-native-bootsplash";
import Home from './Components/Home';
import Progress from './Components/InProgress';
import Done from './Components/Done';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const App = () => {

  const Stack = createNativeStackNavigator();
  useEffect(() => {
    RNBootSplash.hide(); // fade
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Progress" component={Progress} options={{ headerShown: false }} />
        <Stack.Screen name="Done" component={Done} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;