
import React from 'react';
import { FileVideo, Home, LucideIcon, Video } from "lucide-react"


interface ISidebarItem {
  name: string;
  icon: LucideIcon; // Adjust this accordingly to your Icon type
  path: string;
  items?: ISidebarItem[];
}

interface ListProps {
  items: ISidebarItem[];
}

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
    <ul>
      {items.map((item, index) => (
        <SidebarItem key={index} {...item} />
      ))}
    </ul>
  );
};

export default List;