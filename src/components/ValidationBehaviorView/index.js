import * as React from 'react';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useArgonController } from 'context';

function ValidationBehaviorView() {
    const [controller] = useArgonController();
    const { darkMode } = controller;
    const [selectedDate, setSelectedDate] = React.useState(dayjs());
    const [selectedTime, setSelectedTime] = React.useState(dayjs());

    const handleDateChange = (newDate) => setSelectedDate(newDate);
    const handleTimeChange = (newTime) => setSelectedTime(newTime);

    // Create themes
    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid
                    container
                    columns={{ xs: 1, lg: 2 }}
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid item>
                        <DateCalendar
                            value={selectedDate}
                            onChange={handleDateChange}
                            disableFuture
                        />
                    </Grid>
                    <Grid item>
                        <TimeClock
                            value={selectedTime}
                            onChange={handleTimeChange}
                            views={['hours', 'minutes']}
                        />
                    </Grid>
                </Grid>
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default ValidationBehaviorView;
