import {
  CalciteShell,
  CalciteShellPanel,
  CalcitePanel
} from "@esri/calcite-components-react";

import Filters from "../components/filters";
import CustomMap from "../components/customMap";

function MapDashboard() {
  return (
    <CalciteShell className="h-screen w-screen">
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
    </CalciteShell>
  );
}

export default MapDashboard;
