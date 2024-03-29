import React from "react";

import { Menu } from "antd";
import { useAvatarMenuContainer } from "app/avatar/hooks/useAvatarMenuContainer";

export const AvatarMenu = () => {
  const { avatarMenuItems, onItemClick } = useAvatarMenuContainer();
  return (
    <Menu>
      {avatarMenuItems.map((avatarMenuItem) => {
        // @ts-ignore
        const { id = "missing", text = "" } = avatarMenuItem;

        return (
          <Menu.Item
            key={id}
            onClick={() => {
              onItemClick && onItemClick(avatarMenuItem);
            }}
          >
            {text}
          </Menu.Item>
        );
      })}
    </Menu>
  );
};
