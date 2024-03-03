import axios from "axios";
import Sidebar from "../components/sidebar"
import { Video } from "lucide-react";
import { ICourse, ISidebarItem } from "../assets/interface";
import { useEffect, useState } from "react";
import List from "../components/list";

const ListVideo = () => {
    const [items, setItems] = useState<ISidebarItem[]>([]);
    const token = localStorage.getItem('token');

    const getCourse = async (jwt: string) => {
        try {
            const config_header = {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${jwt}`,
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
                path: `/course/${course._id}`,
                icon: Video,
            }));

            setItems(courseItems);
        } catch (error) {
            console.error("Error fetching get courses:", error);
        }
    };
    
    useEffect(() => {
        if (token){
            getCourse(token);
        }
        console.log(token);
    }, [token]);
    
    return (
        <div>
            <h1>List video for you</h1>
            <List items = {items}/>
        </div>
    )
}

export default ListVideo;