import { useState } from "react";
import { postRequest } from "../api/fetchApis";
import { useNavigate } from "react-router-dom";


export default function LoginScreen() {
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const onLogin = (e: { preventDefault: () => void; }) => {
        setError("");
        e.preventDefault();
        postRequest("contractors/login", { username, password }).then((contractor) => {
            localStorage.setItem("user", JSON.stringify(contractor));
            isAdmin(contractor.roles) ? navigate('/admin') : navigate('/book-equipments');
        }).catch((e) => {
            setError(e.message)
        });
    }
    const isAdmin = (roles: string[]) => {
        return roles.includes("AdminContractor")
    }
    const renderErrorMessage = () =>
        error && (
            <div className="error">{error}</div>
        );
    return (
        <form className="login-form" onSubmit={onLogin}>
            <div className="input-container">
                <label>Username </label>
                <input type="text" id="username" value={username} onInput={(e) => setUsername((e.target as HTMLInputElement).value)} required />
            </div>
            <div className="input-container">
                <label>Password </label>
                <input type="password" id="password" value={password} onInput={e => setPassword((e.target as HTMLInputElement).value)} required />
                {renderErrorMessage()}
            </div>
            <div className="button-container">
                <input type="submit" id="submit" />
            </div>
        </form>
    )
}