import { useEffect, useRef } from 'react';


export default function ArcGISCharts() {
  const scatterRef = useRef<any>(null);
  const pieRef = useRef<any>(null);

  useEffect(() => {
    const run = async () => {
      // Load all necessary ArcGIS modules using esri-loader
      const [
        WebMap,
        createModel
      ] = await loadModules([
        "@arcgis/core/WebMap",
        "@arcgis/charts-components/model"
      ]);

      // Create and load the WebMap instance
      const webmap = new WebMap({
        portalItem: {
          id: "96cb2d2825dc459abadcabc941958125",
        },
      });
      await webmap.loadAll();

      // Find the feature layer by its title
      const featureLayer = webmap.layers.find(
        (layer: any) => layer.title === "College Scorecard"
      );

      // Pre-configured scatterplot from webmap
      if (scatterRef.current && featureLayer && featureLayer.charts?.[0]) {
        const scatterModel = featureLayer.charts[0];
        scatterRef.current.layer = featureLayer;
        scatterRef.current.model = scatterModel;
      }

      // Create custom pie chart
      if (pieRef.current && featureLayer) {
        const pieModel = await createModel({
          layer: featureLayer,
          chartType: "pieChart"
        });

        await pieModel.setCategory("Type");
        pieModel.setDataLabelsVisibility(true);
        pieModel.setTitleText("Count by School Type");
        pieModel.setLegendTitleText("School Type");
        pieModel.setLegendPosition("bottom");

        pieRef.current.model = pieModel;
      }
    };

    run();
  }, []);

  return (
    <div style={{ display: 'flex', height: '80vh' }}>
      <arcgis-chart id="scatterplot" ref={scatterRef} style={{ flex: 1 }} />
      <arcgis-chart id="pie-chart" ref={pieRef} style={{ flex: 1 }} />
    </div>
  );
}