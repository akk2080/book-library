import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'

import { fetchBooks } from '../features/booksSlice';


function Home(){
    const {books,selectedBook,loading,error, errorMessage} = useSelector((state) => state.books);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [currPage, setCurrPage] = useState(1);

    const lastIndex = currPage*10;
    const firstIndex = lastIndex - 10;
   console.log(books);

  function handlePrev(){
        if(currPage > 1)
            setCurrPage(currPage-1);
   }

   function handleNext(){
    if(currPage*10 < books.length)
        setCurrPage(currPage+1);
   }

    return (
        <>
            <div>
                <h1>My Book Library</h1>
                <input style={{width:'300px'}}type='text' value={search} placeholder='please enter the title of the book here' onChange={(el)=>setSearch(el.target.value)}/>
                <button onClick={()=>dispatch(fetchBooks(search))}>Search</button>
            </div>
            <div>
                {loading&&(<h1>loading...</h1>)}
                {error&&(<h1>{errorMessage}</h1>)}
                {!loading && books.length==0 && <h3>No data to show, Please try to enter something else on the search field</h3>}
                
                    {!loading && books && books.length !=0 && (<><div className='mygrid'> {books.slice(firstIndex, lastIndex).map((b, index) => {
                        return (
                            <div className='card'>
                                <img src={`https://covers.openlibrary.org/b/olid/${b.cover_edition_key}-M.jpg`} alt='image not found'/>
                                <h4 key={index}>{b.title}</h4>
                                <h5>Auther: {b.author_name}</h5>
                                <button>view details</button>
                            </div>
                        )
                    })}  

                    
                    
                    </div>
                <button onClick={handlePrev}>prev</button>
                {currPage}
                <button onClick={handleNext}>next</button>
                </>)}

               
                
            </div>
        </>
    )
}

export default Home;