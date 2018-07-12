import React from 'react';

import NavTop from '../navtop/index';
import NavSide from '../navside/index';
import Footer from '../footer/index';

import './theme.css';
import './index.scss';

class Layout extends React.Component {
    render() {
        return (
            <div id="wrapper">
                <NavTop/>
                <NavSide/>
                {this.props.children}
                <Footer/>
            </div>
        )
    }
}

export default Layout;