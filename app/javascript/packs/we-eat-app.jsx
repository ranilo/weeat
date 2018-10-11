// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'

import RestaurantList from './Restaurant/RestaurantList'
import Filters from './Restaurant/filters'


const data = [
    {
        "id": 1,
        "name": "La",
        "cuisine": "tes",
        "rating": 3,
        "address": "this",
        "max_delivery_time": 2.0,
        "created_at": "2018-09-26T07:34:26.005Z",
        "updated_at": "2018-09-26T07:34:26.005Z",
        "business_friendly": null
    },
    {
        "id": 3,
        "name": "Laa",
        "cuisine": "tes",
        "rating": 1,
        "address": "this",
        "max_delivery_time": 2.0,
        "created_at": "2018-09-26T07:35:51.033Z",
        "updated_at": "2018-09-26T07:35:51.033Z",
        "business_friendly": true
    }];

class Container extends React.Component {

    constructor(props){
        super(props);
        this.state ={filterBy:i=>(i)}
    }
    filters(props) {
        this.setState({filterBy: props})
    }
    render() {
        return <div>
            {/*<Header/>*/}
            <Filters items={data} onFilterChange={this.filters.bind(this)}/>
            <RestaurantList items={data.filter(this.state.filterBy)}/>
            {/*<Map/>*/}
        </div>
    }
}



ReactDOM.render(
    <Container/>,
    document.body.appendChild(document.getElementById('root')),
);