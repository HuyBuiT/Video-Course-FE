import React, { useEffect, useState } from "react";
import axios from "axios";
import { FileVideo, LucideIcon, Video } from "lucide-react";
import List from "../components/list";
import { ISidebarItem } from "../assets/interface";


const Parts = () => {
    const url = window.location.href.split("/");
    const course = {
        _id: url[url.length - 1]
    };

    const [items, setItems] = useState<ISidebarItem[]>([
    ]);

    const token = localStorage.getItem('token');

    const getParts = async () => {
        try {
            const _id = course._id;
            const config_header = {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${token}`,
            };
    
            const config = {
                method: "get",
                maxBodyLength: Infinity,
                url: "http://localhost:5500/api/parts/"+_id,
                headers: config_header,
            };
    
            const partsResponse = await axios.request(config);
            const partItems: ISidebarItem[] = partsResponse.data.map((part: ISidebarItem) => ({
                name: part.name,
                path: `/part/${part._id}`,
                icon: Video,
            }));

            setItems(partItems);
        } catch (error) {
            console.error("Error fetching get courses:", error);
        }
    };
    
    useEffect(() => {
        getParts();
    }, []);

    return (
        <div>
            <h1>Parts</h1>
            <List items={items} />
        </div>
    );
};

export default Parts;
