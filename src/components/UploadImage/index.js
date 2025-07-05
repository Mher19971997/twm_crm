import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";
import React, { useEffect, useRef, useState } from "react";
import { Cropper } from "react-mobile-cropper";
import "react-mobile-cropper/dist/style.css";

const UploadImage = ({ handleImageCrop }) => {
    const inputRef = useRef(null);
    const cropperRef = useRef();

    const [imageFile, setImageFile] = useState(null); // Store image as File
    const [imageURL, setImageURL] = useState(null); // Store image URL
    const [croppedFile, setCroppedFile] = useState(null); // Store cropped image as File

    const onUpload = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const onCrop = () => {
        const cropper = cropperRef.current;
        if (cropper) {
            const canvas = cropper.getCanvas();
            if (canvas) {
                canvas.toBlob((blob) => {
                    if (blob) {
                        const fileName = imageFile?.name || "cropped-image.jpg";
                        const file = new File([blob], fileName, { type: 'image/jpeg' });
                        setCroppedFile(file); // Set cropped image as File
                        sendFileToBackend(file); // Send to backend
                        handleImageCrop(file)
                    }
                }, 'image/jpeg');
            }
        }
    };

    const sendFileToBackend = (file) => {
        const formData = new FormData();
        formData.append('file', file); // Append file
    };

    const onLoadImage = (event) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            handleImageCrop(file)
            setImageFile(file); // Store the uploaded file
            setImageURL(URL.createObjectURL(file)); // Generate and set image URL for cropping
        }
        event.target.value = ""; // Clear the input after image selection
    };

    useEffect(() => {
        // Clean up object URL to prevent memory leaks
        return () => {
            if (imageURL) {
                URL.revokeObjectURL(imageURL);
            }
        };
    }, [imageURL]);

    return (
        <ArgonBox className="example">
            <ArgonBox className="example__cropper-wrapper">
                <Cropper
                    ref={cropperRef}
                    className="example__cropper"
                    backgroundClassName="example__cropper-background"
                    src={imageURL} // Use imageURL to display the uploaded image
                />
            </ArgonBox>
            <ArgonBox className="example__buttons-wrapper">
                <ArgonButton className="example__button" onClick={onUpload}>
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        onChange={onLoadImage}
                        required
                    />
                    Upload image
                </ArgonButton>
                {imageURL && (
                    <ArgonButton className="example__button" onClick={onCrop}>
                        Crop and Upload
                    </ArgonButton>
                )}
            </ArgonBox>
        </ArgonBox>
    );
};

export default UploadImage;
