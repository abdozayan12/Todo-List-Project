import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Todo from "./Todo";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useContext, useEffect, useState, useMemo } from "react";
import { TodoContext } from "../context/TodosContext";
import { v4 as uuidv4 } from "uuid";


export default function TodoList() {
  const { todos, setToDos } = useContext(TodoContext);
  const [titleInput, setTitleInput] = useState("");
  const [displayTodosType, setDisplayTodosType] = useState("all")

  

  const completedTodos = useMemo(() => {
  return todos.filter((t) => {
    return t.isComplete;
  });
}, [todos]);

  const notCompletedTodos = todos.filter((t) => {
    return !t.isComplete;
  });

  let renderedTodos = todos
  if (displayTodosType === "completed") {
    renderedTodos = completedTodos
  } else if (displayTodosType === "non-completed") {
    renderedTodos = notCompletedTodos
  } else {
    renderedTodos = todos
  }
  const todoL = renderedTodos.map((t) => {
    return (
      <Todo
        key={t.id}
        id={t.id}
        title={t.title}
        body={t.body}
        isComplete={t.isComplete}
      />
    );
  });

  
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setToDos(storedTodos);
  }, []);

  function changeDisplayType(e) {
    setDisplayTodosType(e.target.value)
  }

  function handleAdd() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      body: "",
      isComplete: false,
    };
    const addedTodos = [...todos, newTodo];
    setToDos(addedTodos);
    localStorage.setItem("todos", JSON.stringify(addedTodos));
    setTitleInput("");
  }

  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275 }} style={{maxHeight: "80vh", overflow: "scroll"}}>
        <CardContent>
          <Typography variant="h1" component="div">
            مهامى
          </Typography>
          <ToggleButtonGroup
            style={{ direction: "ltr" }}
            color="primary"
            value={displayTodosType}
            exclusive
            onChange={changeDisplayType}
            aria-label="Platform"
          >
            <ToggleButton value="non-completed">غير منجز</ToggleButton>
            <ToggleButton value="completed">منجز</ToggleButton>
            <ToggleButton value="all">الكل</ToggleButton>
          </ToggleButtonGroup>

          {todoL}
          <Grid container spacing={2} sx={{ marginTop: "15px" }}>
            <Grid size={8}>
              <TextField
                id="outlined-basic"
                label="عنوان المهمه"
                variant="outlined"
                value={titleInput}
                onChange={(e) => {
                  setTitleInput(e.target.value);
                }}
              />
            </Grid>
            <Grid size={4}>
              <Button
                sx={{ width: "100%", height: "100%", backgroundColor: "green" }}
                variant="contained"
                onClick={() => {
                  handleAdd();
                }}
                disabled={titleInput == 0}
              >
                إضافة
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
