import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../api/fetchApis";
import Heading from "../base-components/Heading";
import { useNavigate } from "react-router-dom";
import { type } from "os";


interface BookingDetails {
    id: number;
    serial_number: string;
    title: string;
    model: string;
}
export default function BookingScreen() {
    const [availableEquipments, setAvailableEquipments] = useState<BookingDetails[]>([]);
    const [keys, setKeys] = useState<string[]>([]);
    const navigate = useNavigate();
    const headers = ["Serial ID", "# Serial", "Model", "Title", "Book"]
    useEffect(() => {
        fetchAvailableEquipments();
    }, [])
    const fetchAvailableEquipments = () => {
        getRequest('equipments/available').then(data => {
            setAvailableEquipments(data)
            if (data.length > 0) {
                const dataKeys = Object.keys(data[0]).concat(['book']);
                setKeys(dataKeys)
            }
        }).catch(() => (navigate("/")))
    }
    const isLastColumn = (index: number) => {
        return keys.length - 1 === index;
    }
    const onBook = (id: number) => {
        postRequest(`equipments/book/${id}`).then(() => {
            fetchAvailableEquipments();
        })
    }
    const rows = () => {
        return availableEquipments.map(eachEquipment => {
            return (
                <tr key={eachEquipment.id}>
                    {keys.map((eachKey, index) => {
                        if (isLastColumn(index)) {
                            return <td key='book-btn'><button onClick={() => onBook(eachEquipment['id'])}>Book</button></td>
                        }
                        return <td key={eachKey}>{eachEquipment[eachKey as keyof Object]}</td>
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
            <Heading title="Booking Screen" subtitle="Book Available Equipments" />
            <table style={tableStyle}>
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