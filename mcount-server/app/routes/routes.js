let ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  let map = {
    bill: {
      collection: db.collection('bills'),
      create: {
        route: '/bill'
      },
      readAll: {
        route: '/bill'
      },
      read: {
        route: '/bill/:id'
      },
      update: {
        route: '/bill/:id'
      },
      delete: {
        route: '/bill/:id'
      }
    }
  };

  app.post(map.bill.create.route, function(request, response) {
    const bill = {
      title: request.body.title,
      value: request.body.value
    };
    map.bill.collection.insertOne(bill, (error, result) => {
      if (error) {
        response.send({ error: error });
      } else {
        response.send(result.ops);
      }
    });
  });

  app.get(map.bill.readAll.route, function (request, response) {
    map.bill.collection.find({}).toArray(function (error, results) {
      if (error) {
        response.send({ error: error });
      } else if (results.length === 0) {
        response.status(404).send(`No bills were found`);
      } else {
        response.send(results);
      }
    });
  });

  app.get(map.bill.read.route, function (request, response) {
    const id = request.params.id;
    const details = { '_id': new ObjectID(id) };
    map.bill.collection.findOne(details, function (error, result) {
      if (error) {
        response.send({ error: error });
      } else if (result === null) {
        response.status(404).send({ error: `Bill with id: ${id} was not found` });
      } else {
        response.send(result);
      }
    });
  });

  app.put(map.bill.update.route, function (request, response) {
    const id = request.params.id;
    const details = { '_id': new ObjectID(id) };
    const bill = {
      title: request.body.title,
      value: request.body.value
    };
    map.bill.collection.updateOne(details, bill, function (error, result) {
      if (error) {
        response.send({ error: error });
      } else if (result === null) {
        response.status(404).send({ error: `Bill with id: ${id} was not found` });
      } else {
        response.send(result);
      }
    });
  });

  app.delete(map.bill.delete.route, function (request, response) {
    const id = request.params.id;
    const details = { '_id': new ObjectID(id) };
    map.bill.collection.removeOne(details, function (error, result) {
      if (error) {
        response.send({ error: error });
      } else if (result === null) {
        response.status(404).send({ error: `Bill with id: ${id} was not found` });
      } else {
        response.send(`Bill ${id} was successfully deleted.`);
      }
    });
  });
};