export const useSelector=() =>{
    const {state,dispatch}=useStore();
    return [state,dispatch];

    
    
}