

import { useContext, useState } from "react";

// react-router-dom components
import { Link, } from "react-router-dom";

// TWA MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";
import { login } from "http/authApi";
import { AuthContext } from "context";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import bgImage from 'assets/images/background-sign-in.jpg'

function Illustration() {
  const authContext = useContext(AuthContext);
  const [credentialsErros, setCredentialsError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState(null);
  const prefix = localStorage.getItem('prefix');

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const submitHandler = async (e) => {
    // check rememeber me?
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email.trim().length === 0 || !email.trim().match(mailFormat)) {
      setErrors({ ...errors, emailError: true });
      return;
    }

    if (password.trim().length < 6) {
      setErrors({ ...errors, passwordError: true });
      return;
    }

    const user = { email: email, password: password };
    try {
      const response = await login(user);
      authContext.login(response?.data.access_token);
    } catch (res) {
      if (res.hasOwnProperty("message")) {
        setCredentialsError(res?.response?.data?.message);
      } else {
        setCredentialsError(res?.errors[0]?.detail);
      }
    }

    return () => {
      setErrors({
        emailError: false,
        passwordError: false,
      });
    };
  };

  return (
    <IllustrationLayout
      title="Sign In"
      color="dark"
      description="Enter your email and password to sign in"
      illustration={{
        image: bgImage,
        title: '"Путешествие начинается с одного клика"',
        description:
          "Мы убрали всё лишнее, чтобы оставить главное — ваш отдых. Войдите и начните своё новое приключение.",
      }}
    >
      <ArgonBox component="form" role="form" onSubmit={submitHandler}>
        <ArgonBox mb={2}>
          <ArgonInput
            id="email"
            type="email"
            placeholder="Email"
            size="large"
            name="email"
            error={credentialsErros}
          />
        </ArgonBox>
        <ArgonBox>
          <ArgonInput
            id="password"
            name="password"
            placeholder="Password"
            size="large"
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
        <ArgonTypography
          variant="caption"
          size="small"
          color="error"
          fontWeight="medium"
        >
          {credentialsErros?.split('_')?.join(" ")}
        </ArgonTypography>
        <ArgonBox mt={4} mb={1}>
          <ArgonButton type="submit" color="info" size="large" fullWidth>
            Sign In
          </ArgonButton>
        </ArgonBox>
        {prefix !== 'admin' &&
          <ArgonBox mt={3} textAlign="center">
            <ArgonTypography variant="button" color="text" fontWeight="regular">
              Don&apos;t have an account?{" "}
              <ArgonTypography
                component={Link}
                to={`/admin/authentication/sign-up`}
                variant="button"
                color="dark"
                fontWeight="medium"
                textGradient
              >
                Sign up
              </ArgonTypography>
            </ArgonTypography>
          </ArgonBox>
        }
      </ArgonBox>
    </IllustrationLayout>
  );
}

export default Illustration;