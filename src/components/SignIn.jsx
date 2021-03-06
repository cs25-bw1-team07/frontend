import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import axios from 'axios';

const URL = "https://lambda-cs25-mud.herokuapp.com/api/login/";

const ImgStyle = styled.div`
  img {
    width: 86px;
    height: 100px;
  }
`;

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#27AF55"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function SignIn(props) {
  const classes = useStyles();
  const history = useHistory();
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit (e) {
    e.preventDefault();
	const packet = {
		"username": username,
		"password": password
	};
    axios.post(URL, packet, {headers: 
		{ "Content-Type": "application/json" }
	})
    .then(res => {
		localStorage.setItem('token', res.data.key)
		console.log("Here is the res for login: ", res);
		history.push("/game");
	})
    .catch(err => console.log(err))
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <ImgStyle>
          <img src={'https://events.durhamcountylibrary.org/images/events/dcl/gaming.png'} alt="yeet" />
        </ImgStyle>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {/* {props.isLoading && <Spinner />} */}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="user"
            label="Username"
            name="user"
            autoComplete="user"
            autoFocus
            value={username}
            onChange={e => setUser(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ color: "#FFFFFF", backgroundColor: "#25aae1" }}
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                onClick={() => history.push("/signup")}
                variant="body2"
                style={{ cursor: "pointer" }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignIn
