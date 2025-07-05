import React, { useState, useEffect } from 'react';
import { Modal, IconButton } from '@mui/material';
import { Delete, Edit, PhotoCamera } from '@mui/icons-material';
import ArgonButton from 'components/ArgonButton';
import ArgonBox from 'components/ArgonBox';

const ImageModal = ({
    title = "Загрузить фотографию",
    photo = null, // Может быть URL строкой или File объектом
    onChange,
    onUpdatePhoto,
    onDeletePhoto,
    uploadName,
    role = 'view', // Роли: 'view', 'edit', 'full'
}) => {
    const [selectedPhoto, setSelectedPhoto] = useState(
        typeof photo === 'string' ? photo : photo ? URL.createObjectURL(photo) : null
    );
    const [isModalOpen, setModalOpen] = useState(false);

    const handlePhotoUpload = (event) => {
        if (role !== 'full') return; // Разрешить загрузку только при полном доступе
        const file = event.target.files?.[0] || null;
        if (file) {
            onChange?.(file);
            setSelectedPhoto(URL.createObjectURL(file));
        }
    };

    const handleUpdate = (event) => {
        if (role === 'view') return; // Запретить обновление при роли "только просмотр"
        const file = event.target.files?.[0] || null;
        if (file) {
            onUpdatePhoto?.(file);
            setSelectedPhoto(URL.createObjectURL(file));
        }
    };

    const handleDelete = () => {
        if (role !== 'full') return; // Удаление доступно только при полном доступе
        onDeletePhoto?.();
        setSelectedPhoto(null);
    };

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    useEffect(() => {
        if (photo) {
            setSelectedPhoto(
                typeof photo === 'string' ? photo : URL.createObjectURL(photo)
            );
        } else {
            setSelectedPhoto(null);
        }
    }, [photo]);

    return (
        <ArgonBox sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {role === 'full' && (
                <ArgonButton
                    variant="contained"
                    component="label"
                    startIcon={<PhotoCamera />}
                >
                    {title}
                    <input
                        hidden
                        accept="image/*"
                        name={uploadName}
                        type="file"
                        onChange={handlePhotoUpload}
                    />
                </ArgonButton>
            )}

            {selectedPhoto && (
                <ArgonBox
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <img
                        src={selectedPhoto}
                        alt="Uploaded Photo"
                        onClick={openModal} // Открыть модальное окно при клике
                        style={{
                            width: '300px',
                            height: 'auto',
                            objectFit: 'contain',
                            borderRadius: 8,
                            cursor: 'pointer',
                        }}
                    />
                    <ArgonBox sx={{ mt: 2, display: 'flex', gap: 1 }}>
                        {role !== 'view' && (
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
                        )}
                        {role === 'full' && (
                            <IconButton onClick={handleDelete}>
                                <Delete />
                            </IconButton>
                        )}
                    </ArgonBox>
                </ArgonBox>
            )}

            {/* Модальное окно для увеличения фото */}
            <Modal open={isModalOpen} onClose={closeModal}>
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
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <img
                        src={selectedPhoto}
                        alt="Enlarged Photo"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '80vh',
                            objectFit: 'contain',
                        }}
                    />
                </ArgonBox>
            </Modal>
        </ArgonBox>
    );
};

export default ImageModal;
