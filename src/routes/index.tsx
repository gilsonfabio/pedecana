import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '../pages/Welcome';
import SignIn from '../pages/SignIn';
import Produtos from '../pages/Produtos';
import Detalhes from '../pages/Detalhes';
import CarShopping from '../pages/CarShopping';

type navigationProps = {
    Welcome: undefined;
    SignIn: undefined;
    Produtos: undefined;
    Detalhes: {proId: number} | undefined;
    CarShopping: {carId: number} | undefined;
}

const Stack = createNativeStackNavigator<navigationProps>();

export default function Routes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Welcome" component={Welcome} options={{headerShown:false}}/>
            <Stack.Screen name="SignIn" component={SignIn} options={{headerShown:false}}/>                      
            <Stack.Screen name="Produtos" component={Produtos} options={{headerShown:false}}/>
            <Stack.Screen name="Detalhes" component={Detalhes} options={{headerShown:false}} />
            <Stack.Screen name="CarShopping" component={CarShopping} options={{headerShown:false}} />
        </Stack.Navigator>
    )
}
