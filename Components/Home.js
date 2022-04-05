import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;

var runs = 0
const Home = ({ navigation }) => {
    const getItems = (val) => {
        const data = JSON.parse(val);
        if (data == null) {
            return [];
        } else {
            return data;
        }
    }
    const [stateModal, setStateModal] = useState(false);
    const [existingDates, setExistingDates] = useState(async () => [await AsyncStorage.getItem('Date').then((val) => { setExistingDates(getItems(val)) })]);
    var TaskDetails = []


    var userDate = existingDates
    state = {
        markedData: [existingDates]
    }

    let dates = {};
    if (runs == 0) {
        runs += 1
        state.markedData.forEach((val) => {
            dates[val] = { selected: true, selectedColor: '#03CAD9', selectedTextColor: 'black' }
            console.log("Marked", dates);
        });
    } else {
        state.markedData[0].forEach((val) => {
            dates[val] = { selected: true, selectedColor: '#03CAD9', selectedTextColor: 'black' }
            console.log("Marked", dates);
        });
    }

    const saveTodo = () => {
        setStateModal(false);
        try {
            const inputDate = JSON.stringify(userDate);
            AsyncStorage.setItem('Date', inputDate);
            Alert.alert('Success', "Successfully added....");
        } catch (e) {
            alert("Error", "Something went wrong....Try Again later");
        }
    };
    return (
        <SafeAreaView style={{ backgroundColor: '#124267', height: windowHeight, width: windowWidth, paddingTop: windowHeight / 39.96 }}>
            <View>
                <View style={{ elevation: 20, borderColor: '#124267' }}>
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
                        disableAllTouchEventsForDisabledDays={true}
                        enableSwipeMonths
                        onDayPress={day => {
                            navigation.navigate('Progress', {
                                date: day.dateString
                            });
                        }}
                        markedDates={dates}
                    />
                </View>
            </View>
            <View style={styles.footer}>
                <View style={styles.buttonUpcomingTodo}>
                    <Text style={styles.buttonUpText}>
                        No Upcomming Todo....
                    </Text>
                </View>
            </View >
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => { setStateModal(true) }}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>
                            Add TODO
                        </Text>
                    </View>
                </TouchableOpacity>
            </View >
            <Modal
                transparent={true}
                visible={stateModal}>
                <View
                    style={styles.Modal}>

                    <View>
                        <TextInput style={styles.ModalText} placeholder='Enter Date in YYYY-MM-DD.....' keyboardType='numeric' placeholderTextColor="#8DB6D9" onChangeText={(val) => { if (val.length == 10 && val.charAt(4) == '-' && val.charAt(7) == '-') { userDate.push(String(val)) } }} />


                        <TextInput style={styles.ModalText} placeholder='Enter Time in HH:MM.....' placeholderTextColor="#8DB6D9" onChangeText={(val) => { TaskDetails.push(String(val)) }} />


                        <TextInput style={styles.ModalText} placeholder='Enter Task Title.....' placeholderTextColor="#8DB6D9" onChangeText={(val) => { TaskDetails.push(String(val)) }} />


                        <TextInput style={styles.ModalText} placeholder='Enter Task Description.....' placeholderTextColor="#8DB6D9" onChangeText={(val) => { TaskDetails.push(String(val)) }} />


                        <TextInput style={styles.ModalText} placeholder='Enter Priority.....' placeholderTextColor="#8DB6D9" onChangeText={(val) => { TaskDetails.push(String(val)) }} />


                        <TextInput style={styles.ModalText} placeholder='Enter Status.....' placeholderTextColor="#8DB6D9" onChangeText={(val) => { TaskDetails.push(String(val)) }} />


                        <TextInput style={styles.ModalText} placeholder='Enter Target of Completion.....' placeholderTextColor="#8DB6D9" onChangeText={(val) => { TaskDetails.push(String(val)) }} />
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity onPress={saveTodo}>
                            <View style={styles.buttonModal}>
                                <Text style={styles.ModalTextView}>
                                    {"\t"}Save{"\t"}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setStateModal(false)}>
                            <View style={styles.buttonModal}>
                                <Text style={styles.ModalTextView}>
                                    Cancel
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        flexDirection: 'row',
        elevation: 40,
        marginLeft: windowWidth / 17.98,
        borderRadius: 18,
        paddingVertical: windowWidth / 21,
        paddingHorizontal: windowWidth / 3.96,
        backgroundColor: '#03CAD9',
    },
    buttonModal: {
        elevation: 40,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#03CAD9",
        marginLeft: 10,
        paddingVertical: windowWidth / 21,
        paddingHorizontal: windowHeight / 17.96,
        justifyContent: 'space-evenly',
        alignItems: 'center'
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
    },
    ModalText: {
        color: 'white',
        fontSize: 20,
        padding: 20
    },
    ModalTextView: {
        elevation: 30,
        color: '#03CAD9',
        fontWeight: 'bold',
        fontStyle: 'normal',
        fontFamily: 'serif',
        textTransform: 'uppercase',
        fontSize: windowHeight / 39.96,
        textAlign: 'center',
    },
    Modal: {
        backgroundColor: '#124267',
        borderRadius: 40,
        elevation: 100,
        margin: 20,
        marginTop: 100
    },
    buttonUpcomingTodo: {
        flex: 1,
        marginBottom: 200,
        elevation: 40,
        shadowColor: "red",
        shadowOffset: 30,
        shadowOpacity: 20,
        borderRadius: 18,
        shadowRadius: 20,
        borderWidth: 2,
        height: 100,
        borderColor: "#03CAD9",
        paddingVertical: windowWidth / 21,
        paddingHorizontal: windowHeight / 17.96,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    buttonUpText: {
        elevation: 30,
        color: '#03CAD9',
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontFamily: 'serif',
        fontSize: 15,
        textAlign: 'center',
    }
});
export default Home;