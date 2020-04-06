import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';

export default function SimpleMenu() {
    

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      console.log(event.currentTarget);
      setAnchorEl(event.currentTarget);
      anchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

  
  
  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MenuIcon/>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem> */}
        
        <MenuItem styles={{"background-color": "white"}} onClick={handleClose}><a href="#opis-resitev">Opis rešitev</a></MenuItem> 
        <MenuItem styles={{"background-color": "white"}} onClick={handleClose}><a href="#kontakt">Kontakt</a></MenuItem> 
      </Menu>
    </div>
  );
}
