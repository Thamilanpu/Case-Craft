
export const compressImage = (file, maxWidth = 1500, quality = 0.8) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const elem = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > maxWidth || height > maxWidth) {
                    if (width > height) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    } else {
                        width = Math.round((width * maxWidth) / height);
                        height = maxWidth;
                    }
                }

                elem.width = width;
                elem.height = height;
                const ctx = elem.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Convert to base64 string
                // Using jpeg for better compression of photos
                // If transparency is needed (PNG), we might need logic. 
                // But for "templates" (usually overlays?), transparency IS needed.
                // If it's a template overlay, it's likely a PNG. 
                // JPEG doesn't support transparency.

                let mimeType = file.type;
                if (mimeType === 'image/jpeg' || mimeType === 'image/jpg') {
                    resolve(elem.toDataURL(mimeType, quality));
                } else {
                    // For PNG, quality param doesn't work in toDataURL, but resizing helps.
                    // Also, we can use 'image/webp' which supports transparency and compression?
                    // But let's stick to input type or default to png.
                    resolve(elem.toDataURL(mimeType));
                }
            };
            img.onerror = (err) => reject(err);
        };
        reader.onerror = (err) => reject(err);
    });
};
