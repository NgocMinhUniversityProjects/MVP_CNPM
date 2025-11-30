import { useNavigate } from "react-router-dom"
import "./index.css"
import { useState } from "react"
import { useAuth } from "../context/AuthContext.tsx"

interface LoginChoiceProps {
    imgClass : string
    accountName : string
    onClick? : () => void
}

function LoginChoice(props : LoginChoiceProps){
    return (
        <div className={`choice-container ${props.onClick ? 'clickable' : ''}`} onClick={props.onClick}>
            <div className={"img " + props.imgClass}></div>
            <div className="text">{`Continue with ${props.accountName} account`}</div>
        </div>
    )
}

export default function Login(){
    const [showHCMUTForm, setShowHCMUTForm] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleHCMUTLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(email, password);
            navigate('/account');
        } catch (err: any) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    if (showHCMUTForm) {
        return (
            <div className="login">
                <div className="box">
                    <div className="title">Sign in with HCMUT Account</div>
                    <form onSubmit={handleHCMUTLogin} className="login-form">
                        {error && <div className="error-message">{error}</div>}
                        <input
                            type="email"
                            placeholder="Email (e.g., student@hcmut.edu.vn)"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="login-input"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="login-input"
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="login-button"
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowHCMUTForm(false)}
                            className="back-button"
                        >
                            Back to Login Options
                        </button>
                    </form>
                    <div className="test-info">
                        Test accounts: student@hcmut.edu.vn / student123 or tutor@hcmut.edu.vn / tutor123
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="login">
            <div className="box">
                <div className="title">Sign in with your linked account</div>
                <LoginChoice imgClass="hcmut" accountName="HCMUT" onClick={() => setShowHCMUTForm(true)}/>
                <LoginChoice imgClass="google" accountName="Google"/>
                <LoginChoice imgClass="facebook" accountName="Facebook"/>
            </div>
        </div>
    )
}