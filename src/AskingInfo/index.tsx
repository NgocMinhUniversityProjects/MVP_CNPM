import { FormEvent, ReactNode, useState } from "react"
import "./index.css"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext.tsx"

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

function AskingInfo_3(
    step : onStepState, 
    st : isStudentState, 
    savedGeneralInfo : ReactNode,
    profileInfoState : savedGeneralInfoState,
    handleSignup : () => Promise<void>,
    isLoading : boolean,
    error : string
) {

    const isStudent = st[0]
    const infoArr = isStudent ? studentInfo : tutorInfo

    return (
        <div className="info info3">
            <div className="box">
                <div className="title">Personal information</div>
                <div className="subtitle">Add some more personal information to complete your sign-up!</div>
                <div className="choice role" onClick={() => switchRole(st)}>Signing up as a {isStudent ? "student" : "tutor"} (click to change)</div>
                {savedGeneralInfo ?? ""}
                {infoArr.map((info, num) => <Field key={num} savedInfoState={profileInfoState} placeholder={info} elementID={num}/>)}

                {error && <div className="error-message">{error}</div>}
                <div className={`confirm-button ${isLoading ? 'disabled' : ''}`} onClick={isLoading ? undefined : handleSignup}>
                    {isLoading ? 'Creating Account...' : 'Confirm'}
                </div> 
            </div>
        </div>
    )
}

export default function AskingInfo(){
    const stepState = useState<1 | 2 | 3 | undefined>(1)
    const isStudent = useState<boolean | undefined>(true)
    const savedGeneralInfoState = useState<string[] | undefined>([])
    const profileInfoState = useState<string[] | undefined>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const { signup } = useAuth()
    const navigate = useNavigate()
    
    const savedGeneralInfo = generalInfo.map((info, num) => <Field key={num} savedInfoState={savedGeneralInfoState} placeholder={info} elementID={num}/>)

    const handleSignup = async () => {
        setError('')
        setIsLoading(true)

        try {
            const email = sessionStorage.getItem('signupEmail') || savedGeneralInfoState[0]?.[0] || ''
            const password = sessionStorage.getItem('signupPassword') || ''
            const phoneNumber = savedGeneralInfoState[0]?.[1] || ''
            const profileInfo = profileInfoState[0] || []
            const role = isStudent[0] ? 'student' : 'tutor'

            if (!email || !password) {
                setError('Missing email or password. Please go back to signup page.')
                setIsLoading(false)
                return
            }

            const userData: any = {
                email,
                password,
                name: profileInfo[0] || '',
                role,
                phoneNumber
            }

            if (role === 'student') {
                userData.studentId = profileInfo[1]
                userData.major = profileInfo[2]
                userData.academicYear = profileInfo[3]
            } else {
                userData.teacherId = profileInfo[1]
                userData.school = profileInfo[2]
                userData.department = profileInfo[3]
            }

            await signup(userData)
            
            // Clear session storage
            sessionStorage.removeItem('signupEmail')
            sessionStorage.removeItem('signupPassword')
            
            navigate('/account')
        } catch (err: any) {
            setError(err.message || 'Signup failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const step = stepState[0]
    const cached_steps = [
        AskingInfo_1(stepState, savedGeneralInfo), 
        AskingInfo_2(stepState, isStudent), 
        AskingInfo_3(stepState, isStudent, savedGeneralInfo, profileInfoState, handleSignup, isLoading, error)
    ]

    return cached_steps[(step ?? 1) - 1]
}