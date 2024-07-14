"use_strict";

var utils = require("../utils");
var log = require("npmlog");

module.exports = function(defaultFuncs, api, ctx) {
  return function editMessage(text, messageID, callback) {
    var resolveFunc = function() {};
    var rejectFunc = function() {};
    var returnPromise = new Promise(function (resolve, reject) {
      resolveFunc = resolve;
      rejectFunc = reject;
    });

    if (!callback) {
      callback = function (err, data) {
        if (err) {
          return rejectFunc(err);
        }
        resolveFunc(data);
      };
    }

    let count_req = 0

    var form = {
      message_id: messageID,
      text: text,
    };

    var content = {
      app_id: '2220391788200892',
      payload: JSON.stringify({
        data_trace_id: null,
        epoch_id: parseInt(utils.generateOfflineThreadingID()),
        tasks: [{
          failure_count: null,
          label: '742',
          payload: JSON.stringify(form),
          queue_name: 'edit_message',
          task_id: Math.random() * 1001 << 0,
        }],
        version_id: '6903494529735864',
      }),
      request_id: ++count_req,
      type: 3
    }

    mqttClient.publish('/ls_req', JSON.stringify(content), {
      qos: 1, retain: false
    });
  
		return returnPromise;
	};
};
