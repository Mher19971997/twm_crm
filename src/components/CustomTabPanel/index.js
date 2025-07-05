import ArgonBox from "components/ArgonBox";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <ArgonBox sx={{ p: 3 }}>{children}</ArgonBox>}
        </div>
    );
}

export default CustomTabPanel