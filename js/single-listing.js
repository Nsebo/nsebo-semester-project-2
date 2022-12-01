import {GET_LISTINGS_BY_ID_URL} from "./settings/api";
import {getToken} from "./utils/storage";

const paramString = window.location.search;
const searchParam = new URLSearchParams(paramString);
const listingId = searchParam.get("listing_id");
const listingDetails = document.querySelector('#listing-container');
const accessToken = getToken();

console.log("listingId: ", listingId);


async function getListById() {
    const response = await fetch(`https://api.noroff.dev/api/v1/auction/listings/${listingId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    })
    if (!accessToken) {
        location.href = '/products.html';
    }
    const data = await response.json();
    const postTitle = data.title;
    const postDescription = data.description;
    const postMedia = data.media[0];
    const postTags = data.tags;
    const PostCreated = data.created;
    const postEndsAt = data.endsAt;
    const postBids = data._count.bids;


    listingDetails.innerHTML = `
  
<div class="group relative">
                    <a href="/listing-details.html?listings_id=${post.id}">
                        <img src="img/audi.jpg" alt="an image of white audi." class="h-full w-full object-cover object-center lg:h-full lg:w-full" src="${postMedia}">
                         </a>
                    <div class="mt-4 flex justify-between">
                        <div>
                            <h3 class="text-sm font-medium text-black">
                                <a href="#">${postTitle}</a>
                            </h3>
                             <p class="text-sm  text-gray-500">Title:${postDescription}</p>
                             <p class="text-sm  text-gray-500">Tags:${postTags}</p>
                            <p class="text-sm  text-gray-500"> ${postEndsAt}</p>
                            <p class="text-sm  text-gray-500"> Current Bids: ${postBids} </p>
                            <p class="text-sm text-red-500"><ion-icon name="time-outline"></ion-icon> Created: ${PostCreated}</p>
                        </div>
                        <a href="listing-details.html"><button type="button" class="inline-flex items-center rounded border border-transparent bg-cyan-500 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">Bid</button></a>
                    </div>
                </div>
    `;

}

getListById();

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






