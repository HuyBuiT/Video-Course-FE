"use client"
import List from "@/src/components/list/List";
import axios from "axios";
import { FileVideo, LucideIcon, Video } from "lucide-react";
import React, { useEffect, useState } from "react";

interface ISidebarItem {
    _id?: string
    name: string;
    icon: LucideIcon;
    path: string;
    items?: ISidebarItem[];
}
interface ICourse {
    name:string,
    _id: string,
}
const Parts = ({params}: {params:{video:string}}) =>{
    const course = {
        name: params.video.split("_")[0],
        _id: params.video.split("_")[1]
    }
    const [items, setItems] = React.useState<ISidebarItem[]>([
        {
            name: course.name,
            icon: FileVideo,
            path: `/video/${course.name}_${course._id}`,
            items: []
        },
    ]);
    const getParts = async () => {
        try {
            const _id = course._id;
            const config_header = {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
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
                path: `/video/${course.name}/${part._id}`,
                icon: Video,
            }));

            setItems(prevItems => prevItems.map(item =>
                item.name === `${course.name}` ? { ...item, items: partItems } : item
            ));
        } catch (error) {
            console.error("Error fetching get courses:", error);
        }
    };
    
    useEffect(() => {
        getParts();
    }, []);
    return (
        <div>
            <List items ={items}/>
        </div>
        
    )
}

export default Parts;