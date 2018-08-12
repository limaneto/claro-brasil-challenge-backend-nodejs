/* eslint-disable prefer-arrow-callback,func-names */
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const assert = require('assert');
const config = require('../../config/config');

const User = require('../user/model');
const Device = require('./model');

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
  it('should not add device without user info', function (done) {
    const device = new Device({ name: 'xdfrthukgepjg357j', os: 'ios' });
    request(app)
      .post('/api/devices')
      .send({ device })
      .set('Accept', 'application/json')
      .expect(400)
      .then((response) => {
        assert.ok(response.body.message.toLowerCase().indexOf('user') !== -1);
        done();
      });
  });

  it('should check that latter device was not added', function (done) {
    Device
      .findOne({ name: 'xdfrthukgepjg357j' })
      .then((device) => {
        assert.ok(device === null);
        done();
      });
  });

  it('should not add device with wrong o. system info', function (done) {
    const device = new Device({ name: 'ikuyjtreefdc', os: 'windows' });
    request(app)
      .post('/api/devices')
      .send({ userId: testUser.id, device })
      .set('Accept', 'application/json')
      .expect(400)
      .then((response) => {
        assert.ok(response.body.message.toLowerCase().indexOf('enum') !== -1);
        done();
      });
  });

  it('should check that latter device was not added', function (done) {
    Device
      .findOne({ name: 'ikuyjtreefdc' })
      .then((device) => {
        assert.ok(device === null);
        done();
      });
  });

  it('should add 3 devices with the same user', function (done) {
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

  it('should only have 3 devices on the database', function (done) {
    Device
      .find()
      .then((devices) => { assert.equal(devices.length, 3); done(); })
      .catch((err) => { done(err); });
  });

  it('should check that database devices match the ones added', function (done) {
    Device
      .find()
      .then((devices) => {
        devices.forEach(function (item, index) {
          const device = devices.filter(currentDevice => currentDevice.name === `Xiomi Mi ${index}` && (currentDevice.user + '') === testUser.id);
          assert.equal(device.length, 1);
        });
        done();
      })
      .catch((err) => { done(err); });
  });

  it('should not be able to add a fourth', function (done) {
    const device = new Device({ name: 'xdfrthukgepjg357j', os: 'ios' });
    request(app)
      .post('/api/devices')
      .send({ userId: testUser.id, device })
      .set('Accept', 'application/json')
      .expect(400)
      .then((response) => {
        assert.ok(response.body.message.toLowerCase().indexOf('limit') !== -1);
        done();
      });
  });

  it('should delete a device', function (done) {
    request(app)
      .delete(`/api/devices/${testDevices[0]._id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        assert.ok(response.body.message.toLowerCase().indexOf('deleted') !== -1);
        done();
      });
  });

  it('should check if latter device was deleted', function (done) {
    Device
      .findById(testDevices[0]._id)
      .then((device) => {
        assert.ok(device.active === false);
        done();
      });
  });

  it('should add a fourth', function (done) {
    const device = new Device({ name: 'olikyujthrgt', os: 'android' });
    request(app)
      .post('/api/devices')
      .send({ userId: testUser.id, device })
      .set('Accept', 'application/json')
      .expect(201)
      .then((response) => {
        testDevices.push(response.body.device);
        assert.equal(response.body.message, 'Device registered with success!');
        assert.equal(typeof response.body.device, 'object');
        assert.equal(response.body.device.user, testUser.id);
        assert.equal(response.body.device.active, true);
        assert.equal(response.body.device.name, 'olikyujthrgt');
        assert.equal(response.body.device.os, 'android');
        done();
      })
      .catch(err => done(err));
  });

  it('should not be able to add a fifth', function (done) {
    const device = new Device({ name: 'xdfrthukgepjg357j', os: 'ios' });
    request(app)
      .post('/api/devices')
      .send({ userId: testUser.id, device })
      .set('Accept', 'application/json')
      .expect(400)
      .then((response) => {
        const limit = response.body.message.toLowerCase().indexOf('limit') !== -1;
        const days = response.body.message.toLowerCase().indexOf('30') !== -1;
        const noChange = response.body.message.toLowerCase().indexOf('cannot change') !== -1;
        assert.ok(limit && days && noChange);
        done();
      });
  });
});
