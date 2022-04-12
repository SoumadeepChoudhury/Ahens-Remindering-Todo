import React, { useState } from 'react';
import { View, ScrollView, Text, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Done = ({ route }) => {
    const date = route.params.date;
    const getItems = (val) => {
        const data = JSON.parse(val);
        ("Data", data);
        let Done = []
        if (date == "All") {
            if (data != null) {
                data.splice(0, 1);
                (data[0]);
                data.forEach(val => {
                    ("Source", val);
                    if (val[5] == 'Done') {
                        Done.push(val)
                    }
                })
            }
        } else {
            if (data != null)
                data.map(val => {
                    if (val[4] == 'Done') {
                        (val);
                        Done.push(val)
                    }
                })
            Done.pop();
        }
        ("Finally", Done);
        return Done
    };
    const [DoneDetails, setDoneDetails] = useState(async () => [await AsyncStorage.getItem(`${date == "All" ? "Done" : String(date).concat("Done")}`).then((val) => { setDoneDetails(getItems(val)); setCount(getItems(val).length); })]);
    const [count, setCount] = useState(0);
    var items = 0;
    var donelist = DoneDetails;
    (donelist)
    return (
        <SafeAreaView style={{ backgroundColor: '#124267', height: windowHeight, width: windowWidth }}>
            <View style={styles.headOuter}></View>
            <View style={styles.headMid}></View>
            <View style={styles.headInner}>
                <Text style={styles.headText}>DONE</Text>
            </View>
            <View style={styles.todoView}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.textHeader}>
                        Done
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
                    {Object.values(donelist).map(val => {

                        if (val != 0 && val != undefined && val != null) {
                            items += 1;
                            // var targettedTime = parseInt(val[0].substring(0, 2)) * 60 + parseInt(val[0].substring(3, 5)) + parseInt(val[5]) * 60
                            // var targettedTimeHH = Math.trunc(targettedTime / 60)
                            // var targettedTimeMM = Math.trunc(targettedTime % 60)
                            // if (targettedTimeMM > 60) {
                            //     targettedTimeHH += targettedTimeMM / 60
                            //     targettedTimeMM = targettedTimeMM % 60
                            // }
                            // targettedTime = String(targettedTimeHH) + ":" + String(targettedTimeMM);
                            // if (currentTime > targettedTime && date == currentDate) {
                            //     ("Done", val)
                            //     val[4] = "Done"
                            //     Time = val[0]
                            //     TaskTitle = val[1]
                            //     Task_Description = val[2]
                            //     Priority = val[3]
                            //     Target = val[5]
                            //     TaskDetails = []
                            //     var RemainingList = AllDetails.filter((item) => item != [val[0], val[1], val[2], val[3], "Todo", val[5]]);
                            //     RemainingList.push([val[0], val[1], val[2], val[3], val[4], val[5]]);
                            //     AsyncStorage.setItem(`${date}`, JSON.stringify(RemainingList));
                            //     DoneList.push([val[0], val[1], val[2], val[3], val[4], val[5]]);
                            //     AsyncStorage.setItem("Done", JSON.stringify(DoneList));
                            //     setCount(count - 1);
                            // }
                            // else
                            return <View key={`#${items}`} style={{ marginTop: 20, marginBottom: -10, ...styles.todoHeader }}>
                                <Text style={date == "All" ? { paddingTop: 12, ...styles.slno, marginLeft: -65 } : { paddingTop: 12, ...styles.slno }}>#{date == "All" ? val[0].substring(2) : items}</Text>
                                <Text style={{ paddingTop: 12, textDecorationLine: 'underline', ...styles.todoHeaderTitles }}>{date == "All" ? val[1] : val[0]}</Text>
                                <Text style={{ paddingTop: 12, textDecorationLine: 'underline', ...styles.todoHeaderTitles }}>{date == "All" ? val[2] : val[1]}</Text>
                                <Text style={{ paddingTop: 12, textDecorationLine: 'underline', ...styles.todoHeaderTitles }}>{date == "All" ? val[4] : val[3]}</Text>
                                <Text style={{ paddingTop: 12, textDecorationLine: 'underline', ...styles.todoHeaderTitles }}>{date == "All" ? val[6] : val[5]}</Text>
                            </View>

                        }

                    })
                    }
                </ScrollView>
            </View >
        </SafeAreaView >
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
    }, todoView: {
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
        marginLeft: 180
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
    slno: {
        color: '#03CAD9',
        position: 'relative',
        marginLeft: -17,
        marginBottom: 30,
        marginTop: -39,
    },
});
export default Done;