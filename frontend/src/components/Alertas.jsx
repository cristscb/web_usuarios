import React, {useEffect, useState} from "react";


function Alerta ({tipo,mensaje,visible,onClose}){

    const [mostrar,setMostrar] = useState(visible)


    useEffect(()=>{
        if(visible){
            setMostrar(true)
            setTimeout(()=>{
                setMostrar(false)
                if (onClose) onClose() 
            },4000) // cerrar alerta depues de 4 seg 
        }
    },[visible,onClose])

    const tipoClase = tipo === 'error'
    ? 'bg-red-500'
    : tipo === 'exito'
    ? 'bg-green-500'
    : 'bg-yellow-500';

    return (
        mostrar && (
          <div
            className={`fixed top-5 right-5 p-4 rounded-lg text-white font-semibold flex items-center justify-between shadow-md transform transition-all duration-500 ease-in-out ${tipoClase} opacity-100 translate-x-0`}
          >
            <span>{mensaje}</span>
            <button 
              className="ml-4 text-white font-bold text-lg"
              onClick={() => { 
                setMostrar(false); 
                if (onClose) onClose(); 
              }}
            >
              X
            </button>
          </div>
        )
      );
}


export default Alerta;