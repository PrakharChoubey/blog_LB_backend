// Copyright IBM Corp. 2016,2019. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');
const {Principal} = require('loopback');

const app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

// console.log(Object.keys(app.models.User));

app.models.user.find((err, result)=>{
  if (result.length === 0) {
    app.models.user.create({
      email: 'nick12@gmail.com',
      password: 'test',
      username: 'nick',
    }, (err, result)=>{
      if (!err && result) {
        console.log('CREATED auto user', result);
      } else {
        console.log('EROOORRRRR in auto-user', err);
      }
    });
  }
});

app.models.user.afterRemote('create', (ctx, user, next) => {
  console.log('new user is', user);

  app.models.Profile.create({
    firstName: user.username,
    name: user.name,
    createdAt: new Date(),
    userId: user.id,
    role: 'subscriber',
  }, (err, result)=>{
    if (!err && result) {
      console.log('CREATED NEW PROFILE', result);
    } else {
      console.log('EROOORRRRR', err);
    }
    next();
  });
});

app.models.Role.find({where: {name: 'admin'}}, (err, role)=>{
  if (!err && role) {
    console.log('no error role is', role);
    if (role.length === 0) {
      app.models.Role.create({
        name: 'admin',
      }, (err2, result)=>{
        if (!err2 && result) {
          app.models.user.findOne((usererr, user)=>{
            if (!usererr && user) {
              console.log('Result got from role created--', result);
              result.principals.create({
                principalType: app.models.RoleMapping.USER,
                principalId: user.id,
              }, (err3, principal)=>{
                console.log('Created Principal', err3, principal);
              });
            }
          });
        }
      });
    }
  }
});

app.models.Role.find({where: {name: 'editor'}}, (err, roles)=>{
  if (!err && roles) {
    if (roles.length === 0) {
      app.models.Roles.create({
        name: 'editor',
      }, (creationErr, result)=>{
        console.log(creationErr, result);
      });
    }
  }
});
