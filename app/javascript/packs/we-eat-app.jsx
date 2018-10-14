// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'

import Header from './Components/Header'
import Body from './Components/Body'

class Container extends React.Component {

    render() {
        return <React.Fragment>
            <Header/>
            <Body />
        </React.Fragment>
    }
}


ReactDOM.render(
    <Container/>,
    document.body.appendChild(document.getElementById('root')),
);