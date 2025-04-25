import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useContext } from "react";
import { TodoContext } from "../context/TodosContext";

export default function Todo({ id, title, body, isComplete }) {
  const { todos, setToDos } = useContext(TodoContext);

  function handleCheckClick(todoId) {
    const updateTodo = todos.map((t) => {
      if (t.id === todoId) {
        return { ...t, isComplete: !t.isComplete };
      }
      return t;
    });
    setToDos(updateTodo);
  }
  return (
    <>
      <Card
        sx={{
          minWidth: 275,
          marginTop: "20px",
          backgroundColor: "#283593",
          color: "white",
        }}
      >
        <CardContent>
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              direction: "ltr",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Grid
              xs={4}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <IconButton
                className="iconBtn"
                style={{
                  backgroundColor: "white",
                  color: "#b23c17",
                  border: "solid #b23c17 3px",
                }}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                className="iconBtn"
                style={{
                  backgroundColor: "white",
                  color: "#1769aa",
                  border: "solid #1769aa 3px",
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                className="iconBtn"
                style={{
                  backgroundColor: isComplete ? "#8bc34a" : "white",
                  color: isComplete ? "whitesmoke" : "#8bc34a",
                  border: "solid #8bc34a 3px",
                }}
                onClick={() => handleCheckClick(id)}
              >
                <CheckIcon />
              </IconButton>
            </Grid>
            <Grid xs={8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "right",
                  padding: "20px",
                  borderRadius: "10px",
                }}
                component="div"
              >
                {title}{" "}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  textAlign: "right",
                  padding: "20px",
                  borderRadius: "10px",
                }}
                component="div"
              >
                {body}{" "}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
