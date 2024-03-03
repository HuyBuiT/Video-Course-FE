// SidebarItem.tsx
import React, { useMemo, useState } from "react";
import { LucideIcon, Home, FileVideo, ChevronDown  } from "lucide-react"
import { ISidebarItem, ISubItem } from "../../assets/interface";
import {useNavigate} from "react-router-dom"
import '../../css/sidebar/item.css'

interface SidebarItemProps {
  item: ISidebarItem;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item }) => {
    const { name, icon: Icon, items, path } = item;
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();

    const onClick = () =>{
        if(items && items.length > 0) {
            setExpanded(!expanded);
        }
        navigate(path);
    }

    const isActive = useMemo(() =>{
        return false;
    },[path]);

    return (
        <>
        <div
        className={`sidebar-item ${isActive ? "active" : ""}`}
         onClick={onClick}>
            <Icon size={19}/>
            <p className="font-semibold">{name}</p>

        </div>
        </>
    );
}

export default SidebarItem;
