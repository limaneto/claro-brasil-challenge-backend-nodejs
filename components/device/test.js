require('babel-core/register');
require('babel-polyfill');

let request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
import assert from 'assert';
import config from '../../config/config';

import User from '../user/model';
import Device from './model';

let testUser;
const testDevices = [];

describe('set config', function () {
  before(function (done) {
    const db = mongoose.connection;
    mongoose.connect(`mongodb://${config.DB_HOST}:${config.DB_SERVER_PORT}/${config.DB_NAME}`, { connectTimeoutMS: 30000, keepAlive: 300000, promiseLibrary: global.Promise, useNewUrlParser: true });
    db.on('error', (err) => { console.log('Erro on MongoDB connection', err); });
    db.once('open', function() {
      db.dropDatabase();
      done();
    });
  });

  it('create test user', function (done) {
    const user = new User();
    user.save(() => {
      testUser = user;
      done();
    });
  });
});

describe('POST devices', function () {
  it('add device without user info', function (done) {
    const device = new Device({ name: 'xdfrthukgepjg357j', os: 'ios' });
    request(app)
      .post('/api/devices')
      .send({ device })
      .set('Accept', 'application/json')
      .expect(400, function (err, response) {
        assert.ok(response.body.message.toLowerCase().indexOf('user') !== -1);
        done();
      });
  });

  it('check that latter device was not added', function (done) {
    Device
      .findOne({ name: 'xdfrthukgepjg357j' })
      .then((device) => {
        assert.ok(device === null);
        done();
      });
  });

  it('add device with wrong o. system info', function (done) {
    const device = new Device({ name: 'ikuyjtreefdc', os: 'windows' });
    request(app)
      .post('/api/devices')
      .send({ userId: testUser.id, device })
      .set('Accept', 'application/json')
      .expect(400, function (err, response) {
        assert.ok(response.body.message.toLowerCase().indexOf('enum') !== -1);
        done();
      });
  });

  it('check that latter device was not added', function (done) {
    Device
      .findOne({ name: 'ikuyjtreefdc' })
      .then((device) => {
        assert.ok(device === null);
        done();
      });
  });

  it('add 3 devices with the same user', function (done) {
    for (let i = 0; i < 3; i += 1) {
      const device = new Device({ name: `Xiomi Mi ${i}`, os: 'android' });
      request(app)
        .post('/api/devices')
        .send({ userId: testUser.id, device })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .then((response) => {
          testDevices.push(response.body.device);
          assert.equal(response.body.message, 'Device registered with success!');
          assert.equal(typeof response.body.device, 'object');
          assert.equal(response.body.device.user, testUser.id);
          assert.equal(response.body.device.active, true);
          assert.equal(response.body.device.name, `Xiomi Mi ${i}`);
          assert.equal(response.body.device.os, 'android');
          if (i === 2) done();
        });
    }
  });

  it('there are 3 and only 3 devices saved?', function (done) {
    Device
      .find()
      .then((devices) => { assert.equal(devices.length, 3); })
      .catch((err) => { done(err); })
      .finally(done);
  });

  it('devices matches the ones added?', function (done) {
    Device
      .find()
      .then((devices) => {
        devices.forEach(function (item, index) {
          const device = devices.filter(currentDevice => currentDevice.name === `Xiomi Mi ${index}` && (currentDevice.user + '') === testUser.id);
          assert.equal(device.length, 1);
        });
      })
      .catch((err) => { done(err); })
      .finally(done);
  });

  it('cannot add a fourth device within 30 days', function (done) {
    const device = new Device({ name: 'xdfrthukgepjg357j', os: 'ios' });
    request(app)
      .post('/api/devices')
      .send({ userId: testUser.id, device })
      .set('Accept', 'application/json')
      .expect(400, function (err, response) {
        assert.ok(response.body.message.toLowerCase().indexOf('limit') !== -1);
        done();
      });
  });

  it('delete device after adding 3', function (done) {
    request(app)
      .post(`/api/devices/${testDevices[0].id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, function (response) {
        console.log(response.body);
        done();
      });
  });
});
