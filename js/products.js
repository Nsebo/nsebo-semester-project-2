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


async function getAllPosts(searchParams){
  const response =   await fetch (GET_ALL_POSTS_URL,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    })
    console.log("response: ", response);
    if(response.ok){
        let posts = await response.json();
        let searchPosts = []
        if(searchParams){
            console.log( "searchParam:", searchParams)
            searchPosts = posts.filter(x => x.description?.toLowerCase().includes(searchParams.toLowerCase()) || x.title?.toLowerCase().includes(searchParams.toLowerCase()))
            posts.length = 0;
            posts = searchPosts;
            console.log("my posts:", posts)
        }

       const listOfHtmlPosts =  posts.map(post=>{
           const postTitle = post.title;
           const postDescription = post.description;
           const postMedia = post.media[0];
           const postEndsAt = post.endsAt;
           const postTags = post.tags;
           const createdDate = post.created;

           return (`
            <li  class="group relative">
                    <div class="min-h-80 aspect-w-1 aspect-h-1 w-76 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                   <a href="single-listing.html?listing_id=${post.id}">
                        <img   class="h-full w-full object-cover object-center lg:h-full lg:w-full" src="${postMedia}" alt="">
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

}getAllPosts().catch(err =>{
    console.log(err)
    console.log("get all post")
});



// search btn
// #searchBtn.onclick(function (){
// var searchParam = document.getElementById("search").value;
// console.log(searchParam);
// })

document.getElementById("searchBtn").addEventListener("click", function (){
    var searchParam = document.getElementById("search").value;
    console.log("searchParam:", searchParam)
    if(searchParam){
        getAllPosts(searchParam);
    }

    console.log("searchParam:", searchParam);
})