import { useEffect, useState } from "react";
import { getRequest } from "../api/fetchApis";
import Heading from "../base-components/Heading";
import { useNavigate } from "react-router-dom";


interface BookedDetails {
    id: number;
    serial_number: string;
    title: string;
    model: string;
    username: string;
}
export default function AdminScreen() {
    const [details, setDetails] = useState<BookedDetails[]>([]);
    const [keys, setKeys] = useState<string[]>([]);
    const navigate = useNavigate();
    const headers = ["Serial ID", "# Serial", "Model", "Title", "Booked by"]
    useEffect(() => {
        getRequest('equipments/booked-equipments').then(data => {
            setDetails(data)
            if (data.length > 0) {
                setKeys(Object.keys(data[0]))
            }
        }).catch(() => (navigate("/")))
    }, [])
    const rows = () => {
        return details.map(eachDetail => {
            return (
                <tr key={eachDetail.id}>
                    {keys.map(eachKey => {
                        return <td key={eachKey}>{eachDetail[eachKey as keyof Object]}</td>
                    })}
                </tr>
            )
        })
    }
    const tableStyle = {
        marginLeft: "30%",
        marginTop: "5%",
        width: "40%"
    }
    return (
        <div>
            <Heading title="Admin Screen" subtitle="Booked Equipments" />
            <table style={tableStyle} id="#table">
                <thead>
                    <tr>
                        {headers.map(h => (<td key={h}>{h}</td>))}
                    </tr>
                </thead>
                <tbody>
                    {rows()}
                </tbody>
            </table>
        </div>
    );
}