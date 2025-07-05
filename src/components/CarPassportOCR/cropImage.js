// cropImage.js
export const getCroppedImg = async (imageSrc, pixelCrop, rotation = 0) => {
    console.log("URL изображения:", imageSrc);
    console.log("Параметры кропа:", pixelCrop);
    try {
        const image = await createImage(imageSrc); // Здесь может быть ошибка
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const maxSize = Math.max(image.width, image.height);
        const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

        // Canvas безопасной области, чтобы избежать обрезки
        canvas.width = safeArea;
        canvas.height = safeArea;

        // Переводим и вращаем изображение вокруг центра
        ctx.translate(safeArea / 2, safeArea / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.translate(-safeArea / 2, -safeArea / 2);

        // Рисуем изображение
        ctx.drawImage(
            image,
            safeArea / 2 - image.width * 0.5,
            safeArea / 2 - image.height * 0.5
        );

        const data = ctx.getImageData(
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height
        );

        // Устанавливаем размер canvas на обрезанное изображение
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        // Вставляем данные обратно в canvas
        ctx.putImageData(data, 0, 0);

        // Возвращаем обрезанное изображение как Blob
        return new Promise((resolve) => {
            canvas.toBlob((file) => {
                resolve(file);
            }, 'image/jpeg');
        });
    } catch (error) {
        console.error("Ошибка при загрузке изображения: ", error);
        throw new Error("Ошибка загрузки изображения");
    }
};

const createImage = (urlOrBlob) =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => {
            resolve(image);
        });
        image.addEventListener("error", (error) => {
            console.error("Ошибка загрузки изображения: ", error);
            reject(new Error("Ошибка загрузки изображения"));
        });

        if (typeof urlOrBlob === 'string') {
            // Если это строка, предполагаем, что это URL
            image.src = urlOrBlob;
        } else {
            // Если это Blob, преобразуем его в URL
            const objectUrl = URL.createObjectURL(urlOrBlob);
            image.src = objectUrl;
        }
    });
