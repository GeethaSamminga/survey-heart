
import axios from "axios";

export const FETCH_TODOS = "FETCH_TODOS";
export const ADD_TODO = "ADD_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const DELETE_TODO = "DELETE_TODO";

// Fetch all to-dos
export const fetchData = () => async (dispatch) => {
  try {
    const result = await axios.get("https://dummyjson.com/todos");
    dispatch({
      type: FETCH_TODOS,
      payload: result.data.todos,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// add todo
export const addTodo = (newTodo) => async (dispatch, getState) => {
  console.log("New Todo:", newTodo);

  try {
      const currentTodos = getState().todos;

      const newId = currentTodos.length + 1;

      const result = await axios.post(
          "https://dummyjson.com/todos/add",
          {
              id: newId,
              todo: newTodo.todo,
              completed: newTodo.completed || false,
              userId: newTodo.userId || 1,
          },
          {
              headers: {
                  'Content-Type': 'application/json',
              },
          }
      );

      dispatch({
          type: ADD_TODO,
          payload: { ...result.data, id: newId }, // Removed the stray 'c'
      });
  } catch (error) {
      console.error("Error adding todo:", error.response ? error.response.data : error);
  }
};


// Update an existing to-do
export const updateTodo = (todoId, updatedTodo) => async (dispatch) => {
    try {
      const result = await axios.put(
        `https://dummyjson.com/todos/${todoId}`,
        updatedTodo,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      dispatch({
        type: UPDATE_TODO,
        payload: result.data,
      });
    } catch (error) {
      console.error("Error updating todo:", error.response ? error.response.data : error);
    }
  };

// Delete a to-do
export const deleteTodo = (todoId) => async (dispatch) => {
    try {
      await axios.delete(`https://dummyjson.com/todos/${todoId}`);
      dispatch({
        type: DELETE_TODO,
        payload: todoId,
      });
    } catch (error) {
      console.error("Error deleting todo:", error.response ? error.response.data : error);
    }
  };