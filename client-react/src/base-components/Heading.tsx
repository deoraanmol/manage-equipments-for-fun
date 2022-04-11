import { FaPowerOff } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

export default function Heading(props: { title: string, subtitle: string }) {
    const navigate = useNavigate();
    const onLogout = () => {
        localStorage.clear();
        navigate("/");
    }
    return (
        <div>
            <h2 style={{ "textAlign": "center" }}>
                {props.title}
                <span style={{ "float": "right", "marginRight": "0.5%" }} onClick={onLogout}><FaPowerOff /></span>
            </h2>
            <h4 style={{ "textAlign": "center", "marginRight": "1.5%" }}>{props.subtitle}</h4>
        </div>
    );
}