"use client"
import React, { useEffect, useState } from "react";
import { LucideIcon, Home, FileVideo, Video, User  } from "lucide-react"
import SidebarItem from "./item";
import axios from "axios";

interface ISidebarItem {
    name: string;
    icon: LucideIcon;
    path: string;
    items?: ISidebarItem[];
}

interface ICourse {
    name: string;
    _id: string;
}


const Sidebar = () =>{
    
    const [items, setItems] = React.useState<ISidebarItem[]>([
        {
            name: "Home",
            icon: Home,
            path: "/",
        },
        {
            name: "Profile",
            icon: User,
            path: "/profile",
        },
        {
            name: "Video",
            icon: FileVideo,
            path: "/video",
            items: [
            ]
        },
    ]);
    
    const token = localStorage.getItem('token');

    const getCourse = async () => {
        try {
            const config_header = {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${token}`,
            };
    
            const config = {
                method: "get",
                maxBodyLength: Infinity,
                url: "http://localhost:5500/api/courses",
                headers: config_header,
            };
    
            const coursesResponse = await axios.request(config);
            const courseItems: ISidebarItem[] = coursesResponse.data.map((course: ICourse) => ({
                name: course.name,
                path: `/video/${course.name}_${course._id}`,
                icon: Video,
            }));

            setItems(prevItems => prevItems.map(item =>
                item.name === "Video" ? { ...item, items: courseItems } : item
            ));
        } catch (error) {
            console.error("Error fetching get courses:", error);
        }
    };
    
    useEffect(() => {
        getCourse();
    }, []);



    
    return (
        <div
        className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-10 p-4">
            <div
            className="flex flex-col space-y-10 w-full ">
                <div>
                    {items.map((item) =>(
                     <SidebarItem key= {item.path} item={item}/>
                ))}
                </div>
                
            </div>

        </div>
    );
}

export default Sidebar;