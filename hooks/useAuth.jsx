import { useContext } from "react";
import { AuthContext } from "../app/authprovider/AuthProvider";



const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
};

export default useAuth;