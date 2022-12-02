import {getToken} from "./utils/storage";


const accessToken = getToken();
const biddingForm = document.querySelector('#bidding-form');
const listingBidInput = document.querySelector('#listing-bid-input');


biddingForm.addEventListener("submit",function (event){
    event.preventDefault()
    console.log('listingBidInput', listingBidInput.value);

    const amountToBid = {
        amount: parseInt(listingBidInput.value),
    };


    async function bidOnList() {
        const response = await fetch(`https://api.noroff.dev/api/v1/auction/listings/${listingId}/bids`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(amountToBid),
        });
        console.log('bid on list response: ', response);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            console.log('Bid on a list SUCCEEDED!!  🥳 🤗🤗');
        } else {
            const err = await response.json();
            console.log(err);
            console.log('CREATE LIST FAILED');
        }
        biddingForm.reset();
    }

    bidOnList();
})






