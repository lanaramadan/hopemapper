import {
  CalciteModal,
  CalciteInput,
  CalciteButton,
  CalciteLabel,
  CalciteCombobox,
  CalciteComboboxItem,
  CalciteSegmentedControl,
  CalciteSegmentedControlItem,
  CalciteCardGroup,
  CalciteCard,
} from "@esri/calcite-components-react";
import type { FosterChild } from "../types/fosterChild";
import type { Home } from "../types/home";

import matchChildrenToHomes from "../logic/matchAlgorithm";
import { loadHomesFromText } from "../logic/csvLoaders";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SideNavbar from "../components/navigation/Navbar";
import TilePieChart from "../ArcGISChart";

const baseTileStyle = {
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 2px 12px 0 #0002",
  padding: "24px",
  margin: "24px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minWidth: "400px",
  minHeight: "250px",
  cursor: "pointer",
  transition: "background 0.2s, box-shadow 0.2s",
};

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.initialActiveTab) {
      setActiveTab(location.state.initialActiveTab);
    }
  }, [location.state]);

  // new child information
  const [showModal, setShowModal] = useState(false);
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState<number | null>(null);
  const [childGender, setChildGender] = useState<"m" | "f">("m");
  const [childLanguages, setChildLanguages] = useState<string[]>([]);
  const [childTrauma, setChildTrauma] = useState<
    | "At risk youth"
    | "Substance abuse"
    | "Co-occuring disorders"
    | "Sexual abuse survivors"
    | "Human trafficking survivors"
    | undefined
  >(undefined);
  const [matched, setMatched] = useState<FosterChild | null>(null);

  const [matchedResult, setMatchedResult] = useState<
    { home: Home; score: number }[] | null
  >(null);
  const [submitted, setSubmitted] = useState(false);

  // State for navbar section and active tab
  const [section, setSection] = useState("apps");
  const [activeTab, setActiveTab] = useState(
    location.state?.initialActiveTab || "Placement Tools"
  );
  const [hovered, setHovered] = useState<string | null>(null);

  // Analytics tiles
  const analyticsTiles = [
    {
      key: "total",
      label: "Total Available Homes",
      onClick: () => alert("Total Available Homes clicked!"),
      hovered: hovered === "total",
      onMouseEnter: () => setHovered("total"),
      onMouseLeave: () => setHovered(null),
      content: (
        <div style={{ width: 150, height: 150, marginTop: 16 }}>
          <TilePieChart />
        </div>
      ),
    },
    {
      key: "total",
      label: "Total Available Homes",
      onClick: () => alert("Total Available Homes clicked!"),
      hovered: hovered === "total",
      onMouseEnter: () => setHovered("total"),
      onMouseLeave: () => setHovered(null),
      content: (
        <div style={{ width: 150, height: 150, marginTop: 16 }}>
          <TilePieChart />
        </div>
      ),
    },
    // ...other tiles
    {
      key: "time",
      label: "Time in Agency",
      onClick: () => alert("Time in Agency clicked!"),
      hovered: hovered === "time",
      onMouseEnter: () => setHovered("time"),
      onMouseLeave: () => setHovered(null),
    },
    {
      key: "dashboard",
      label: "Data Dashboard",
      onClick: () => {},
      hovered: hovered === "dashboard",
      onMouseEnter: () => setHovered("dashboard"),
      onMouseLeave: () => setHovered(null),
    },
  ];

  // Main tiles
  let tiles = [
    {
      key: "homes",

      label: "Upload Foster Child",
      onClick: () => setShowModal(true), // on click open the modal
      hovered: hovered === "homes",
      onMouseEnter: () => setHovered("homes"),
      onMouseLeave: () => setHovered(null),
    },
    {
      key: "matching",
      label: "Home Matching",

      onClick: () => navigate("/map-dashboard"), // <-- Navigates to /map

      hovered: hovered === "matching",
      onMouseEnter: () => setHovered("matching"),
      onMouseLeave: () => setHovered(null),
    },
  ];

  // If Data Dashboard tab is selected, show the dashboard iframe
  const showDashboardIframe = activeTab === "Data Dashboard";

  // Default: show main tiles
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        background: "#f5f6fa",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Sidebar */}
      <SideNavbar
        section={section}
        setSection={setSection}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main content (tiles or iframe) */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: showDashboardIframe ? "flex-start" : "center",
          gap: "40px",
          height: "100%",
          position: "relative",
        }}
      >
        {showDashboardIframe ? (
          <iframe
            title="ArcGIS Data Dashboard"
            frameBorder="0"
            style={{
              height: "100%",
              width: "100%",
              border: "none",
              borderRadius: "12px",
              boxShadow: "0 4px 20px 0 #0003",
              background: "#fff",
            }}
            src="https://www.arcgis.com/apps/dashboards/bec5cfde60ad41fb9d2f4ca0b16e3355"
            allowFullScreen
          />
        ) : (
          tiles.map((tile) => (
            <div
              key={tile.key}
              style={{
                ...baseTileStyle,
                background: tile.hovered ? "#e6ecea" : baseTileStyle.background,
                boxShadow: tile.hovered
                  ? "0 4px 20px 0 #0003"
                  : baseTileStyle.boxShadow,
              }}
              onMouseEnter={tile.onMouseEnter}
              onMouseLeave={tile.onMouseLeave}
              onClick={tile.onClick}
              tabIndex={0}
              role="button"
            >
              <h2 style={{ fontSize: "2rem", color: "#222", margin: 0 }}>
                {tile.label}
              </h2>
            </div>
          ))
        )}
      </div>

      <CalciteModal
        open={showModal}
        onCalciteModalClose={() => {
          setShowModal(false);
          setChildName("");
          setChildAge(null);
          setChildGender("m");
          setChildLanguages([]);
          setChildTrauma(undefined);
          setMatched(null);
          setMatchedResult(null);
          setSubmitted(false);
        }}
      >
        <div slot="header" id="modal-title">
          {!submitted
            ? "Upload New Foster Child"
            : `${childName}'s Matched Homes`}
        </div>

        <div slot="content">
          {!submitted ? (
            <>
              <CalciteLabel>
                Name
                <CalciteInput
                  value={childName}
                  onCalciteInputInput={(e) => setChildName(e.target.value)}
                />
              </CalciteLabel>

              <CalciteLabel>
                Age
                <CalciteInput
                  type="number"
                  value={childAge?.toString() || ""}
                  onCalciteInputInput={(e) =>
                    setChildAge(parseInt(e.target.value))
                  }
                />
              </CalciteLabel>

              <CalciteLabel>
                Gender
                <CalciteSegmentedControl>
                  <CalciteSegmentedControlItem
                    value="m"
                    checked={childGender === "m"}
                    onClick={() => setChildGender("m")}
                  >
                    Male
                  </CalciteSegmentedControlItem>
                  <CalciteSegmentedControlItem
                    value="f"
                    checked={childGender === "f"}
                    onClick={() => setChildGender("f")}
                  >
                    Female
                  </CalciteSegmentedControlItem>
                </CalciteSegmentedControl>
              </CalciteLabel>

              <CalciteLabel>
                Languages
                <CalciteCombobox
                  selectionMode="multiple"
                  onCalciteComboboxChange={(e) =>
                    setChildLanguages(
                      Array.from(e.target.selectedItems).map(
                        (item) => item.value
                      )
                    )
                  }
                >
                  {[
                    "English",
                    "Arabic",
                    "Spanish",
                    "Mandarin",
                    "Portuguese",
                  ].map((lang) => (
                    <CalciteComboboxItem
                      key={lang}
                      value={lang}
                      heading={lang}
                    />
                  ))}
                </CalciteCombobox>
              </CalciteLabel>

              <CalciteLabel>
                Trauma Type
                <CalciteCombobox
                  selectionMode="single"
                  onCalciteComboboxChange={(e) =>
                    setChildTrauma(
                      e.target.selectedItems[0]
                        ?.value as FosterChild["traumaCare"]
                    )
                  }
                >
                  {[
                    "At risk youth",
                    "Substance abuse",
                    "Co-occuring disorders",
                    "Sexual abuse survivors",
                    "Human trafficking survivors",
                  ].map((label) => (
                    <CalciteComboboxItem
                      key={label}
                      value={label}
                      heading={label}
                    />
                  ))}
                </CalciteCombobox>
              </CalciteLabel>

              <CalciteButton
                label="upload"
                width="full"
                appearance="solid"
                onClick={async () => {
                  if (!childName || childAge == null) {
                    alert("Please fill in all fields.");
                    return;
                  }

                  const homesRes = await fetch("/data/fosterHomes.csv");
                  const homesCsv = await homesRes.text();
                  const homes = loadHomesFromText(homesCsv);

                  const child: FosterChild = {
                    name: childName,
                    age: childAge,
                    gender: childGender,
                    languages: childLanguages,
                    traumaCare: childTrauma,
                    matchedHomes: null,
                  };

                  const [matchedChild] = matchChildrenToHomes([child], homes);
                  setMatched(matchedChild);
                  setMatchedResult(matchedChild?.matchedHomes || []);
                  setSubmitted(true);
                }}
              >
                Submit & Match
              </CalciteButton>
            </>
          ) : (
            <>
              {matchedResult && matchedResult.length > 0 && (
                <div className="mt-4 flex justify-center">
                  <CalciteCardGroup>
                    {matchedResult.slice(0, 3).map(({ home, score }, index) => (
                      <CalciteCard
                        key={index}
                        class="w-[100%] shadow-md text-left"
                      >
                        <div slot="heading">
                          #{index + 1} Match: {home.facilityName}
                        </div>
                        <div
                          slot="description"
                          className={
                            (score >= 80
                              ? "text-[#769A96]"
                              : score >= 50
                              ? "text-[#D8B668]"
                              : "text-[#AC6868]") + " font-medium text-left"
                          }
                        >
                          Match Score: {score}%
                        </div>
                        <div slot="description" className="italic text-left">
                          {home.address}, {home.city},{" "}
                          {home.state.toUpperCase()} {home.zipCode}
                        </div>
                        {/* <CalciteButton
                          slot="footer-end"
                          scale="s"
                          label="View"
                          appearance="outline-fill"
                        >
                          View on Map
                        </CalciteButton> */}
                      </CalciteCard>
                    ))}
                  </CalciteCardGroup>
                </div>
              )}
            </>
          )}
        </div>
      </CalciteModal>
    </div>
  );
}

export default Dashboard;
