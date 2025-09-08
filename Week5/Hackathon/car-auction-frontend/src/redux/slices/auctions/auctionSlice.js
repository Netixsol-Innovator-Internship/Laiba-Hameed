import { createSlice } from "@reduxjs/toolkit";

const auctionSlice = createSlice({
    name: "auction",
    initialState: {
        currentAuction: null,
        myBids: [],
    },
    reducers: {
        setCurrentAuction: (state, action) => {
            state.currentAuction = action.payload;
        },
        clearCurrentAuction: (state) => {
            state.currentAuction = null;
        },
        addBid: (state, action) => {
            state.myBids.push(action.payload);
        },
    },
});

export const { setCurrentAuction, clearCurrentAuction, addBid } =
    auctionSlice.actions;
export default auctionSlice.reducer;
