import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { MultipleSelect } from "./exportIndex";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import "./Form.scss";
import { publicRequest } from "../../requestCalls";
import { Alert } from "@mui/material";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import { blue } from "@mui/material/colors";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selections, theme) {
  return {
    fontWeight:
      selections?.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Md. Yeasin
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function EditForm() {
  let { uId } = useParams();
  const theme = useTheme();
  const [selections, setSelections] = useState([]);
  const [names, setNames] = useState([]);
  const [responseUserData, setResponseUserData] = useState();
  const [agreed, setAgreed] = useState(false);
  const [errmsg, setErrmsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!data.get("firstName") || selections.length < 1) {
      setErrmsg(`Please Fill Every Section`);
    } else if (!agreed) {
      setErrmsg(`Please agree to the terms`);
    } else {
      const userData = {
        userName: data.get("firstName"),
        agreed: agreed,
        selectedSectors: selections,
      };
      setLoading(true);
      try {
        const res = await publicRequest.put(
          `/users/update-userdata/${uId}`,
          userData
        );
        // setLoading(false);
        setSuccessMsg(true);
        // // setTimeout(() => {
        // //   history.push(`/edit-form/${res.data._id}`);
        // // }, 2000);
      } catch (error) {}
    }
  };
  useEffect(() => {
    //getting sectors data===
    const getSectors = async () => {
      try {
        const res = await publicRequest.get("/sectors/get-sectors");
        setNames(res.data[0].sectors);
      } catch (error) {
        console.log(error);
      }
    };
    //getting user data===
    const getUserData = async () => {
      try {
        const response = await publicRequest.get(`/users/get-userdata/${uId}`);
        setResponseUserData(response.data);
        // setTimeout(() => {
        setSelections(response.data?.selectedSectors.map((i) => i));
        // }, 3000);
      } catch (error) {}
    };
    getSectors();
    getUserData();
  }, []);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelections(typeof value === "string" ? value.split(",") : value);
  };
  //   console.log("response", responseUserData);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" color="#1565C0">
            You can edit your name and selected sectors
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={11}>
                <input
                  type="text"
                  autoComplete="given-name"
                  name="firstName"
                  id="firstName"
                  className="edit-form-nameInput"
                  placeholder={`${responseUserData?.userName}`}
                />
              </Grid>
              <Grid item xs={11}>
                <FormControl style={{ width: "100%" }}>
                  <InputLabel id="demo-multiple-chip-label">Sectors</InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={selections}
                    onChange={handleChange}
                    input={
                      <OutlinedInput
                        id="select-multiple-chip"
                        label="Sectors"
                      />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {names.map((name) => (
                      <MenuItem
                        key={name._id}
                        value={name.sectorName}
                        style={getStyles(name, selections, theme)}
                      >
                        {name.sectorName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={11}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      onChange={(e) => {
                        e.preventDefault();
                        setAgreed(!agreed);
                      }}
                    />
                  }
                  label="Agree to terms"
                />
              </Grid>
              <Grid item xs={11}>
                {successMsg ? (
                  <Alert severity="success">Edits Saved Successfully</Alert>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={11}>
                {errmsg ? (
                  <div className="error-sending-msg input-field">
                    <p>
                      <WarningRoundedIcon />
                      {errmsg}
                    </p>

                    <span onClick={() => setErrmsg("")}>
                      <CancelRoundedIcon />
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>

            <Button
              type="submit"
              style={{ width: "92%" }}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              save edits
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {/* <img src={require("./images/draw1.webp")} alt="" /> */}
    </ThemeProvider>
  );
}
