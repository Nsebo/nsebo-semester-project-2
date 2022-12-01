import moment from "moment";
import {GET_ALL_POSTS_URL} from "./settings/api";
import {getToken} from "./utils/storage";

const now = moment(new Date())
console.log("now:", now)

const postsContainer = document.querySelector('#posts-container');
console.log("postsContainer :", postsContainer)
const generalError = document.querySelector('#general-error');
console.log(generalError);
const accessToken = getToken();


(async function getAllPosts(){
  const response =   await fetch (GET_ALL_POSTS_URL,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    })
    console.log("response: ", response);
    if(response.ok){
        const posts = await response.json();
        console.log("posts:", posts)
       const listOfHtmlPosts = posts.map((post)=>{
       console.log("posts:", post);
           const postTitle = post.title;
           const postDescription = post.description;
           const postMedia = post.media[0];
           const postEndsAt = post.endsAt;
           const postTags = post.tags;
           const createdDate = post.created;

           return (`
            <li  class="group relative">
                    <div class="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                     <a href="/listing-details.html?listings_id=${post.id}">
                        <img src="img/audi.jpg" alt="an image of white audi." class="h-full w-full object-cover object-center lg:h-full lg:w-full" src="${postMedia}">
                         </a>
                    </div>
                    <div class="mt-4 flex justify-between">
                        <div>
                            <h3 class="text-sm font-medium text-black">
                                <a href="#">${postTitle}</a>
                            </h3>
                            <p class="text-sm  text-gray-500">${postDescription}</p>
                            <p class="text-sm  text-gray-500"> ${postTags}</p>
                            <p class="text-sm text-gray-400"><ion-icon name="calendar-outline"></ion-icon> ${postEndsAt}</p>
                        </div>
                        <a href="listing-details.html?listings_id=${post.id}"><button type="button" class="inline-flex items-center rounded border border-transparent bg-cyan-500 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">Bid</button></a>
                    </div>
                </li>
           `)
       })
           .join('');
        postsContainer.insertAdjacentHTML('beforeend', listOfHtmlPosts);
        console.log("listOfHtmlPosts: ", listOfHtmlPosts)

    }else{
        const err = await response.json();
        throw new Error(err)
    }

})().catch(err =>{
    console.log(err)
    console.log("get all post")
});



