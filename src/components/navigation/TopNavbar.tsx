import { useNavigate } from "react-router-dom";
import {
  CalciteNavigation,
  CalciteNavigationLogo,
  CalciteNavigationUser,
  CalciteMenu,
  CalciteMenuItem,
} from "@esri/calcite-components-react";
import homemapperLogo from '/images/hopemapper-logo.png';

function TopNavbar() {
  const navigate = useNavigate();
  return (
    <CalciteNavigation slot="header">

      <img
        slot="logo"
        src={homemapperLogo}
        alt="HopeMapper Logo"
        className="h-[36px] ml-5 mt-3"
        onClick={() => navigate("/dashboard")}
      />

      <CalciteNavigationLogo
        slot="logo"
        heading="HopeMapper"
        description="Mapping Stability and Matching Futures"
        onClick={() => navigate("/dashboard")}
        style={{ cursor: "pointer" }}
      />


      <CalciteMenu slot="content-end" layout="horizontal">
        <CalciteMenuItem text="Map Dashboard" active />
        <CalciteMenuItem
          text="Data Dashboard"
          onClick={() =>
            navigate("/dashboard", {
              state: { initialActiveTab: "Data Analysis" },
            })
          }
        />
      </CalciteMenu>
      <CalciteNavigationUser slot="user" fullName="Jack Dangermond" username="jdangermond"/>
    </CalciteNavigation>
  );
}

export default TopNavbar;
