import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, SafeAreaView, TouchableOpacity, StyleSheet, Dimensions, Modal, TextInput, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let currentTime = String(new Date().getHours()) + ":" + String(new Date().getMinutes())
if (currentTime[1] == ":")
    currentTime = '0' + currentTime
if (currentTime.substring(3).length != 2)
    currentTime = currentTime.substring(0, 3) + ":" + "0" + currentTime[4]
var currentDate = String(new Date().getFullYear()) + "-" + String(new Date().getMonth() + 1).padStart(2, '0') + "-" + String(new Date().getDate()).padStart(2, '0');
var AllDet = []
let datasets = ["Time: ", "Title: ", "Desc: ", "Priority: ", "Target of Completion: "]
let valuesets = []
let runs = 0
const Todo = ({ route }) => {

    useEffect(() => {
        if (runs == 0) {
            runs = 1
            for (let i = 0; i < count; i++)
                var _ = AllDet.pop()
            AllDet.map((val) => {
                AllDetails.push(val);
            })
        }
    }, [AllDet, AllDetails]);
    const date = route.params.date;
    const [stateModal, setStateModal] = useState(false);
    const [stateDetails, setStateDetails] = useState(false);

    const notify = (date, Time, titleName, desc, time) => {
        PushNotification.localNotificationSchedule({
            id: date.concat(Time),
            channelId: '#12@1snh',
            title: titleName,
            message: desc,
            smallIcon: "icon",
            largeIcon: "icon",
            bigLargeIcon: "icon",
            color: '#124267',
            bigText: "Your upcoming todo is in operation",
            date: new Date(Date.now() + time * 1000),
            allowWhileIdle: true,
        });
    }

    const getItems = (val) => {
        const data = JSON.parse(val);
        let Tododata = []
        if (data != null)
            data.map(val => {
                if (val[4] == 'Todo')
                    Tododata.push(val)
                if (val[4] == 'In Progress' || val[4] == 'Done') {
                    AllDet.push(val)
                }
            });
        return Tododata
    };
    const getDoneItems = (val) => {
        const data = JSON.parse(val);
        if (data != null)
            return data
        else return []
    };
    function dateDiffInDays(a, b) {
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / MilliSec);
    }
    const [todoDetails, setTodoDetails] = useState(async () => [await AsyncStorage.getItem(date).then((val) => { setTodoDetails(getItems(val)); setCount(getItems(val).length); })]);
    const [donelist, setDoneList] = useState(async () => [await AsyncStorage.getItem("Done").then((val) => { setDoneList(getDoneItems(val)) })]);
    const [userDate, setUserDate] = useState(async () => [await AsyncStorage.getItem("Date").then((val) => { setUserDate(getDoneItems(val)) })]);
    const [count, setCount] = useState(0);
    const [keyPressed, setKeyPressed] = useState(0);

    var counts = count
    var AllDetails = todoDetails;
    var DoneList = [donelist]
    var TaskDetails = [];
    var Time = ' '
    var TaskTitle = ' '
    var Task_Description = ' '
    var Priority = ' '
    var Target = ' '
    var remind = 0;
    var items = 0;
    const setDatas = (val) => {
        setKeyPressed(AllDetails.indexOf(val));
        val.map(value => {
            valuesets.push(value);
        })
    }
    const removeTodo = () => {
        Alert.alert(
            "Confirm",
            "Are You Sure to delete",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        let userD = userDate.filter(item => item != date);
                        AsyncStorage.setItem("Date", JSON.stringify(userD));
                        AsyncStorage.setItem(date, JSON.stringify([]));
                        Object.values(AllDetails).map(val => {
                            PushNotification.cancelLocalNotification(String(date) + String(val[0]));
                        })
                        setTodoDetails([]);
                        setCount(0);
                    },
                    style: "destructive",
                },
            ],
            {
                cancelable: true
            }
        );
    }

    const saveTodo = (Stat) => {
        if (Time < currentTime) {
            Alert.alert("Error!", "You cannot add past day's TODO")
        }
        else if (Priority != "High" && Priority != "Medium" && Priority != "Low") {
            Alert.alert("Error!", "Enter Priority Correctly from \"High\"| \"Medium\"| \"Low\"");
        }
        else if (Time != ' ' && TaskTitle != ' ' && Priority != ' ') {
            setStateModal(false);
            if (parseInt(Time.substring(0, 2)) > 24 || parseInt(Time.substring(3, 5)) > 60)
                Alert.alert("Error!", "Enter time correctly!")
            else {
                TaskDetails.push(Time);
                TaskDetails.push(TaskTitle);
                TaskDetails.push(Task_Description);
                TaskDetails.push(Priority);
                TaskDetails.push(Stat)
                TaskDetails.push(Target == ' ' ? 0 : Target);
                var TimeInMin = parseInt(Time.substring(0, 2)) * 60 + parseInt(Time.substring(3));
                let date_Diff = (dateDiffInDays(new Date(date), new Date(currentDate))) * -1 * 24 * 60;
                let currentTimeInMin = parseInt(currentTime.substring(0, 2)) * 60 + parseInt(currentTime.substring(3));
                let time_Diff = (TimeInMin - currentTimeInMin);
                remind = (date_Diff + time_Diff - remind) * 60;
                try {
                    counts += 1
                    setCount(counts);
                    AllDetails.push(TaskDetails);
                    const InputTaskDetails = JSON.stringify(AllDetails);
                    notify(String(date), String(Time), TaskTitle, Task_Description, remind);
                    AsyncStorage.setItem(date, InputTaskDetails);
                    Alert.alert('Success', "Successfully added....");
                } catch (e) {
                    Alert.alert("Error", "Something went wrong....Try Again later");
                }
                Time = TaskTitle = Task_Description = Priority = ' ';
                TaskDetails = []

            }
        } else {
            Alert.alert("Warning!", "Input All Fields...")
        }

    };
    return (
        <SafeAreaView style={{ backgroundColor: '#124267', height: windowHeight, width: windowWidth }}>
            <View style={styles.headOuter}></View>
            <View style={styles.headMid}></View>
            <View style={styles.headInner}>
                <Text style={styles.headText}>TODO</Text>
            </View>
            <View style={styles.todoView}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.textHeader}>
                        Todo
                    </Text>
                    <View style={styles.Count}>
                        <Text style={{ fontWeight: 'bold', color: 'black' }}>{count} sets</Text>
                    </View>
                </View>
                <View style={styles.headerDivider} />
                <View style={styles.todoHeader}>
                    <Text style={styles.todoHeaderTitles}>Time</Text>
                    <Text style={styles.todoHeaderTitles}>Title</Text>
                    <Text style={styles.todoHeaderTitles}>Priority</Text>
                    <Text style={styles.todoHeaderTitles}>Target</Text>
                </View>
                <ScrollView styles={styles.scrollviewTodo}>
                    {Object.values(AllDetails).map(val => {

                        if (val != 0 && val != undefined && val != null) {
                            if (val[4] == 'Todo') {
                                if (val[5] == ' ') val[5] = "0"
                                var targettedTime = parseInt(val[0].substring(0, 2)) * 60 + parseInt(val[0].substring(3, 5)) + parseInt(val[5]) * 60
                                var targettedTimeHH = Math.trunc(targettedTime / 60)
                                var targettedTimeMM = Math.trunc(targettedTime % 60)
                                if (targettedTimeMM > 60) {
                                    targettedTimeHH += targettedTimeMM / 60
                                    targettedTimeMM = targettedTimeMM % 60
                                }
                                targettedTime = String(targettedTimeHH) + ":" + String(targettedTimeMM);
                                if (targettedTime[1] == ":")
                                    targettedTime = '0' + targettedTime
                                if (targettedTime.substring(3).length != 2)
                                    targettedTime = targettedTime.substring(0, 2) + ":" + "0" + targettedTime[3]
                                // console.log("Time", targettedTime);
                                if (currentTime > targettedTime && date == currentDate) {
                                    val[4] = "Done"
                                    // console.log("Done", val)
                                    Time = val[0]
                                    TaskTitle = val[1]
                                    Task_Description = val[2]
                                    Priority = val[3]
                                    Target = val[5]
                                    TaskDetails = []
                                    var RemainingList = AllDetails.filter((item) => item != [val[0], val[1], val[2], val[3], "Todo", val[5]]);
                                    RemainingList.push([val[0], val[1], val[2], val[3], val[4], val[5]]);
                                    AsyncStorage.setItem(`${date}Done`, JSON.stringify(RemainingList));
                                    // console.log("DL", DoneList);
                                    DoneList.push([date, val[0], val[1], val[2], val[3], val[4], val[5]]);
                                    AsyncStorage.setItem("Done", JSON.stringify(DoneList));
                                    setCount(count - 1);
                                }
                                else if (val[0] <= currentTime && currentTime < targettedTime && date == currentDate) {
                                    val[4] = "In Progress"
                                    // console.log("In Prog", val)
                                    Time = val[0]
                                    TaskTitle = val[1]
                                    Task_Description = val[2]
                                    Priority = val[3]
                                    Target = val[5]
                                    TaskDetails = []
                                    setCount(count - 1)
                                    saveTodo(val[4]);
                                }
                                else {
                                    items += 1;
                                    return <TouchableOpacity key={`#${Math.random()}`} onPress={() => { setStateDetails(true); valuesets = []; setDatas(val); items -= 1 }}>
                                        <View style={{ marginTop: 20, marginBottom: -10, ...styles.todoHeader }}>
                                            <Text key={Math.random()} style={{ paddingTop: 12, ...styles.slno }}>#{items}</Text>

                                            <Text key={Math.random()} style={{ paddingTop: 12, textDecorationLine: 'underline', ...styles.todoHeaderTitles }}>{val[0]}</Text>

                                            <Text key={Math.random()} style={{ paddingTop: 12, textDecorationLine: 'underline', ...styles.todoHeaderTitles }}>{val[1]}</Text>

                                            <Text key={Math.random()} style={{ paddingTop: 12, textDecorationLine: 'underline', ...styles.todoHeaderTitles }}>{val[3]}</Text>

                                            <Text key={Math.random()} style={{ paddingTop: 12, textDecorationLine: 'underline', ...styles.todoHeaderTitles }}>{val[5]}</Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                            }
                        }

                    })
                    }
                </ScrollView>
                <TouchableOpacity onPress={() => { let c = 0; AllDetails.forEach(res => c += 1); AllDet.forEach(res => c += 1); if (c != 0) setStateModal(true); else { let userD = userDate.filter(item => item != date); AsyncStorage.setItem("Date", JSON.stringify(userD)) } }}>
                    <View style={styles.addIcon}>
                        <AntDesign name='plus' size={40} color='#000000' />
                    </View>
                </TouchableOpacity>
                <Modal
                    transparent={true}
                    visible={stateModal}>
                    <View
                        style={styles.Modal}>

                        <ScrollView>

                            <TextInput style={styles.ModalText} placeholder='Enter Time in HH:MM.....' placeholderTextColor="#8DB6D9" onChangeText={(val) => { if (val != '' && val.charAt(2) == ':' && val.length == 5) { Time = val } }} />


                            <TextInput style={styles.ModalText} placeholder='Enter Task Title.....' placeholderTextColor="#8DB6D9" onChangeText={(val) => { TaskTitle = val }} />


                            <TextInput style={styles.ModalText} placeholder='Enter Task Description.....' placeholderTextColor="#8DB6D9" onChangeText={(val) => { Task_Description = val }} />


                            <TextInput style={styles.ModalText} placeholder='Enter Priority High|Medium|Low.....' placeholderTextColor="#8DB6D9" onChangeText={(val) => { Priority = val }} />


                            <TextInput style={styles.ModalText} placeholder='Enter Target of Completion in HH.....' keyboardType='numeric' placeholderTextColor="#8DB6D9" onChangeText={(val) => { if (val != '' && isNaN(val) == false) Target = parseInt(val); else Alert.alert("Error!", "Enter valid target entries format in hours") }} />
                            <TextInput style={styles.ModalText} placeholder='Remind me before in Min.....' keyboardType='numeric' placeholderTextColor="#8DB6D9" onChangeText={(val) => { if ((val != '' || val != ' ') && isNaN(val) == false) remind = parseInt(val); else Alert.alert("Error!", "Enter valid reminder format in Min ") }} />
                        </ScrollView>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity onPress={() => saveTodo("Todo")}>
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
            </View>
            <Modal transparent={true} visible={stateDetails}>
                <View style={styles.detailsPane}>
                    <TouchableOpacity onPress={() => { setStateDetails(false) }}>
                        <View style={styles.cross}>
                            <Entypo name="cross" size={30}
                                color="red" />
                        </View>
                        <TouchableOpacity onPress={() => {
                            Alert.alert(
                                "Confirm",
                                "Are You Sure to delete",
                                [
                                    {
                                        text: "Yes",
                                        onPress: () => {
                                            setStateDetails(false); valuesets = []; var _ = AllDetails.splice(keyPressed, 1); AsyncStorage.setItem(date, JSON.stringify(AllDetails)); setCount(count - 1); items -= 1; PushNotification.cancelLocalNotification(String(date) + String(_[0]));;
                                        },
                                        style: "destructive",
                                    },
                                ],
                                {
                                    cancelable: true,
                                    onDismiss: () =>

                                        setStateDetails(true)
                                }
                            );
                            // setStateDetails(false); valuesets = []; console.log(keyPressed); var _ = AllDetails.splice(keyPressed, 1); console.log("Val Received", _); AsyncStorage.setItem(date, JSON.stringify(AllDetails)); setCount(count - 1); items -= 1;
                        }}>
                            <View style={styles.trash}>
                                <MaterialCommunityIcons name="trash-can-outline" size={30}
                                    color="red" />
                            </View>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <View>
                        <View>
                            {datasets.map((value, index) => {
                                if (index == 4) index += 1
                                if (valuesets[index] != undefined)
                                    return <Text key={Math.random()} style={{ padding: 3, ...styles.detailsPaneText }}>{value + "" + valuesets[index] + '\n'}</Text>
                                else
                                    return <Text key={Math.random()} style={{ paddingTop: 3, ...styles.detailsPaneText }}>{"Problem in Showing " + value + '\n'}</Text>

                            })}
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={{ height: 50, position: 'relative', marginTop: windowHeight / 1.9, marginHorizontal: 5 }}>
                <TouchableOpacity onPress={removeTodo}>
                    <View style={styles.buttonViewDone}>
                        <Text style={styles.buttonDoneText}>
                            Remove All Todo
                        </Text>
                        <View style={styles.removeAllIcon}>
                            <MaterialCommunityIcons name='clock-remove-outline' size={30} color='#03CAD9' />
                        </View>
                    </View>
                </TouchableOpacity>
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
    },
    todoView: {
        position: 'absolute',
        flex: 1,
        backgroundColor: '#124267',
        width: windowWidth,
        minHeight: 60,
        maxHeight: windowHeight / 2.25,
        marginTop: 310,
        marginBottom: 90,
        borderRadius: 12,
        elevation: 40
    },
    textHeader: {
        color: 'white',
        fontFamily: 'serif',
        fontWeight: 'bold',
        fontSize: 25,
        marginLeft: 10,
        padding: 10
    },
    addIcon: {
        width: 55,
        height: 56,
        borderRadius: 22.5,
        backgroundColor: '#03CAD9',
        position: 'absolute',
        marginTop: -26,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    headerDivider: {
        borderBottomColor: 'white',
        borderBottomWidth: 0.4,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 40
    },
    Count: {
        width: 80,
        height: 25,
        borderRadius: 30,
        backgroundColor: '#03CAD9',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginLeft: 190
    },
    todoHeader: {
        paddingTop: 10,
        flex: 1,
        flexDirection: 'row',
        marginLeft: 70
    },
    todoHeaderTitles: {
        // marginLeft: 50,
        // backgroundColor: 'red',
        width: 70,
        maxWidth: 70,
        maxHeight: windowHeight / 25,
        position: 'relative',
        color: 'white',
        paddingLeft: 16,
        paddingBottom: 0.9,
        marginTop: -40,
        marginBottom: 30,
        marginRight: 8
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
    slno: {
        color: '#03CAD9',
        position: 'relative',
        marginLeft: -17,
        marginBottom: 30,
        marginTop: -39,
    },
    scrollviewTodo: {
        minHeight: 0,
        maxHeight: 50,
        padding: 2
    },
    detailsPane: {
        position: 'relative',
        marginTop: windowHeight / 3,
        width: windowWidth / 1.2,
        alignSelf: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        backgroundColor: '#124267',
        height: windowHeight / 3,
        borderRadius: 20,
        borderWidth: 1.4,
        borderColor: '#03CAD9',
        elevation: 40
    },
    detailsPaneText: {
        color: 'white',
        fontFamily: 'serif',
        fontSize: 15,
    },
    trash: {
        paddingTop: 10,
        position: 'relative',
        marginLeft: windowWidth / 1.5,
        marginTop: -windowHeight / 50
    },
    cross: {
        paddingTop: 10,
        position: 'relative',
        marginLeft: windowWidth / 1.5,
        marginTop: -windowHeight / 270

    },
    buttonViewDone: {
        position: 'relative',
        flexDirection: 'row',
        elevation: 100,
        shadowOffset: 30,
        shadowColor: '#000000',
        shadowOpacity: 20,
        borderRadius: 25,
        shadowRadius: 20,
        borderWidth: 1.5,
        borderColor: "#03CAD9",
        paddingVertical: 9,
        paddingHorizontal: windowWidth / 4.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonDoneText: {
        shadowRadius: 20,
        shadowColor: 'red',
        shadowOpacity: 50,
        elevation: 30,
        color: '#03CAD9',
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontFamily: 'serif',
        fontSize: 15,
        textAlign: 'center',
    },
    removeAllIcon: {
        marginLeft: windowWidth / 3.5,
        marginRight: -90,
        // paddingRight: 20
    }
});
export default Todo;