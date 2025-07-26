/// <reference types="@arcgis/map-components/types/react" />

// Individual imports for each component used in this sample
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/map-components/components/arcgis-legend";
import "@arcgis/map-components/components/arcgis-search";

// Core API import
import Graphic from "@arcgis/core/Graphic.js";

function CustomMap() {
  const handleViewReady = (event: any) => {
  };

  return (
    <arcgis-map item-id="76862b21eceb495da6a60941ce12bbd5" onarcgisViewReadyChange={handleViewReady}  style={{ width: "100%", height: "100vh" }}>
      <arcgis-search position="bottom-left" />
      <arcgis-legend position="bottom-right" />
      <arcgis-zoom position="bottom-right" />
    </arcgis-map>
  );
}

export default CustomMap;