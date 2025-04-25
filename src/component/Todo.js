import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useContext, useState} from "react";
import { TodoContext } from "../context/TodosContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Todo({ id, title, body, isComplete }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({ title: "", body: "" });
  const { todos, setToDos } = useContext(TodoContext);

  function handleCheckClick(todoId) {
    const updateTodo = todos.map((t) => {
      if (t.id === todoId) {
        return { ...t, isComplete: !t.isComplete };
      }
      return t;
    });
    localStorage.setItem("todos", JSON.stringify(updateTodo));
    setToDos(updateTodo);
  }

  function handleDelete() {
    setShowDeleteDialog(true);
  }

  function handleEdite(id) {
    const current = todos.find((t) => t.id === id);
    setUpdatedTodo({ title: current.title, body: current.body });
    setShowUpdateDialog(true);
  }

  function handleDeleteClose() {
    setShowDeleteDialog(false);
  }

  function handleUpdateClose() {
    setShowUpdateDialog(false);
  }

  function handleConfirmDelete(todoId) {
    const updatedTodosAfterDelete = todos.filter((t) => {
      return t.id !== todoId;
    });
    localStorage.setItem("todos", JSON.stringify(updatedTodosAfterDelete));
    setToDos(updatedTodosAfterDelete);
  }

  function handleConfirmUpdate(todoId) {
    const updatedTodos = todos.map((t) => {
      if (t.id === todoId) {
        return { ...t, title: updatedTodo.title, body: updatedTodo.body };
      }
      return t;
    });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setToDos(updatedTodos);
    setShowUpdateDialog(false); // close dialog after update
  }

  return (
    <>
      {/* delete Dialog */}
      <Dialog
        style={{ direction: "rtl" }}
        onClose={handleDeleteClose}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل انت متاكد من الحذف؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            اضغط على زر تاكيد الحذف فى حاله رغبتك فى حذف المهمه او اضغط الغاء
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            className="iconBtn"
            style={{ backgroundColor: "green", color: "white" }}
            onClick={handleDeleteClose}
          >
            الغاء
          </Button>
          <Button
            className="iconBtn"
            style={{ backgroundColor: "red", color: "white" }}
            autoFocus
            onClick={() => {
              handleConfirmDelete(id);
            }}
          >
            تاكيد الحذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* delete Dialog */}

      {/* edite Dialog */}
      <Dialog
        style={{ direction: "rtl" }}
        onClose={handleUpdateClose}
        open={showUpdateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          قم بادخال البانات الجديدة
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            label="ادخل العنوان الجديد"
            type="text"
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="body"
            name="body"
            label="تفاصيل المهمه "
            type="text"
            fullWidth
            variant="standard"
            value={updatedTodo.body}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, body: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            className="iconBtn"
            style={{ backgroundColor: "green", color: "white" }}
            onClick={handleUpdateClose}
          >
            الغاء
          </Button>
          <Button
            className="iconBtn"
            style={{ backgroundColor: "red", color: "white" }}
            autoFocus
            onClick={() => {
              handleConfirmUpdate(id);
            }}
          >
            تاكيد التعديل
          </Button>
        </DialogActions>
      </Dialog>
      {/* edite Dialog */}
      <Card
        sx={{
          minWidth: 275,
          marginTop: "20px",
          backgroundColor: "#283593",
          color: "white",
        }}
      >
        <CardContent
          style={{
            backgroundColor: isComplete ? "#f1f8e9" : "none",
            color: isComplete ? "#33691e" : "none",
          }}
        >
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
                onClick={handleDelete}
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
                onClick={() => handleEdite(id)}
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
                  textDecoration: isComplete ? "line-through" : "none",
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
                  textDecoration: isComplete ? "line-through" : "none",
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
