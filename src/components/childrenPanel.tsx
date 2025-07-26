import {
  CalciteBlockSection,
  CalciteBlock,
  CalciteBlockGroup,
  CalciteButton,
} from "@esri/calcite-components-react";
import { useState } from "react";
import type { FosterChild } from "../types/fosterChild";

function ChildrenPanel() {
  const fakeChildren: Array<FosterChild> = [
    { name: "Jayden Smith", gender: "male", age: 12, matchedHome: null },
    { name: "Emily Chen", gender: "female", age: 9, matchedHome: null },
    { id: 3, name: "Liam Garcia", gender: "male", age: 14, matchedHome: null },
    { id: 4, name: "Ava Johnson", gender: "female", age: 7, matchedHome: null },
    {
      id: 5,
      name: "Noah Thompson",
      gender: "non-binary",
      age: 10,
      matchedHome: null,
    },
    {
      id: 6,
      name: "Isabella Martinez",
      gender: "female",
      age: 11,
      matchedHome: null,
    },
    { id: 7, name: "Ethan Lee", gender: "male", age: 13, matchedHome: null },
    {
      id: 8,
      name: "Sophia Brown",
      gender: "female",
      age: 8,
      matchedHome: null,
    },
    { id: 9, name: "Mason Davis", gender: "male", age: 15, matchedHome: null },
    {
      id: 10,
      name: "Harper Nguyen",
      gender: "non-binary",
      age: 10,
      matchedHome: null,
    },
  ];

  return (
    <div className="text-left">
      <CalciteBlockGroup>
        <CalciteBlock open className="text-center">
          <CalciteButton label="Match">Match kids to homes</CalciteButton>
        </CalciteBlock>

        <CalciteBlock open>
          {fakeChildren.map((child) => (
            <CalciteBlockSection key={child.id} text={child.name}>
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
