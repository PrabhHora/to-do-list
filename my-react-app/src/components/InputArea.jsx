import React from "react";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import "../App.css"

function InputArea(props) {
    const [inputText, setInputText] = React.useState("");

    function handleChange(event) {
        setInputText(event.target.value);
    }

    return (
        <div>
            <input onChange={handleChange} type="text" placeholder="Add task..." value={inputText}/>
            <Fab onClick={() => {
                if (inputText !== "") {
                    props.onAdd(inputText);
                }
                setInputText("");
            }} id="addButton">
                <AddIcon />
            </Fab>
        </div>
    )
 }

export default InputArea;