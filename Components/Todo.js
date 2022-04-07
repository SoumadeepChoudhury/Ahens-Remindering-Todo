import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Todo = () => {
    return (
        <SafeAreaView style={{ backgroundColor: '#124267', height: windowHeight, width: windowWidth }}>
            <View style={styles.headOuter}></View>
            <View style={styles.headMid}></View>
            <View style={styles.headInner}>
                <Text style={styles.headText}>TODO</Text>
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    headInner: {
        position: 'relative',
        width: 220,
        height: 220,
        borderRadius: 110,
        marginTop: -230,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#03CAD9',
        backgroundColor: '#124267'
    },
    headMid: {
        position: 'relative',
        width: 240,
        height: 240,
        borderRadius: 120,
        marginTop: -250,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#03CAD9',
        backgroundColor: '#124267'
    },
    headOuter: {
        position: 'relative',
        width: 260,
        height: 260,
        borderRadius: 130,
        marginTop: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#03CAD9',
        backgroundColor: '#124267'
    },
    headText: {
        color: '#03CAD9',
        fontSize: 30,
        fontStyle: 'italic',
        fontFamily: 'serif'
    }
});
export default Todo;