import { useContext } from "react";
import { AuthContext } from "../contexts/AthContext";

export function useAuth(){
    const value =useContext(AuthContext)

    return value;
}