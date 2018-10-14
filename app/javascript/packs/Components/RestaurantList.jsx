import React from 'react'
import PropTypes from 'prop-types'

import RestaurantItem from './RestaurantItem'
import styles from  './index.module.scss';

const RestaurantList = props => (
    <div className={styles['restaurants-list']}>
        <React.Fragment>
    {props.items.map(i => {
            return <RestaurantItem key={i.id}
                                   id={i.id}
                                   name={i.name}
                                   address={i.address}
                                   cuisine={i.cuisine}
                                   rating={i.rating}
                                   max_delivery_time={i.max_delivery_time}
                                   business_friendly={i.business_friendly}
            />
        })}
        </React.Fragment>
    </div>
);


RestaurantList.defaultProps = {}

RestaurantList.propTypes = {
    items: PropTypes.array
}
export default RestaurantList;
