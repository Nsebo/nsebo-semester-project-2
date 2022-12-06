class Profile {

    setProfile(n, a, e, t) {


        this.name = n;
        this.age = a;
        this.email = e;
        this.telephoneNumber = t;

        this.saveProfile();
    }

    getProfile() {
        document.getElementById("FN").value = name;
        document.getElementById("age").value = age;
        document.getElementById("e").value = email;
        document.getElementById("num").value = telephoneNumber;
    }

    saveProfile() {
        let storeName = document.getElementById('FN').value;
        localStorage.setItem('name', storeName);
        let storeAge = document.getElementById('age').value;
        alert(storeAge);
        localStorage.setItem('age', storeAge);
        let storeEmail = document.getElementById('e').value;
        localStorage.setItem('email', storeEmail);
        let storeNum = document.getElementById('num').value;
        localStorage.setItem('number', storeNum);
    }

}

function validateForm() {

    var x = document.forms['Login']['fName'].value;
    if(x==null || x=="")
    {
        alert("Please enter your name");
        document.getElementById('FN').focus();
        //return false;
    } else if (x.length < 3) {
        alert("Password must be over 3 characters");
        document.getElementById("FN").focus();
        //return false
    }

    a = document.forms['Login']['ageField'].value;
    if(a==null || a=="")
    {
        alert("age can not be empty");
        document.getElementById('age').focus();
        //return false;
    }
    else if(parseInt(a)<12 || parseInt(a) > 95)
    {
        alert("age should be between 12 and 95");
        document.getElementById('age').focus();
        //return false;
    }



    var em = document.forms['Login']['email'].value;
    alert(em);
    var atpos=em.indexOf("@");
    // Create a variable to return the numerical value of .
    // within the variable
    var dotpos=em.lastIndexOf(".");
    // Compare the numerical values
    if (atpos<1 || dotpos<atpos+4 || dotpos+2>=em.length)
    {
        alert("Not a valid e-mail address");
        //return false;
    } else if (em==null || em=="")
    {
        alert("Please enter your email adress");
        document.getElementById('e').focus();
        //return false;
    }

    var numb = document.forms['Login']['number'].value;
    if (numb==null || numb=="") {
        alert("Please enter your phone number");
        document.getElementById('num').focus();
        //return false;
    } else if (numb.length > 7) {
        alert("Phone number can't be more than 7 digits");
        document.getElementById('num').focus();
        //return false;
    }

}

function UpdateProfile() {
    myProfile = new Profile;
    myProfile.validateForm();
    if (myProfile.validateForm()) {
        myProfile.setProfile();
    }
}

function displayProfile() {
    getProfile();
}

