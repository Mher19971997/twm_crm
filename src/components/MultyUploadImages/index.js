import React, { useState, useEffect } from 'react';
import { Modal, IconButton } from '@mui/material';
import { Delete, Edit, ArrowBack, ArrowForward, PhotoCamera } from '@mui/icons-material';
import ArgonButton from 'components/ArgonButton';
import ArgonBox from 'components/ArgonBox';

const MultyUploadImages = ({ 
    title = "Загрузить фотографии", 
    photos = [], 
    onChange, 
    onUpdatePhoto, 
    onDeletePhoto,
    uploadName
}) => {
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePhotoUpload = (event) => {
        const uploadedPhotos = Array.from(event.target.files);
        onChange([...photos, ...uploadedPhotos]);
    };

    const openModal = (index) => {
        setSelectedPhoto(URL.createObjectURL(photos[index]));
        setCurrentIndex(index);
    };

    const closeModal = () => {
        setSelectedPhoto(null);
        setCurrentIndex(0);
    };

    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % photos.length;
        setSelectedPhoto(URL.createObjectURL(photos[nextIndex]));
        setCurrentIndex(nextIndex);
    };

    const handlePrev = () => {
        const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
        setSelectedPhoto(URL.createObjectURL(photos[prevIndex]));
        setCurrentIndex(prevIndex);
    };

    const handleUpdate = (event) => {
        const file = event.target.files[0];
        if (file) {
            const updatedPhotos = [...photos];
            updatedPhotos[currentIndex] = file;
            onChange(updatedPhotos);
            onUpdatePhoto?.(currentIndex, file);
            closeModal();
        }
    };

    const handleDelete = () => {
        const updatedPhotos = photos.filter((_, i) => i !== currentIndex);
        onChange(updatedPhotos);
        onDeletePhoto?.(currentIndex);
        closeModal();
    };

    useEffect(() => {
        if (selectedPhoto) {
            const handleKeyDown = (event) => {
                if (event.key === 'ArrowRight') handleNext();
                if (event.key === 'ArrowLeft') handlePrev();
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [selectedPhoto, currentIndex]);

    return (
        <ArgonBox sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <ArgonButton
                variant="contained"
                component="label"
                startIcon={<PhotoCamera />}
            >
                {title}
                <input
                    hidden
                    accept="image/*"
                    multiple
                    name={uploadName}
                    type="file"
                    onChange={handlePhotoUpload}
                />
            </ArgonButton>

            <ArgonBox sx={{ padding: 2 }}>
                {photos.length > 0 && (
                    <ArgonBox
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 2,
                            justifyContent: "space-between",
                            overflowY: "scroll",
                            height: '300px',
                            width: "500px",
                        }}
                    >
                        {photos.map((photo, index) => (
                            <img
                                key={index}
                                src={URL.createObjectURL(photo)}
                                alt={`Photo ${index + 1}`}
                                style={{ width: 100, height: 100, objectFit: 'cover', cursor: 'pointer' }}
                                onClick={() => openModal(index)}
                            />
                        ))}
                    </ArgonBox>
                )}

                <Modal open={!!selectedPhoto} onClose={closeModal}>
                    <ArgonBox
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        {selectedPhoto && (
                            <ArgonBox
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '700px',
                                    height: '500px',
                                    overflow: 'hidden',
                                }}
                            >
                                <img
                                    src={selectedPhoto}
                                    alt="Selected Photo"
                                    style={{
                                        maxWidth: '100%',
                                        height: 'auto',
                                        objectFit: 'contain',
                                    }}
                                />
                            </ArgonBox>
                        )}
                        <ArgonBox sx={{ mt: 2, display: 'flex', gap: 1 }}>
                            <IconButton onClick={handlePrev} disabled={photos.length <= 1}>
                                <ArrowBack />
                            </IconButton>
                            <IconButton onClick={handleNext} disabled={photos.length <= 1}>
                                <ArrowForward />
                            </IconButton>
                            <IconButton>
                                <label htmlFor="update-photo">
                                    <Edit />
                                </label>
                                <input
                                    id="update-photo"
                                    hidden
                                    type="file"
                                    name={uploadName}
                                    accept="image/*"
                                    onChange={handleUpdate}
                                />
                            </IconButton>
                            <IconButton onClick={handleDelete}>
                                <Delete />
                            </IconButton>
                        </ArgonBox>
                        <ArgonButton onClick={closeModal} variant="outlined" sx={{ mt: 2 }}>
                            Close
                        </ArgonButton>
                    </ArgonBox>
                </Modal>
            </ArgonBox>
        </ArgonBox>
    );
};

export default MultyUploadImages;
