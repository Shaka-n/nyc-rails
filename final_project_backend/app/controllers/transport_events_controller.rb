class TransportEventsController < ApplicationController
    def index
        transport_events = TransportEvent.all
        render json: transport_events
    end

    def show
        transport_event = TransportEvent.find(params[:id])
        render json: transport_event
    end

    def create
        transport_event = TransportEvent.create(
            station_code: params[:station_id], 
            arrival: params[:arrival], 
            departure: params[:departure], 
            direction: params[:direction]
            )
            # byebug
        render json: transport_event
    end
end
