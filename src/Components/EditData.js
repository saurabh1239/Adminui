import React , { useState } from "react";
import { useSnackbar } from "notistack";
import {Button} from "@mui/material";
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import RateReviewIcon from '@mui/icons-material/RateReview';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';



const EditData = ({data, setData, userId }) => {

    //serach For the user whose data to be updated

    const searchUser = data.find((user) => user.id === userId);
  
    const { enqueueSnackbar } = useSnackbar();

    // using react hook useState to toggle between values

    const [open, setOpen] = useState(false);
   
    const [input, setInput] = useState({
        name: searchUser.name,
        email:searchUser.email,
        role: searchUser.role,
          
      }) 

      const {name , email , role} = input;

    //open and close dialog box based on users action

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
   

  //store the values entered by user to setInput hook
      
  const handleChange = (event) => {
    let  id  = event.target.id;
    let  value  = event.target.value;
   
    setInput((values) => ({...values , [id] : value}));
  };

  //submit the users input and update the data at data table

  const submitData = () => {
    const newList = data.map((item) => {
      if (item.id === userId) {
        return { ...item, ...input };
      }
      return item;
    });

    enqueueSnackbar("Data Updated successfully ", { variant: "success" });
    
    setData(newList);
    setOpen(false)
  };



    return (
        <>
         <IconButton aria-label="update"
                     onClick={handleClickOpen}>
                     <RateReviewIcon sx={{color :"dodgerblue"}}/>
         </IconButton>

        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update User Details</DialogTitle>
        <DialogContent>

            <FormControl>
            <TextField
            required={true}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            placeholder={name}
            onChange={handleChange}
            
            
          />

            <TextField
            required={true}
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            placeholder={email}
            onChange={handleChange}
           
           
           />

            <TextField
            required={true}
            autoFocus
            margin="dense"
            id="role"
            label="Role"
            type="text"
            fullWidth
            variant="standard"
            placeholder={role}
            onChange={handleChange}
         
          />


            </FormControl>

         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={submitData}>Confirm</Button>
        </DialogActions>
      </Dialog>



        </>
    )
}


export default EditData;
