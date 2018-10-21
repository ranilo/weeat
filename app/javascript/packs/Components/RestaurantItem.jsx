import React from 'react'
import PropTypes from 'prop-types'
import styles from './RestaurantItem.module.scss'
import cuisineMap from './CuisineMap'




const ratingStars = rating => {
    let str = '';
    for (var i = 0; i < rating; i++) {
        str += '⭐';
    }
    return <label>{str}</label>;
}

const RestaurantItem = props => (
    <div className={styles['RestaurantItem']}>
        <div className={styles['cuisine']}> {cuisineMap[props.cuisine]} </div>
        <div className={styles['name']}> {props.name}  <div className={styles['business_friendly']}> {props.business_friendly?'10bis':''} </div>
        </div>
        <div className={styles['rating']}><span>Rating: </span>{ratingStars(props.rating)} </div>
    </div>
);

RestaurantItem.defaultProps = {
    business_friendly: false
}

RestaurantItem.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    cuisine: PropTypes.string,
    rating: PropTypes.number,
    address: PropTypes.string,
    max_delivery_time: PropTypes.number,
    business_friendly: PropTypes.bool
}

export default RestaurantItem;

