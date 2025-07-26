import { ResponsivePie } from "@nivo/pie";


/**
 * @typedef {Object} InnerObject
 * @property {string} id
 * @property {string} label
 * @property {number} value
 * @property {string} color
 */

/**
 * @typedef {Object} PieProps
 * @property {InnerObject[]} data
 */

/**
 * @param {PieProps} props
 */
const Pie = ({ data: any /* see data tab */ }) => (
   <div style={{ width: 150, height: 150 }}>
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={0.6}
    cornerRadius={2}
    activeOuterRadiusOffset={8}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
    colors={{ scheme: "nivo" }}
    legends={[
      {
        anchor: "bottom",
        direction: "row",
        translateY: 56,
        itemWidth: 100,
        itemHeight: 18,
        symbolShape: "circle",
      },
    ]}
    theme={{
      labels: {
        text: {
          fontSize: 14, // Change this value as needed
          fontFamily: "Inter, Segoe UI, Arial, sans-serif",
        },
      },
      legends: {
        text: {
          fontSize: 14, // Legend font size
          fontFamily: "Inter, Segoe UI, Arial, sans-serif",
        },
      },
      tooltip: {
        container: {
          fontSize: 16, // Tooltip font size
          fontFamily: "Inter, Segoe UI, Arial, sans-serif",
        },
      },
    }}
  />
  </div>
);

export default Pie;