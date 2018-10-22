import React from 'react'
import PropTypes from 'prop-types'
import style from './SelectFilter.module'

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
        return <div className={style['select_filter']+' '+ style['select_filter'+this.props.className]}>
            <label>
                {displayName}
            </label>
            <select  className={style['dropdown-menu']} value={this.state.value } type='select' onChange={this.handleChange}>
                <option key='' value='' > select {displayName}</option>
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