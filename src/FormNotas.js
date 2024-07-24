import React, { useEffect, useRef, useState } from "react";
import Notas from "./Notas";
import { v4 as uuid } from "uuid";
import './estilos.css';

export default function Notitas() {
    const [notas, setNotas] = useState([]);
    const [error, setError] = useState("");
    const tituloRef = useRef();
    const descripcionRef = useRef();
    const importanteRef = useRef();


    useEffect(() => {
        const misNotas = JSON.parse(localStorage.getItem("notas-app"));
        if (misNotas) {
            setNotas(misNotas);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("notas-app", JSON.stringify(notas));
    }, [notas]);

    const agregarNota = () => {
        const titulo = tituloRef.current.value;
        const descripcion = descripcionRef.current.value;
        const importante = importanteRef.current.checked;


        if (descripcion === "") {
            setError("La descripion es obligatoria");
            return;
        };

        setError(""); //limpia el mensaje de error si pasa la validacion

        const nuevaNota = {
            id: uuid(),
            titulo: titulo,
            descripcion: descripcion,
            importante: importante
        };

        setNotas(prev => [...prev, nuevaNota]);
        tituloRef.current.value = "";
        descripcionRef.current.value = "";
        importanteRef.current.checked = false;
    }

    return (
        <div>
            <h1>Rellenar Notitas</h1>
            <div className="input-group my-3">
                
                <div className="titulo col-3"><input ref={tituloRef} className="form-control" placeholder="Ingrese un título (opcional)"></input></div>
                <div className="descrip col-3"><input ref={descripcionRef} className="form-control" placeholder="Ingrese una descripción"></input></div>
                <div className="impor col-3">
                    <label>
                    <input ref={importanteRef} type="checkbox" /> Importante
                </label></div>
                <div className="boton"><button onClick={agregarNota} className="btn btn-primary">Agregar</button></div>
            </div>
            {error && <div className="mensaje-error">{error}</div>}
            <div className="notas-container">
                {notas.map(nota => (
                    <Notas
                        key={nota.id} 
                        titulo={nota.titulo}
                        descripcion={nota.descripcion}
                        importante={nota.importante}
                    />
                ))}
            </div>
        </div>
    );
}