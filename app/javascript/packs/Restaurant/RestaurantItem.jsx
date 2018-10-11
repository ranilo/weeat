import React from 'react'
import PropTypes from 'prop-types'

const RestaurantItem = props => (
    <div className="RestaurantItem">
        RestaurantItem {props.id}
        name: {props.name}
        address: {props.address}
        cuisine: {props.cuisine}
        rating: {props.rating}
        delivery time:{props.max_delivery_time}
        10bis: {props.business_friendly}
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

