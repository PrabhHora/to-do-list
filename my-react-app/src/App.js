import React from "react";
import axios from "axios";
import './App.css';
import Container from '@mui/material/Container';
import InputArea from './components/InputArea';
import ToDoItem from './components/ToDoItem';

function App() {
  const API_URL = "http://localhost:4000/";
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    axios.get(API_URL).then((result) => {
      setList(result.data);
    });
  }, []);
  // async function viewItems() {
  //   const result = await axios.get(API_URL);
  //   setList(result.data);
  // }
  // viewItems();

  async function addItem(text) {
    const result = await axios.post(API_URL + "add", {
      text: text
    });
    setList(result.data);
  }

  async function deleteItem(id) {
    const result = await axios.delete(API_URL + `delete/${id}`);
    setList(result.data);
  }

  async function editItem(text, id) {
    const result = await axios.patch(API_URL + `edit/${id}`, {
      text: text
    });
    setList(result.data);
  }

  return (
    <div className="App">
      <header className="App-main">
      <Container className='list' maxWidth="md">
        <h1>To-Do List</h1>
        <InputArea onAdd={addItem}/>
        <ul>
          {list.map((element) => {
            return <ToDoItem onEdit={editItem} onDelete={deleteItem} key={element.id} id={element.id} text={element.item}/>
          })}
        </ul>
      </Container>
      </header>
    </div>
  );
}

export default App;
