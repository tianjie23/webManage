/**
 * Created with React.
 * Author: Chenlly
 * Date: 2018-05-17
 * Time: 20:44
 *
 */

import Utils from '../utils/utils';

const _utils = new Utils();

class ProductService {
    getProductList(param) {
        return (
            _utils.request({
                type: 'post',
                url: '/manage/product/list.do',
                data: {
                    pageNum: param.pageNum
                }
            })
        );
    }
}

export default ProductService;