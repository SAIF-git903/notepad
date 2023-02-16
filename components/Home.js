import React, { useState, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Pressable, FlatList, Alert } from 'react-native';
import ModalInput from './ModalInput';
import { collection, onSnapshot, query, orderBy, doc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase';
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import Data from './Data';
import SearchBar from './SearchBar';
import 'firebase/database';

const Home = () => {

    const [modal, setModal] = useState(false)
    const [todos, setTodos] = useState([])
    const [date, setDate] = useState()
    const [search, setSearch] = useState(null)
    const navigation = useNavigation()

    const colors = ['rgba(46, 204, 113, 0.18)', 'rgba(243, 225, 107,0.23)', 'rgba(72, 113, 247,0.12)', "rgba(231, 109, 137,0.14)", 'rgba(236, 217, 221, 1)'];
    var timeStamp = moment().format('MMMM D, YYYY h:mm A');

    function getColor(index) {
        return colors[index % colors.length]
    }

    function handleModal() {
        setDate(timeStamp)
        setModal(!modal)
    }

    const colRef = query(collection(db, "data"), orderBy("TimeStamp", "desc"))

    useLayoutEffect(() => {
        onSnapshot(colRef, (snapshot) => {
            const jsonData = snapshot.docs?.map(doc => ({ ...doc.data(), id: doc.id }));
            setTodos(jsonData)
        })
    }, [])


    function pressing(item) {
        navigation.navigate("Modal", {
            item
        })
    }


    const LongPressing = (item) => {
        if (item.id) {
            Alert.alert("", `𝗗𝗲𝗹𝗲𝘁𝗲 𝗱𝗼𝗰𝘂𝗺𝗲𝗻𝘁 || ${item.Title || item.Todos} ...`, [
                {
                    text: "Cancel",
                    onPress: () => { console.log("canceled...") }
                },
                {
                    text: "Delete",
                    onPress: async () => { await deleteDoc(doc(db, "data", item.id)) }
                },],
                {
                    cancelable: true
                })
        }
    }


    async function SearchTodo(txt) {
        console.log("Running...", txt)
        const renderedData = todos.map(item => item.Title)
        const filteredData = renderedData.filter(item => item.includes(txt))
        console.log(filteredData)
    }


    return (
        <View style={styles.container}>
            <View style={{ marginTop: 45, marginLeft: 17 }}>
                <Text style={styles.Heading}>Notepad</Text>
            </View>
            <SearchBar SearchTodo={SearchTodo} />
            {
                !search ? <FlatList
                    data={todos}
                    renderItem={({ item, index }) => {
                        return (
                            <Data
                                item={item}
                                pressing={pressing}
                                LongPressing={LongPressing}
                                index={index}
                                getColor={getColor} />
                        )
                    }}
                />
                    : <Pressable onPress={() => pressing(search)} onLongPress={() => LongPressing(search)}>
                        <View style={{
                            marginHorizontal: 15,
                            borderRadius: 15,
                            backgroundColor: 'rgba(46, 204, 113, 0.18)',
                            opacity: 0.8,
                            marginVertical: 5,
                            flexDirection: "row"
                        }}>
                            <View style={styles.todo_box}>
                                <Text style={{ fontWeight: "900", color: "black", marginBottom: 2, fontSize: 15 }}>{search.Title || search.Todos}</Text>
                                {(search?.Title && search?.Todos) && <Text numberOfLines={1} style={{ color: "black", fontSize: 12 }}>{search.Todos}</Text>}
                                <Text style={{ position: "relative", bottom: -5, fontSize: 12, }}>{search.TimeStamp}</Text>
                            </View>
                        </View>
                    </Pressable>
            }
            {/* ........................................................... */}
            <Modal
                visible={modal}
                animationType="slide"
                onRequestClose={() =>
                    handleModal()
                }
            >
                <ModalInput
                    handleModal={handleModal}
                    date={date}
                    pressing={pressing} />
            </Modal>
            {/* ........................................................... */}
            <View style={styles.plusView}>
                <TouchableOpacity onPress={handleModal}>
                    <Feather name="plus" size={30} color="#fff" style={styles.plusIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: { flex: 1 },
    Heading: {
        fontSize: 30,
        fontWeight: '600',
        color: 'black',
        marginBottom: 18
    },
    plusView: {
        alignItems: "center",
        position: "absolute",
        bottom: 10,
        left: "45%"
    },
    plusIcon: {
        backgroundColor: "#03C03C",
        padding: 10,
        borderRadius: 30,
        marginBottom: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    checkBox: {
        position: "relative",
        left: 120,
        justifyContent: "center"
    },
    todo_box: {
        opacity: 0.8,
        padding: 15,
        color: "black"
    },
})