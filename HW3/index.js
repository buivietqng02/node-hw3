const path = require('path');
const assert = require('assert');
const faker = require('faker');
const kill = require('kill-port');
const { parseOpenAPIdoc, prepareRequests } = require('../../utils');
const { Test } = require('../../models/test')

module.exports = async () => {
  await kill(8080, 'tcp');
  
  const openApiPath = path.resolve(__dirname, 'openapi.yaml');
  const doc = await parseOpenAPIdoc(openApiPath);
  const operations = prepareRequests(doc);

  const validate = async (app) => {
    const name = app.getName();
    const projectId = app.getProjectId();

    try {
      await app.fetchRepo();
      await app.validateMainFiles();
      await app.installDependencies();
      await app.start();

      const shipperEmail = faker.internet.email();
      const shipperPassword = '123456';

      const driverEmail = `d${faker.internet.email()}`;
      const driverPassword = '654321';

      const shipperRole = 'SHIPPER';
      const driverRole = 'DRIVER';

      const SPRINTER = 'SPRINTER';

      let shipperToken = '';
      let driverToken = '';

      const test = new Test(operations, '127.0.0.1', '8080');

      await test
          .call('createProfile', {email: shipperEmail, password: shipperPassword, role: shipperRole});

      test.validateResponseBody((response) => {
        assert.notStrictEqual(
            response.body.message,
            undefined,
            'Message property is required in response',
        );
        assert.notStrictEqual(
            response.body.message,
            null,
            'Message property is required in response',
        );
      }, 5);

      await test.call('login', {email: shipperEmail, password: shipperPassword});
      test.validateResponseBody((response) => {
        assert.notStrictEqual(response.body.jwt_token, undefined, `jwt_token should not be undefined`);
        assert.notStrictEqual(response.body.jwt_token, null, `jwt_token should not be undefined`);

        shipperToken = response.body.jwt_token;
      }, 5);


      await test
          .call('createProfile', {email: driverEmail, password: driverPassword, role: driverRole});
      test.validateResponseBody((response) => {
        assert.notStrictEqual(
            response.body.message,
            undefined,
            'Message property is required in response',
        );
        assert.notStrictEqual(
            response.body.message,
            null,
            'Message property is required in response',
        );
      }, 5);

      await test.call('login', {email: driverEmail, password: driverPassword});
      test.validateResponseBody((response) => {
        assert.notStrictEqual(response.body.jwt_token, undefined, `jwt_token should not be undefined`);
        assert.notStrictEqual(response.body.jwt_token, null, `jwt_token should not be undefined`);

        driverToken = response.body.jwt_token;
      }, 5);

      const shipperHeaders = {'Authorization': `JWT ${shipperToken}`};
      const driverHeaders = {'Authorization': `JWT ${driverToken}`};

      await test.call('addUserTruck', {type: SPRINTER}, undefined, undefined, driverHeaders);
      test.validateResponseBody((response) => {
        assert.notStrictEqual(response.body.message, undefined, 'Message property is required in response');
        assert.notStrictEqual(response.body.message, null, 'Message property is required in response');
      }, 5);

      let truckID = '';

      await test.call('getUserTrucks', {type: SPRINTER}, undefined, undefined, driverHeaders);
      test.validateResponseBody((response) => {
        assert.notStrictEqual(response.body.trucks, undefined, 'trucks property is required in response');
        assert.notStrictEqual(response.body.trucks, null, 'trucks property is required in response');

        assert.strictEqual(response.body.trucks.length, 1, 'trucks Lenght should equal 1');
        const [truck] = response.body.trucks;
        assert.strictEqual(truck.type, SPRINTER, 'truck type should equal SPRINTER');
        assert.strictEqual(truck.status, 'IS', 'truck status should equal IS');

        truckID = truck._id;
      }, 5);

      await test.call('assignUserTruckById', undefined, undefined, {id: truckID}, driverHeaders);
      test.validateResponseBody((response) => {
        assert.notStrictEqual(response.body.message, undefined, 'Message property is required in response');
        assert.notStrictEqual(response.body.message, null, 'Message property is required in response');
      }, 5);

      await test.call('addUserLoad', {
        'name': 'Moving sofa',
        'payload': 100,
        'pickup_address': 'Flat 25, 12/F, Acacia Building 150 Kennedy Road',
        'delivery_address': 'Sr. Rodrigo Domínguez Av. Bellavista N° 185',
        'dimensions': {
          'width': 44,
          'length': 32,
          'height': 66,
        },
      }, undefined, undefined, shipperHeaders);
      test.validateResponseBody((response) => {
        assert.notStrictEqual(response.body.message, undefined, 'Message property is required in response');
        assert.notStrictEqual(response.body.message, null, 'Message property is required in response');
      }, 5);

      let loadID = '';

      await test.call('getUserLoads', undefined, undefined, undefined, shipperHeaders);
      test.validateResponseBody((response) => {
        assert.notStrictEqual(response.body.loads, undefined, 'loads property is required in response');
        assert.notStrictEqual(response.body.loads, null, 'loads property is required in response');

        assert.strictEqual(response.body.loads.length, 1, 'loads Lenght should equal 1');
        const [load] = response.body.loads;
        assert.strictEqual(load.status, 'NEW', 'load status should equal NEW');

        loadID = load._id;
      }, 5);

      await test.call('postUserLoadById', undefined, undefined, {id: loadID}, shipperHeaders);
      test.validateResponseBody((response) => {
        assert.notStrictEqual(response.body.message, undefined, 'message property is required in response');
        assert.notStrictEqual(response.body.message, null, 'message property is required in response');

        assert.strictEqual(response.body.driver_found, true, 'driver_found should equal true');
      }, 5);

      await test.call('getUserActiveLoad', undefined, undefined, undefined, driverHeaders);
      test.validateResponseBody((response) => {
        assert.notStrictEqual(response.body.load, undefined, 'load property is required in response');
        assert.notStrictEqual(response.body.load, null, 'load property is required in response');

        assert.strictEqual(response.body.load._id, loadID, 'load id should equal Shipper\'s load id');
        assert.strictEqual(response.body.load.status, 'ASSIGNED', 'load status should equal ASSIGNED');
        assert.strictEqual(response.body.load.state, 'En route to Pick Up', 'load state should equal En route to Pick Up');
      }, 10);

      await test.call('iterateLoadState', undefined, undefined, undefined, driverHeaders);
      test.validateResponseBody((response) => {
        assert.notStrictEqual(response.body.message, undefined, 'message property is required in response');
        assert.notStrictEqual(response.body.message, null, 'message property is required in response');

      }, 10);

      await test.call('iterateLoadState', undefined, undefined, undefined, driverHeaders);
      test.validateResponseBody((response) => {
        assert.notStrictEqual(response.body.message, undefined, 'message property is required in response');
        assert.notStrictEqual(response.body.message, null, 'message property is required in response');

      }, 10);

      await test.call('iterateLoadState', undefined, undefined, undefined, driverHeaders);
      test.validateResponseBody((response) => {
        assert.notStrictEqual(response.body.message, undefined, 'message property is required in response');
        assert.notStrictEqual(response.body.message, null, 'message property is required in response');

      }, 10);

      await test.call('getUserLoads', undefined, undefined, undefined, shipperHeaders);
      test.validateResponseBody((response) => {
        assert.notStrictEqual(response.body.loads, undefined, 'loads property is required in response');
        assert.notStrictEqual(response.body.loads, null, 'loads property is required in response');

        assert.strictEqual(response.body.loads.length, 1, 'loads Lenght should equal 1');
        const [load] = response.body.loads;
        assert.strictEqual(load.status, 'SHIPPED', 'load status should equal SHIPPED');
      }, 10);

      const rating = test.getRating();
      const errors = test.getErrors();

      await app.stop();

      return {
        name,
        projectId,
        rating,
        errors,
      };
    } catch (err) {
      console.log(err);
      return {
        name,
        projectId,
        rating: 0,
        errors: [err.message],
      };
    }
  };

  return {
    doc,
    operations,
    validate,
  };
};
