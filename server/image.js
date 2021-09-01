//Dependencies import
const sharp = require("sharp");

exports.resizeImage = (imagePath, size) => {
    return new Promise(function (resolve, reject) {
        let width = 500
        let height = 281

        sharp(imagePath)
            .rotate()
            .resize(
                width, height,
                Math.round(Math.min(parseInt(size), width) * (9 / 16))
            )
            .webp({ quality: 80 })
            .toBuffer()
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error.toString())
            });

    });

}

exports.includesObj = (array, path) => {
    let pos = -1;

    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (path == element.imagePath) {
            pos = index
        }

    }

    array.forEach(element => {

    });

    return pos;
}