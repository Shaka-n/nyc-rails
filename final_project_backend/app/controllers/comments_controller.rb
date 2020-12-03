class CommentsController < ApplicationController

    def index
        comments = Comment.all
        render json: comments
    end

    def show
        comment = Comment.find_by(id: params[:id])
    end

    def create
        target_line_id = Line.find_by(name: params[:name])

        comment= Comment.create(
            user_id: params[:user_id], 
            line_id: target_line_id.id,
            body: params[:body],
            rating: params[:rating]
            )

        render json: comment
    end

    def destroy
        comment = Comment.find_by(id: params[:id])
        comment.destroy
        render json: comment
    end
end
