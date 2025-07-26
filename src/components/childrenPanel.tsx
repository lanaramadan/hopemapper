import {
  CalciteBlockSection,
  CalciteBlock,
  CalciteBlockGroup,
  CalciteButton,
} from "@esri/calcite-components-react";
import type { FosterChild } from "../types/fosterChild";

function ChildrenPanel({ fosterChildren }: { fosterChildren: FosterChild[] }) {
  return (
    <div className="text-left">
      <CalciteBlockGroup>
        <CalciteBlock open className="text-center">
          <CalciteButton label="Match">Match kids to homes</CalciteButton>
        </CalciteBlock>

        <CalciteBlock open>
          {fosterChildren.map((child) => (
            <CalciteBlockSection text={child.name} open>
              <div className="pl-5">
                <div >Gender: {child.gender}</div>
                <div >Age: {child.age}</div>
                <div >Trauma Care: {child.traumaCare ? child.traumaCare  : "N/A"}</div>
                <div className="underline font-bold text-[#769A96]">Matched home: {child.matchedHome ? child.matchedHome.address : "N/A"}</div>
              </div>
            </CalciteBlockSection>
          ))}
        </CalciteBlock>
      </CalciteBlockGroup>
    </div>
  );
}

export default ChildrenPanel;
