require 'httparty'
require 'protobuf'
require 'google/transit/gtfs-realtime.pb'
require 'net/http'
require 'uri'


endpoint = 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace'


data = HTTParty.get(URI.parse(endpoint), :headers => { 
			'content-type': 'application/json', 
			'X-API-Key': KEY }
			)

feed = Transit_realtime::FeedMessage.decode(data)

keys = []


for entity in feed.entity do
	keys << feed.entity
  # if entity.field?(:trip_update)
  #   pp entity.trip_update
  # end
end

pp keys

# HTTParty.get(
# 	'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace',
# 	:headers => { 
# 		'content-type': 'application/json', 
# 		'X-API-Key': KEY }
# 		)


