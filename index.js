const uuidV4 = require('uuid/v4');
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-west-1" });

exports.handler = (event, context, callback) => {
  const params = {
    Item: {
      event_id: uuidV4(),
      adminEmail: event.email,
      address: event.address,
      city: event.city,
      state: event.state,
      date: event.date,
      time: event.time,
      attendess: [{ email: event.email, user_id: event.adminId }]
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
          user: params.Item
        }

      };
      callback(null, data);

    }
  })
};
