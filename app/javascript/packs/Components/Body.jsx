import React from 'react'
import Filters from "./Filters";
import RestaurantList from "./RestaurantList";

export default class Body extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: false,
            visibleItems: [],
            items: [],
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
                        visibleItems: transformedResults
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
        return i.name.includes(name)
    };
    filterCuisine = (cuisine, i) => {
        return i.cuisine.includes(cuisine)
    };
    filterSpeed = (speed, i) => {
        return (i.max_delivery_time <= speed)
    };

    render() {
        const {error, isLoaded, visibleItems} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return <div>
                <Filters onFilterChange={this.combineFilters.bind(this)}/>
                <RestaurantList items={visibleItems}/>
            </div>

        }
    }
};