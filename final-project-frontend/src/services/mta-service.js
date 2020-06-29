const ProtoBuf = require('protobufjs')
const fetchURL = require('fetch').fetchUrl
const apiURL = 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-l'

ProtoBuf.load(['config/nyct-subway.proto', 'config/gtfs-realtime.proto']).then(async (root) => {
  let response = await fetchURL(apiURL, {
    method: 'GET'
  })

  // put some debugger here
})
