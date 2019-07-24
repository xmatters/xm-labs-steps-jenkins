var apiCrumbRequest = http.request({
    'endpoint': 'Jenkins',
    'path': '/crumbIssuer/api/json?xpath=concat(//crumbRequestField,//crumb)',
    'method': 'GET',
});

var apiCrumbResponse = apiCrumbRequest.write();
var body = JSON.parse(apiCrumbResponse.body);
var crumb = body.crumb;
console.log("Crumb: " + crumb);

var apiRequest = http.request({
    'endpoint': 'Jenkins',
    'path': '/job/' + input['Job Name'] + '/build?token=' + input['Token'],
    'method': 'POST',
    'headers': {
        'Jenkins-Crumb':crumb
    }
});
var apiResponse = apiRequest.write();

