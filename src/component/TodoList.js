import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

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
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Container>
  );
}
