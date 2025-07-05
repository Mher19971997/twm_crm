import React, { useState } from 'react';
import { Box, Tabs, Tab, TextField, Button, Grid, Select, MenuItem, InputLabel, FormControl, Container } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const AccidentForm = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [formData, setFormData] = useState({
        driverName: '',
        licenseNumber: '',
        contactInfo: '',
        policyType: '',
        policyExpiry: null,
        vehicleModel: '',
        vehicleNumber: '',
        accidentPlace: '',
        accidentTime: null,
        accidentDetails: '',
    });

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleDateChange = (key, newDate) => {
        setFormData({
            ...formData,
            [key]: newDate,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Data Submitted:', formData);
    };

    return (
        <Container>
            <Box sx={{ width: '100%', mt: 4 }}>
                <Tabs value={tabIndex} onChange={handleTabChange} centered>
                    <Tab label="Driver Details" />
                    <Tab label="Insurance Policy" />
                    <Tab label="Vehicle Details" />
                    <Tab label="Accident Report" />
                </Tabs>
                <form onSubmit={handleSubmit}>
                    {tabIndex === 0 && (
                        <Box sx={{ mt: 4 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Driver Name"
                                        name="driverName"
                                        value={formData.driverName}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="License Number"
                                        name="licenseNumber"
                                        value={formData.licenseNumber}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Contact Information"
                                        name="contactInfo"
                                        value={formData.contactInfo}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    )}

                    {tabIndex === 1 && (
                        <Box sx={{ mt: 4 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel>Policy Type</InputLabel>
                                        <Select
                                            value={formData.policyType}
                                            name="policyType"
                                            onChange={handleInputChange}
                                            label="Policy Type"
                                        >
                                            <MenuItem value="PPA">PPA</MenuItem>
                                            <MenuItem value="Kasko">Kasko</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <DatePicker
                                        label="Policy Expiry Date"
                                        value={formData.policyExpiry}
                                        onChange={(newDate) => handleDateChange('policyExpiry', newDate)}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    )}

                    {tabIndex === 2 && (
                        <Box sx={{ mt: 4 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Vehicle Model"
                                        name="vehicleModel"
                                        value={formData.vehicleModel}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Vehicle Number"
                                        name="vehicleNumber"
                                        value={formData.vehicleNumber}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    )}

                    {tabIndex === 3 && (
                        <Box sx={{ mt: 4 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Accident Place"
                                        name="accidentPlace"
                                        value={formData.accidentPlace}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <DatePicker
                                        label="Accident Time"
                                        value={formData.accidentTime}
                                        onChange={(newDate) => handleDateChange('accidentTime', newDate)}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Accident Details"
                                        name="accidentDetails"
                                        value={formData.accidentDetails}
                                        onChange={handleInputChange}
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    )}

                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="outlined" color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Save
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default AccidentForm;
