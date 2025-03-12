const SearchBar = () => {
    return (
      <form
        action="/search"
        method="GET"
        className="flex items-center space-x-4"
      >
        <input
          type="text"
          name="query"
          placeholder="Search by book or author name..."
          className="w-full max-w-md p-3 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Search
        </button>
      </form>
    );
  };
  
  export default SearchBar;
  