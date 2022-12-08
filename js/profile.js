import {getToken} from "./utils/storage";
import {GET_PROFILE_INFO_URL} from "./settings/api";

const profileDetails = document.querySelector('#profile-details');
console.log(profileDetails);
const accessToken = getToken();


async function getProfile() {
    const response = await fetch(GET_PROFILE_INFO_URL, {
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
  <div class="flex justify-between">
                    <span class="text-xl font-semibold block">Admin Profile</span>
                </div>
            <img id="showImage" class="max-w-xs w-14 " src="${avatar}" alt="">
                    <span class="text-gray-600 pb-4 block opacity-70">Personal information of your account</span>
                    <div class="pb-6">
                        <label for="username" class="font-semibold text-gray-700 block pb-1">Name</label>
                        <div class="flex">
                            <input disabled id="username" class="border-1  rounded-r px-4 py-2 w-full" type="text" value="${UserName}" />
                           
                        </div>
                    </div>
                    <div class="pb-4">
                        <label for="email" class="font-semibold text-gray-700 block pb-1">Email</label>
                        <input disabled id="email" class="border-1  rounded-r px-4 py-2 w-full" type="email" value="${email}" />
                    </div>
                    <div class="pb-4">
                        <p class="text-black pt-4 block font-bold Right-15">Credits: ${credits}</p>
                    </div>
                       <a href="edit-profile.html" class="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800">Edit</a>
  </div>
`
    }


getProfile()





