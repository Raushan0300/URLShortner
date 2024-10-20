import { Button } from "@/components/ui/button"
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"


const NotFound = () => {
    const navigate = useNavigate();
    const {slug} = useParams()
    // console.log()

    useEffect(()=>{
        const fetchData = async()=>{
            const res = await fetch(`http://localhost:8000/${slug}`, {
                method:"GET",
                headers:{
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            console.log(data)
            if(data.url){
                window.location.href = data.url
            } else{
                console.log(data);
            }
        };
        fetchData();
    },[]);
  return (
    <div className="flex flex-col mt-5 justify-center items-center gap-5">
        <h1 className="text-xl">Your Shortned URL is not found in our DataBase</h1>
        <Button onClick={()=>{navigate('/')}}>Go Back</Button>
    </div>
  )
}

export default NotFound