import { useContext, useEffect, useRef, useState } from "react";
import { FilterContext } from "@/context/filterContext";

import { Box, Button, Input, MenuItem, TextField, Typography, useTheme } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import dayjs from "dayjs";

import { deleteBreakdown } from "@/app/actions";
import { Cancel } from "@mui/icons-material";

import CategorySelectBox from "./CategorySelectBox";

export default function Breakdown({ getBreakdownData, breakdown, isNew }) {
    const { section } = useContext(FilterContext);
    const theme = useTheme().palette;
    const box = useRef(null);
    const editBox = useRef(null);
    // STATE FOR EDIT
    // const [isBeingEdited, setIsBeingEdited] = useState(false);
    const [editedBreakdown, setEditedBreakdown] = useState(breakdown);

    const {_id, name, amount, category, sub_category, date} = breakdown;

    const month = (new Date(date)).getMonth() + 1;
    const day = (new Date(date)).getDate();

    useEffect(() => {
        // console.log('is new?: ', isNew)
        // console.log('ref: ', box.current.style)
        if (isNew) {
            box.current.style.backgroundColor = theme.primary.dark;
            setTimeout(() => {
                box.current.style.backgroundColor = 'white';
                box.current.style.transition = 'background-color 500ms linear';
            }, 500);
            // console.log('new one is: ', box.current)
            // console.log(box.current.style.backgroundColor)
        }
    }, [breakdown])

    const handleDeleteItem = async () => {
        console.log('breakdown: ', breakdown)
        console.log('id: ', _id)
        const data = await deleteBreakdown(section, _id);
        console.log(data)
        getBreakdownData();
    }

    const handleToggleEditForm = () => {
        const display = editBox.current.style.display
        editBox.current.style.display = display === 'none' ? 'block' : 'none';
    }

    const handleEditInput = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)
    }

    // const handleDatePicking = (e) => {
    //     setNewBreakdown(prev => ({...prev, date: e.$d}))
    //     setSelectedDate(e.$d)
    //     setDate(e.$d)
    // }

    return (
        <>
            <Box sx={{display: 'flex', justifyContent: 'space-evenly', textAlign: 'center', borderRadius: '5px', bgcolor: 'white', padding: '0.5rem', margin: '0.3rem'}} ref={box}>
                <Typography sx={{width: '10%', overflowX: 'auto'}}>{month < 10 ? `0${month}` : month}.{day < 10 ? `0${day}` : day}</Typography>|
                <Typography sx={{width: '20%', overflowX: 'auto'}}>{name}</Typography>|
                <Typography sx={{width: '10%', overflowX: 'auto'}}>$ {amount}</Typography>|
                <Typography sx={{width: '20%', overflowX: 'auto'}}>{category.category}</Typography>|
                <Typography sx={{width: '20%', overflowX: 'auto'}}>{sub_category ? sub_category.name : ''}</Typography>|
                <Typography sx={{width: '10%', overflowX: 'auto'}}>
                    <ModeEditIcon onClick={handleToggleEditForm} /> | <DeleteOutlineIcon onClick={handleDeleteItem} />
                </Typography>
            </Box>
            {/* <Box display={'none'} ref={editBox}>
                <Box sx={{display: 'flex', justifyContent: 'space-evenly', textAlign: 'center', borderRadius: '5px', bgcolor: '#f2ece9', padding: '0.5rem', margin: '0.3rem'}} ref={box}> */}
                    {/* <TextField variant="standard" name="date" value={editedBreakdown.date.split('T')[0]} sx={{width: '10%', overflowX: 'auto', color: 'gray'}} onChange={handleEditInput}/>|
                    <TextField variant="standard" name="name" value={editedBreakdown.name} sx={{width: '20%', overflowX: 'auto', color: 'gray', textAlign: 'center'}} onChange={handleEditInput}/>|
                    <TextField variant="standard" name="amount" value={editedBreakdown.amount} sx={{width: '10%', overflowX: 'auto', color: 'gray'}} onChange={handleEditInput}/>|
                    <TextField variant="standard" select name="category" value={editedBreakdown.category.category} sx={{width: '20%', overflowX: 'auto', color: 'gray'}} onChange={handleEditInput}>
                    </TextField>|
                    <TextField variant="standard" select name="sub_category" value={editedBreakdown.sub_category.name} sx={{width: '20%', overflowX: 'auto', color: 'gray'}} onChange={handleEditInput}>
                    </TextField>|
                    <Typography sx={{width: '10%', overflowX: 'auto'}}>
                        <CheckCircleOutlineIcon />
                    </Typography> */}
                {/* </Box>
            </Box> */}
        </>    
    )
}