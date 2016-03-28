import bodyParser from 'body-parser';
import connectMongo from 'connect-mongo';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import morgan from 'morgan';
import multer from 'multer';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import path from 'path';
import session from 'express-session';

import config from '../../useConfig';
import middleware from './middleware';
import parseSettings from '../helpers/parse-settings';
import routers from './routers';
import safeHtmlString from '../helpers/safe-html-string';
import schema from './schema';
import SettingModel from './models/setting';
import {UserModel} from './models';

var app = express();

app.use(morgan('short'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: 100000000}));
app.use(function (req,res,next) {

  next();
});
// View engine
app.set('views', path.join(__dirname, '../components'));

// session
var MongoStore = connectMongo(session);
app.use(session({
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 24*3600*1000},
  secret: 'Is very secret',
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Static files
app.use(express.static(path.join(__dirname, '../../public')));
app.use(['favicon.ico', '/images*', '/media*', '/css*', '/fonts*', '/js*'], (req, res, next) => {
  res.status(404).end();
});
app.use(function (req, res, next) {
  next();
});
// Multer
app.use('/graphql', multer({ dest: './uploads/' }).single('file'));

// GraphqQL server
app.use('/graphql', graphqlHTTP(req => ({
  schema: schema.getSchema(),
  rootValue: {
    isAuthenticated: req.isAuthenticated(),
    user: req.user,
    file: req.file
  },
	formatError: (error) => {
		console.log('=================================errors', error);
		return error;
	},
	graphiql: true

})));

app.use(async (req, res, next) => {
  const settingsArr = await SettingModel
      .find({
        _id: {$in: ['title', 'favicon']}
      })
      .exec();
  const settings = parseSettings(settingsArr);

  res.locals.header = [
    {
      tag: 'title',
      content: settings.title && safeHtmlString(settings.title) || '元子育儿'
    }
  ];

  if (process.env.NODE_ENV !== 'production') {
    res.baseScriptsURL = `http://localhost:${config.devPort}`;
    res.locals.header.push({
      tag: 'script',
      props: {
        src: `${res.baseScriptsURL}/webpack-dev-server.js`
      }
    });
  } else {
    res.baseScriptsURL = '';
  }

  // footer
  res.locals.footer = [{
    tag: 'script',
    props: {
      src: `${res.baseScriptsURL}/js/common.js`
    }
  }];

  next();
});

app.use(middleware.fonts);
app.use(middleware.googleAnalytics);
passport.use(new LocalStrategy(function (username, password, done) {
        UserModel.findOne({
            'account.username': username,
            '_plainPassword': password

        }, function (err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false);
            }

            if (user.isDel === '不正常' || user.role === 'consumer') {
                return done(null, false);
            }

            return done(null, user);
        });
    })
);
passport.serializeUser(function(user, done){
  done(null, user._id);
});
passport.deserializeUser(function(userId, done){
  UserModel.findById(userId, function(err, user) {
    done(err, user);
  });
});
app.use(routers.authRouter);
app.use(routers.adminRouter);
app.use(routers.publicRouter);

app.use((req, res, next) => {
  res.status(404).end();
});

app.use((error, req, res) => {
  var statusCode = error.statusCode || 500;
  var err = {
    error: statusCode,
    message: error.message
  };
  if (!res.headersSent) {
    res.status(statusCode).send(err);
  }
});

export default app;
