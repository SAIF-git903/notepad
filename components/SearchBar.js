import { StyleSheet, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import Feather from "react-native-vector-icons/Feather"

const SearchBar = (props) => {

    const { SearchTodo } = props
    const [search, setSearch] = useState("")

    return (
        <View style={styles.textView}>
            <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder='Search notes'
                onChangeText={(text) => {
                    setSearch(text)
                    SearchTodo(search)
                }}
            />
            <Feather
                name='search'
                size={20}
                color="#C8C8C8"
                style={{ marginLeft: 15, marginTop: 10, position: "absolute" }} />
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    textView: {
        width: '90%',
        marginLeft: 20,
        marginTop: 15,
        flexDirection: "row"
    },
    textInput: {
        backgroundColor: '#eee',
        borderRadius: 25,
        paddingLeft: 20,
        height: 40,
        fontSize: 15,
        marginBottom: 15,
        width: "100%",
        paddingLeft: 45
    },
})