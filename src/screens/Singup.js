import React,{useState} from "react";
import { TouchableOpacity,StyleSheet,Text,StatusBar,View,Dimensions,TextInput} from "react-native";
import ItemSeparator from '../components/ItemSeparator';
import { Ionicons,Feather } from "@expo/vector-icons";
import colors from "../constants/colors";
import fonts from "../constants/fonts";
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { auth } from "../constants/firebase_config";
import { db } from "../constants/firebase_config";
const {height,width}=Dimensions.get("screen");

const setHeight = (h) => (height/100) * h;
const setwidth = (w) => (width/100) * w;

const Singup =({navigation}) =>{

const [isPasswordShow,setPasswordShow] = useState(false);
const [email,setEmail]= useState('');
const [password,setPassword]= useState('');
const [usr,setUsr] = useState('');

const AddUsr=()=> {
    
    db.collection('Users').add({
        Email:email,
        Password:password,
        UserName:usr
    })
    .then(() => {
      alert(
        'insertion complete');
        setEmail('');
         setPassword('');
         setUsr('');
         
      
    }).catch((err) => console.log(err));
      
}



return(
    <View style={styles.container}>
    <StatusBar barStyle='dark-content' backgroundColor={colors.WHITE} translucent />
    <ItemSeparator height={StatusBar.currentHeight}/>
    <View style={styles.headercontainer}>
        <Ionicons name='chevron-back-outline' size={30} onPress={() => navigation.goBack()}/>
        <Text style={styles.headerTitle}>Inscription</Text>
    </View>
    <Text style={styles.title}>Creer un Compte</Text>
    <Text style={styles.content}>Entrer votre Email,choisie votre Nom d'utilisateur et votre Mot de pass</Text>
            <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="mail"
            size={22}
            color={colors.DEFAULT_GREY}
           
          />
          <TextInput
          placeholder='Entrer votre Email'
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor={colors.DEFAULT_GREY}
          selectionColor={colors.DEFAULT_RED}
          style={styles.inputText}
          />
        </View>
      </View>
      <ItemSeparator height={15}/>
            <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="user"
            size={22}
            color={colors.DEFAULT_GREY}
           
          />
          <TextInput
          placeholder='Entrer votre nom dutulisateur'
          value={usr}
          onChangeText={(text) => setUsr(text)}
          placeholderTextColor={colors.DEFAULT_GREY}
          selectionColor={colors.DEFAULT_RED}
          style={styles.inputText}
          />
        </View>
      </View>
      <ItemSeparator height={15}/>
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                    <Feather
                        name='lock'
                        size={22}
                        color={colors.DEFAULT_GREY}
                    />
                    <TextInput
                        secureTextEntry={isPasswordShow ? false : true}
                        placeholder='Entrer votre Mot De Pass'
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholderTextColor={colors.DEFAULT_GREY}
                        selectionColor={colors.DEFAULT_RED}
                        style={styles.inputText}
                    />
                    <Feather
                        name={isPasswordShow ? 'eye' : 'eye-off'}
                        size={22}
                        color={colors.DEFAULT_GREY}
                        onPress={() => setPasswordShow(!isPasswordShow)}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.singinButton} onPress={AddUsr}>
                <Text style={styles.singinButtonText} >Inscrire</Text>
            </TouchableOpacity>
    </View>

);
};

export default Singup;

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.WHITE,
    },
    headercontainer:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:10,
        paddingHorizontal:20,
    },
    headerTitle:{
        fontSize:20,
        fontFamily:fonts.EXTRA_BOLD,
        lineHeight: 20 * 1.4,
        width:setwidth(80),
        textAlign:'center',
    },
    title:{
        fontSize:20,
        fontFamily:fonts.SEMI_BOLD,
        lineHeight: 20 * 1.4,
        marginTop:50,
        marginBottom:10,
        marginHorizontal:20,

    },
    content:{
        fontSize:20,
        fontFamily:fonts.SEMI_BOLD,
        marginTop:10,
        marginBottom:20,
        marginHorizontal:20,
    },
    inputContainer: {
        backgroundColor: colors.LIGHT_GREY,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: colors.LIGHT_GREY2,
        justifyContent: 'center',
      },
      inputSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      inputText:{
          fontSize:16,
          textAlignVertical:'center',
          padding:0,
          height:setHeight(5.5),
          color:colors.DEFAULT_BLACK,
          flex:1
      },
      singinButton:{
        backgroundColor:colors.DEFAULT_GREEN,
        borderRadius:8,
        marginHorizontal:20,
        height:setHeight(6),
        justifyContent:'center',
        alignItems:'center',
        marginTop:20
    },
    singinButtonText:{
      fontSize:18,
      lineHeight:18 * 1.4,
      color:colors.WHITE,
      fontFamily:fonts.REGULAR
    },

})