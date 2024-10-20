import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Home = () => {
    const [url, setUrl] = useState<string>("");
    const [customUrl, setCustomUrl] = useState<string>("");

    const [shortUrl, setShortUrl] = useState<string>("");

    const handleShortenUrl = async()=>{
        const response = await fetch('http://localhost:8000/shorten', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({longUrl: url, custom: customUrl})
        });

        const data = await response.json();
        console.log(data);
        setShortUrl(data.shortUrl);
    }

  return (
    <div className="flex flex-col justify-center items-center mt-5 gap-5">
        <Input className="w-1/4 border border-black"
        placeholder="Type Your URL to be Shortened"
        value={url}
        onChange={(e)=>{setUrl(e.target.value)}} />
        <Input className="w-1/4 border border-black" placeholder="Custom Url (Optional)"
        value={customUrl}
        onChange={(e)=>{setCustomUrl(e.target.value)}} />
        <Button onClick={()=>{handleShortenUrl()}}>Short URL</Button>
        <p>{shortUrl}</p>
    </div>
  )
};

export default Home;