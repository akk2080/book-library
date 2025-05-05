import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchBooks = createAsyncThunk('features/fetchBooks', async(search)=>{
    try {
        const res = await axios.get('https://openlibrary.org/search.json?fields=key,title,author_name,cover_edition_key&q=' + search);
        console.log('1.....', res);
        const data = res.data;
        console.log('2....', data);
        console.log(data.docs);
        return data;
        
    } catch (error) {
        return error.message;
    }
   
});


export const booksSlice = createSlice({
    name:'books',
    initialState:{
        books:[],
        selectedBook:'',
        loading:false,
        errorMessage:'',
        error: false,
    },

    extraReducers: (builder) =>{
        builder.addCase(fetchBooks.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchBooks.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.books = action.payload.docs;
        })
        .addCase(fetchBooks.rejected, (state, action)=>{
            state.loading = false;
            state.error = true;
            state.errorMessage = action.payload;
        })
    }
});

export default booksSlice.reducer;
