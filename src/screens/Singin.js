import react,{useState,useEffect} from 'react';
import { StyleSheet,View,Text,TextInput,TouchableOpacity,StatusBar,Dimensions} from 'react-native';
import ItemSeparator from '../components/ItemSeparator';
import { Ionicons,Feather } from "@expo/vector-icons";
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import ToggleButton from '../components/ToggleButton';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db,auth, db2 } from '../constants/firebase_config';
import { useNavigation } from '@react-navigation/core';
import HomeProfile from './HomeProfile';


const {height,width}=Dimensions.get("screen");
const setHeight = (h) => (height/100) * h;
const setwidth = (w) => (width/100) * w;
const Singin = () => {
    
    const navigation=useNavigation();
    const [isPasswordShow,setPasswordShow] = useState(false);
    //const auth = getAuth();
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState(''); 
    
    const handleLogin  = async () => {
        db.collection('Users').where("Email","==",email).get().then((data) =>  {
            for(let i=0;i<data.docs.length;i++){
                //console.log(data.docs[i].data());
                setUser(data.docs[i].data());
                break;
            }
          });
    } 
   const [user,setUser]= useState(null)
    return (
        user===null?

        <View style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor={colors.WHITE} translucent/>
            <ItemSeparator height={StatusBar.currentHeight}/>
            <View style={styles.headercontainer}>
                <Text style={styles.headerTitle}>s'identifier</Text>
            </View>
            <Text style={styles.title}>Bienvenue</Text>
            <Text style={styles.content}>Entrer votre Email et votre Mot de pass</Text>
            <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="user"
            size={22}
            color={colors.DEFAULT_GREY}
           
          />
          <TextInput
          placeholder='Entrer votre Email'
          placeholderTextColor={colors.DEFAULT_GREY}
          selectionColor={colors.DEFAULT_RED}
          style={styles.inputText}
          value={email}
          onChangeText={(text) => setEmail(text)}
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
                        placeholderTextColor={colors.DEFAULT_GREY}
                        selectionColor={colors.DEFAULT_RED}
                        style={styles.inputText}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <Feather
                        name={isPasswordShow ? 'eye' : 'eye-off'}
                        size={22}
                        color={colors.DEFAULT_GREY}
                        onPress={() => setPasswordShow(!isPasswordShow)}
                    />
                </View>
            </View>
            <Text></Text>
            <View style={styles.forgotPasswordContainer}>
            <View style={styles.toggleContainer}>
                <ToggleButton size={0.5}/>
                <Text style={styles.rememberMeText}>Se souvenir de moi</Text>
            </View>
            
                <Text style={styles.forgotPasswordText}>mot de passe oublié</Text>
            </View>
            <TouchableOpacity style={styles.singinButton}  onPress={handleLogin}>
                <Text style={styles.singinButtonText}>S'identifier</Text>
            </TouchableOpacity>
            <View style={styles.singupContainer}>
                <Text style={styles.accountText}>Pas de compte ?</Text>
                <Text style={styles.singupText} onPress={() => navigation.navigate('Singup')}>Inscrire Maintenant</Text>
            </View>
        </View>
       :<HomeProfile/>
       
    );
};



const styles = StyleSheet.create({

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
      forgotPasswordContainer:{
          marginHorizontal:20,
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'space-between'
      },
      rememberMeText:{
          marginLeft:10,
          fontSize:14,
          lineHeight:12 * 1.4,
          color:colors.SECONDARY_BLACK,
          fontFamily:fonts.EXTRA_BOLD
      },
      forgotPasswordText:{
        fontSize:14,
        lineHeight:14 * 1.4,
        color:colors.DEFAULT_GREEN,
        fontFamily:fonts.BOLD
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
      singupContainer:{
          marginHorizontal:20,
          justifyContent:'center',
          paddingVertical:20,
          flexDirection:'row',
          alignItems:'center'
      },
      accountText:{
        fontSize:14,
        lineHeight:14 * 1.4,
        color:colors.DEFAULT_BLACK,
        fontFamily:fonts.EXTRA_BOLD
      },
      singupText:{
        fontSize:16,
        lineHeight:16 * 1.4,
        color:colors.DEFAULT_GREEN,
        fontFamily:fonts.EXTRA_BOLD,
        marginLeft:6
      },
      toggleContainer:{
          flexDirection:'row',
          alignItems:'center',

      }
    
  




});
export default Singin;