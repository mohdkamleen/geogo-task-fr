import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd'; 
import axios from '../../axios/index';

export const movieHandler = createAsyncThunk(
    'movie/movieHandler',
    async (payload, { rejectWithValue }) => {
        const { method, endpoint, data } = payload;
        try {
            const res = await axios[method](`/${endpoint}`, data && { ...data });
            res.data?.message && message.info(res.data?.message);
            return res.data;
        } catch (error) {
            if (!error.response) throw error;
            console.log(error.response.data.message);
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    loading: false,
    movie: null
};

export const movieSlice = createSlice({
    name: 'movieHandlerSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(movieHandler.pending, (state) => {
                state.loading = true;
            })
            .addCase(movieHandler.fulfilled, (state, action) => {
                state.loading = false;
                state.movie = action.payload || null; 
            })
            .addCase(movieHandler.rejected, (state, action) => {
                state.loading = false;
                state.movie = null;
            });
    },
});

export const ADDMOVIE = (data) => movieHandler({ method: 'post', endpoint: 'movie/add', data });
export const GetAllMovie = () => movieHandler({ method: 'get', endpoint: `movie` }); 
export const GetCurrentMovie = (id) => movieHandler({ method: 'get', endpoint: `movie/${id}` }); 
export const UpdateMovie = (id,data) => movieHandler({ method: 'patch', endpoint: `movie/${id}`, data });
export const DeleteMovie = (id) => movieHandler({ method: 'delete', endpoint: `movie/${id}` });
 
export default movieSlice.reducer; 