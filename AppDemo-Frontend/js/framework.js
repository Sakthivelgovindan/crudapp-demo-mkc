const ajaxCallObj = {};

ajaxCallObj.sendAjaxRequest = function (reqData, callback) {
  const { url, type, dataObject } = reqData;
  $.ajax({
    async: false,
    url: url,
    type: type,
    headers: {
      "content-type": "application/json"
    },
    data: JSON.stringify(dataObject)
  }).done(function (response) {
    if (callback) callback(response);
  });
};
