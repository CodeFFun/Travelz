const imageType = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

const imageUpload = async (req, res, next) => {
    let {file} = req;
    // console.log(file);
    if(!file){
        next();
    }else{
        if(!imageType.includes(file.mimetype)){
            return res.json(dataResponse(null, "Invalid image type", 400));
        }
        next();
    }
}

module.exports = imageUpload;