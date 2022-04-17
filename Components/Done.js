import React, { useState } from 'react';
import { View, ScrollView, Text, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Done = ({ route }) => {
    const date = route.params.date;
    const getItems = (val) => {
        const data = JSON.parse(val);
        let Done = []
        if (date == "All") {
            if (data != null) {
                data.splice(0, 1);
                data.forEach(val => {
                    if (val[5] == 'Done') {
                        Done.push(val)
                    }
                })
            }
        } else {
            if (data != null)
                data.map(val => {
                    if (val[4] == 'Done') {
                        Done.push(val)
                    }
                })
            Done.pop();
        }
        return Done
    };
    const [DoneDetails, setDoneDetails] = useState(async () => [await AsyncStorage.getItem(`${date == "All" ? "Done" : String(date).concat("Done")}`).then((val) => { setDoneDetails(getItems(val)); setCount(getItems(val).length); })]);
    const [count, setCount] = useState(0);
    var items = 0;
    var donelist = DoneDetails;

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
        width: windowWidth / 1.785,
        height: windowHeight / 3.59,
        borderRadius: windowWidth / 3.4,
        marginTop: -windowHeight / 3.45,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#03CAD9',
        backgroundColor: '#124267'
    },
    headMid: {
        position: 'relative',
        width: windowWidth / 1.6363,
        height: windowHeight / 3.29,
        borderRadius: windowWidth / 3.2,
        marginTop: -windowHeight / 3.17,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#03CAD9',
        backgroundColor: '#124267'
    },
    headOuter: {
        position: 'relative',
        width: windowWidth / 1.522,
        height: windowHeight / 3.04,
        borderRadius: windowWidth / 3.044,
        marginTop: windowHeight / 39.56,
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
        marginLeft: windowWidth / 41.42,
        padding: windowWidth / 41.42
    },
    addIcon: {
        width: windowWidth / 7.480,
        height: windowHeight / 15.2244,
        borderRadius: windowHeight / 37.81,
        backgroundColor: '#03CAD9',
        position: 'absolute',
        marginTop: -windowHeight / 32.79,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    headerDivider: {
        borderBottomColor: 'white',
        borderBottomWidth: 0.4,
        marginLeft: windowWidth / 20.57,
        marginRight: windowWidth / 20.57,
        marginBottom: windowWidth / 10.289
    },
    Count: {
        width: windowWidth / 5.184,
        height: windowHeight / 34.10,
        borderRadius: 30,
        backgroundColor: '#03CAD9',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginLeft: windowWidth / 2.1654
    },
    todoHeader: {
        paddingTop: windowHeight / 85.257,
        flex: 1,
        flexDirection: 'row',
        marginLeft: windowWidth / 5.877
    },
    todoHeaderTitles: {
        width: windowWidth / 5.8775,
        maxWidth: windowWidth / 5.8775,
        maxHeight: windowHeight / 25,
        position: 'relative',
        color: 'white',
        paddingLeft: windowWidth / 25.71,
        paddingBottom: windowWidth / 457.14,
        marginTop: -windowHeight / 21.314,
        marginBottom: windowHeight / 21.4890,
        marginRight: windowWidth / 51.42
    },
    slno: {
        color: '#03CAD9',
        position: 'relative',
        marginLeft: -windowWidth / 24.20,
        marginBottom: windowHeight / 28.419,
        marginTop: -windowHeight / 21.860,
    },
});
export default Done;