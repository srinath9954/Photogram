import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { getPosts } from './actions/posts';
import useStyles from './styles';
import memories from './images/memories.png';

const Home = ({ setCurrentId, currentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate(); // Use useNavigate inside Home component


  useEffect(() => {
    dispatch(getPosts());
    document.title = "Photogram";
  }, [currentId, dispatch]);

  return (
    <>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">Photogram</Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
        <Button variant="contained" color="secondary" onClick={() => navigate('/login')}>Login</Button> &nbsp;
        <Button variant="contained" color="secondary" onClick={() => navigate('/register')}>Register</Button>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  );
};

const App = () => {
  const [currentId, setCurrentId] = useState(0);

  return (
    <Router>
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home setCurrentId={setCurrentId} currentId={currentId} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
