import React from 'react'
import PropTypes from 'prop-types'

import SelectFilter from './SelectFilter'
import style from './Filters.module.scss'

class Filters extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this)
        this.handleCuisineChange = this.handleCuisineChange.bind(this);
        this.handleSpeedChange = this.handleSpeedChange.bind(this);
        this.state = {
            name: '',
            rating: 0,
            cuisine: '',
            speed:Number.MAX_SAFE_INTEGER
        };
    }

    handelChange(o){
        this.setState((state) => {
            state[o.key]  = o.value;
            this.props.onFilterChange(state);
        });
    }

    handleSpeedChange(speed) {
        this.handelChange({key:'speed', value:speed});
    }

    handleCuisineChange(cuisine) {
        this.handelChange({key:'cuisine', value:cuisine});
    }

    handleRatingChange(rating) {
        this.handelChange({key:'rating', value:rating});
    }

    handleNameChange(e) {
        const name = e.target.value;
        this.handelChange({key:'name', value:name});

    }

    render() {
        const cuisines  = this.props.items;
        const rating  = [0,1,2,3];
        const speed = [10,20,30, 60, 90, 120];
        return <React.Fragment>
        <div className={style['name-filter']}>
                <input type='text' value={this.state.name}
                       onChange={this.handleNameChange}
                       placeholder='name'>
                </input>
                </div>
                <div className={style['select-filters']}>
                    <SelectFilter displayName='Cuisine' items={cuisines} className="_cuisines"
                                  setValue={this.handleCuisineChange} />
                    <SelectFilter displayName='Rating' items={rating} className="_rating"
                                  setValue={this.handleRatingChange} />
                    <SelectFilter displayName='Speed' items={speed} className="_speed"
                                  setValue={this.handleSpeedChange} />
                </div>
        </React.Fragment>;

    }

};
Filters.propTypes = {
    onFilterChange: PropTypes.func
};
export default Filters;