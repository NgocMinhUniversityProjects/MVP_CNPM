import "./index.css"
import { Link } from "react-router-dom"
import React, { ReactNode } from "react"
type HREF = string
type option = string | ReactNode | [string | ReactNode, HREF]


interface HeaderProps {
    options_right : option[],
    options_left : option[],
}

function parseOption(o : option, index: number){
    if(Array.isArray(o)){
        const [option, href] = o
        return <Link key={index} className="option text" to={href}>{option}</Link>
    } else {
        return <div key={index} className="option">{o}</div>
    }
}

export function Header(config : HeaderProps){
    const o_left = config.options_left.map((o, i) => parseOption(o, i))
    const o_right = config.options_right.map((o, i) => parseOption(o, i))
    
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
    const o_left = config.options_left.map((o, i) => parseOption(o, i))
    const o_right = config.options_right.map((o, i) => parseOption(o, i))
    
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

