import {
  CalciteShell,
  CalciteShellPanel,
  CalcitePanel
} from "@esri/calcite-components-react";

import Filters from "../components/filters";
import ChildrenPanel from "../components/childrenPanel";
import CustomMap from "../components/customMap";
import { useState, useEffect } from "react";
import type { FosterChild } from "../types/fosterChild";

function MapDashboard() {
  console.log("ChildrenPanel rendered");
  const [fosterChildren, setFosterChildren] = useState<FosterChild[]>([]);

  useEffect(() => {
    console.log("start fetch")
    fetch('/data/fosterKids.csv')
      .then(response => response.text())
      .then(text => {
        const lines = text.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim());

        const data = lines.slice(1).map(line => {
          const values = line.split(',').map(v => v.trim());
          const record: Record<string, string> = {};
          headers.forEach((h, i) => {
            record[h] = values[i];
          });

          const child: FosterChild = {
            name: `${record["First Name"]} ${record["Last Name"]}`,
            gender: record["Gender"]?.toLowerCase() || "unknown",
            age: parseInt(record["Age"], 10) || 0,
            matchedHome: null
          };

          return child;
        });

        setFosterChildren(data);
      })
      .catch(error => console.error('Error fetching CSV:', error));
  }, []);




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
      >
        <CalcitePanel >
          <Filters />
        </CalcitePanel>
      </CalciteShellPanel>

      {/* right panels */}
      <CalciteShellPanel
        slot="panel-end"
        position="start"
        displayMode="float-content"
      >
        <CalcitePanel >
          <ChildrenPanel fosterChildren={fosterChildren}/>
        </CalcitePanel>
      </CalciteShellPanel>
    </CalciteShell>
  );
}

export default MapDashboard;
