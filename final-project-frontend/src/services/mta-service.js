
const ProtoBuf = require('protobufjs')
const request = require('request')
const requestSettings = {
  method: 'GET',
  url: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-l',
  encoding: null,
  headers: { "x-api-key": '' }
}

request(requestSettings, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    ProtoBuf.load(['config/nyct-subway.proto', 'config/gtfs-realtime.proto']).then((root) => {
      console.log(root.lookupType('FeedMessage').decode(body))
    })
  } else {
    console.log(`Error: ${error}, Status Code: ${response.statusCode}`)
  }
})
