import {
  CalciteBlockSection,
  CalciteBlock,
  CalciteBlockGroup,
  CalciteButton,
} from "@esri/calcite-components-react";
import type { FosterChild } from "../types/fosterChild";
import type { Home } from "../types/home";
import matchChildrenToBeds from '../logic/matchAlgorithm'
import { useState, useEffect } from "react";


function ChildrenPanel({
  fosterChildren,
  homes,
}: {
  fosterChildren: FosterChild[];
  homes: Home[];
}) {  const [matchedChildren, setMatchedChildren] = useState(fosterChildren);

  const handleMatchClick = () => {
    console.log("homes before match:", homes);
    console.log("foster children before match:", fosterChildren);
    const updatedChildren = matchChildrenToBeds([...matchedChildren], homes);
    setMatchedChildren([...updatedChildren]);
  };

  useEffect(() => {
    setMatchedChildren(fosterChildren);
  }, [fosterChildren]);

  const genderOptions = [
    { label: "Any", value: "any" },
    { label: "Female", value: "f" },
    { label: "Male", value: "m" },
  ];

  return (
    <div className="text-left">
      <CalciteBlockGroup>
        <CalciteBlock open className="text-center">
          <div className="flex gap-2 justify-center">
            <CalciteButton label="Match" onClick={handleMatchClick}>Match kids to homes</CalciteButton>
            <CalciteButton label="Match" appearance="outline-fill" onClick={handleMatchClick}>Reset matches</CalciteButton>
          </div>
        </CalciteBlock>

        <CalciteBlock open>
          {fosterChildren.map((child) => (
            <CalciteBlockSection text={child.name} open>
              <div className="pl-12 mb-5">
                <div >Gender: {genderOptions.find(option => option.value === child.gender)?.label || "N/A"}</div>
                <div >Age: {child.age}</div>
                <div >Trauma Care: {child.traumaCare ? child.traumaCare  : "N/A"}</div>
                {
                  (child.matchedHome ?
                  <div className="underline font-bold text-[#08201E] bg-[#C8D9D3] p-2 mr-4">Matched home(s): {child.matchedHome.address}</div>
                  :
                  <div className="underline font-bold text-[#fff] bg-[#AC6868] p-2 mr-4">Matched home(s): N/A</div>)
                }
                
              </div>
            </CalciteBlockSection>
          ))}
        </CalciteBlock>
      </CalciteBlockGroup>
    </div>
  );
}

export default ChildrenPanel;
