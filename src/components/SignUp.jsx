import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import axios from 'axios';

const URL = "https://lambda-cs25-mud.herokuapp.com/api/registration/";

const ImgStyle = styled.div`
  img {
    width: 86px;
    height: 100px;
  }
`;

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: "#FFFFFF"
    }
  },
  paper: {
    marginTop: theme.spacing(2),
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
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function SignUp(props) {
  const classes = useStyles();
  const [password1, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [username, setUsername] = useState("");
  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();

	const packet = {
		password1,
		password2,
		username
	};

    axios.post(URL, packet)
    .then(res => {
		localStorage.setItem('token', res.data.key)
		history.push("/game");
	})
    .catch(err => console.log(err))
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <ImgStyle>
          <img src='https://events.durhamcountylibrary.org/images/events/dcl/gaming.png' alt="yot" />
        </ImgStyle>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="Current Password"
                value={password1}
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmpassword"
                label="Confirm Password"
                type="password"
                id="confirmpassword"
                autoComplete="Confirm Password"
                value={password2}
                onChange={e => setPassword2(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ color: "#FFFFFF", backgroundColor: "#25aae1" }}
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                onClick={() => history.push("/signin")}
                variant="body2"
                style={{ cursor: "pointer" }}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignUp;
