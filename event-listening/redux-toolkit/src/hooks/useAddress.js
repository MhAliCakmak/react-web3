import { useSelector } from "react-redux";

export const useAddress=() =>{
    const address = useSelector((state) => state.data.address);
    return address;
}