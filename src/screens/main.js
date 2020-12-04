import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Note from './note'
import firebase from '../config/firebase'

export default function Main() {


  

    const [noteArray, setArray] = useState([]);
    const [noteText, setNote] = useState("");
    const [count, setCount] = useState(0);

    let notes = noteArray.map((val, key) => {
        return <Note key={key} keyval={key} val={val} deleteMethod={() => deleteNote(key)}
        />
    })

    const addTask = () => {
        if (noteText) {
            var date = new Date();
            let newArray = {
                'date': date.getFullYear() +
                    '/' + (date.getMonth() + 1) +
                    '/' + date.getDate(),
                'note': noteText,
            }
            noteArray.push(newArray); 
        }
        
        setNote("")
    }

    const deleteNote = (key) => {
        noteArray.splice(key, 1);
        setCount(count+1);
    }


    return (



        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerText}>Todo App</Text>
            </View>


            <ScrollView style={styles.scrollContainer}>
                {notes}
            </ScrollView>


            <View style={styles.footer}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => setNote(text)}
                    value={noteText}
                    placeholder='Enter Your todo...'
                    placeholderTextColor="white"
                    underlineColorAndroid='transparent'
                ></TextInput>
            </View>

            <TouchableOpacity onPress={() => addTask()} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>




        </View>
    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#E91E63',
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 10,
        borderBottomColor: "#ddd",
    },
    headerText: {
        color: "white",
        fontSize: 20,
        padding: 26,
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100
    },
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10
    },
    textInput: {
        alignSelf: "stretch",
        color: "#fff",
        padding: 20,
        backgroundColor: "#252525",
        borderTopWidth: 2,
        borderTopColor: "#ededed",
    },
    addButton: {
        position: "absolute",
        zIndex: 11,
        right: 10,
        bottom: 80,
        backgroundColor: "#E91E63",
        width: 70,
        height: 70,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        elevation: 8,
    },
    addButtonText: {
        color: "#fff",
        fontSize: 24
    }


});
