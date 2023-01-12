import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

export default class Progress extends React.Component {
  render() {
    return (
      <Stack sx={{ color: "grey.500" }} spacing={2} style={{alignItems:'center'}} >
        <CircularProgress color="inherit" />
      </Stack>
    );
  }
}
