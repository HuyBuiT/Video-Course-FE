"use client"
import List from "@/src/components/list/List";
import axios from "axios";
import exp from "constants";
import { LucideIcon, Video } from "lucide-react";
import React, { useEffect } from "react";

interface ISidebarItem {
    _id?: string
    name: string;
    icon: LucideIcon;
    path: string;
    items?: ISidebarItem[];
}
interface IPart {
    name:string,
    _id: string,
}
const Lessons =({params}: {params:{part:string}}) => {
    const partId = params.part;
    const [items, setItems] = React.useState<ISidebarItem[]>([]);

    const token = localStorage.getItem("token");
    const getLessons = async () => {
        try {
            const config_header = {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${token}`,
            };
    
            const config = {
                method: "get",
                maxBodyLength: Infinity,
                url: "http://localhost:5500/api/lessons/"+partId,
                headers: config_header,
            };
    
            const lessonsResponse = await axios.request(config);
            const lessonItems: ISidebarItem[] = lessonsResponse.data.map((lesson: ISidebarItem) => ({
                name: lesson.name,
                path: `/video/course/${partId}/${lesson._id}`,
                icon: Video,
            }));

            setItems(lessonItems);
        } catch (error) {
            console.error("Error fetching get courses:", error);
        }
    };
    
    useEffect(() => {
        getLessons();
    }, []);
    return (
        <div>
            <List items = {items}/>
        </div>
    )
}

export default Lessons;