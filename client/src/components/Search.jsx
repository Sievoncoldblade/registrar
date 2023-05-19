const Search = () => {
  return (
    <>
      <div className='space-x-3'>
        <input className='rounded-md px-2 text-md placeholder:text-sm' type='text' name='search' id='search' placeholder='Search...' />
        <button className='bg-yellow-500 rounded-md px-4 font-medium'>Search</button>
      </div>
    </>
  );
};

export default Search;
