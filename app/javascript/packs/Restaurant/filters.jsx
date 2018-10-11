import React from 'react'
import PropTypes from 'prop-types'

class Filters extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.state = {value: ''};
    }

    handleNameChange(e) {
        const str = e.target.value;
        this.setState({value: str});
        this.props.onFilterChange(i => (i.name.includes( str)));
    }

    render() {
        return <div className='filters'>
            <input type='text' value={this.state.value}
                   onChange={this.handleNameChange}/>
        </div>
    }

};
export default Filters;