class LinesController < ApplicationController
    def index
        lines = Line.all
        render json: lines
    end
    
    def show
        line = Line.find_by(id: params[:id])
        render json: {id:line.id, name:line.name, comments:line.comments}
    end
end
