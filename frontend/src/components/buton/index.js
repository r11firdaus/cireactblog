import React from "react";

export const Button = ({onClick, text, loading}) => {
    if (loading) {
        return <button className="btn btn-lg btn-secondary btn-block" disabled>Please Wait...</button>
    }
    return (
        <button className="btn btn-lg btn-success btn-block" onClick={onClick}>{text}</button>
    )
}