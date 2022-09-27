import React  from "react";
import { Box } from "@mui/system";
import { TextField ,InputAdornment } from "@mui/material";
import { Search} from "@mui/icons-material"

const SearchData = ({searchData}) => {
    return (
        <Box sx={{margin:4}}>
        <TextField
            
            id="outlined-textarea"
            label="Seach"
            placeholder="Search by name , email or role"
            multiline
            size="small"
            fullWidth
            onChange={searchData}
            name="search"
            InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search color="primary" />
                  </InputAdornment>
                ),
              }}
    
         />
          
        </Box>
    )
}

export default SearchData;