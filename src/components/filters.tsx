import {
  CalciteBlock,
  CalciteBlockGroup,
  CalciteBlockSection,
  CalciteList,
  CalciteSlider,
  CalciteSegmentedControl,
  CalciteSegmentedControlItem,
  CalciteCombobox,
  CalciteComboboxItem,
  CalciteListItem,
} from "@esri/calcite-components-react";

interface FiltersProps {
  minOtherKidsAge: number;
  setMinOtherKidsAge: (age: number) => void;

  maxOtherKidsAge: number;
  setMaxOtherKidsAge: (age: number) => void;

  otherKidsGender: string;
  setOtherKidsGender: (gender: string) => void;

  gender: string;
  setGender: (gender: string) => void;

  minAge: number;
  setMinAge: (age: number) => void;

  maxAge: number;
  setMaxAge: (age: number) => void;

  beds: string;
  setBeds: (beds: string) => void;

  acceptsSiblings: string;
  setAcceptsSiblings: (accepts: string) => void;

  languages: string[];
  setLanguages: (languages: string[]) => void;

  populations: string[];
  setPopulations: (populations: string[]) => void;
}

function Filters({
  minOtherKidsAge,
  setMinOtherKidsAge,
  maxOtherKidsAge,
  setMaxOtherKidsAge,
  otherKidsGender,
  setOtherKidsGender,
  gender,
  setGender,
  minAge,
  setMinAge,
  maxAge,
  setMaxAge,
  beds,
  setBeds,
  acceptsSiblings,
  setAcceptsSiblings,
  languages,
  setLanguages,
  populations,
  setPopulations,
}: FiltersProps) {
  const togglePopulation = (pop: string) => {
    if (populations.includes(pop)) {
      setPopulations(populations.filter((p) => p !== pop));
    } else {
      setPopulations([...populations, pop]);
    }
  };
  const genderOptions = [
    { label: "Any", value: "any" },
    { label: "Female Only", value: "f" },
    { label: "Male Only", value: "m" },
  ];

  return (
    <div className="text-left">
      <CalciteBlockGroup>
        <CalciteBlock
          heading="Other kids"
          description={`Age ${minOtherKidsAge}–${maxOtherKidsAge}, ${otherKidsGender}`}
          collapsible
        >
          <CalciteSlider
            step={1}
            ticks={5}
            labelTicks
            min={0}
            minLabel="Minimum age"
            minValue={minOtherKidsAge}
            maxLabel="Maximum age"
            maxValue={maxOtherKidsAge}
            max={21}
            snap
            labelHandles
            onCalciteSliderChange={(e) => {
              setMinOtherKidsAge(e.target.minValue);
              setMaxOtherKidsAge(e.target.maxValue);
            }}
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

        <CalciteBlock
          heading="Gender"
          description={genderOptions.find(option => option.value === gender)?.label || "Any"}
          collapsible
        >
          <CalciteSegmentedControl>
            {genderOptions.map(({ label, value }) => (
              <CalciteSegmentedControlItem
                key={value}
                value={value}
                checked={gender === value}
                onClick={() => setGender(value)}
              >
                {label}
              </CalciteSegmentedControlItem>
            ))}
          </CalciteSegmentedControl>
        </CalciteBlock>

        <CalciteBlock
          heading="Age"
          description={`Age ${minAge}–${maxAge}`}
          collapsible
        >
          <CalciteSlider
            step={1}
            ticks={5}
            labelTicks
            min={0}
            minLabel="Minimum age"
            minValue={minAge}
            maxLabel="Maximum age"
            maxValue={maxAge}
            max={21}
            snap
            labelHandles
            onCalciteSliderChange={(e) => {
              setMinAge(e.target.minValue);
              setMaxAge(e.target.maxValue);
            }}
          />
        </CalciteBlock>

        <CalciteBlock heading="Beds Available" description={beds} collapsible>
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
          heading="Trauma Populations"
          description={populations.length > 0 ? populations.join(", ") : "Any"}
          collapsible
        >
          <CalciteList selectionMode="multiple">
            {[
              "At risk youth",
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
