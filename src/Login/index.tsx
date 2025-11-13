import { Link } from "react-router-dom"
import "./index.css"

interface LoginChoiceProps {
    imgClass : string
    accountName : string
    to? : string //Currently using default as /account, fix later
}

function LoginChoice(props : LoginChoiceProps){
    return (
        <div className="choice-container">
            <div className={"img " + props.imgClass}></div>
            <Link className="text" to={props.to ?? "/account"}>{`Continue with ${props.accountName} account`}</Link>
        </div>
    )
}

export default function Login(){
    return (
        <div className="login">
            <div className="box">
                <div className="title">Sign in with your linked account</div>
                <LoginChoice imgClass="hcmut" accountName="HCMUT"/>
                <LoginChoice imgClass="google" accountName="Google"/>
                <LoginChoice imgClass="facebook" accountName="Facebook"/>
            </div>
        </div>
    )
}