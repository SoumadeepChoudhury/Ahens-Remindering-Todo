import React, { useState } from 'react';
import { View, ScrollView, Text, SafeAreaView, TouchableOpacity, StyleSheet, Dimensions, Modal } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
var currentTime = String(new Date().getHours()) + ":" + String(new Date().getMinutes())
if (currentTime[1] == ":")
    currentTime = '0' + currentTime
if (currentTime.substring(3).length != 2)
    currentTime = currentTime.substring(0, 2) + "0" + currentTime[4]
var currentDate = String(new Date().getFullYear()) + "-" + String(new Date().getMonth() + 1).padStart(2, '0') + "-" + String(new Date().getDate()).padStart(2, '0');

let datasets = ["Time: ", "Title: ", "Desc: ", "Priority: ", "Target of Completion: "]
let valuesets = []

const Progress = ({ route }) => {
    const date = route.params.date;
    const [stateDetails, setStateDetails] = useState(false);
    const [keyPressed, setKeyPressed] = useState(0);


    const getItems = (val) => {
        const data = JSON.parse(val);
        ("Prog", data);
        let InProg = []
        if (data != null)
            data.map(val => {
                if (val[4] == 'In Progress')
                    InProg.push(val)
            })
        InProg.pop();
        return InProg
    };
    const getDoneItems = (val) => {
        const data = JSON.parse(val);
        if (data != null)
            return data
        else return []
    };
    const [InProg, setInProg] = useState(async () => [await AsyncStorage.getItem(date).then((val) => { setInProg(getItems(val)); setCount(getItems(val).length); })]);
    const [donelist, setDoneList] = useState(async () => [await AsyncStorage.getItem("Done").then((val) => { setDoneList(getDoneItems(val)) })]);
    const [count, setCount] = useState(0);
    // var counts = count
    var AllDetails = InProg;
    var DoneList = [donelist];
    // var TaskDetails = [];
    // var Time = ' '
    // var TaskTitle = ' '
    // var Task_Description = ' '
    // var Priority = ' '
    // var Status = ' '
    // var Target = ' '
    var items = 0;
    // const saveTodo = () => {
    //     if (Time != ' ' && TaskDetails != ' ' && Priority != ' ') {
    //         setStateModal(false);
    //         TaskDetails.push(Time);
    //         TaskDetails.push(TaskTitle);
    //         TaskDetails.push(Task_Description);
    //         TaskDetails.push(Priority);
    //         TaskDetails.push("Todo");
    //         TaskDetails.push(Target);
    //         try {
    //             ('Details before pushing new', AllDetails);
    //             AllDetails.push(TaskDetails);
    //             const InputTaskDetails = JSON.stringify(AllDetails);
    //             AsyncStorage.setItem(`${date}`, InputTaskDetails);
    //             ('Details after pushing new', AllDetails);
    //             counts += 1
    //             Alert.alert('Success', "Successfully added....");
    //         } catch (e) {
    //             Alert.alert("Error", "Something went wrong....Try Again later");
    //         }
    //         Time = TaskDetails = Task_Description = Priority = Status = Target = '';
    //         setCount(counts);
    //     } else {
    //         Alert.alert("Warning!", "Input All Fields...")
    //     }

    // };
    const setDatas = (val) => {
        setKeyPressed(AllDetails.indexOf(val));
        val.map(value => {
            valuesets.push(value);
        })
    }
    return (
        <SafeAreaView style={{ backgroundColor: '#124267', height: windowHeight, width: windowWidth }}>
            <View style={styles.headOuter}></View>
            <View style={styles.headMid}></View>
            <View style={styles.headInner}>
                <Text style={styles.headText}>PROGRESS</Text>
            </View>
            <View style={styles.todoView}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.textHeader}>
                        In Progress
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
                            items += 1;
                            if (val[4] == 'In Progress') {
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
                                        ("Time", targettedTime);
                                if (currentTime > targettedTime && date == currentDate) {
                                    ("Done", val)
                                    val[4] = "Done"
                                    Time = val[0]
                                    TaskTitle = val[1]
                                    Task_Description = val[2]
                                    Priority = val[3]
                                    Target = val[5]
                                    TaskDetails = []
                                    var RemainingList = AllDetails.filter((item) => item != [val[0], val[1], val[2], val[3], "Todo", val[5]]);
                                    RemainingList.push([val[0], val[1], val[2], val[3], val[4], val[5]]);
                                    AsyncStorage.setItem(`${date}Done`, JSON.stringify(RemainingList));
                                    DoneList.push([date, val[0], val[1], val[2], val[3], val[4], val[5]]);
                                    AsyncStorage.setItem("Done", JSON.stringify(DoneList));
                                    setCount(count - 1);
                                }
                                else
                                    return <TouchableOpacity key={items} onPress={() => { setStateDetails(true); valuesets = []; setDatas(val); items -= 1 }}>
                                        <View style={{ marginTop: 20, marginBottom: -10, ...styles.todoHeader }}>
                                            <Text style={{ paddingTop: 12, ...styles.slno }}>#{items}</Text>
                                            <Text style={{ paddingTop: 12, textDecorationLine: 'underline', ...styles.todoHeaderTitles }}>{val[0]}</Text>
                                            <Text style={{ paddingTop: 12, textDecorationLine: 'underline', ...styles.todoHeaderTitles }}>{val[1]}</Text>
                                            <Text style={{ paddingTop: 12, textDecorationLine: 'underline', ...styles.todoHeaderTitles }}>{val[3]}</Text>
                                            <Text style={{ paddingTop: 12, textDecorationLine: 'underline', ...styles.todoHeaderTitles }}>{val[5]}</Text>
                                        </View>
                                    </TouchableOpacity>
                            }
                        }

                    })
                    }
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
                                                    setStateDetails(false); valuesets = []; (keyPressed); var _ = AllDetails.splice(keyPressed, 1); ("Val Received", _); AsyncStorage.setItem(date, JSON.stringify(AllDetails)); setCount(count - 1); items -= 1;
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
                                            return <Text key={index / 2 + 1} style={{ padding: 3, ...styles.detailsPaneText }}>{value + "" + valuesets[index] + '\n'}</Text>
                                        else
                                            return <Text key={index - 1} style={{ paddingTop: 3, ...styles.detailsPaneText }}>{"Problem in Showing " + value + '\n'}</Text>

                                    })}
                                </View>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
                {/* <TouchableOpacity onPress={() => { setStateModal(true) }}>
                    <View style={styles.addIcon}>
                        <AntDesign name='plus' size={40} color='#000000' />
                    </View>
                </TouchableOpacity> */}
                {/* <Modal
                    transparent={true}
                    visible={stateModal}>
                    <View
                        style={styles.Modal}>

                        <ScrollView>

                            <TextInput style={styles.ModalText} placeholder='Enter Time in HH:MM.....' placeholderTextColor="#8DB6D9" onChangeText={(val) => { if (val != '' && val.charAt(2) == ':' && val.length == 5) { Time = val } }} />


                            <TextInput style={styles.ModalText} placeholder='Enter Task Title.....' placeholderTextColor="#8DB6D9" onChangeText={(val) => { TaskTitle = val }} />


                            <TextInput style={styles.ModalText} placeholder='Enter Task Description.....' placeholderTextColor="#8DB6D9" onChangeText={(val) => { Task_Description = val }} />


                            <TextInput style={styles.ModalText} placeholder='Enter Priority.....' placeholderTextColor="#8DB6D9" onChangeText={(val) => { Priority = val }} />


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
                </Modal> */}
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
        marginLeft: 100
    },
    todoHeader: {
        paddingTop: 10,
        flex: 1,
        flexDirection: 'row',
        marginLeft: 70
    },
    todoHeaderTitles: {
        // marginLeft: 50,
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
});
export default Progress;