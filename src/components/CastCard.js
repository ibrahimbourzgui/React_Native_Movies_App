import React from 'react';
import {View,StyleSheet,Text,Image} from 'react-native';
import { getPoster } from '../services/MovieService';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import Images from '../constants/Images';
const CastCard = ({originalName,image,characterName}) =>{
    return(
        <View style={styles.container}>
            <Image 
                source={image ? {uri:getPoster(image)} : Images.NO_IMAGE}
                 resizeMode={image ? 'cover' : 'contain'}
                 style={styles.image}
                 />
            <Text style={styles.originalName} numberOfLines={2}>{originalName}</Text>
            <Text style={styles.characterName} numberOfLines={2}>{characterName}</Text>
        </View>
    );
}

const styles=StyleSheet.create({
    container:{
        flex:1,
       
        
    },
    image:{
        height:120,
        width:80,
        borderRadius:10,
    },
    originalName:{
        width:80,
        color:colors.BLACK,
        fontFamily:fonts.BOLD,
        fontSize:12,

    },
    characterName:{
        width:80,
        color:colors.LIGHT_GRAY,
        fontFamily:fonts.BOLD,
        fontSize:12
    }

})

export default CastCard
