import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

const Data = (props) => {

    const { item, pressing, LongPressing, index, getColor } = props

    return (
        <>
            <Pressable onPress={() => pressing(item)} onLongPress={() => LongPressing(item)}>
                <View style={{
                    marginHorizontal: 15,
                    borderRadius: 15,
                    backgroundColor: getColor(index),
                    opacity: 0.8,
                    marginVertical: 5,
                    flexDirection: "row"
                }}>
                    <View style={styles.todo_box}>
                        <Text style={{ fontWeight: "900", color: "black", marginBottom: 2, fontSize: 15 }}>{item.Title || item.Todos}</Text>
                        {(item?.Title && item?.Todos) && <Text numberOfLines={1} style={{ color: "black", fontSize: 12 }}>{item.Todos}</Text>}
                        <Text style={{ position: "relative", bottom: -5, fontSize: 12, }}>{item.TimeStamp}</Text>
                    </View>
                </View>
            </Pressable>
        </>
    )
}

export default Data

const styles = StyleSheet.create({
    todo_box: {
        opacity: 0.8,
        padding: 15,
        color: "black"
    },
})