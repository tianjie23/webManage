import React from 'react';
import Pagination from 'react-js-pagination';

class Paging extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: this.props.activePage || 15
        };
    }

    handlePageChange(pageNumber) {
        //console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber},()=>{
            this.props.onChange(pageNumber);
        });
    }

    render() {
        return (
            <div className="row">
                <div className="pull-left">
                    <Pagination
                        activePage={this.state.activePage}                  //当前页
                        itemsCountPerPage={this.props.itemsCountPerPage}    //每页显示条数
                        totalItemsCount={this.props.totalItemsCount}        //总条数
                        pageRangeDisplayed={5}                              //显示几个分页
                        onChange={(pageNumber) => this.handlePageChange(pageNumber)}
                    />
                </div>
                <div className="pull-right">
                    总共有 {this.props.totalItemsCount} 条信息
                    每页显示 {this.props.itemsCountPerPage} 条
                    当前 {this.state.activePage} 页
                </div>
            </div>
        )
    }
}

export default Paging;