import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import CoinList from "./components/CoinList";
import Paginate from "react-paginate";
import Sort from "./components/Sort";
import Axios from "axios";
import Video from "./video.mp4";
import "./App.css";

function App() {
  const [coinList, setCoinList] = useState([]);
  const [filteredSearch, setFilteredSearch] = useState([]);
  // const [sortSelected, setSortSelected] = useState([]);
  const [searchChange, setSearchChange] = useState(false);
  const [pageNum, setPageNum] = useState(0);

  useEffect(() => {
    Axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    ).then((res) => {
      // console.log(res.data);
      setCoinList(res.data);
    });
  }, []);

  const handleFilter = () => {
    setSearchChange(true);
  };

  const handleSort = (event) => {
    const sortOption = event.target.value;
    setFilteredSearch((prevValue) => {
      if (sortOption === "alphabetical") {
        console.log("alpha");
        const sortedAphabetically = (
          searchChange ? filteredSearch : coinList
        ).sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        return sortedAphabetically;
      }
      if (sortOption === "highPrice") {
        console.log("price");
        const sortByPrice = (searchChange ? filteredSearch : coinList).sort(
          (a, b) => {
            return b.current_price - a.current_price;
          }
        );
        return sortByPrice;
      }
      if (sortOption === "highPercent") {
        console.log("%");
        const sortByPercent = (searchChange ? filteredSearch : coinList).sort(
          (a, b) => {
            return (
              b.price_change_percentage_24h - a.price_change_percentage_24h
            );
          }
        );
        return sortByPercent;
      } else {
        console.log("ree");
        return coinList;
      }
    });
  };

  const handleChange = (event) => {
    console.log(event.target.value);
  };
  const searchCoin = (enteredCoin) => {
    console.log("PASSED WORD   " + enteredCoin);
    const filteredList = coinList.filter((coinItems) => {
      return coinItems.name.toLowerCase().includes(enteredCoin.toLowerCase());
    });
    setFilteredSearch(filteredList);
  };

  const coinsPerPage = 10;
  const pagesVisited = pageNum * coinsPerPage;
  const displayCoins = (searchChange ? filteredSearch : coinList)
    .slice(pagesVisited, pagesVisited + coinsPerPage)
    .map((coinItem, index) => {
      return (
        <CoinList
          className="coin"
          key={index}
          id={coinItem.id}
          image={coinItem.image}
          name={coinItem.name}
          symbol={coinItem.symbol}
          price={coinItem.current_price}
          priceCh={coinItem.price_change_24h}
          perCent={coinItem.price_change_percentage_24h}
          date={coinItem.last_updated}
        />
      );
    });

  const handleClose = () => {};

  const pageCount = Math.ceil(
    (searchChange ? filteredSearch : coinList).length / coinsPerPage
  );

  const changePage = ({ selected }) => {
    setPageNum(selected);
  };

  return (
    <div className="App">
      <video src={Video} autoPlay loop muted />
      <h1>
        <em>Crypto Coins</em>
      </h1>
      <h3>Check out the current rates</h3>
      <div className="filter-section">
        <div className="sort">
          <select onChange={handleSort}>
            <option value="relavance">Relavance</option>
            <option value="alphabetical">Coins A to Z</option>
            <option value="highPrice">Highest Price</option>
            <option value="highPercent">Highest Percent</option>
          </select>
        </div>
        <div className="search" onChange={handleFilter}>
          <Search searchedWord={searchCoin} />
        </div>
      </div>
      <div className="coin-List list-heading">
        <div className="coin-header coin-heading">
            <h3>Coin</h3>
        <div classNmae="name-list">
        <p>Current Price</p></div>
        </div>
        <div className="info">
        <p>Change in %</p>
        <p>Change in $$</p>
        <p>Latest</p>
        </div>
      </div>
      {displayCoins}
      <div className="pag-app">
        <Paginate
          previousLabel="Prev"
          nextLabel="Next"
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName="paginationBtn"
          previousLinkClassName="prevBtn"
          nextLinkClassName="nextBtn"
          disabledClassName="disabled"
          activeClassName="active"
        />
      </div>
    </div>
  );
}

export default App;

// (searchClicked ? filteredSearch : coinList).map((coinItem, index) => {
//   return (
//     <CoinList
//       key={index}
//       id={coinItem.id}
//       image={coinItem.image}
//       name={coinItem.name}
//       symbol={coinItem.symbol}
//       price={coinItem.current_price}
//       priceCh={coinItem.price_change_24h}
//       perCent={coinItem.price_change_percentage_24h}
//       date={coinItem.last_updated}
//     />
//   );
// })

// if (enteredCoin.length > 0){
//   console.log("filterList")
//   setFilteredSearch(filteredList);
// }else{
//   console.log("coinList")
//   setFilteredSearch(coinList)
// }
