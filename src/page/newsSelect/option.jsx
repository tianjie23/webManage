import React from 'react';

class Option extends React.Component {
    render() {
        return (
            <div>
                <option value={this.props.value}>{this.props.title}</option>
                {this.props.children}
            </div>
        )
    }
}

export default Option;