import React from 'react'
import PropTypes from 'prop-types'

import SelectFilter from './selectFilter'

class Filters extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this)
        this.handleCuisineChange = this.handleCuisineChange.bind(this);
        this.handleSpeedChange = this.handleSpeedChange.bind(this);
        this.state = {name: '', rating: 0, cuisine: '', speed:''};
    }

    filterRating = (i) => {
        return i.rating >= this.state.rating
    };
    filterName = (i) => {
        return i.name.includes(this.state.name)
    };
    filterCuisine = (i) => {
        return i.cuisine.includes(this.state.cuisine)
    };
    filterSpeed = (i) => {
        return (i.max_delivery_time <= this.state.speed)
    };

    combineFilters = () => {
        this.props.onFilterChange(i => (this.filterRating(i)
            && this.filterName(i)
            && this.filterCuisine(i)
            && this.filterSpeed(i)));
    }

    handleSpeedChange(speed) {
        this.setState({speed: speed});
        this.combineFilters();
    }

    handleCuisineChange(cuisine) {
        this.setState({cuisine: cuisine});
        this.combineFilters();
    }

    handleRatingChange(rating) {
        this.setState({rating: rating});
        this.combineFilters();
    }

    handleNameChange(e) {
        const str = e.target.value;
        this.setState({name: str});
        this.combineFilters();
    }

    render() {
        return <div className='filters'>
            <div className='names'>
                name
                <input type='text' value={this.state.name}
                       onChange={this.handleNameChange}/>
            </div>

            <SelectFilter displayName='cuisine' items={this.props.items} className="cuisine"
                          setValue={this.handleCuisineChange} filter={a => a.cuisine}/>
            <SelectFilter displayName='rating' items={this.props.items} className="rating"
                          setValue={this.handleRatingChange} filter={a => a.rating}/>
            <SelectFilter displayName='speed' items={this.props.items} className="speed"
                          setValue={this.handleSpeedChange} filter={a => a.max_delivery_time}/>
        </div>
    }

};
Filters.propTypes = {
    items: PropTypes.array,
    onFilterChange: PropTypes.func
};
export default Filters;