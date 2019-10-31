const uuidV4 = require('uuid/v4');
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-west-1" });

exports.handler = (event, context, callback) => {
  const params = {
    Item: {
      event_id: uuidV4(),
      name: event.name,
      adminEmail: event.email,
      adminId: event.adminId,
      address: event.address,
      city: event.city,
      state: event.state,
      date: event.date,
      time: event.time,
      attendess: [],
      comments: event.comments
    },
    TableName: "EVENT_DETAILS"
  };

  docClient.put(params, function (err, data) {

    if (err) {

      data = {
        statusCode: 403,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: {
          message: JSON.stringify('ERROR, event not created.')
        }
      };
      callback(null, data);

    } else {

      data = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: {

          message: JSON.stringify('Successful creation in table.'),
          event: params.Item
        }

      };
      callback(null, data);

    }
  })
};
