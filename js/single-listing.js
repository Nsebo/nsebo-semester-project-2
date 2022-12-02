import {GET_LISTINGS_BY_ID_URL} from "./settings/api";
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
console.log(listTitle)
console.log(listId)
console.log(listDesc)
console.log(listBids)
console.log(listMedia)
console.log(listEndsAt)
console.log(listTags)





async function getListById() {
    const response = await fetch(`https://api.noroff.dev/api/v1/auction/listings/01aab2d2-0448-457b-b409-72274e24c7ed?_seller=true&_bids=true/${listingId}`, {
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
    const listTitle = data.title;
    const listId = data.id;
    const listDesc = data.description;
    const listBids = data._count.bids;
    const listMedia = data.media[0];
    const listEndsAt = data.endsAt;
    const listTags = data.tags;


    listingDetails.innerHTML = `
  
<li class="group relative">
                    <a href="/single-listing.html?listings_id=${data.id}">
                        <img  class="h-full w-full object-cover object-center lg:h-full lg:w-full" src="${listMedia}" alt="">
                         </a>
                    <div class="mt-4 flex justify-between">
                        <div>
                            <h3 class="text-sm font-medium text-black">
                                <a href="#">${listTitle}</a>
                            </h3>
                             <p class="text-sm  text-gray-500">Title:${listDesc}</p>
                             <p class="text-sm  text-gray-500">Tags:${listTags}</p>
                            <p class="text-sm  text-gray-500"> ${listEndsAt}</p>
                            <p class="text-sm  text-gray-500">${listBids} </p>
                        </div>
                        <a href="/create-bid.html"><button type="button" class="inline-flex items-center rounded border border-transparent bg-cyan-500 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">Place Bid</button></a>
                    </div>
                </li>
    `;

}

getListById();









