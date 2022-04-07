import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, TextInput, Modal, Alert, ScrollView, StatusBar } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
today = String(yyyy + '-' + mm + '-' + dd);

var runs = 0
const Home = ({ navigation }) => {
    // useEffect(() => {
    //     if (userDate.includes(today)) {
    //         upcomingTodo();
    //     }
    // }, []);
    const getItems = (val) => {
        const data = JSON.parse(val);
        if (data == null) {
            return [];
        } else {
            return data;
        }
    };
    // const upcomingTodo = async () => {
    //     await AsyncStorage.getItem(today).then((res) => { console.log(res) });
    // };
    const [stateModal, setStateModal] = useState(false);
    // const [details, setDetails] = useState(async () => [await AsyncStorage.getItem('2022-04-09').then((val) => { setDetails(getItems(val)) })]);
    const [existingDates, setExistingDates] = useState(async () => [await AsyncStorage.getItem('Date').then((val) => { setExistingDates(getItems(val)) })]);

    var TaskDetails = []
    var date = ' '
    var Time = ' '
    var TaskTitle = ' '
    var Task_Description = ' '
    var Priority = ' '
    var Status = ' '
    var Target = ' '

    var userDate = existingDates
    // var upcomingTodo = JSON.stringify(details)
    state = {
        markedData: [existingDates]
    }

    let dates = {};
    if (runs == 0) {
        runs += 1
        state.markedData.forEach((val) => {
            dates[val] = { selected: true, selectedColor: '#03CAD9', selectedTextColor: 'black' }
        });
    } else {
        state.markedData[0].forEach((val) => {
            dates[val] = { selected: true, selectedColor: '#03CAD9', selectedTextColor: 'black' }
            // console.log("Marked", dates);
        });
    }

    const saveTodo = () => {
        if (userDate.includes(date)) {
            Alert.alert("Warning!", "Date already contains Todo.. Please Update from there rather than adding new todo...")
        }
        else if (date != ' ' && Time != ' ' && TaskDetails != ' ' && Priority != ' ' && Status != ' ') {
            setStateModal(false);
            userDate.push(date);
            TaskDetails.push(Time);
            TaskDetails.push(TaskTitle);
            TaskDetails.push(Task_Description);
            TaskDetails.push(Priority);
            TaskDetails.push(Status);
            TaskDetails.push(Target);
            try {
                const inputDate = JSON.stringify(userDate);
                const InputTaskDetails = JSON.stringify(TaskDetails);
                AsyncStorage.setItem('Date', inputDate);
                AsyncStorage.setItem(`${date}`, InputTaskDetails);
                Alert.alert('Success', "Successfully added....");
            } catch (e) {
                Alert.alert("Error", "Something went wrong....Try Again later");
            }
            Time = TaskDetails = Task_Description = Priority = Status = Target = '';
        } else {
            Alert.alert("Warning!", "Input All Fields...")
        }
    };
    return (
        <>
            <StatusBar hidden={true} />
            <SafeAreaView style={{ backgroundColor: '#124267', height: windowHeight, width: windowWidth, paddingTop: windowHeight / 39.96 }}>
                <View>
                    <View style={{ marginTop: 10, elevation: 20, borderColor: '#124267' }}>
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
                                navigation.navigate('Details');
                                // navigation.navigate('Details', {
                                //     date: day.dateString
                                // });
                            }}
                            markedDates={dates}
                        />
                    </View>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => { navigation.navigate('Done'); }}>
                        <View style={styles.buttonViewDone}>
                            <Text style={styles.buttonDoneText}>
                                View Completed Tasks
                            </Text>
                            <View style={styles.addIcon}>
                                <AntDesign name='arrowright' size={30} color='#03CAD9' />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View >
                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => { setStateModal(true) }}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                Add TODO
                            </Text>
                            <View style={styles.addIcon}>
                                <AntDesign name='pluscircleo' size={30} color='#303D3E' />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View >
                <Modal
                    transparent={true}
                    visible={stateModal}>
                    <View
                        style={styles.Modal}>

                        <ScrollView>
                            <TextInput style={styles.ModalText} placeholder='Enter Date in YYYY-MM-DD.....' keyboardType='numeric' placeholderTextColor="#8DB6D9" onChangeText={(val) => { if (val.length == 10 && val.charAt(4) == '-' && val.charAt(7) == '-') { date = String(val) } }} />


                            <TextInput style={styles.ModalText} placeholder='Enter Time in HH:MM.....' placeholderTextColor="#8DB6D9" onChangeText={(val) => { if (val != '' && val.charAt(2) == ':' && val.length == 5) { Time = val } }} />


                            <TextInput style={styles.ModalText} placeholder='Enter Task Title.....' placeholderTextColor="#8DB6D9" onChangeText={(val) => { TaskTitle = val }} />


                            <TextInput style={styles.ModalText} placeholder='Enter Task Description.....' placeholderTextColor="#8DB6D9" onChangeText={(val) => { Task_Description = val }} />


                            <TextInput style={styles.ModalText} placeholder='Enter Priority.....' placeholderTextColor="#8DB6D9" onChangeText={(val) => { Priority = val }} />


                            <TextInput style={styles.ModalText} placeholder='Enter Status.....' placeholderTextColor="#8DB6D9" onChangeText={(val) => { Status = val }} />


                            <TextInput style={styles.ModalText} placeholder='Enter Target of Completion.....' placeholderTextColor="#8DB6D9" onChangeText={(val) => { Target = val }} />
                        </ScrollView>
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
        </>
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
        borderRadius: 29,
        marginBottom: -24,
        paddingVertical: 13,
        paddingHorizontal: 100,
        backgroundColor: '#03CAD9',
    },
    buttonModal: {
        elevation: 40,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#03CAD9",
        marginLeft: 6,
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
        marginLeft: 30
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
        shadowOpacity: 20,
        borderWidth: 2,
        backgroundColor: '#124267',
        borderRadius: 20,
        borderColor: '#1A364F',
        elevation: 100,
        margin: 20,
        marginTop: 80
    },
    buttonViewDone: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 50,
        elevation: 100,
        shadowOffset: 30,
        shadowColor: '#000000',
        shadowOpacity: 20,
        borderRadius: 25,
        shadowRadius: 20,
        borderWidth: 2,
        borderColor: "#03CAD9",
        paddingVertical: 15,
        paddingHorizontal: windowWidth / 4.5,
        alignItems: 'center'
    },
    buttonDoneText: {
        elevation: 30,
        color: '#03CAD9',
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontFamily: 'serif',
        fontSize: 15,
        marginRight: -15,
        textAlign: 'center',
    },
    addIcon: {
        marginLeft: 80,
        marginRight: -90,
        // paddingRight: 20
    }
});
export default Home;