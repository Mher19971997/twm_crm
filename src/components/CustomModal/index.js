import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArgonButton from 'components/ArgonButton';
import ArgonBox from 'components/ArgonBox';

const sizeStyles = {
    small: {
        width: 300,
        // height: 200,
    },
    normal: {
        width: 400,
        // height: 300,
    },
    large: {
        width: 600,
        // height: 400,
    },
};

const defaultStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
};

export default function CustomModal({
    title,
    description,
    children,
    buttonLabel,
    size = 'normal',
    Icon
}) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Get the styles based on the provided size
    const currentSizeStyle = sizeStyles[size] || sizeStyles.normal;

    return (
        <ArgonBox>
            <ArgonButton variant="outlined" color="info" size="medium" onClick={handleOpen} endIcon={Icon}>{buttonLabel || 'Open modal'}</ArgonButton>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="custom-modal-title"
                aria-describedby="custom-modal-description"
            >
                <Box
                    sx={{
                        ...defaultStyle,
                        width: currentSizeStyle.width,
                        height: currentSizeStyle.height
                    }}
                >
                    {title &&
                        <Typography id="custom-modal-title" variant="h6" component="h2">
                            {title}
                        </Typography>
                    }
                    {description &&
                        <Typography id="custom-modal-description" sx={{ mt: 2 }}>
                            {description}
                        </Typography>
                    }
                    <Box sx={{ mt: 2 }}>
                        {children}
                    </Box>
                    <Button onClick={handleClose} sx={{ mt: 2 }}>
                        Close
                    </Button>
                </Box>
            </Modal>
        </ArgonBox>
    );
}