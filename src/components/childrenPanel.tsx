import {
  CalciteBlockSection,
  CalciteBlock,
  CalciteBlockGroup,
  CalciteButton,
  CalciteCard,
  CalciteCardGroup,
} from "@esri/calcite-components-react";
import type { FosterChild } from "../types/fosterChild";
import type { Home } from "../types/home";
import matchChildrenToHomes from "../logic/matchAlgorithm";
import { useState, useEffect } from "react";

function ChildrenPanel({
  fosterChildren,
  homes,
}: {
  fosterChildren: FosterChild[];
  homes: Home[];
}) {
  const [matchedChildren, setMatchedChildren] = useState(fosterChildren);

  const handleResetClick = () => {
    setMatchedChildren(fosterChildren);
  };

  const handleMatchClick = () => {
    console.log("homes before match:", homes);
    console.log("foster children before match:", fosterChildren);
    const updatedChildren = matchChildrenToHomes([...matchedChildren], homes);
    setMatchedChildren([...updatedChildren]);
    console.log("matched children:", updatedChildren);
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
            <CalciteButton label="Match" onClick={handleMatchClick}>
              Match kids to homes
            </CalciteButton>
            <CalciteButton
              label="Match"
              appearance="outline-fill"
              onClick={handleResetClick}
            >
              Reset matches
            </CalciteButton>
          </div>
        </CalciteBlock>

        <CalciteBlock open>
          {matchedChildren.map((child) => (
            <CalciteBlockSection text={child.name} open>
              <div className="pl-6 mb-5">
                <div>
                  Gender:{" "}
                  {genderOptions.find((option) => option.value === child.gender)
                    ?.label || "N/A"}
                </div>
                <div>Age: {child.age}</div>
                <div>Languages: {child.languages?.join(", ") || "N/A"}</div>
                <div>
                  Trauma Care: {child.traumaCare ? child.traumaCare : "N/A"}
                </div>
                {child.matchedHomes && child.matchedHomes.length > 0 ? (
                  <div>
                    <div className="underline font-bold text-[#08201E] bg-[#C8D9D3] p-2 mr-4">
                      Matches found:
                    </div>
                    <div className="p-1 mr-4">
                      <CalciteCardGroup>
                        {child.matchedHomes
                          .slice(0, 3)
                          .map(({ home, score }, index) => (
                            <CalciteCard
                              key={index}
                              class="w-full max-w-md shadow-md"
                            >
                              <div slot="heading">
                                {index === 0
                                  ? "#1 Match: "
                                  : index === 1
                                  ? "#2 Match: "
                                  : "#3 Match: "}
                                {home.facilityName}
                              </div>

                              <div
                                slot="description"
                                className={
                                  score >= 80
                                    ? "text-[#769A96] font-medium"
                                    : score >= 50
                                    ? "text-[#D8B668] font-medium"
                                    : "text-[#AC6868] font-medium"
                                }
                              >
                                Match Score: {score}%
                              </div>
                              <div slot="description" className="italic">
                                {home.address}, {home.city},{" "}
                                {home.state.toUpperCase()} {home.zipCode}
                              </div>
                              <div slot="footer-start" />
                              <CalciteButton
                                slot="footer-end"
                                scale="s"
                                label="View"
                                appearance="outline-fill"
                              >
                                View on Map
                              </CalciteButton>
                            </CalciteCard>
                          ))}
                      </CalciteCardGroup>
                    </div>
                  </div>
                ) : (
                  <div className="underline font-bold text-[#fff] bg-[#AC6868] p-2 mr-4">
                    Matched home(s): N/A
                  </div>
                )}
              </div>
            </CalciteBlockSection>
          ))}
        </CalciteBlock>
      </CalciteBlockGroup>
    </div>
  );
}

export default ChildrenPanel;
