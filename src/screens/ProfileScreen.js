
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeProfile from './HomeProfile';
import Singin from './Singin';
import Singup from './Singup';
const RockStack=createStackNavigator();
const ProfileScreen = () => {

    return (
            <NavigationContainer independent={true} options={{headerShown:false}}>
                    <RockStack.Navigator options={{headerShown:false}}>
                        <RockStack.Screen name='Singin' component={Singin} options={{headerShown:false}}/>
                        <RockStack.Screen name='Singup' component={Singup} options={{headerShown:false}}/>
                        <RockStack.Screen name='HomeProfile' component={HomeProfile} options={{headerShown:false}}/>
                    </RockStack.Navigator>
            </NavigationContainer>
       
       
    );
}

export default ProfileScreen