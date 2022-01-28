import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { height } from "@mui/system";

function Search(props) {
  const [enteredCoin, setEnteredCoin] = useState("");
  const [reset, setReset] = useState(false);

  const handleClick = () => {
    setEnteredCoin("");
    setReset(!reset);
    props.searchedWord(enteredCoin);
  };
  // console.log(enteredCoin);

  return (
    <div>
      <input
        onChange={(event) => {
          setEnteredCoin(event.target.value);
          props.searchedWord(enteredCoin);
        }}
        value={enteredCoin}
        placeholder="Search"
      />
      {!reset ? (
        <SearchIcon fontSize="large" onClick={handleClick} />
      ) : (
        <MonetizationOnIcon fontSize="large" onClick={handleClick} />
      )}
    </div>
  );
}

export default Search;
