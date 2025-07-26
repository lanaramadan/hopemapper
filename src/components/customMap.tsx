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
    const viewElement = event.target;

    const point = {
      type: "point",
      longitude: -118.38,
      latitude: 33.34,
    };

    const markerSymbol = {
      type: "simple-marker",
      style: "triangle",
      size: 15,
      color: "red",
      outline: {
        color: "white",
        width: 2,
      },
    };

    const pointGraphic = new Graphic({
      geometry: point,
      symbol: markerSymbol,
    });

    viewElement.graphics.add(pointGraphic);
  };

  return (
    <arcgis-map item-id="02b37471d5d84cacbebcccd785460e94" onarcgisViewReadyChange={handleViewReady}  style={{ width: "100%", height: "100vh" }}>
      <arcgis-search position="bottom-left" />
      {/* <arcgis-legend position="bottom-right" /> */}
      <arcgis-zoom position="bottom-right" />
    </arcgis-map>
  );
}

export default CustomMap;