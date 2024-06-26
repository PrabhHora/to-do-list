import React from "react";
import Checkbox from '@mui/material/Checkbox';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import "../App.css";

function ToDoItem(props) {
    const [isChecked, setChecked] = React.useState(false);
    const [editMode, setEditMode] =React.useState(false);
    const [text, setText] = React.useState(props.text);

    function handleChange(event) {
        setText(event.target.value);
    }

    function handleClick(event) {
        if(editMode) {
            if(text !== "") {
                props.onEdit(text, props.id);
            } else {
                props.onDelete(props.id);
            }
        }
        setEditMode(!editMode);
    }

    return (
    <div className="item">
        {!editMode && <Checkbox onChange={() => {
           setChecked(!isChecked);
           props.onDelete(props.id);
        }} checked={isChecked}/>}
        {editMode ?
            <input onChange={handleChange} type="text" value={text}/> :
            <li>{text}</li>
        }
        <Fab id="btn" onClick={handleClick} size="small">
        {editMode ?
            <DoneIcon /> :
            <EditIcon />
        }
        </Fab>
    </div>
    )
}

export default ToDoItem;