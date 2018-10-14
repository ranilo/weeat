import React from 'react'
import PropTypes from 'prop-types'

class SelectFilter extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {value:''}
    }

    handleChange(e) {
        const value = e.target.value;
        this.setState({ value });
        this.props.setValue(value);
    }

    render() {
        const { className, items, displayName} = this.props;
        return <div className={className}>
            <select value={this.state.value } type='select' onChange={this.handleChange}>
                <option key=''  defaultValue='' label={displayName}></option>
                { items.map((item) => <option key={item.toString()} value={item}>{item}</option>)}
            </select>
        </div>
    }
};

SelectFilter.propTypes = {
    displayName: PropTypes.string,
    items: PropTypes.array,
    className: PropTypes.string,
    setValue: PropTypes.func
};

export default SelectFilter;