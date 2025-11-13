import "./index.css"

interface SignupChoiceProps {
    imgClass : string
    accountName : string
}

function SignupChoice(props : SignupChoiceProps){
    return (
        <div className="choice-container">
            <div className={"img " + props.imgClass}></div>
            <div className="text">{`Link with your ${props.accountName} account`}</div>
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