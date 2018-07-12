import React from 'react';

class TableList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading:true
        }
    }

    componentWillReceiveProps(nextProps){
        //console.log(nextProps)
        this.setState({
            isLoading:false
        })
    }

    render(){
        let tableHeads = this.props.tableHeads.map((item,index) => {
                if(typeof item === 'object'){
                    return <th key={index} width={item.width}>{item.name}</th>
                }else if(typeof item === 'string'){
                    return <th key={index}>{item}</th>
                }
            }
        );
        let listBody = this.props.children;
        let listinfo = (
            <tbody>
            <tr>
                <td colSpan={this.props.tableHeads.length} className="text-center">
                    {this.state.isLoading?"数据加载中...":"没有数据"}
                </td>
            </tr>
            </tbody>
        )
        let tableBody = listBody.length>0 ? listBody :listinfo;
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                            <tr>
                                {tableHeads}
                            </tr>
                            </thead>
                            {tableBody}
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default TableList;