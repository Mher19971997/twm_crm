import React, { useState } from "react";
import PropTypes from "prop-types";
import FilterConfigurator from "examples/FilterConfigurator";
import ArgonBox from "components/ArgonBox";
import ArgonInput from "components/ArgonInput";
import DateToDate from "components/DateToDate";
import ArgonButton from "components/ArgonButton";
import PhoneInput from "react-phone-input-2";
import { useSearchParams } from "react-router-dom";


const FilterGarageMenu = ({ openMenu, handleCloseMenu }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [name, setName] = React.useState(searchParams.get('name') || "");
  const [information, setInformation] = React.useState(searchParams.get('information') || "");
  const [shortName, setShortName] = React.useState(searchParams.get('shortName') || "");
  const [phone, setPhone] = React.useState(searchParams.get('phone') || "");
  const [email, setEmail] = React.useState(searchParams.get('email') || "");

  const submitHandler = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const name = e.target.name.value;
    const information = e.target.information.value;
    const shortName = e.target.shortName.value;
    const phone = e.target.phone.value === '+374' ? '' : e.target.phone.value.split(' ').join('');

    const params = { email, name, information, shortName, phone };

    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value)
    );
    setSearchParams(filteredParams);
  };

  return (
    <FilterConfigurator
      openMenu={openMenu}
      handleCloseMenu={handleCloseMenu}
      title={"Organizations Filters"}
    >
      <ArgonBox component="form" role="form" onSubmit={submitHandler}>
        <ArgonBox mb={1}>
          <ArgonInput
            name={"name"}
            placeholder={"Name"}
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </ArgonBox>
        <ArgonBox mb={1}>
          <ArgonInput
            name={"information"}
            placeholder={"Information"}
            value={information}
            onChange={e => setInformation(e.target.value)}
          />
        </ArgonBox>
        <ArgonBox mb={1}>
          <ArgonInput
            name={"shortName"}
            placeholder={"ShortName"}
            value={shortName}
            onChange={e => setShortName(e.target.value)}
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
            value={phone}
            onChange={e => setPhone(e.target.value)}
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
        <ArgonBox mb={1}>
          <ArgonInput
            id="email"
            name={"email"}
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder={"Email"}
          />
        </ArgonBox>
        <ArgonBox mb={0.5}>
          <DateToDate />
        </ArgonBox>
        <ArgonBox display="flex" justifyContent="flex-end" py={2}>
          <ArgonButton variant="gradient" type="submit" color="info">
            Save Changes
          </ArgonButton>
        </ArgonBox>
      </ArgonBox>
    </FilterConfigurator>
  );
};

FilterGarageMenu.propTypes = {
  openMenu: PropTypes.bool,
  handleCloseMenu: PropTypes.any,
};

export default FilterGarageMenu;