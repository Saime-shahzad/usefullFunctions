// import * as React from 'react';
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
// import Link from '@mui/material/Link';
import ListItem from "@mui/material/ListItem";
import Collapse from "@mui/material/Collapse";
import ListItemText from "@mui/material/ListItemText";
// import Typography from '@mui/material/Typography';
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
// import excel from 'xlsx';
import * as XLSX from "xlsx";

// import axios from 'axios';
// import Breadcrumbs from '@mui/material/Breadcrumbs';
import {
  Link as RouterLink,
  // Route,
  //   Routes,
  MemoryRouter,
  // useLocation,
} from "react-router-dom";
import Buttons from "../Buttons/Buttons";

const breadcrumbNameMap = {
  "/inbox": "Upload-Assett",
  "/inbox/important": "Important",
};

function ListItemLink(props) {
  const { to, open, ...other } = props;
  const primary = breadcrumbNameMap[to];

  let icon = null;
  if (open != null) {
    icon = open ? <ExpandLess /> : <ExpandMore />;
  }

  return (
    <li>
      <ListItem button component={RouterLink} to={to} {...other}>
        <ListItemText primary={primary} />
        {icon}
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  open: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

export default function UploadAset() {
  const [file, setFile] = useState();
  const [open, setOpen] = React.useState(false);
  console.log("file", file);

  ///UploAd FIle
  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  async function handleSubmit(event) {
    event.preventDefault();
    // const url = 'http://localhost:3000/uploadFile';
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    console.log(formData.get("file"));

    ////Read Excel FIle////
    const reader = new FileReader();
    reader.onload = (e) => {
      var data = e.target.result;
      console.log("data>>", data);
      // evt = on_file_select event
      /* Parse data */
      var workbook = XLSX.read(data, { type: "binary" });
      console.log("workbook", workbook);
      var firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  
      // header: 1 instructs xlsx to create an 'array of arrays'
      var result = XLSX.utils.sheet_to_row_object_array(firstSheet);
      /* Update state */
  
      console.log("Data>>>", result);
  
      console.log("Data>>>", JSON.stringify(result, "", 4));
    };
    reader.readAsBinaryString(file);

    // var data = e.target.result;



    ////CLosed

    // axios.post( formData).then((response) => {
    //   console.log("response.data, response.data");
    // });
  }
  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  ////CLosed

  return (
    <MemoryRouter initialEntries={["/inbox"]} initialIndex={0}>
      <Box sx={{ display: "flex", flexDirection: "column", width: 360 }}>
        {/* <Routes>
          <Route path="*" element={<Page />} />
        </Routes> */}
        <Box
          sx={{
            bgcolor: "background.paper",
            mt: 1,
          }}
          component="nav"
          aria-label="mailbox folders"
        >
          <List>
            <ListItemLink to="/inbox" open={open} onClick={handleClick} />
            <Collapse component="li" in={open} timeout="auto" unmountOnExit>
              <List disablePadding>
                {/* <ListItemLink sx={{ pl: 4 }} to="/inbox/important" /> */}
                <h4>Upload Your File Here</h4>
                <form onSubmit={handleSubmit}>
                  <input type="file" onChange={handleChange} />
                  {/* <button type="submit">Upload</button> */}
                  <Buttons text="Upload" type="submit" />
                </form>
              </List>
            </Collapse>
          </List>
        </Box>
      </Box>
    </MemoryRouter>
  );
}
