import { ReactNode } from "react"
import "./index.css"
import { Link } from "react-router-dom"

type icon = ReactNode
type name = string
type href = string

export interface Account_sidebar_props {
    title : string,
    entries : [icon, name, href][],
    highlighted : number
}

function formatEntries(e : [icon, name, href], i : number, highlighted : number){
    const [icon, name, href] = e
    const h = (highlighted === i)
    return (
        <div className={h ? "entry-container highlighted" : "entry-container"}>
            <div className="icon">{icon}</div>
            <Link className="name" to={href}>{name}</Link>
        </div>
    )
}

export default function Account_sidebar(props : Account_sidebar_props){
    const {title, entries, highlighted} = props

    return (
        <div className="Ac-sidebar">
            <div className="title">{title}</div>
            {entries.map((e, i) => formatEntries(e, i, highlighted))}
        </div>
    )
}
