import React from 'react';

class PageTitle extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        document.title = `${this.props.bigtitle} - 网站后台管理`;
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h1 className="page-header">
                        {this.props.bigtitle}
                        <small>{this.props.smalltitle}</small>
                        {this.props.children}
                    </h1>
                </div>
            </div>
        )
    }
}

export default PageTitle;