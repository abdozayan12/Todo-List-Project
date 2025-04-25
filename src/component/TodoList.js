import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./Todo";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


const todos = [
  {
    id: 1,
    title: "read",
    body: "sdvfdsgrs",
    isComplete: false,
  },
  {
    id: 2,
    title: "study",
    body: "fgkgcjhfd",
    isComplete: false,
  },
];

export default function TodoList() {
    const [alignment, setAlignment] = React.useState("الكل");

    const handleChange = (event, newAlignment) => {
      setAlignment(newAlignment);
    };
  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h1" component="div">
            مهامى
          </Typography>
          <Divider variant="middle" />
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="غير منجز">غير منجز</ToggleButton>
            <ToggleButton value="منجز">منجز</ToggleButton>
            <ToggleButton value="الكل">الكل</ToggleButton>
          </ToggleButtonGroup>
          <Todo />
          <Grid
            container
            spacing={2}
            sx={{ marginTop: "15px",}}
          >
            <Grid size={8}>
              <TextField
                id="outlined-basic"
                label="عنوان المهمه"
                variant="outlined"
              />
            </Grid>
            <Grid size={4} >
              <Button sx={{width: "100%", height: "100%", backgroundColor: "green"}} variant="contained">إضافة</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
