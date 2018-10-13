// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'

import RestaurantList from './Restaurant/RestaurantList'
import Filters from './Restaurant/filters'
import Header from './Restaurant/header'


class Container extends React.Component {

    constructor(props) {
        super(props);
        this.state = {filterBy: i => (i), items: [], isLoaded:false, error:false}
    }

    componentDidMount() {
        fetch("http://localhost:3000/restaurants")
            .then(res => res.json())
            .then(
                (result) => {
                    result.map(a=>a).map((item)=>item.max_delivery_time = parseInt(item.max_delivery_time));
                    this.setState({
                        isLoaded: true,
                        items: result
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

    filters(props) {
        this.setState({filterBy: props})
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return <div>
                <Header/>
                <Filters items={items} onFilterChange={this.filters.bind(this)}/>
                <RestaurantList items={items.filter(this.state.filterBy)}/>
                {/*<Map/>*/}
            </div>

        }
    }
}


ReactDOM.render(
    <Container/>,
    document.body.appendChild(document.getElementById('root')),
);