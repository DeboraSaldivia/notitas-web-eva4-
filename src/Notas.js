import React from "react";
import './estilos.css';

export default function Notas(props) {
    return (
        <div className={`nota ${props.importante ? 'important' : ''}`}>
            <h3>{props.titulo}</h3>
            <p>{props.descripcion}</p>
        </div>
    );
}