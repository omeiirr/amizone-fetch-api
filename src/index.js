const fetchCoursesData = require('./modules/courses');
const fetchGradesData = require('./modules/grades');
const fetchFacultyData = require('./modules/faculty');
const fetchPhotoData = require('./modules/photo');
const fetchReginfoData = require('./modules/reginfo');
const fetchTodayScheduleData = require('./modules/todaySchedule');
const fetchWeekScheduleData = require('./modules/weekSchedule');
const fetchCredentialsData = require('./modules/credentials');

const dummyData = require('./dummyData.json');

const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const DEMO_TIMEOUT_DURATION = 500; // ms

/* Express Middleware */
app.use(express.json());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.post('/courses', async (req, res) => {
  const userData = await fetchCoursesData({
    username: req.body.username,
    password: req.body.password,
  });
  if (userData.error) {
    res.status(408).json({
      error: userData.error,
    });
  } else {
    res.json(userData);
  }
});

app.post('/credentials', async (req, res) => {
  const userData = await fetchCredentialsData({
    username: req.body.username,
    password: req.body.password,
  });
  if (userData.error) {
    res.status(408).json({
      error: userData.error,
    });
  } else {
    res.json(userData);
  }
});

app.post('/faculty', async (req, res) => {
  if (
    req.body.username === process.env.DEMO_USERNAME &&
    req.body.password === process.env.DEMO_PASSWORD
  ) {
    setTimeout(() => {
      res.json(dummyData['faculty']);
    }, DEMO_TIMEOUT_DURATION);
    return;
  }

  const userData = await fetchFacultyData({
    username: req.body.username,
    password: req.body.password,
  });
  if (userData.error) {
    res.status(408).json({
      error: userData.error,
    });
  } else {
    res.json(userData);
  }
});

app.post('/grades', async (req, res) => {
  if (
    req.body.username === process.env.DEMO_USERNAME &&
    req.body.password === process.env.DEMO_PASSWORD
  ) {
    setTimeout(() => {
      res.json(dummyData['grades']);
    }, DEMO_TIMEOUT_DURATION);
    return;
  }

  const userData = await fetchGradesData({
    username: req.body.username,
    password: req.body.password,
  });
  if (userData.error) {
    res.status(408).json({
      error: userData.error,
    });
  } else {
    res.json(userData);
  }
});

app.post('/photo', async (req, res) => {
  const userData = await fetchPhotoData({
    username: req.body.username,
    password: req.body.password,
  });
  if (userData.error) {
    res.status(408).json({
      error: userData.error,
    });
  } else {
    res.json(userData);
  }
});

app.post('/reginfo', async (req, res) => {
  const userData = await fetchReginfoData({
    username: req.body.username,
    password: req.body.password,
  });
  if (userData.error) {
    res.status(408).json({
      error: userData.error,
    });
  } else {
    res.json(userData);
  }
});

app.post('/schedule/today', async (req, res) => {
  const userData = await fetchTodayScheduleData({
    username: req.body.username,
    password: req.body.password,
  });
  if (userData.error) {
    res.status(408).json({
      error: userData.error,
    });
  } else {
    res.json(userData);
  }
});

app.post('/schedule/week', async (req, res) => {
  const userData = await fetchWeekScheduleData({
    username: req.body.username,
    password: req.body.password,
  });
  if (userData.error) {
    res.status(408).json({
      error: userData.error,
    });
  } else {
    res.json(userData);
  }
});

app.listen(port, () => console.log(`Running on port ${port}`));
