import React from "react";
import COLORS from "../constants/colors";
import {TouchableOpacity, View, Text, StyleSheet, Dimensions} from 'react-native';
import fonts from "../constants/fonts";


const { width } = Dimensions.get("screen");

const setWidth = (w) => (width / 100) * w;

const GenreCard = ({genreName, active, onPress}) => {
    return (
    <TouchableOpacity
        style={{...styles.container,
            backgroundColor: active ? COLORS.ACTIVE : COLORS.WHITE}}
            
            onPress={() => onPress(genreName)}
        >
        <Text style={{...styles.genreText, color: active? COLORS.WHITE : COLORS.BLACK}}>
            {genreName}
        </Text>
    </TouchableOpacity>
    );
};

    const styles = StyleSheet.create({
        container: 
        {
            flex:1,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            backgroundColor: COLORS.WHITE,
            paddingVertical: 8,
            elevation: 3,
            marginVertical: 2,
            width: setWidth(25),
        },
        genreText: 
        {
            fontSize:13,
            color:COLORS.ACTIVE,
            fontFamily:fonts.BOLD
        }
    });

export default GenreCard