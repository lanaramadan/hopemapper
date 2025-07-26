import {
  CalciteBlock,
  CalciteBlockGroup,
  CalciteList,
  CalciteSlider,
  CalciteSegmentedControl,
  CalciteSegmentedControlItem,
  CalciteCombobox,
  CalciteComboboxItem,
  CalciteListItem,
} from "@esri/calcite-components-react";
import { useState } from "react";

function Filters() {
  const [ageRange, setAgeRange] = useState([0, 21]);
  const [otherKidsGender, setOtherKidsGender] = useState("Any");
  const [gender, setGender] = useState("Any");
  const [beds, setBeds] = useState("1+");
  const [acceptsSiblings, setAcceptsSiblings] = useState("Yes");
  const [languages, setLanguages] = useState<string[]>([]);
  const [populations, setPopulations] = useState<string[]>([]);

  const togglePopulation = (pop: string) => {
    setPopulations((prev) =>
      prev.includes(pop) ? prev.filter((p) => p !== pop) : [...prev, pop]
    );
  };

  return (
    <div className="text-left">
      <CalciteBlockGroup>
        <CalciteBlock
          heading="Other kids"
          description={`Age ${ageRange[0]}–${ageRange[1]}, ${otherKidsGender}`}
          open
          collapsible
        >
          <CalciteSlider
            step={1}
            ticks={5}
            labelTicks
            min={0}
            minLabel="test"
            minValue={ageRange[0]}
            maxLabel="test"
            maxValue={ageRange[1]}
            max={21}
            // snap
            labelHandles
            onCalciteSliderChange={(e) =>
              setAgeRange([e.target.minValue, e.target.maxValue])
            }
          />
          <CalciteSegmentedControl>
            {["Any", "Female Only", "Male Only"].map((value) => (
              <CalciteSegmentedControlItem
                key={value}
                value={value}
                checked={otherKidsGender === value}
                onClick={() => setOtherKidsGender(value)}
              >
                {value}
              </CalciteSegmentedControlItem>
            ))}
          </CalciteSegmentedControl>
        </CalciteBlock>

        <CalciteBlock heading="Gender" description={gender} open collapsible>
          <CalciteSegmentedControl>
            {["Any", "Female Only", "Male Only"].map((value) => (
              <CalciteSegmentedControlItem
                key={value}
                value={value}
                checked={gender === value}
                onClick={() => setGender(value)}
              >
                {value}
              </CalciteSegmentedControlItem>
            ))}
          </CalciteSegmentedControl>
        </CalciteBlock>

        <CalciteBlock
          heading="Beds Available"
          description={beds}
          open
          collapsible
        >
          <CalciteSegmentedControl>
            {["1+", "2+", "3+", "4+", "5+"].map((value) => (
              <CalciteSegmentedControlItem
                key={value}
                value={value}
                checked={beds === value}
                onClick={() => setBeds(value)}
              >
                {value}
              </CalciteSegmentedControlItem>
            ))}
          </CalciteSegmentedControl>
        </CalciteBlock>

        <CalciteBlock
          heading="Accepts sibling sets"
          description={acceptsSiblings}
          open
          collapsible
        >
          <CalciteSegmentedControl>
            {["Yes", "No"].map((value) => (
              <CalciteSegmentedControlItem
                key={value}
                value={value}
                checked={acceptsSiblings === value}
                onClick={() => setAcceptsSiblings(value)}
              >
                {value}
              </CalciteSegmentedControlItem>
            ))}
          </CalciteSegmentedControl>
        </CalciteBlock>

        <CalciteBlock
          heading="Languages spoken"
          description={languages.length > 0 ? languages.join(", ") : "Any"}
          open
          collapsible
        >
          <CalciteCombobox
            selectionMode="multiple"
            placeholder="Select languages"
            scale="s"
            onCalciteComboboxChange={(e) =>
              setLanguages(
                Array.from(e.target.selectedItems).map((item) => item.value)
              )
            }
          >
            <CalciteComboboxItem value="English" heading="English" />
            <CalciteComboboxItem value="Spanish" heading="Spanish" />
            <CalciteComboboxItem value="Mandarin" heading="Mandarin" />
          </CalciteCombobox>
        </CalciteBlock>

        <CalciteBlock
          heading="Special Populations"
          description={populations.length > 0 ? populations.join(", ") : "Any"}
          open
          collapsible
        >
          <CalciteList selectionMode="multiple">
            {[
              "Neurodivergent",
              "Substance abuse",
              "Co-occuring disorders",
              "Sexual abuse survivors",
              "Human trafficking survivors",
            ].map((label) => (
              <CalciteListItem
                key={label}
                label={label}
                selected={populations.includes(label)}
                onClick={() => togglePopulation(label)}
              />
            ))}
          </CalciteList>
        </CalciteBlock>
      </CalciteBlockGroup>
    </div>
  );
}

export default Filters;
