import React from 'react'
import Filters from "./Filters";
import RestaurantList from "./RestaurantList";

import styles from './Body.module.scss'

export default class Body extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: false,
            visibleItems: [],
            items: [],
            cuisines: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:3000/restaurants")
            .then(res => res.json())
            .then(
                (result) => {
                    const transformedResults =
                        result.map((item) => {
                            item.max_delivery_time = Number.parseInt(item.max_delivery_time);
                            return item
                        });
                    this.setState({
                        isLoaded: true,
                        items: transformedResults,
                        visibleItems: transformedResults,
                        cuisines: transformedResults.map(a=>a.cuisine)
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    combineFilters = (filter) => {
        this.setState({
            visibleItems:
                this.state.items.filter(i => (
                        this.filterRating(filter.rating, i)
                        && this.filterName(filter.name, i)
                        && this.filterCuisine(filter.cuisine, i)
                        && this.filterSpeed(filter.speed, i)
                    )
                )
        });
    }

    filterRating = (rating, i) => {
        return i.rating >= rating
    };
    filterName = (name, i) => {
        return i.name.toLowerCase().includes(name.toLowerCase())
    };
    filterCuisine = (cuisine, i) => {
        return i.cuisine.includes(cuisine)
    };
    filterSpeed = (speed, i) => {
        if(speed ==='')
            speed=120
        return (i.max_delivery_time <= speed)
    };

    render() {
        const {error, isLoaded, visibleItems, cuisines} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return <React.Fragment>
                <Filters onFilterChange={this.combineFilters.bind(this)} items={Array.from(new Set(cuisines))}/>
                <RestaurantList items={visibleItems}/>
                <div className={styles['map']} />
            </React.Fragment>;
        }
    }
};