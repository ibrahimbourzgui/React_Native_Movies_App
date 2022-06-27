import React,{useState} from "react";
import { TouchableOpacity,StyleSheet,Animated,Easing } from "react-native";
import colors from "../constants/colors";

const containerStyle =(size,isActive) =>({
    backgroundColor:isActive ? colors.DEFAULT_GREEN : colors.DEFAULT_GREY,
    height:32 * size,
    width:64 * size,
    borderRadius:32,
    padding:4 * size
});

const toggleStyle= (size,AnimatedValue) => ({
    height:24 * size,
    width:24 * size,
    backgroundColor:colors.WHITE,
    borderRadius:32,
    transform:[
        {
            translateX: AnimatedValue
        }
    ]
});

const ToggleButton =({size}) =>{
    const [isActive,setIsActive] = useState(false)
    const [AnimatedValue,setAnimatedValue] =useState(new Animated.Value(0))
    const toggleHandle = () =>{
        Animated.timing(AnimatedValue,{
            toValue:isActive ? 0 : 32 * size,
            duration:250,
            easing:Easing.bounce,
            delay:0,
            useNativeDriver:true
        }).start();
    setIsActive(!isActive);
    }
return(
    <TouchableOpacity 
        style={containerStyle(size,isActive)} 
        onPress={() => toggleHandle()}
        activeOpacity={0.8}
    >
        <Animated.View style={toggleStyle(size,AnimatedValue)}/>
    </TouchableOpacity>
);
};

export default ToggleButton;