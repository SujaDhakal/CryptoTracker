import React from "react";

import Dropdown from "react-dropdown";

function Sort() {
  const options =  [
        "Coins A to Z",
        "Highest Price",
        "Highest Percent"
    ]
    const defaultOption = options[0];
  return (
    <div>
      <Dropdown options={options}  value={defaultOption} placeholder="Select an option" />
    </div>
  );
}

export default Sort;
// onChange={this._onSelect}