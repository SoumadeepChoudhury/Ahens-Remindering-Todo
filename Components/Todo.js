import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Todo = () => {
    return (
        <SafeAreaView style={{ backgroundColor: '#124267', height: windowHeight, width: windowWidth }}>
            <View style={styles.head}>
                <View>
                    <Text style={styles.head}
                    >T O D O</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    head: {
        paddingLeft: 20,
        paddingTop: 10,
        fontSize: 30,
        fontWeight: "bold",
        color: 'white',
        fontStyle: 'italic',
        fontFamily: 'serif'
    }
});
export default Todo;