NYC Rails is a commuting app that leverages the public API provided by New York City's MTA. The core use-case of this application is for New Yorkers who
just want to check when the train is coming and if there's a disruption in service. Other features are planned, but I am currently concerned with correcting
problems in the system design.

The frontend is written with ReactJS, the backend is written with Ruby on Rails, and the MTA API is a (mostly) RESTful API that returns a protocol buffer feed built on Google's 
realtime-GTFS transit data standard as a schema. Protocol buffers are very interesting, but it should be noted now that you need to install the protobuf library to
encode your own. It is not strictly necessary to consume protobuf files, but it may help if you intend to use protobuf files for their performant nature.
Also, for some reason, some endpoints return XML files, sometimes. From what I gather, some endpoint were originally built on the SOAP standard, but this has not been confirmed.
The documentation is a bit spotty, but the Google Groups forum is very helpful, should you have questions.

Currently, the API is being pulled through the frontend, which is bad practice, and not certainly ideal for this application. This was an unfortunate compromise I had to make due to the deprecation
of a Ruby gem which I was depending on to parse the protocol buffer feed supplied by the API. In the interest of finishing the project in time to graduate, I opted 
to pull API data in through the frontend. The goal will be to return to the original design where the backend handles all interaction with the API, caches data,
and stores user data. The frontend should solely be concerned with display logic.
