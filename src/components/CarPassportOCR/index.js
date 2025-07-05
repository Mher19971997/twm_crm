import React, { useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';

const CarPassportOCR = ({ uploadedImage }) => {
    const [jsonResponse, setJsonResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const processImageForOCR = async () => {
            if (!uploadedImage) return;

            setLoading(true);

            try {
                // Extract text using Tesseract.js
                const { data: { text } } = await Tesseract.recognize(
                    uploadedImage,
                    'hye',
                    {
                        langPath: 'https://cdn.jsdelivr.net/npm/@tesseract.js-data/hye/4.0.0_best_int/', // Use CDN for language data
                        logger: (info) => console.log(info),
                    }
                );

                // Create a JSON object with the extracted text
                const responseJson = {
                    imageName: "cropped_image.png", // Since we're dealing with a cropped canvas image
                    extractedText: text,
                };
                console.log(responseJson, "responseJson");

                setJsonResponse(responseJson); // Set the JSON response
            } catch (error) {
                console.error('Error recognizing text:', error);
            } finally {
                setLoading(false);
            }
        };

        processImageForOCR();
    }, [uploadedImage]); // Trigger the effect when the uploaded image changes

    return (
        <div>
            {loading ? (
                <p>Processing image, please wait...</p>
            ) : (
                jsonResponse && (
                    <div>
                        <h2>JSON Response:</h2>
                        <pre>{JSON.stringify(jsonResponse, null, 2)}</pre>
                    </div>
                )
            )}
        </div>
    );
};

export default CarPassportOCR;
