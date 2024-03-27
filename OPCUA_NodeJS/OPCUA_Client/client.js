const { OPCUAClient, AttributeIds } = require('node-opcua');
const async = require('async');

const endpointUrl = "opc.tcp://60.60.0.1:4840";
const client = OPCUAClient.create({ endpointMustExist : false });

let the_session;
let i = 0;

client.on("backoff", (retry, delay) => {
    console.log(`try to connect to ${endpointUrl} , retry ${retry} next attempt in ${delay/1000} sec`);
});


// connection
async.series([
    function(callback) {
        client.connect(endpointUrl, (err) => {
            if (err) {
                console.log(`cannot connect to endpoint: ${endpointUrl} `);
            } else {
                console.log("connected !!");
            }
            callback();
        })
    },

    // Create session
    function(callback) {
        client.createSession((err, session) => {
            if (err) { return }
            the_session = session;
            callback();
        })
    },

    // reading from PLC
    function() {
        setInterval(() => {
            the_session.read({ nodeId : "ns=3;s=\"OPCUA\".value1", attributeTd : AttributeIds.Value }, (err, dataValue) => {
                if (!err) {
                    console.log(`value1 : ${dataValue.value.value}`);
                }
            })

            the_session.read({ nodeId : "ns=3;s=\"OPCUA\".value3", attributeTd : AttributeIds.Value }, (err, dataValue) => {
                if (!err) {
                    console.log(`value3 : ${dataValue.value.value}`);
                }
            })

            // write
            let nodesToWrite = [
                {
                    nodeId: "ns=3;s=\"OPCUA\".value2",
                    attributeId: AttributeIds.Value,
                    value: { /* new DataValue */
                        value: {
                            dataType: 10,
                            value: 500.0
                        }
                    }
                },
                {
                    nodeId: "ns=3;s=\"OPCUA\".value3",
                    attributeId: AttributeIds.Value,
                    value: { /* new DataValue */
                        value: { /* Variant */
                            dataType: 10,
                            value: i
                        }
                    }
                }
            ]
            
            the_session.write(nodesToWrite, (err, statusCodes) => {})
            i++;
        }, 1000)
    }
]);