import React from 'react'

class StarRating extends React.Component {
    
    state = {
        rating : this.props.rating || null,
        temp_rating : null
        }
    
    setRating(rating){
        this.setState({
            rating: rating,
            temp_rating: rating
        })
    }   

    onHover(rating) {
        this.state.temp_rating = this.state.rating;
        this.state.rating = rating;
        
        this.setState({
          rating: this.state.rating,
          temp_rating: this.state.temp_rating
        });
      }
    onUnHover(){
        this.state.rating = this.state.temp_rating;
        this.setState({ rating: this.state.rating });
    }

    render(){

        // Need to render the stars here. it's broken because of the var used in the original solution. 
        // What I need to do is to render 5 stars. They won't have a default score. When I hover over one, that star
        // and all the preceeding stars should be colored in. When I click on a star, the corresponding score should
        // be stored in a hidden field in the form, which will be submitted when the form is submitted.
        let stars = []

        for(let i = 0; i < 5; i++){
            
            if(this.state.rating >= i && this.state.rating != null){
                classes += ' is-selected'
            }
        }

        stars.push(
            <label>
                className={classes}
                onClick = {this.setRating.bind(this, i)}
                onMouseOver = {this.onHover.bind(this, i)}
                onMouseOut = {this.onUnHover}
                ★
            </label>
        )
        return (
            <div className="star-rating">
              {stars}
            </div>
          )
    }
}

export default StarRating