export const convertImageToBase64 = (file) => {
    return new Promise((res, rej) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            const image = new Image();
            image.src = fileReader.result;

            image.onload = () => {
                const imageWidth = image.width;
                const imageHeight = image.height;

                res({
                    src: fileReader.result,
                    width: imageWidth,
                    height: imageHeight
                });
            }
        }

        fileReader.onerror = (err) => {
            rej(err);
        }
    }).catch(err => console.log(err))
};