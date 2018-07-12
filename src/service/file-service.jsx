import Utils from '../utils/utils';

const _utils = new Utils();

class FileService{
    deleteFile(file){
        let data = {};
        //console.log(file)
        data.fileurl=file;
        return _utils.request({
            url:'/api/file/delete',
            type:"POST",
            data:data
        })
    }
}

export default FileService;