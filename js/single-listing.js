
import {getToken} from "./utils/storage";

const paramString = window.location.search;
const searchParam = new URLSearchParams(paramString);
const listingId = searchParam.get("listing_id");
console.log("listingId: ", listingId);
const accessToken = getToken();
const listingDetails = document.querySelector('#listing-container');


const listTitle = document.querySelector("#list-title");
const listId = document.querySelector("#list-id");
const listDesc = document.querySelector("#list-desc");
const listBids = document.querySelector("#list-bids");
const listMedia = document.querySelector("#list-media");
const listEndsAt = document.querySelector("#list-endsAt");
const listTags = document.querySelector("#list-tags");


async function getListById() {
    const response = await fetch(`https://api.noroff.dev/api/v1/auction/listings/${listingId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    })
    if (!accessToken) {
       location.href = '/login.html';
    }
    console.log(response);
    const data = await response.json();
    const title = data.title;
    const id = data.id;
    const desc = data.description;
    const bids = data._count.bids;
    const media = data.media[0];
    const endsAt = data.endsAt;
    const tags = data.tags;


    listingDetails.innerHTML = `
  
<li class="group relative">
                    <a href="/single-listing.html?listings_id=${data.id}">
                        <img  class=" w-full rounded-t-lg h-96 md:h-auto md:w-96 md:rounded md:rounded-l-lg" src="${media}" alt="">
                         </a>
                    <div class="mt-4 flex justify-between">
                        <div>
                            <h3 class="text-sm font-medium text-white">
                                <a href="#">${title}</a>
                            </h3>
                             <p class="text-sm  text-gray-500">Title:${desc}</p>
                             <p class="text-sm  text-white"><ion-icon name="pricetags-sharp"></ion-icon> Tags:${tags}</p>
                             <p class="text-sm text-gray-400"><ion-icon name="alarm-sharp"></ion-icon> ${endsAt}</p>
                                <p class="text-medium  text-white"> <ion-icon name="flag-sharp"></ion-icon> ${bids} </p>
                        </div>
                    </div>  
                     </li>
    `;

}

getListById();



const bidBtn = document.querySelector("#bid-btn");
const myBid = document.querySelector("#my-modal");
const biddingForm = document.querySelector('#bidding-form');
const listingBidInput = document.querySelector('#listing-bid-input');

bidBtn.addEventListener('click', () => {
    biddingForm.style.display = 'block'
})


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










