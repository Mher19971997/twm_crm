import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";

const formatSsn = (str, show) =>
  str
    .split("")
    .map((l, i) => {
      if (i === 2 || i === 4) return show ? `${l}-` : "*-";
      if (i < 5 && !show) return "*";
      return l;
    })
    .join("");

const SsnInput = props => {
  const {
    toggle = false,
    value: ssn = undefined,
    onChange = null,
    InputProps = {},
    ...other
  } = props;
  const [text, setText] = useState(ssn || "");
  const [show, setShow] = useState(false);
  const value = formatSsn(ssn === undefined ? text : ssn, show);

  const update = (name, value) => {
    setText(value);
    if (onChange) {
      onChange({ target: { name, value } });
    }
  };

  const keyChange = e => {
    const {
      keyCode,
      key,
      target: { name }
    } = e;
    if ([9, 13].includes(keyCode)) return;
    if (keyCode === 8) {
      return text.length && update(name, text.slice(0, -1));
    }
    if (!/^\d+$/.test(key)) return;
    if (text.length === 9) return;
    update(name, text + key);
  };

  return (
    <TextField
      {...other}
      required
      value={value}
      placeholder="SSN"
      onKeyDown={keyChange}
      InputProps={{
        ...InputProps,
        endAdornment: toggle && (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle ssn visibility"
              onClick={() => setShow(!show)}
              onMouseDown={e => e.preventDefault()}
            >
              {show ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
};

export default SsnInput;
