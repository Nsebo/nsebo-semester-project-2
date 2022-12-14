import {getToken, updateLocalStorage} from "./utils/storage";
import {isValidUrl} from "./utils/validation";
import {GET_PROFILE_URL, CHANGE_AVATAR_URL} from "./settings/api";

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


getProfile()