import { FormEvent, ReactNode, useState } from "react"
import "./index.css"
import { Link } from "react-router-dom"

interface InfoProps {
    savedInfoState? : savedGeneralInfoState;
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
            <textarea 
                id={String(props.elementID)} 
                onInput={() => {
                    if(props.savedInfoState){
                        const i = props.elementID
                        const t = (document.getElementById(String(i))! as HTMLTextAreaElement).value
                        const old = props.savedInfoState[0]!
                        old[i] = t
                        props.savedInfoState[1](old)
                    }
                }} 
                onKeyDown={checkInput} 
                className="choice" 
                placeholder={props.placeholder} value={
                    props.savedInfoState ? (
                        props.savedInfoState[0] ? 
                        (props.savedInfoState[0][props.elementID] ?? undefined) :
                        undefined
                    ) : undefined
                }
            ></textarea>
        </div>
    );
}

const studentInfo = ["Full name", "Student ID", "Major", "Academic year"];
const tutorInfo = ["Full name", "Teacher ID", "School", "Department"];
const generalInfo = ["Email", "Phone number"];

type State<T> = ReturnType<typeof useState<T>>
type isStudentState = State<boolean>
type onStepState = State<1 | 2 | 3>
type savedGeneralInfoState = State<string[]>

function switchRole(st : isStudentState){
    const [isStudent, setIsStudent] = st
    if(isStudent) setIsStudent(false);
    else setIsStudent(true)
}

function advance(step : onStepState){
    const [s, setStep] = step
    setStep(((s ?? 0) + 1) as 1 | 2 | 3)
}

function AskingInfo_1(step : onStepState, savedGeneralInfo : ReactNode){    
    return (
        <div className="info info1">
            <div className="box">
                <div className="title">Identity information</div>
                <div className="subtitle">Please provide your email and phone number to proceed!</div>
                {savedGeneralInfo}
                <div className="confirm-button" onClick={() => advance(step)}>Confirm</div> 
            </div>
        </div>
    )
}

function AskingInfo_2(step : onStepState, st : isStudentState){
    return (
        <div className="info info2">
            <div className="box">
                <div className="title">Role information</div>
                <div className="subtitle">What are you signing up as?</div>
                <div className="choice role" onClick={() => {st[1](true); advance(step)}}>Student</div>
                <div className="choice role" onClick={() => {st[1](false); advance(step)}}>Tutor</div>
            </div>
        </div>
    )
}

function AskingInfo_3(step : onStepState, st : isStudentState, savedGeneralInfo : ReactNode) {

    const isStudent = st[0]
    const infoArr = (isStudent ? studentInfo : tutorInfo).concat(generalInfo)

    return (
        <div className="info info3">
            <div className="box">
                <div className="title">Personal information</div>
                <div className="subtitle">Add some more personal information to complete your sign-up!</div>
                <div className="choice role" onClick={() => switchRole(st)}>Signing up as a {isStudent ? "student" : "tutor"} (click to change)</div>
                {savedGeneralInfo ?? ""}
                {infoArr.map((info, num) => <Field placeholder={info} elementID={num}/>)}

                {/* placeholder to account, change later */}
                <Link className="confirm-button" to="/account">Confirm</Link> 
            </div>
        </div>
    )
}

export default function AskingInfo(){
    const stepState = useState<1 | 2 | 3 | undefined>(1)
    const isStudent = useState<boolean | undefined>(true)
    const savedGeneralInfoState = useState<string[] | undefined>([])
    const savedGeneralInfo = generalInfo.map((info, num) => <Field savedInfoState={savedGeneralInfoState} placeholder={info} elementID={num}/>)

    const step = stepState[0]
    const cached_steps = [
        AskingInfo_1(stepState, savedGeneralInfo), 
        AskingInfo_2(stepState, isStudent), 
        AskingInfo_3(stepState, isStudent, savedGeneralInfo)
    ]

    return cached_steps[(step ?? 1) - 1]
}