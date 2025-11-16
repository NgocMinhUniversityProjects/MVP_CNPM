import "./index.css"
import { Link } from "react-router-dom"

interface SignupChoiceProps {
    imgClass : string
    accountName : string
}

function SignupChoice(props : SignupChoiceProps){
    return (
        <div className="choice-container">
            <div className={"img " + props.imgClass}></div>
            <Link className="text" to={"/moreinfo"}>{`Link with your ${props.accountName} account`}</Link>
        </div>
    )
}

export default function Signup(){
    return (
        <div className="signup">
            <div className="box">
                <div className="title">Make your new account personal!</div>
                <SignupChoice imgClass="hcmut" accountName="HCMUT"/>
                <SignupChoice imgClass="google" accountName="Google"/>
                <SignupChoice imgClass="facebook" accountName="Facebook"/>
            </div>
        </div>
    )
}