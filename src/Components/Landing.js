import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import SearchData from "./Search";
import PaginationComp from "./Pagination";
import EditData from "./EditData";
import "./Landing.css";
import { useSnackbar } from "notistack";

import { Box, Stack } from "@mui/system";
import { Button } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';



const Landing = () => {

    //API endpoints to get the in json format

    const API_URL = `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`


    //headcell for the table

    const headCell = [
        {
            id: 1,
            label: 'Name',
        },
        {
            id: 2,
            label: 'Email',
        },
        {
            id: 3,
            label: 'Role',
        },

    ]

    // using react hook useState to toggle between values


    const [data, setData] = useState([])
    const [searchText, setSearchText] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [selectUser, setSelectUser] = useState([])
    const [isAllSelected, setIsAllSelected] = useState(false)
    const { enqueueSnackbar } = useSnackbar();




    // fetch data from API end points and store that into data

    const fetchData = async () => {
        try {
            let response = await axios.get(API_URL)
            //console.log(response.data)
            setData(response.data)
            return response.data
        }
        catch (error) {
            console.log(error)
        }

    }




    //serach data using searchbox

    const searchData = (event) => {
        setSearchText(event.target.value)
    }




    //get the result of users using searchbox which can belong to any category

    const filter = () => {
        if (searchText !== "") {
            const result = data.filter((obj) =>
                Object.keys(obj).some((key) => obj[key].includes(searchText))
            );
            setData(result);
        } else {
            setData(data);
        }
    }

    //using react hook useEffect to render the data

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        filter();
    }, [data, searchText]);



    // pagination component to display 10 user's data in one page
    const userPerPage = 10
    const indexOfLastUser = currentPage * userPerPage;
    const indexOfFirstUser = indexOfLastUser - userPerPage;
    const currentUserList = data.slice(indexOfFirstUser, indexOfLastUser);




    //display the result of the page selected at pagination
    const handlePageChange = (number) => {
        setCurrentPage(number)

    }



    //selecting checkbox for all users present on sdisplay page

    const handleSelectAll = (event) => {
        let newList = [...selectUser]
        if (event.target.checked) {
            setIsAllSelected(true);
            newList = currentUserList.map((user) => user.id);
        } else {
            setIsAllSelected(false);
            newList = []
        }
        setSelectUser(newList);
    };



    // select checkbox for a single user

    const handleSelect = (event) => {
        const userId = event.target.value
        let newList = [...selectUser]

        if (event.target.checked) {

            newList = [...selectUser, userId]
        } else {
            setIsAllSelected(false);
            newList.splice(selectUser.indexOf(userId), 1)
        }
        setSelectUser(newList)
    }




    //delete all selected user's data


    const handleDeleteAll = () => {

        const newList = data.filter(
            (user) => !selectUser.includes(user.id)
        );

        setData(newList)
        enqueueSnackbar("Data Deleted successfully ", { variant: "warning" });
        setIsAllSelected(false);

    }

    //delete data for user selected

    const handleDeleteRow = (userId) => {

        let newList = data.filter((item) => item.id !== userId)
        enqueueSnackbar("Data Deleted successfully ", { variant: "warning" });
        setData(newList)
    }




    return (
        <>
            <Header />

            <SearchData searchData={searchData} />

            <TableContainer className="container">
                <Table sx={{ minWidth: 750, pageSize: 10 }}
                    aria-labelledby="tableTitle"
                    size="medium"
                    responsive="true"
                    color = "primary"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Checkbox
                                    color="primary"
                                    onChange={handleSelectAll}
                                    checked={isAllSelected}

                                />
                            </TableCell>

                            {headCell.map((data) => (
                                <TableCell
                                    sx={{ fontWeight: "bold" }}
                                    key={headCell.id}

                                >
                                    {data.label}
                                </TableCell>
                            ))}
                            <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Actions</TableCell>

                        </TableRow>
                    </TableHead>

                    <TableBody >
                        {
                            currentUserList.map((item) => (

                                <TableRow key={item.id}>
                                    <TableCell >
                                        <Checkbox
                                            color="primary"
                                            onChange={handleSelect}
                                            value={item.id}
                                            checked={selectUser.includes(item.id)}
                                        />

                                    </TableCell>

                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.role}</TableCell>




                                    <TableCell>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>


                                            <Stack>

                                                <EditData data={data} setData={setData} userId={item.id} />

                                            </Stack>
                                            <Stack> <IconButton aria-label="delete"
                                                onClick={() => handleDeleteRow(item.id)}

                                            >
                                                <DeleteIcon sx={{ color: "crimson" }} />
                                            </IconButton> </Stack>
                                        </Box>
                                    </TableCell>
                                </TableRow>

                            ))
                        }

                    </TableBody>
                </Table>
            </TableContainer>

            <Box className="endBar">
                <Stack> <Button
                    variant="contained" size="medium" color="error"
                    onClick={handleDeleteAll}
                >
                    Delete Selected
                </Button></Stack>
                <Stack> <PaginationComp
                    perPageUser={userPerPage}
                    totalUser={data.length}
                    handlePageChange={handlePageChange}

                /> </Stack>
            </Box>


        </>
    )
}

export default Landing;



