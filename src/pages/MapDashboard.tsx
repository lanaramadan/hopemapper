import { useState, useEffect } from "react";

import {
  CalciteShell,
  CalciteShellPanel,
  CalcitePanel,
} from "@esri/calcite-components-react";

import TopNavbar from "../components/navigation/TopNavBar";
import Filters from "../components/filters";
import ChildrenPanel from "../components/childrenPanel";
import CustomMap from "../components/customMap";

import type { FosterChild } from "../types/fosterChild";
import type { Home } from "../types/home";

import {
  loadFosterChildrenFromText,
  loadHomesFromText,
} from "../logic/csvLoaders";

function MapDashboard() {
  const [fosterChildren, setFosterChildren] = useState<FosterChild[]>([]);
  const [homes, setHomes] = useState<Home[]>([]);
  const [center, setCenter] = useState([-122.41, 37.77]);
  const [zoom, setZoom] = useState(6);

  // filter settings
  const [minOtherKidsAge, setMinOtherKidsAge] = useState(0);
  const [maxOtherKidsAge, setMaxOtherKidsAge] = useState(21);
  const [otherKidsGender, setOtherKidsGender] = useState("any");
  const [gender, setGender] = useState("any");
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(21);
  const [beds, setBeds] = useState("1+");
  const [acceptsSiblings, setAcceptsSiblings] = useState("Yes");
  const [languages, setLanguages] = useState<string[]>([]);
  const [populations, setPopulations] = useState<string[]>([]);

  // get csv foster kid data
  useEffect(() => {
    fetch("/data/fosterKids.csv")
      .then((res) => res.text())
      .then((csvText) => {
        const children = loadFosterChildrenFromText(csvText);
        setFosterChildren(children);
      })
      .catch((err) => console.error("Error loading foster kids:", err));
  }, []);

  // get csv home data
  useEffect(() => {
    fetch("/data/fosterHomes.csv")
      .then((res) => res.text())
      .then((csvText) => {
        const parsedHomes = loadHomesFromText(csvText);
        setHomes(parsedHomes);
      })
      .catch((err) => console.error("Error loading foster homes:", err));
  }, []);

  console.log(fosterChildren);

  return (
    <CalciteShell className="h-screen w-screen" content-behind>
      <TopNavbar />
      {/* map content */}
      <div className="h-full w-full">
        <CustomMap center={center} zoom={zoom} />
      </div>

      {/* left panel */}
      <CalciteShellPanel
        slot="panel-start"
        position="start"
        displayMode="float-content"
        className="h-[43%] pl-2"
      >
        <CalcitePanel>
          <Filters
            minOtherKidsAge={minOtherKidsAge}
            setMinOtherKidsAge={setMinOtherKidsAge}
            maxOtherKidsAge={maxOtherKidsAge}
            setMaxOtherKidsAge={setMaxOtherKidsAge}
            otherKidsGender={otherKidsGender}
            setOtherKidsGender={setOtherKidsGender}
            gender={gender}
            setGender={setGender}
            minAge={minAge}
            setMinAge={setMinAge}
            maxAge={maxAge}
            setMaxAge={setMaxAge}
            beds={beds}
            setBeds={setBeds}
            acceptsSiblings={acceptsSiblings}
            setAcceptsSiblings={setAcceptsSiblings}
            languages={languages}
            setLanguages={setLanguages}
            populations={populations}
            setPopulations={setPopulations}
          />
        </CalcitePanel>
      </CalciteShellPanel>

      {/* right panels */}
      <CalciteShellPanel
        slot="panel-end"
        position="start"
        displayMode="float-content"
        className="pr-3"
      >
        <CalcitePanel>
          <ChildrenPanel
            fosterChildren={fosterChildren.filter(
              (child) =>
                child.age <= maxAge &&
                child.age >= minAge &&
                (gender != "any" ? child.gender == gender : true) &&
                (populations.length > 0
                  ? child.traumaCare && populations.includes(child.traumaCare)
                  : true) &&
                (languages.length > 0
                  ? child.languages.some((lang) => languages.includes(lang))
                  : true)
            )}
            homes={homes}
            onViewHomeOnMap={(home) => {
              setCenter([home.location.long, home.location.lat]);
              setZoom(18);
            }}
          />
        </CalcitePanel>
      </CalciteShellPanel>
    </CalciteShell>
  );
}

export default MapDashboard;
