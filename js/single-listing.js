
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
                            <h3 class="text-sm font-medium text-black">
                                <a href="#">${title}</a>
                            </h3>
                             <p class="text-sm  text-gray-500">Title:${desc}</p>
                             <p class="text-sm  text-gray-500">Tags:${tags}</p>
                            <p class="text-sm  text-gray-500"> ${endsAt}</p>
                            <p class="text-sm  text-gray-500">${bids} </p>
                             <a href="/create-bid.html" class="inline-flex items-center rounded border border-transparent bg-cyan-500 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">Place Bid</a>
                        </div>
                    </div>
                </li>
    `;

}

getListById();









