

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Checkbox from "@mui/material/Checkbox";

// TWA MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import PhoneInput from "react-phone-input-2";
import { register } from "http/authApi";
import { useState } from "react";
import { convertBase64 } from "utils/convertBase64";
import DownloadingIcon from '@mui/icons-material/Downloading';
import IllustrationLayout from "../components/IllustrationLayout";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const bgImage =
  "https://i.pinimg.com/736x/f7/ac/57/f7ac5707ec3562f50af06357993cf3c7.jpg";

function Cover() {
  const navigate = useNavigate()

  const [credentialsErros, setCredentialsError] = useState(null);
  const [image, setImage] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const prefix = localStorage.getItem("prefix");
  
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFileRead = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    setImage({ image: base64, file: file });
  };

  const submitHandler = async (e) => {
    e.preventDefault()
    const email = e.target.email.value;
    const name = e.target.name.value;
    const phone = e.target.phone.value;
    const information = e.target.information.value;
    const shortName = e.target.shortName.value;
    const password = e.target.password.value;
    try {
      const imageFormData = new FormData();
      imageFormData.append("email", email);
      imageFormData.append("name", name);
      imageFormData.append("information", information);
      imageFormData.append("shortName", shortName);
      imageFormData.append("password", password);
      imageFormData.append("phone", phone.split(' ').join(''));
      imageFormData.append("logo", image.file);
      await register(imageFormData);
      // authContext.login(response?.data.access_token);
      navigate(`/${prefix}/authentication/sign-in`);

    } catch (res) {
      if (res.hasOwnProperty("message")) {
        setCredentialsError(res?.response?.data?.message);
      } else {
        setCredentialsError(res?.errors[0]?.detail);
      }
    }

  }


  return (
    <IllustrationLayout
      title="Sign Up"
      color="dark"
      // description="Enter your email and password to sign in"
      illustration={{
        image: bgImage,
        title: '"Attention is the new currency"',
        description:
          "The more effortless the writing looks, the more effort the writer actually put into the process.",
      }}
    >
      <ArgonBox>
        <ArgonBox p={3} >
          <ArgonBox component="form" role="form" onSubmit={submitHandler} >
          <ArgonBox pb={3} display="flex" justifyContent="center">
  {Object.keys(image).length ? (
    <img src={image?.image} width={100} height={100} style={{ borderRadius: '50%' }} />
  ) : (
    <>
      <input
        style={{ 
          visibility: 'hidden', 
          position: 'absolute', 
          width: 0, 
          height: 0 
        }}
        id="contained-button-file"
        name="contained-button-file"
        onChange={(e) => handleFileRead(e)}
        type="file"
        required={true}
      />
      <label htmlFor="contained-button-file">
        <ArgonBox
          variant="gradient"
          bgColor="info"
          width="100px"
          height="100px"
          borderRadius="50%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <DownloadingIcon fontSize="large" color="white" />
        </ArgonBox>
      </label>
    </>
  )}

            </ArgonBox>
            <ArgonBox mb={2} display="flex" gap={2}>

              <ArgonInput
                required
                placeholder="Name"
                id="name"
                name="name"
              />
              <ArgonInput
                required
                type="email"
                placeholder="Email"
                id="email"
                name="email"
              />
            </ArgonBox>
            <ArgonBox mb={2}>
              <PhoneInput
                id="phone"
                name="phone"
                inputProps={{
                  name: 'phone',
                  required: true,
                  autoFocus: true
                }}
                required
                inputStyle={{ width: '100%' }}
                country={'am'}
                isValid={(value, country) => {
                  if (value.match(/12345/)) {
                    return 'Invalid value: ' + value + ', ' + country.name;
                  } else if (value.match(/1234/)) {
                    return false;
                  } else {
                    return true;
                  }
                }}
              />
            </ArgonBox>
            <ArgonBox mb={2} display="flex" gap={2}>
              <ArgonInput
                required
                placeholder="Information"
                id="information"
                name="information"
              />
              <ArgonInput
                required
                type="text"
                id="shortName"
                name="shortName"
                placeholder="Short Name"
              />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                error={credentialsErros}
                endAdornment={
                  <InputAdornment>
                    <IconButton
                      size="small"
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? (
                        <VisibilityOff fontSize="small" />
                      ) : (
                        <Visibility fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </ArgonBox>
            <ArgonBox display="flex" alignItems="center">
              <Checkbox defaultChecked />
              <ArgonTypography
                variant="button"
                fontWeight="regular"
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </ArgonTypography>
              <ArgonTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Terms and Conditions
              </ArgonTypography>
            </ArgonBox>
            <ArgonBox mt={4} mb={1}>
              <ArgonButton type="submit" variant="gradient" color="info" fullWidth>
                sign up
              </ArgonButton>
            </ArgonBox>
            <ArgonBox mt={2}>
              <ArgonTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <ArgonTypography
                  component={Link}
                  to={`/${prefix}/authentication/sign-in`}
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </ArgonTypography>
              </ArgonTypography>
            </ArgonBox>
          </ArgonBox>
        </ArgonBox>
      </ArgonBox>
    </IllustrationLayout>
  );
}

export default Cover;
