import React from 'react';

import './footer.scss';

class Footer extends React.Component{
    render(){
        return (
            <div className="login-foot">版权所有：Tery {this.props.children}</div>
        )
    }
}

export default Footer;