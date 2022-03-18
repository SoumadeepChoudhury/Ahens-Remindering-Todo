
import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Todo = ({ navigation }) => {
    return (
        <SafeAreaView style={{ backgroundColor: '#124267', height: windowHeight, width: windowWidth }}>
            <View style={styles.head}>
                <View>
                    <Icon name='horizontal-rule' style={{ fontSize: 30, color: 'white', lineHeight: 14 }} />
                    <Icon name='horizontal-rule' style={{ fontSize: 30, color: 'white', lineHeight: 14 }} />
                    <Icon name='horizontal-rule' style={{ fontSize: 30, color: 'white', lineHeight: 14 }} />
                </View>
                <View>
                    <Text style={{
                        marginLeft: 30,
                        fontSize: 30,
                        fontWeight: "bold",
                        color: 'white',
                        fontStyle: 'italic',
                        fontFamily: 'serif'
                    }}>T O D O</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    head: {
        paddingLeft: 25,
        paddingTop: 10,
        flex: 1,
        flexDirection: 'row',
    }
});
export default Todo;