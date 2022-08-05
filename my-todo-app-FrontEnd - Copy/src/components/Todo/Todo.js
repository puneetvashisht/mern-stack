import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Delete from "@mui/icons-material/DeleteSharp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodo,
  fetchTodo,
  patchTodo,
  postTodo,
} from "../../actions/action";

export default function Todo() {
  const state = useSelector((state) => state);
  console.log("state", state);
  const dispatch = useDispatch();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  // const [todos, setTodos] = React.useState([]);
  React.useEffect(() => {
    dispatch(fetchTodo(state.userReducer.user.userId));
  }, []);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleClick = (e) => {
    dispatch(postTodo({ title, description }, state.userReducer.user.userId));
  };

  const todoDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const todoDone = (value) => {
    dispatch(patchTodo(value));
  };

  const todoText = "TODO";

  const customList = (items, text) => (
    <Paper
      sx={{ width: 200, height: 300, overflow: "auto", marginTop: "3rem" }}
    >
      <TextField
        disabled
        id="filled-disabled"
        label=""
        defaultValue={text}
        variant="filled"
      />
      <List dense component="div" role="list">
        {items.map((value, i) => {
          const labelId = `transfer-list-item-${value}-label`;

          console.log("item", value);
          return (
            <ListItem key={i} role="listitem" button>
              <ListItemText
                sx={value.done ? { textDecoration: "line-through" } : {}}
                id={labelId}
                primary={`${value.title}`}
              />
              <ListItemText id={labelId} primary={`${value.description}`} />
              <CheckCircleIcon onClick={() => todoDone(value)} />
              <Delete onClick={() => todoDelete(value._id)} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginTop: "3rem",
          }}
        >
          <TextField
            fullWidth
            label="Enter Title"
            id="fullWidth"
            value={title}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            fullWidth
            label="Enter Description"
            id="fullWidth"
            value={description}
            onChange={(e) => handleDescription(e)}
          />
        </Box>
        <Button
          variant="contained"
          color="success"
          onClick={(e) => handleClick(e)}
          sx={{
            marginTop: "3rem",
            marginLeft: "3rem",
          }}
        >
          Add Todo
        </Button>
      </Grid>

      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>{customList(state.todoReducer.todos, todoText)}</Grid>
        <Grid item></Grid>
      </Grid>
    </>
  );
}
