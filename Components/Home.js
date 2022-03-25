import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
// function selelectedDate(date = "") {
//     return date
// }
today = mm + '/' + dd + '/' + yyyy;
const Home = () => {
    const addTodo = () => {
        console.log("Hh")
        alert('Todo added...')
    };
    // var date = ""
    return (
        <SafeAreaView style={{ backgroundColor: '#124267', height: windowHeight, width: windowWidth, paddingTop: windowHeight / 39.96 }}>
            <View>
                <View style={{ elevation: windowHeight / 39.96, borderColor: '#124267' }}>
                    <Calendar
                        theme={{
                            elevation: windowHeight / 395.635,
                            backgroundColor: '#124267',
                            calendarBackground: '#124267',
                            textSectionTitleColor: '#b6c1cd',
                            textSectionTitleDisabledColor: '#000000',
                            selectedDayBackgroundColor: '#00adf5',
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: '#03CAD9',
                            dayTextColor: 'white',
                            textDisabledColor: 'grey',
                            dotColor: '#00adf5',
                            selectedDotColor: '#ffffff',
                            arrowColor: 'white',
                            disabledArrowColor: '#d9e1e8',
                            monthTextColor: 'white',
                            indicatorColor: 'blue',
                            textDayFontFamily: 'monospace',
                            textMonthFontFamily: 'monospace',
                            textDayHeaderFontFamily: 'monospace',
                            textDayFontWeight: '300',
                            textMonthFontWeight: 'bold',
                            textDayHeaderFontWeight: '300',
                            textDayFontSize: windowHeight / 49.45,
                            textMonthFontSize: windowHeight / 49.45,
                            textDayHeaderFontSize: windowHeight / 49.45
                        }}
                        minDate={yyyy + '-' + mm + '-' + dd}
                        enableSwipeMonths
                        onDayPress={day => {
                            date = String(day.dateString);
                        }}
                    />
                </View>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity onPress={addTodo}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>
                            Add TODO
                        </Text>
                    </View>
                </TouchableOpacity>
            </View >
        </SafeAreaView >
    );
};
const styles = StyleSheet.create({
    head: {
        paddingLeft: windowWidth / 19.6,
        paddingTop: windowHeight / 79.127,
        fontSize: windowHeight / 26.37,
        fontWeight: "bold",
        color: 'white',
        fontStyle: 'italic',
        fontFamily: 'serif'
    },
    footer: {
        position: 'absolute',
        bottom: windowHeight / 15.8254,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: windowHeight / 39.96,
        backgroundColor: '#124267',
    },
    button: {
        elevation: 40,
        marginLeft: windowWidth / 17.98,
        borderRadius: 18,
        paddingVertical: windowWidth / 21,
        paddingHorizontal: windowWidth / 3.96,
        // backgroundColor: '#142E43',
        backgroundColor: '#03CAD9',
    },
    buttonText: {
        elevation: 30,
        color: '#303D3E',
        fontWeight: 'bold',
        fontStyle: 'normal',
        fontFamily: 'serif',
        textTransform: 'uppercase',
        fontSize: windowHeight / 39.96,
        textAlign: 'center',
    }
});
export default Home;