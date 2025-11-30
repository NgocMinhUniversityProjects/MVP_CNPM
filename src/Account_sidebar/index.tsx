import { ReactNode } from "react"
import "./index.css"
import { Link, useNavigate } from "react-router-dom"
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext.tsx";

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
        <div key={i} className={h ? "entry-container highlighted" : "entry-container"}>
            <div className="icon">{icon}</div>
            <Link className="name" to={href}>{name}</Link>
        </div>
    )
}

export default function Account_sidebar(props : Account_sidebar_props){
    const {title, entries, highlighted} = props
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <div className="Ac-sidebar">
            <div className="title">{title}</div>
            {entries.map((e, i) => formatEntries(e, i, highlighted))}
            <div className="entry-container log-out" onClick={handleLogout}>
                <FiLogOut className="icon"/>
                <div className="name">Log out</div>
            </div>
        </div>
    )
}
