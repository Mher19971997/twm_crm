import { Link } from "@mui/material";
import ArgonAvatar from "components/ArgonAvatar";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

function Author({ image, name, email }) {
    return (
        <ArgonBox display="flex" alignItems="center" px={1} py={0.5}>
            <ArgonBox mr={2}>
                <ArgonAvatar src={image} alt={name} size="sm" variant="rounded" />
            </ArgonBox>
            <ArgonBox display="flex" flexDirection="column">
                <ArgonTypography variant="button" fontWeight="medium">
                    {name}
                </ArgonTypography>
                <Link href={`mailto:${email}`} variant="caption" color="secondary">
                    {email}
                </Link>
            </ArgonBox>
        </ArgonBox>
    );
}

export default Author