import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utlis/api";
const homePageSlice = createSlice({
    name : "homepage",
    initialState : {
        value : {
              hotelList : [],
              selectedType : [],
              room : [],
              count : [{count1:0 }, {count2: 0}, {count3:0}],//count1: adults count2 : children count3 : infnats 
              startDate : "",
              endDate : "",
              duration : "",
              price : "",
              wishlist : [],
              wishlistbyUserId : []
              
        }
    },
    reducers: {
       increment: (state, action) => {
         if(action.payload == "adult"){
            state.value.count[0].count1 += 1
         }
         else if(action.payload ==  'children'){
            state.value.count[1].count2 += 1
         }
         else if(action.payload == "infant"){
            state.value.count[2].count3 += 1
         }
         
       },
       decrement : (state, action) => {
        if(action.payload == "adult" && state.value.count[0].count1>0){
            state.value.count[0].count1 -= 1
         }
         else if(action.payload ==  'children' && state.value.count[1].count2 > 0){
            state.value.count[1].count2 -= 1
         }
         else if(action.payload == "infant" && state.value.count[2].count3 > 0){
            state.value.count[2].count3 -= 1
         }
       },
       reset : (state, action) => {
        state.value.count[0].count1 = 0;
        state.value.count[1].count2 = 0;
        state.value.count[2].count3 = 0 ;
       },
       addDetails : ( state, action) =>{
        const { startDate, endDate, duration, adults, children, infants} = action.payload;
        state.value.startDate = startDate ;
        state.value.endDate= endDate ;
        state.value.duration = duration ;
        state.value.adults = adults ;
        state.value.children = children;
        state.value.infants = infants;

       }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled, (state,action) => {
            state.value.hotelList = action.payload;
            state.value.error = null;
        })
        builder.addCase(fetchData.rejected, (state,action) => {
            state.value.hotelList = [];
            state.value.error = action.error;
        })
        builder.addCase(fetchHotelsByType.fulfilled, (state,action) => {
            state.value.selectedType = action.payload;
            // const {selectedType} = action.payload;
            // if(state.value.selectedType == []) state.value.selectedType = action.payload;
            // if(state.value.selectedType[0].property_type === action.payload[0].property_type)
            //   state.value.selectedType = [
            //     ...state.value.selectedType,
            //     ...action.payload
            //    ];
            state.value.error = null;
        })
        builder.addCase(fetchHotelsByType.rejected, (state,action) => {
            state.value.selectedType = [];
            state.value.error = action.error;
        })
          builder.addCase(fetchRoom.fulfilled, (state,action) => {
            state.value.room = action.payload;
            state.value.error = null;
        })
        builder.addCase(fetchRoom.rejected, (state,action) => {
            state.value.room = [];
            state.value.error = action.error;
        })
        builder.addCase(addWishilist.fulfilled, (state,action) => {
            state.value.wishlist = action.payload;
            state.value.error = null;
        })
        builder.addCase(addWishilist.rejected, (state,action) => {
            state.value.wishlist = [];
            state.value.error = action.error;
        })
        builder.addCase(getWishList.fulfilled, (state,action) => {
            state.value.wishlistbyUserId = action.payload;
            state.value.error = null;
        })
        builder.addCase(getWishList.rejected, (state,action) => {
            state.value.wishlistbyUserId = [];
            state.value.error = action.error;
        })
    }
})

export const fetchData = createAsyncThunk("/hotelList",async() => {
    const token = localStorage.getItem("token")
    const {data} = await axios.get(baseUrl+"/hotels/all",
    {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return data;
})

export const fetchHotelsByType = createAsyncThunk("/hotelListByType",async({name_id}) => {
   
    const token = localStorage.getItem("token")
    const {data} = await axios.get(baseUrl + "/hotels/find",
    {
        params: {
           type : name_id,
          
        },
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return data;
})

export const fetchRoom = createAsyncThunk("/room",async(hotelId) => {
    const token = localStorage.getItem("token")
    const {data} = await axios.get(baseUrl + "/hotels/room/"+hotelId,
    {
        headers : {
            "Authorization" : "Bearer " + token
        }
    }
    )
    return data;
})

export const addWishilist = createAsyncThunk("/addWishlist", async(room) => {
   const {data}  = await axios.post( baseUrl +"/wishlist/add",room) 
   return data;
})

export const getWishList = createAsyncThunk("/getWishListByUserId",async({userId}) => {
    const token = localStorage.getItem("token")
    const {data} = await axios.get( baseUrl + "/getUserWishList/"+ userId,
    {
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    return data;
})

export const addTrip = createAsyncThunk("/addTrip", async(tripdata) => {
    const {data}  = await axios.post(baseUrl + "/wishlist/add",tripdata) 
    return data;
})



export const {increment, decrement, reset, addDetails} = homePageSlice.actions;
export default homePageSlice.reducer;