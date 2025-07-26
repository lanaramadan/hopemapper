import {
  CalciteShell,
  CalciteShellPanel,
  CalcitePanel
} from "@esri/calcite-components-react";

import Filters from "../components/filters";
import ChildrenPanel from "../components/childrenPanel";
import CustomMap from "../components/customMap";

function MapDashboard() {
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
          <ChildrenPanel />
        </CalcitePanel>
      </CalciteShellPanel>
    </CalciteShell>
  );
}

export default MapDashboard;
