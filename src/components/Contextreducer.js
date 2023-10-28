import React, { createContext, useContext, useReducer } from 'react'

const Cartstatecontext = createContext();
const Cartdispatchcontext = createContext();

const reducer = (state, action) => {
   switch(action.type){
    case "ADD":
        return [...state,{id:action.id,name:action.name,qty:action.qty,size:action.size,price:action.price,img:action.img}]
    default:
        console.log("Error in switch");
   }
}


export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, [])
    return (
        <Cartdispatchcontext.Provider value={dispatch}>
             <Cartstatecontext.Provider value={state}>
                {children}
             </Cartstatecontext.Provider>
        </Cartdispatchcontext.Provider>
    )
}

export const useCart=()=> useContext(Cartstatecontext);
export const useDispatchCart=()=> useContext(Cartdispatchcontext);
