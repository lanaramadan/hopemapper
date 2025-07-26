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

function MapDashboard() {
  // array w/ foster kids
  const [fosterChildren, setFosterChildren] = useState<FosterChild[]>([]);

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
      .then((response) => response.text())
      .then((text) => {
        const lines = text.trim().split("\n");
        const headers = lines[0].split(",").map((h) => h.trim());

        const data = lines.slice(1).map((line) => {
          const values = line.split(",").map((v) => v.trim());
          const record: Record<string, string> = {};
          headers.forEach((h, i) => {
            record[h] = values[i];
          });

          const child: FosterChild = {
            name: `${record["First Name"]} ${record["Last Name"]}`,
            gender: record["Gender"]?.toLowerCase() || "unknown",
            age: parseInt(record["Age"], 10) || 0,
            matchedHome: null,
            traumaCare: record["Type of Trauma Care"]
          };

          return child;
        });

        setFosterChildren(data);
      })
      .catch((error) => console.error("Error fetching CSV:", error));
  }, []);

  console.log(fosterChildren)

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
        className="h-[25%]"
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
      >
        <CalcitePanel>
          <ChildrenPanel
            fosterChildren={fosterChildren.filter(
              (child) => (child.age <= maxAge && child.age >= minAge) && (gender != "any" ? child.gender == gender : true) && (populations.length > 0 ? (child.traumaCare && populations.includes(child.traumaCare)) : true)
            )}
          />
        </CalcitePanel>
      </CalciteShellPanel>
    </CalciteShell>
  );
}

export default MapDashboard;
