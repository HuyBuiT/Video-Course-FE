"use client"
import React, { useEffect, useState } from "react";
import { FileVideo, Home, LucideIcon, Video } from "lucide-react"
import axiosInstance from "@/src/axios/instance";
import axios from "axios";
import List from "./List";
//NOT BEING USEEEEEEEEEEE
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
const CourseList = ({course}:{course: string}) => {
    const [items, setItems] = React.useState<ISidebarItem[]>([
        {
            name: "Home",
            icon: Home,
            path: "/",
        },
        {
            name: "Video",
            icon: FileVideo,
            path: "/video",
            items: []
        },
    ]);
    const getCourse = async () => {
        try {
            const config_header = {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
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
    return(
        <div>List course of {course}:
            <List items ={items}/>
        </div>
    )
}

export default CourseList;