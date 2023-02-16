import React, { useRef, useEffect, useState } from 'react'
import { Text, View, StyleSheet, TextInput, Keyboard, Pressable } from 'react-native'
import { addDoc, collection, doc, setDoc } from "firebase/firestore"
import { useNavigation } from '@react-navigation/native'
import { db } from '../firebase'
import Ionicons from "react-native-vector-icons/Ionicons"
import Feather from "react-native-vector-icons/Feather"


function ModalInput(props) {

    const { date, handleModal, route } = props

    const textInputRef = useRef()
    const navigation = useNavigation()
    const [title, setTitle] = useState()
    const [todos, setTodos] = useState()
    const [focus, setFocus] = useState(false);
    const [check, setCheck] = useState(false)
    //.....................................//

    async function create() {
        Keyboard.dismiss()
        setCheck(false)

        if (route?.params.item.id) {
            await setDoc(doc(db, "data", route?.params.item.id), {
                Title: title ? title : route?.params.item.Title,
                Todos: todos ? todos : route?.params.item.todos,
                TimeStamp: date ? date : route?.params.item.TimeStamp
            });
        } else {
            await addDoc(collection(db, "data"), {
                Title: title ? title : null,
                Todos: todos ? todos : null,
                TimeStamp: date,
            })
        }
    }

    useEffect(() => {
        setTimeout(() => {
            textInputRef.current.focus()
            setFocus(true)
        }, 50);
    }, [])


    return (
        <>
            <View style={styles.container}>
                <View style={{ flexDirection: "row", marginLeft: -10 }}>
                    <Pressable onPress={handleModal ? handleModal : () => navigation.navigate("Home")} style={({ pressed }) => [
                        { backgroundColor: pressed ? "#eee" : "white", borderRadius: 40, padding: 5 }
                    ]}>
                        <Ionicons name='arrow-back' size={29} color="#03C03C" />
                    </Pressable>
                    <Text style={styles.heading}>Note</Text>
                    <View style={{ position: "absolute", right: 0 }}>
                        <Pressable onPress={create}>
                            {check && <Feather name='check' size={30} color="#03C03C" style={{ justifyContent: "flex-end" }} />}
                        </Pressable>
                    </View>
                </View>
                <View>
                    <Text style={styles.date}>{date ? date : route?.params.item.TimeStamp}</Text>
                </View>
                <View style={styles.mainTextView}>
                    <TextInput placeholder='Title'
                        style={styles.textInput}
                        autoCapitalize="none"
                        defaultValue={route?.params.item.Title}
                        onChangeText={(title) => {
                            setTitle(title)
                            if (!title) {
                                setCheck(false)
                            } else {
                                setCheck(true)
                            }
                        }}
                    />
                </View>
                <View style={{ flexDirection: "row" }}>
                    <TextInput
                        placeholder='Note something down'
                        style={{ fontSize: 15 }}
                        ref={textInputRef}
                        defaultValue={route?.params.item.Todos}
                        autoCapitalize="none"
                        autoFocus={focus}
                        multiline={true}
                        onChangeText={(todos) => {
                            setTodos(todos)
                            if (!todos) {
                                setCheck(false)
                            } else {
                                setCheck(true)
                            }
                        }}
                    />
                </View>
            </View>
        </>
    )
}


export default ModalInput


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20
    },
    heading: {
        fontSize: 20,
        fontWeight: "800",
        color: "black",
        marginLeft: 10,
        marginTop: 5,
    },
    date: {
        marginTop: 25,
        fontSize: 16,
        color: "black"
    },
    textInput: {
        fontSize: 20,
        fontWeight: "800"
    },
    mainTextView: {
        marginTop: 10
    },
    navigation_bottom: {
        backgroundColor: "#eee",
        width: "100%",
        height: 50,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    iconTxt: {
        left: -10,
        fontSize: 12,
        color: "black",
        marginTop: 5
    }
})
