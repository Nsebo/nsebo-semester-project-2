import {getToken, updateLocalStorage} from "./utils/storage";
import {isValidUrl} from "./utils/validation";
import {GET_PROFILE_URL, CHANGE_AVATAR_URL, USER_BIDS_API_URL} from "./settings/api";

const profileDetails = document.querySelector('#profile-details');
console.log(profileDetails);
const changeAvatar = document.querySelector('#changeAvatar');
console.log(changeAvatar);
const avatarInput = document.querySelector("#avatarInput")
const generalErrorMessage = document.querySelector('#generalErrorMessage');
const accessToken = getToken();

changeAvatar.addEventListener('submit', function (event) {
    event.preventDefault();
    let isAvatarValid = false;
    isAvatarValid = isValidUrl(avatarInput.value);
    if (isAvatarValid) {
        let avatarErrorMessage;
        avatarErrorMessage.classList.add('hidden');
        isAvatarValid = true;
    } else {
        let avatarErrorMessage;
        avatarErrorMessage.classList.remove('hidden');
    }
    if (isAvatarValid) {
        const avatarData = {
            avatar: avatarInput.value,
        };
        (async function changeAvatar() {
            const response = await fetch(CHANGE_AVATAR_URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(avatarData),
            });
            if (response.ok) {
                updateLocalStorage(GET_PROFILE_URL);
            } else {
                const error = await response.json();
                const errorMessage = error.errors[0].message;
                throw new Error(errorMessage);
            }
        })().catch((errorMessage) => {
            generalErrorMessage.innerHTML = `${errorMessage}`;
        });
    }
});

async function getProfile() {
    const response = await fetch(GET_PROFILE_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    console.log('Get profile response: ', response);
    const profileInfo = await response.json();
    const UserName = profileInfo.name;
    const email = profileInfo.email;
    const avatar = profileInfo.avatar;
    const credits = profileInfo.credits;

    console.log(profileInfo)
    console.log(avatar)
    console.log(UserName)
    console.log(email)
    console.log(credits)

    profileDetails.innerHTML = `
<div>
            <img id="showImage" class="max-w-xs w-20 h-20 rounded-full object-cover " src="${avatar}" alt="">
                       <div class="pb-6">
                    
                         <a  class="-mt-2 text-bold font-bold text-white underline rounded-full px-5 py-2 ">Update Avatar</a>
                    </div>
                    
                    <div class="pb-6">
                        <div  class="font-semibold text-white block pb-1">${UserName}</div>
                    </div>
                    <div class="pb-4">
                        <div  class="font-semibold text-white block pb-1">${email}</div>
                       
                    </div>
                    <div class="pb-4">
                        <p class="text-white pt-4 block font-bold Right-15">Credits: ${credits}</p>
                    </div>
  </div>
`



}

(async function displayUserBids() {
    const response = await fetch(USER_BIDS_API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    console.log('Get all posts response: ', response);
    if (response.ok) {
        const listings = await response.json();
        console.log(listings);
        console.log('Get listings succeeded');
        console.log('posts: ', listings);
        if (!listings.length) {
            generalErrorMessage.innerHTML = 'Sorry, there are currently no bids';
        } else {
            const listOfHtmlPosts = listings
                .map((post) => {
                    console.log('listings ', post);
                    const listingTitle = post.title;
                    const listingDescription = post.description;
                    const listingMedia = post.media[0];
                    const listingEndsAt = post.endsAt;
                    const listingTags = post.tags;

                    return `
          <li  class="group relative">
                    <div class="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                   <a href="single-listing.html?listing_id=${post.id}">
                        <img  class="h-full w-full object-cover object-center lg:h-full lg:w-full" src="${listingMedia }">
                         </a>
                    </div>
                    <div class="mt-4 flex justify-between">
                        <div>
                            <h3 class="text-sm font-medium text-white">
                                <a href="#">${listingTitle}</a>
                            </h3>
                            <p class="text-sm  text-gray-500">${listingDescription}</p>
                            <p class="text-sm  text-gray-500"> ${listingTags}</p>
                             <p class="text-sm text-gray-400"><ion-icon name="alarm-sharp"></ion-icon> ${listingEndsAt}</p>
                        </div>
                    </div>
                </li>
         
        `;
                })
                .join('');
            let listingContainer;
            listingContainer.insertAdjacentHTML('beforeend', listOfHtmlPosts);
        }
    } else {
        const err = await response.json();
        const message = `Sorry error occured ${err}`;
        throw new Error(message);
    }
})().catch((err) => {
    console.log('Get listing failed ! ');
    console.log(err);
    generalErrorMessage.innerHTML = err;
});

getProfile()