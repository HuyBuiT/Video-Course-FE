// Sidebar.tsx
import React, { useEffect, useState } from "react";
import { LucideIcon, Home, FileVideo, Video, User  } from "lucide-react"
import SidebarItem from "./item";
import axios from "axios";
import { ISidebarItem, ICourse } from "../../assets/interface";
import '../../css/sidebar/index.css'
const Sidebar = () => {
    const [items, setItems] = useState<ISidebarItem[]>([
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

    return (
        <div className="sidebar">
            <div className="sidebar-items">
                {items.map((item) => (
                    <SidebarItem key={item.path} item={item} />
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
