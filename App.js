import React, { useEffect } from 'react';
import RNBootSplash from "react-native-bootsplash";
import Home from './Components/Home';
import Done from './Components/Done';
import DetailsView from './Components/DetailsView';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import codePush from 'react-native-code-push';
let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };

const App = () => {
  const Stack = createNativeStackNavigator();
  useEffect(() => {
    RNBootSplash.hide(); // fade
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailsView} options={{ headerShown: false }} />
        <Stack.Screen name="Done" component={Done} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default codePush(codePushOptions)(App);;