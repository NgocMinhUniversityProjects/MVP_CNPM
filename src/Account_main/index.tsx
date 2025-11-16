import "./index.css"
import wrapper from "../Account_wrapper/index.tsx"
import { ReactNode } from "react"

import { FaClock, FaRocket } from "react-icons/fa";
import { IoChatbubblesSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

interface cardProps {
    icon : ReactNode
    title : string
    contents : ReactNode[]
    end? : ReactNode
}

function Card(p : cardProps){
    return (
        <div className="card-wrapper">
            <div className="card-header">
                <div className="icon">{p.icon}</div>
                <div className="title">{p.title}</div>
            </div>
            <div className="card-content-wrapper">
                {p.contents}
            </div>
            {p.end}
        </div>
    )
}

interface listProps {
    title? : string | ReactNode
    href? : string
    content : string
}

function List(p : listProps){
    let title : ReactNode | undefined = undefined
    let k = p.title
    if(typeof p.title === "string") k += ":"
    if(p.title !== undefined){
        title = <div className="title">{k}</div>
    }

    let content
    if(p.href) content = <Link className="content" to={p.href}>{p.content}</Link>;
    else content = <div className="content">{p.content}</div>;
    return (
        <div className="list">
            {title}
            {content}
        </div>
    )
}

//** Hard coded data */
const session = [
    {
        Subject : "Calculus 1",
        Tutor : "Nguyen van A",
        Time : "14:00 - 15:00, Today"
    }
]

const quickAction = [
    {
        name : "Book a new session (UC3)",
        href : "/account_book"
    },
    {
        name : "Manage availabiliy (UC2)",
        href : "/account_calendar"
    }
]

const messages = [
    {
        name : "Nguyen Van A",
        mes : "Hi, the document I sent...",
        time : "2 hours ago"
    },
    {
        name : "Tran Thi B",
        mes : "Yesterday's session was very helpful...",
        time : "1 day ago"
    }
]



export default function Account_main(){
    const component = (
        <div className="card-collection">
            <Card icon={<FaClock />} title="Upcoming sessions" contents={
                session.map(s => (
                    <div className="session-wrapper">
                        {Object.entries(s).map(s => <List title={s[0]} content={s[1]}></List>)}
                        <div className="confirm-wrapper">
                            <Link className="confirm" to="/account_session">Join / Check in</Link>
                        </div>
                    </div>
                ))
            }/>
            <Card icon={<FaRocket />} title="Quick actions" contents={
                quickAction.map(a => (
                    <div className="qa">
                        <List content={a.name} href={a.href}></List>
                    </div>
                ))
            }/>
            <Card icon={<IoChatbubblesSharp />} title="Recent messeges (UC6)" contents={
                messages.map(m => (
                    <div className="mes">
                        <List title={m.name} content={m.mes}></List>
                        <List content = {m.time}></List>
                    </div>
                )).concat(
                    <Link className="confirm_url" to="/account_mes">View all messages</Link>
                )
            }/>
        </div>
    )
    return wrapper(component, 0)
}