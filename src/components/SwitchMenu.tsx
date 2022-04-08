import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

interface SwitchMenuProps {
  title: string;
  children: React.ReactNode;
}

const SwitchMenu = ({ title, children }: SwitchMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClick}>
        {title}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        id="basic-menu"
      >
        {React.Children.map(children, (child) => {
          return <MenuItem>{child}</MenuItem>;
        })}
      </Menu>
    </div>
  );
};

export default SwitchMenu;
