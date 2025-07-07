import "./searchbar.css";

const SearchBar = () => {
  return (
    <>
      <form className="searchbar">
        <img src="./search.png" alt="" />
        <input type="text" placeholder="Search...." />
      </form>
    </>
  );
};

export default SearchBar;
