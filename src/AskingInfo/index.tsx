import { FormEvent, useState } from "react"
import "./index.css"
import { Link } from "react-router-dom"

interface InfoProps {
    placeholder: string;
    elementID : number;
}

function checkInput(e: FormEvent<HTMLTextAreaElement>) {
    if (e.nativeEvent instanceof KeyboardEvent && e.nativeEvent.key === "Enter") {
        e.preventDefault();
        e.currentTarget.blur()
        e.currentTarget.selectionStart = e.currentTarget.selectionEnd = 0

        //select next target
        const currID = Number(e.currentTarget.id)
        const nextID = currID + 1
        if(!isNaN(nextID)){
            const nextTextArea = document.getElementById(String(nextID));
            if(!(nextTextArea instanceof HTMLTextAreaElement)) return;

            const textLength = nextTextArea.value.length;
    
            nextTextArea.focus();
            nextTextArea.setSelectionRange(textLength, textLength);
        }
    }
}

function Field(props: InfoProps) {
    return (
        <div className="choice-container">
            <textarea id={String(props.elementID)} onKeyDown={checkInput} className="choice" placeholder={props.placeholder}></textarea>
        </div>
    );
}

const studentInfo = ["Full name", "Student ID", "Major", "Academic year"];
const tutorInfo = ["Full name", "Teacher ID", "School", "Department"];
const generalInfo = ["Email", "Phone number"];

export default function AskingInfo() {
    const [isStudent, setIsStudent] = useState<boolean>()

    function switchRole(){
        if(isStudent) setIsStudent(false);
        else setIsStudent(true)
    }

    const infoArr = (isStudent ? studentInfo : tutorInfo).concat(generalInfo)

    return (
        <div className="info">
            <div className="box">
                <div className="title">Personal information</div>
                <div className="subtitle">Please enter additional information to complete your sign-up!</div>
                <div className="choice role" onClick={switchRole}>Signing up as a {isStudent ? "student" : "tutor"} (click to change)</div>
                {infoArr.map((info, num) => <Field placeholder={info} elementID={num}/>)}

                {/* placeholder to account, change later */}
                <Link className="confirm-button" to="/account">Confirm</Link> 
            </div>
        </div>
    )
}