import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState={
    user: null,
    token: null,
    isLodaing:false,
    status: null
}

export const registerUser = createAsyncThunk(
    'auth/registerUser', 
    async ({username, password}) =>{
        try{
            const {data} = await axios.post('/api/auth/',{   //{data} = response.data
                username,
                password
            })
            if(data.token) {
                window.localStorage.setItem('token', data.token)
            }
        } catch (error){
            console.log(error)
        }

    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{

    },
    extraReducers: {
        [registerUser.pending]: (state) =>{
            state.isLodaing = true
            state.status = null
        },
        [registerUser.fulfilled]: (state, action) => {
            state.isLodaing = false
            state.status = action.payload.message
            state.user = action.payload.user

        },
        [registerUser.rejected]: (state, action) => {

        }

    }
})

export default authSlice.reducer