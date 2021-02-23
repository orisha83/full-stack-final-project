const express = require('express');
var cors = require('cors')

const usersRouter = require('./Routers/usersRouter');
const moviesRouter = require('./Routers/moviesRouter');
const membersRouter = require('./Routers/membersRouter');
const subscriptionRouter = require('./Routers/subscriptionsRouter');

var app = express();

require('./configs/database')

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', usersRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/members', membersRouter);
app.use('/api/subscriptions', subscriptionRouter);

app.listen(5000);