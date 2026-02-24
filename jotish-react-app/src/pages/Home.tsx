import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate=useNavigate()
    navigate('/login')
    return(
        <></>
    )
}