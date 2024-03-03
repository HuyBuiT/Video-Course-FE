import React from 'react';
import { FileVideo, Home, LucideIcon, Video } from "lucide-react"
import { ISidebarItem, ISubItem, ListProps } from "../assets/interface";
import '../css/components/list.css'


const SidebarItem = (item: ISidebarItem) =>(
  <li>
    <a href={item.path}>
      <item.icon/> {item.name}
    </a>
    {item.items && item.items.length > 0 && (
      <ul>
        {item.items.map((item, index) => (
          <SidebarItem key={index} {...item} />
        ))}
      </ul>
    )}
  </li>
);

const List: React.FC<ListProps> = ({ items }) => {
  return (
    <ul className="item-list">
      {items.map((item, index) => (
        <SidebarItem key={index} {...item} />
      ))}
    </ul>
  );
};

export default List;