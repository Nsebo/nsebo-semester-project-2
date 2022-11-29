import {CREATE_LISTING_URL, LOGIN_USER_URL} from "./settings/api";

const createListingForm = document.querySelector("#create-listing-form");

const listingTitle = document.querySelector("#listingTitle");
const listDescription = document.querySelector("#listDescription");
const listTagOne = document.querySelector("#listTagOne");
const listTagTwo = document.querySelector("#listTagTwo");
const listTagThree = document.querySelector("#listTagThree");
const listImgOne = document.querySelector("#listImgOne");
const listImgTwo = document.querySelector("#listImgTwo");
const listImgThree = document.querySelector("#listImgThree");
const listingEndDate = document.querySelector("#listingEndDate");


createListingForm.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("i clicked the form BTN");
    console.log(listingTitle.value.trim())
    console.log(listDescription.value.trim())

    console.log(listTagOne.value.trim())
    console.log(listTagTwo.value.trim())
    console.log(listTagThree.value.trim())

    console.log(listImgOne.value.trim())
    console.log(listImgTwo.value.trim())
    console.log(listImgThree.value.trim())

    console.log(listingEndDate.value)

    const listingTags = [listTagOne.value, listTagTwo.value, listTagThree.value]
    const listingImages = [listImgOne.value, listImgTwo.value, listImgThree.value]

    const listingData = {
        "title": "listingTitle.value.trim()",
        "description":"listDescription.value.trim()",
        "tags": listingTags,
        "media": listingImages,
        "endsAt": listingEndDate.value
    }
    console.log("listingData:", listingData)

    async function createListing(){
        const response = await fetch (CREATE_LISTING_URL, {
            method: "POST",
            headers: {
                "content-Type": "application/json",
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTMsIm5hbWUiOiJuc2VibyIsImVtYWlsIjoiZnJ1a2xlbTE2QHN0dWQubm9yb2ZmLm5vIiwiYXZhdGFyIjpudWxsLCJjcmVkaXRzIjoxMDAwLCJ3aW5zIjpbXSwiaWF0IjoxNjY5NzIxMTcwfQ.X-5NI3hmYOsZl_ZORaeDcKR7jo-w-lDzCKmW21NtxPw`,
            },
            body: JSON.stringify(listingData),
        })
    console.log("list creation response:", response)
    if(response.ok){
        const data = await response.json();
        location.href = "../products.html";
        console.log(data);
        console.log("CREATE LIST SUCCEEDED!!  🥳 🤗🤗");
    }else{
        const error = await response.json();
        console.log(error);
        console.log("list creation failed!!");
    }
        createListingForm.reset();
}
    createListing();
})