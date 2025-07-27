import {
  CalciteShell,
  CalciteShellPanel,
  CalcitePanel,
} from "@esri/calcite-components-react";

import Filters from "../components/filters";
import ChildrenPanel from "../components/childrenPanel";
import CustomMap from "../components/customMap";
import { useState, useEffect } from "react";
import type { FosterChild } from "../types/fosterChild";
import type { Home } from "../types/home";
import {
  loadFosterChildrenFromText,
  loadHomesFromText,
} from "../logic/matchAlgorithm";

function MapDashboard() {
  const [fosterChildren, setFosterChildren] = useState<FosterChild[]>([]);
  const [homes, setHomes] = useState<Home[]>([]);

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
      {/* map content */}
      <div className="h-full w-full">
        <CustomMap />
      </div>

      {/* left panel */}
      <CalciteShellPanel
        slot="panel-start"
        position="start"
        displayMode="float-content"
        className="h-[35%] pl-2"
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
                  : true)
            )}
            homes={homes}
          />
        </CalcitePanel>
      </CalciteShellPanel>
    </CalciteShell>
  );
}

export default MapDashboard;
