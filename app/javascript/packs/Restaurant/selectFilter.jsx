import React from 'react'
import PropTypes from 'prop-types'
import RestaurantItem from "./RestaurantItem";

class SelectFilter extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {value:''}
    }

    handleChange(e) {
        const value = e.target.value;
        this.state.value = value;
        this.props.setValue(value);
    }


    createUniqueOptionItems(condition) {
        let uniqueSet = new Set(this.props.items.map(condition));
        let arr = [];
        uniqueSet.forEach(unique => arr.push(unique));
        console.log(arr);
        return arr.map((i) => <option key={i.toString()} value={i}>{i}</option>);
    }

    render() {
        return <div className={this.props.className}>
            {this.props.displayName}
            <select value={this.state.value} type='select'
                    onChange={this.handleChange}>
                {this.createUniqueOptionItems(this.props.filter)}
            </select>
        </div>
    }

};

SelectFilter.propTypes = {
    displayName: PropTypes.string,
    items: PropTypes.array,
    className: PropTypes.string,
    setValue: PropTypes.func,
    filter: PropTypes.func
};

export default SelectFilter;