import "./index.css"
import { ReactNode } from "react";

import AccountSidebar from "../Account_sidebar/index.tsx"

import { FaHouse, FaRegStarHalfStroke, FaUserGear } from "react-icons/fa6"
import { FaCalendarAlt, FaCalendarPlus, FaFolderOpen, FaBell } from "react-icons/fa"
import { PiVideoCameraFill } from "react-icons/pi";
import { IoChatbubblesSharp } from "react-icons/io5";
import { HiMiniUserGroup } from "react-icons/hi2";


const entries = [
                [<FaHouse/>, "Dashboard", "/account_main"],
                [<FaCalendarAlt/>, "Schedule management", "/account_calendar"],
                [<FaCalendarPlus/>, "Book a session", "/account_book"],
                [<PiVideoCameraFill/>, "My sessions", "/account_session"],
                [<IoChatbubblesSharp/>, "Messages", "/account_mes"],
                [<FaFolderOpen/>, "Document library", "/account_doc"],
                [<HiMiniUserGroup/>, "Community", "/account_comunity"],
                [<FaRegStarHalfStroke/>, "My feedbacks", "/account_feedback"],
                [<FaUserGear/>, "Account", "/account_ac"],
            ] as [ReactNode, string, string][]

export default function wrapper(component : ReactNode, index : number){
    return (
        <div className="ac">
            <AccountSidebar title="Welcome back!" entries={entries} highlighted={index}></AccountSidebar>
            <div className="ac_main">
                <div className="top-bar">
                    <div className="left section">
                        <div className="icon">{entries[index][0]}</div>
                        <div className="name">{entries[index][1]}</div>
                    </div>
                    <div className="right section">
                        <div className="bell">
                            <FaBell />
                        </div>
                        <div className="avatar"></div>
                    </div>
                </div>
                {component}
            </div>
        </div>
    )
}
