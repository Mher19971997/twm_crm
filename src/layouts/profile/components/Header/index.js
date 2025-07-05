

import { useState, useEffect } from "react";

// TWA MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonAvatar from "components/ArgonAvatar";


// TWA MUI base styles
import breakpoints from "assets/theme/base/breakpoints";
import ArgonButton from "components/ArgonButton";
import team1 from "assets/images/team-1.jpg";
import ImageModal from "components/ImageModal";

function Header({ profile }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);


  return (
    <ArgonBox display="flex" justifyContent="center">
      {/* <ArgonBox height="100px" /> */}
      <ArgonBox display="flex" width="55%" pt={7} pb={7}>
        <ArgonBox mr={10}>
          {/* <ArgonAvatar
            src={!profile?.logo ? team1 : process.env.REACT_APP_BACKEND_API_URL + profile?.logo}
            alt="profile-image"
            variant="circle"
            size="xxl"
            shadow="sm"
          /> */}

          <ImageModal
            title="Загрузить аватар"
            photo={!profile?.logo ? team1 : process.env.REACT_APP_BACKEND_API_URL + profile?.logo}
            onChange={(photo) => console.log('Загружено новое фото:', photo)}
            onUpdatePhoto={(photo) => console.log('Обновлено фото:', photo)}
            onDeletePhoto={() => console.log('Фото удалено')}
            uploadName="avatar"
            role="edit" // Можно менять на "view", "edit" или "full"
          />
        </ArgonBox>
        <ArgonBox >
          <ArgonBox mt={0.5} mb={2} lineHeight={3} display="flex" alignItems="center" gap={3}>
            <ArgonTypography variant="h5" fontWeight="medium">
              {profile?.name}
            </ArgonTypography>
            <ArgonButton size="small">
              Edit Profile
            </ArgonButton>
          </ArgonBox>
          <ArgonBox display="flex" alignItems="center" gap={3}>
            <ArgonTypography
              variant="button"
              fontWeight="medium"
              sx={{ marginRight: 1, cursor: 'pointer' }}
            >
              <span style={{ fontWeight: 'bold', fontSize: 15, marginRight: 2 }}>25</span>  followers
            </ArgonTypography>
            <ArgonTypography
              variant="button"
              fontWeight="medium"
              sx={{ marginRight: 1, cursor: 'pointer' }}
            >
              <span style={{ fontWeight: 'bold', fontSize: 15, marginRight: 2 }}>55</span>  following
            </ArgonTypography>
          </ArgonBox>
        </ArgonBox>


      </ArgonBox>
    </ArgonBox>
  );
}

export default Header;
