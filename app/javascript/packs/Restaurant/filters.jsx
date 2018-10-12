import React from 'react'
import PropTypes from 'prop-types'

import SelectFilter from './selectFilter'

class Filters extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this)
        this.handleCuisineChange = this.handleCuisineChange.bind(this);
        this.state = {name: '', rating: 0, cuisine:''};
    }
    
    filterRating = (i)=>{return i.rating >= this.state.rating};
    filterName = (i) => {return i.name.includes(this.state.name)};
    filterCuisine  = (i) => {return i.cuisine.includes(this.state.cuisine)}

    combineFilters = () => {
        this.props.onFilterChange(i => (  this.filterRating(i)
            && this.filterName(i)
            && this.filterCuisine(i)));
    }

    handleCuisineChange(cuisine){
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

            <SelectFilter displayName='rating' items={this.props.items} className="rating"  setValue={this.handleRatingChange} filter={a=>a.rating}/>
            <SelectFilter displayName='cuisine' items={this.props.items} className="cuisine"  setValue={this.handleCuisineChange} filter={a=>a.cuisine}/>
        </div>
    }

};
Filters.propTypes = {
    items: PropTypes.array,
    onFilterChange: PropTypes.func
};
export default Filters;