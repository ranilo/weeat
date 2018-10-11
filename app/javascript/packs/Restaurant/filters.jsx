import React from 'react'
import PropTypes from 'prop-types'

class Filters extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this)
        this.state = {name: '', rating: 0};
    }
    filterRating = (i)=>{return i.rating >= this.state.rating};
    filterName = (i) => {return i.name.includes(this.state.name)};

    combineFilters = () => {
        this.props.onFilterChange(i => (  this.filterRating(i)  &&  this.filterName(i)));
    }

    handleRatingChange(e) {
        const rating = e.target.value;
        this.setState({rating: rating});
        this.combineFilters();
    }

    handleNameChange(e) {
        const str = e.target.value;
        this.setState({name: str});
        this.combineFilters();
    }

    createUniqueOptionItems(condition){
        let uniqueSet = new Set(this.props.items.map(condition));
        let arr = [];
        uniqueSet.forEach(unique => arr.push(unique));
        console.log(arr);
        return arr.map((i) => <option key={i.toString()} value={i}>{i}</option>);
    }


    render() {
        return <div className='filters'>
            <div className='names'>
                name
                <input type='text' value={this.state.name}
                       onChange={this.handleNameChange}/>
            </div>
            <div className='rating'>
                rating
                <select value={this.state.rating} type='select'
                       onChange={this.handleRatingChange}>

                    {this.createUniqueOptionItems(a=>a.rating)}


                </select>
            </div>

        </div>
    }

};
export default Filters;