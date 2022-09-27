import React from "react";

import "./Header.css";
import { Stack , Box} from "@mui/material";

const Header = () => {
    return (
        <>
        
        
       
        <Box className="header">
            <Stack className="admin">Admin</Stack>
            <Stack className="ui">UI</Stack>
        </Box>
       


        </>

    )
}


export default Header;