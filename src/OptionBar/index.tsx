import "./index.css"
import React from "react"
type HREF = string
type option = string | [string, HREF]

interface HeaderProps {
    options_right : option[],
    options_left : option[],
}

function parseOption(o : option){
    if(Array.isArray(o)){
        const [option, href] = o
        return <a className="option" href={href}>{option}</a>
    } else {
        return <div className="option">{o}</div>
    }
}

export function Header(config : HeaderProps){
    const o_left = config.options_left.map(o => parseOption(o))
    const o_right = config.options_right.map(o => parseOption(o))
    
    return (
        <div className = "Header">
            <div className="part left">
                {o_left}
            </div>
            {/* <div className = "part pad"></div> */}
            <div className="part right">
                {o_right}
            </div>
        </div>
    )
}

export function Footer(config : HeaderProps){
    const o_left = config.options_left.map(o => parseOption(o))
    const o_right = config.options_right.map(o => parseOption(o))
    
    return (
        <div className = "Footer">
            <div className="part left">
                {o_left}
            </div>
            {/* <div className = "part pad"></div> */}
            <div className="part right">
                {o_right}
            </div>
        </div>
    )
}

