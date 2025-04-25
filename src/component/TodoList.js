import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ToggleButton from "@mui/material/ToggleButton";
import Todo from "./Todo";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { TodoContext } from "../context/TodosContext";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const { todos, setToDos } = useContext(TodoContext);
  const [titleInput, setTitleInput] = useState("");
  const todoL = todos.map((t) => {
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

  function handleAdd() {
    if (!titleInput.trim()) {
      alert("Please enter a title for the task.");
      return;
    }
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      body: "",
      isComplete: false,
    };
    setToDos([...todos, newTodo]);
    setTitleInput("");
  }

  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h1" component="div">
            مهامى
          </Typography>

          <ToggleButton value="غير منجز">غير منجز</ToggleButton>
          <ToggleButton value="منجز">منجز</ToggleButton>
          <ToggleButton value="الكل">الكل</ToggleButton>

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
