import { useEffect, useState } from "react";
import { fetchData, addTodo, updateTodo, deleteTodo } from "./redux/action/action";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField, Card, CardContent, Typography, Checkbox, CardActions } from "@mui/material";

const App = () => {
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState(""); 
  const [editTodo, setEditTodo] = useState(""); 
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const todosList = useSelector((state) => state.todos);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodo({ todo: newTodo, completed: false, userId: 5 }));
      setNewTodo("");
    } else {
      alert("Todo cannot be empty");
    }
  };

  const handleUpdateTodo = (id) => {
    if (editTodo.trim()) {
      dispatch(updateTodo(id, { todo: editTodo, completed: false }));
      setEditTodo("");
      setEditId(null);
    } else {
      alert("Todo cannot be empty");
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleCheckboxChange = (id, completed, todoText) => {
    dispatch(updateTodo(id, { todo: todoText, completed: !completed }));
};


  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h1>Todo List</h1>
    <div style={{ marginBottom: "16px", display: 'flex', justifyContent: 'center' }}>
        <TextField
            label="New Todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            style={{ marginRight: "8px", width: '500px' }}
        />
        <Button variant="contained" color="primary" onClick={handleAddTodo} style={{ width: '200px' }}>
            Add Todo
        </Button>
    </div>
</div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" ,marginTop:"50px",justifyContent: 'center'}}>
        {todosList.map((data) => (
          <Card key={data.id} style={{ width: "300px" }}>
            <CardContent>
              <Typography variant="h6" component="div">
                ID: {data.id}
              </Typography>
              <Typography variant="body1" component="div" style={{ textAlign: 'center'}}>
                {data.todo}
              </Typography>
              <Checkbox
    checked={data.completed}
    onChange={() => handleCheckboxChange(data.id, data.completed, data.todo)}
/>

            </CardContent>
            <CardActions>
              {editId === data.id ? (
                <>
                  <TextField
                    label="Edit Todo"
                    value={editTodo}
                    onChange={(e) => setEditTodo(e.target.value)}
                    style={{ marginRight: "8px" }}
                  />
                  <Button variant="contained" color="secondary" onClick={() => handleUpdateTodo(data.id)}>
                    Update
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="contained" color="secondary" onClick={() => { setEditTodo(data.todo); setEditId(data.id); }}>
                    Edit
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDeleteTodo(data.id)}>
                    Delete
                  </Button>
                </>
              )}
            </CardActions>
          </Card>
        ))}
      </div>
    </>
  );
};

export default App;
