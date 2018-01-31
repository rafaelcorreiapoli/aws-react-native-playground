//
// Copyright 2017 Amazon.com, Inc. or its affiliates (Amazon). All Rights Reserved.
//
// Code generated by AWS Mobile Hub. Amazon gives unlimited permission to
// copy, distribute and modify it.
//

'use strict';
console.log("Loading function");

exports.handler = function(event, context, callback) {
    var responseCode = 200;

    // TODO: Put your application logic here...
    
    const items = [{
        name: 'Flower'
    }, {
        name: 'Chair'
    }]
    
    // For demonstration purposes, we'll just echo these values back to the client
    var responseBody = {
        items: items
    };

    var response = {
        statusCode: responseCode,
        body: JSON.stringify(responseBody)
    };

    context.succeed(response);
};