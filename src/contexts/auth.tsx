import React, { useState, createContext} from 'react';
import SignIn from '../pages/SignIn';
import { useNavigation } from '@react-navigation/native';
import api from '../pages/Services/api';

type Nav = {
    navigate: (value: string) => void;
}

export const AuthContext = createContext({})

function AuthProvider({children}: any){
    const [user, setUser] = useState({});
    const navigation = useNavigation<Nav>();

    function signIn(email: string, password:string) {
        if(email !== '' && password !== ''){
            api.get(`signIn/${email}/${password}`).then(response => { 
                setUser({
                    nome: response.data.usrNome,
                    email: email,
                    status: "ATIVO"
                })
                navigation.navigate("Produtos")
            })             
        } 
    }

    return(
        <AuthContext.Provider value={{signIn, user  }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;