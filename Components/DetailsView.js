import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Todo from './Todo';
import Progress from './InProgress';
import Done from './Done';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';


const Tab = createBottomTabNavigator();
const windowHeight = Dimensions.get('window').height;

const DetailsView = ({ route }) => {
    const { date } = route.params;
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator
                screenOptions={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarStyle: styles.tabNavs
                }}
            >
                <Tab.Screen name="Todo" component={Todo} initialParams={{ date: date }} options={{
                    tabBarIcon: ({ focused }) => { return <AntDesign name='form' size={20} color={focused ? '#03CAD9' : '#8C9BD8'} /> }
                }} />
                <Tab.Screen name="Progress" component={Progress} initialParams={{ date: date }} options={{ tabBarIcon: ({ focused }) => { return <AntDesign name='clockcircleo' size={20} color={focused ? '#03CAD9' : '#8C9BD8'} /> } }} />
                <Tab.Screen name="Done" component={Done} initialParams={{ date: date }} options={{ tabBarIcon: ({ focused }) => { return <Octicons name='tasklist' size={20} color={focused ? '#03CAD9' : '#8C9BD8'} /> } }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};
const styles = StyleSheet.create({
    tabNavs: {
        elevation: 30,
        flex: 1,
        position: 'absolute',
        height: windowHeight / 15,
        margin: 10,
        marginBottom: 0,
        borderRadius: 10,
        borderColor: '#03CAD9',
        borderWidth: 2,
        backgroundColor: '#124267'
    }
});
export default DetailsView;