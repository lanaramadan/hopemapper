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
import React from "react";

function Filters() {
  return (
    <div className="text-left w-fill">
      <CalciteBlockGroup>
        <CalciteBlock heading="Other kids" description="Any ages, any genders" open collapsible>
              <CalciteSlider
                step={1}
                ticks={5}
                labelTicks
                min={0}
                max={21}
                snap
              />
              <CalciteSegmentedControl>
                <CalciteSegmentedControlItem value="Any" checked>
                  Any
                </CalciteSegmentedControlItem>
                <CalciteSegmentedControlItem value="Female Only">
                  Female Only
                </CalciteSegmentedControlItem>
                <CalciteSegmentedControlItem value="Male Only">
                  Male Only
                </CalciteSegmentedControlItem>
              </CalciteSegmentedControl>
        </CalciteBlock>

        <CalciteBlock heading="Gender" description="Any gender" open collapsible>
          <CalciteSegmentedControl>
            <CalciteSegmentedControlItem value="Any" checked>
              Any
            </CalciteSegmentedControlItem>
            <CalciteSegmentedControlItem value="Female Only">
              Female Only
            </CalciteSegmentedControlItem>
            <CalciteSegmentedControlItem value="Male Only">
              Male Only
            </CalciteSegmentedControlItem>
          </CalciteSegmentedControl>
        </CalciteBlock>

        <CalciteBlock heading="Beds Available" description="1+" open collapsible>
          <CalciteSegmentedControl>
            <CalciteSegmentedControlItem value="1+" checked>
              1+
            </CalciteSegmentedControlItem>
            <CalciteSegmentedControlItem value="2+">
              2+
            </CalciteSegmentedControlItem>
            <CalciteSegmentedControlItem value="3+">
              3+
            </CalciteSegmentedControlItem>
            <CalciteSegmentedControlItem value="4+">
              4+
            </CalciteSegmentedControlItem>
            <CalciteSegmentedControlItem value="5+">
              5+
            </CalciteSegmentedControlItem>
          </CalciteSegmentedControl>
        </CalciteBlock>

        <CalciteBlock heading="Accepts sibling sets" description="Yes" open collapsible>
          <CalciteSegmentedControl>
            <CalciteSegmentedControlItem value="Yes" checked>
              Yes
            </CalciteSegmentedControlItem>
            <CalciteSegmentedControlItem value="No">
              No
            </CalciteSegmentedControlItem>
          </CalciteSegmentedControl>
        </CalciteBlock>

        <CalciteBlock heading="Languages spoken" description="Any" open collapsible>
          <CalciteCombobox selectionMode="multiple" placeholder="Select languages">
            <CalciteComboboxItem value="English" heading="English"/>
            <CalciteComboboxItem value="Spanish" heading="Spanish"/>
            <CalciteComboboxItem value="Mandarin" heading="Mandarin"/>
          </CalciteCombobox>
        </CalciteBlock>

        <CalciteBlock heading="Special Populations" description="Any" open collapsible>
          <CalciteList selectionMode="multiple">
            <CalciteListItem label="Neurodivergent" />
            <CalciteListItem label="Substance abuse" />
            <CalciteListItem label="Co-occuring disorders" />
            <CalciteListItem label="Sexual abuse survivors" />
            <CalciteListItem label="Human trafficking survivors" />
          </CalciteList>
        </CalciteBlock>
      </CalciteBlockGroup>
    </div>
  );
}

export default Filters;
