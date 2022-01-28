import React, { useState, useEffect } from "react";

function CoinList(props) {

const [isClicked, setIsClicked]=useState(false)
// onClick={()=> setIsClicked(!isClicked)}
  return (
    <div className="coin-List" onClick={() => setIsClicked(!isClicked)} style={{height: isClicked && "10rem" }}>
      <div className="coin-header" >
        <img src={props.image} />
        <div className="coin-name">
        <h3>{props.name}</h3>
        <p>{props.symbol.toUpperCase()}</p>
        </div>
      <div classNmae="name-list">
      <p> ${((props.price).toFixed(2)).toLocaleString()}</p>
      </div>
      </div>
      <div className="info">
        <p style={{ color: props.perCent < 0 ? "#FFA29D" : "#87C87C" }}>
          {(props.perCent).toFixed(2)}%
        </p>
        <p style={{ color: props.priceCh < 0 ? "#FF908A" : "#87C87C" }}>
          {props.priceCh < 0 && "-"} ${Math.abs((props.priceCh).toFixed(2)).toLocaleString()}
        </p>
        <p>{new Date(props.date).toDateString()}</p>
      </div>
      { isClicked && <div className="hidden-content">
      <p style={{ color: props.perCent < 0 ? "#FFA29D" : "#87C87C" }}>
          {(props.perCent).toFixed(2)}%
        </p>
        <p style={{ color: props.priceCh < 0 ? "#FF908A" : "#87C87C" }}>
          {props.priceCh < 0 && "-"} ${Math.abs((props.priceCh).toFixed(2)).toLocaleString()}
        </p>
        <p>{new Date(props.date).toDateString()}</p>
        </div>}

    </div>
  );
}

export default CoinList;
// { isClicked &&   <div className="hidden-content">
// <p style={{ color: props.perCent < 0 ? "#FFA29D" : "#87C87C" }}>
//   {props.perCent}%
// </p>
// <p style={{ color: props.priceCh < 0 ? "#FF908A" : "#87C87C" }}>
//   {props.priceCh < 0 && "-"} ${Math.abs(props.priceCh).toLocaleString()}
// </p>
// <p>{new Date(props.date).toDateString()}</p>
// </div>
// }