/// <reference types="@arcgis/map-components/types/react" />

// Individual imports for each component used in this sample
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/map-components/components/arcgis-legend";
import "@arcgis/map-components/components/arcgis-search";

// Core API import
import Graphic from "@arcgis/core/Graphic.js";

function CustomMap({center, zoom}: {
  center: [number, number];
  zoom: number;
}) {
  const handleViewReady = (event: any) => {};

  return (
    <arcgis-map 
      center={center}
      zoom={zoom} // Initial center and zoom level, update to zoom 18 & cordinates of homes
      item-id="d1fdb887510a4e6f8ae14b0d7f7050d8" 
      onarcgisViewReadyChange={handleViewReady}
      style={{ width: "100%", height: "95vh" }}
      >
      <arcgis-legend position="bottom-left" />
      <arcgis-zoom position="bottom-left" />
    </arcgis-map>
  );
}

export default CustomMap;