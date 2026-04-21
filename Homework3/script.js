/*
Program name: script.js
Author: Peter Tran
Date created: 03/24/2026
Date last edited: 03/24/2026
Version: 3.0
Description: This JavaScript file contains the modular logic for client-side form validation, inline error clearing, dynamic slider updates, and injecting data into the review table.
*/


function updateSliderValue() {
    document.getElementById('painOutput').innerText = document.getElementById('painSlider').value;
}


function validateFirstName() {
    const val = document.getElementById('fName').value;
    const err = document.getElementById('fNameError');
    if (!/^[A-Za-z'\-]{1,30}$/.test(val)) {
        err.innerText = "Error: 1-30 chars, letters/apostrophes/dashes only";
        return false;
    }
    err.innerText = ""; return true;
}

function validateMiddleInitial() {
    const val = document.getElementById('mInit').value;
    const err = document.getElementById('mInitError');
    if (val && !/^[A-Za-z]{1}$/.test(val)) {
        err.innerText = "Error: 1 char, letters only";
        return false;
    }
    err.innerText = ""; return true;
}

function validateLastName() {
    const val = document.getElementById('lName').value;
    const err = document.getElementById('lNameError');
    if (!/^[A-Za-z'\-2-5]{1,30}$/.test(val)) {
        err.innerText = "Error: Invalid last name format";
        return false;
    }
    err.innerText = ""; return true;
}

function validateDOB() {
    const val = document.getElementById('dob').value;
    const err = document.getElementById('dobError');
    if (!val) { err.innerText = "Error: DOB required"; return false; }
    
    const dob = new Date(val);
    const today = new Date();

    if (dob > today) { err.innerText = "Error: Cannot be in future"; return false; }
    
    err.innerText = ""; return true;
}

function validateSSN() {
    const val = document.getElementById('ssn').value;
    const err = document.getElementById('ssnError');
    if (!val) { err.innerText = "Error: Required"; return false; }
    err.innerText = ""; return true;
}

function validateEmail() {
    const val = document.getElementById('email').value;
    const err = document.getElementById('emailError');
    if (!/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i.test(val)) {
        err.innerText = "Error: Invalid email format"; return false;
    }
    err.innerText = ""; return true;
}

function validatePhone() {
    const val = document.getElementById('phone').value;
    const err = document.getElementById('phoneError');
    if (!/^\d{3}-\d{3}-\d{4}$/.test(val)) {
        err.innerText = "Error: Format 000-000-0000"; return false;
    }
    err.innerText = ""; return true;
}

function validateAddress1() {
    const val = document.getElementById('address1').value;
    const err = document.getElementById('address1Error');
    if (val.length < 2 || val.length > 30) { err.innerText = "Error: 2-30 chars"; return false; }
    err.innerText = ""; return true;
}

function validateAddress2() {
    const val = document.getElementById('address2').value;
    const err = document.getElementById('address2Error');
    if (val && (val.length < 2 || val.length > 30)) { err.innerText = "Error: 2-30 chars"; return false; }
    err.innerText = ""; return true;
}

function validateCity() {
    const val = document.getElementById('city').value;
    const err = document.getElementById('cityError');
    if (val.length < 2 || val.length > 30) { err.innerText = "Error: 2-30 chars"; return false; }
    err.innerText = ""; return true;
}

function validateState() {
    const val = document.getElementById('state').value;
    const err = document.getElementById('stateError');
    if (!val) { err.innerText = "Error: Select a state"; return false; }
    err.innerText = ""; return true;
}

function validateZip() {
    const val = document.getElementById('zip').value;
    const err = document.getElementById('zipError');
    if (!/^[0-9\-]{5,10}$/.test(val)) { err.innerText = "Error: Invalid zip"; return false; }
    err.innerText = ""; return true;
}

function validateRadio() {
    const radios = document.getElementsByName('vaccinated');
    const err = document.getElementById('radioError');
    let isChecked = false;
    for (let i = 0; i < radios.length; i++) { if (radios[i].checked) isChecked = true; }
    if (!isChecked) { err.innerText = "Error: Make a selection"; return false; }
    err.innerText = ""; return true;
}

function validateTextArea() {
    const val = document.getElementById('symptoms').value;
    const err = document.getElementById('symptomsError');
    if (val.includes('"')) { err.innerText = "Error: Double quotes not allowed"; return false; }
    err.innerText = ""; return true;
}

function validateUserID() {
    const input = document.getElementById('userId');
    const err = document.getElementById('userIdError');
    input.value = input.value.toLowerCase(); // Force lowercase per instructions
    const val = input.value;
    
    if (!/^[a-z][a-z0-9_\-]{4,29}$/.test(val)) {
        err.innerText = "Error: 5-30 chars, letters/nums/_/- only, starts with letter";
        return false;
    }
    err.innerText = ""; return true;
}

function validatePasswords() {
    const pwd1 = document.getElementById('pwd1').value;
    const pwd2 = document.getElementById('pwd2').value;
    const userId = document.getElementById('userId').value;
    const err1 = document.getElementById('pwd1Error');
    const err2 = document.getElementById('pwd2Error');
    let valid = true;

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#%^&*()_\-+=\/><.,`~])[^"]{8,30}$/.test(pwd1)) {
        err1.innerText = "Error: Invalid password format"; valid = false;
    } else if (userId && pwd1.includes(userId)) {
        err1.innerText = "Error: Password cannot contain User ID"; valid = false;
    } else { err1.innerText = ""; }

    if (pwd1 !== pwd2 && pwd2) {
        err2.innerText = "Error: Passwords do not match"; valid = false;
    } else { err2.innerText = ""; }

    return valid;
}


function generateReview() {
   
    const isValid = validateFirstName() & validateLastName() & validateDOB() & validateSSN() & validateEmail() & validatePhone() & validateAddress1() & validateCity() & validateState() & validateZip() & validateRadio() & validateTextArea() & validateUserID() & validatePasswords();

    if (!isValid) {
        alert("Please fix the errors on the form before reviewing.");
        return;
    }


    document.getElementById('reviewArea').style.display = 'block';
    const table = document.getElementById('reviewTable');
    

    const fullName = `${document.getElementById('fName').value} ${document.getElementById('mInit').value} ${document.getElementById('lName').value}`;
    const fullAddress = `${document.getElementById('address1').value} ${document.getElementById('address2').value}, ${document.getElementById('city').value}, ${document.getElementById('state').value} ${document.getElementById('zip').value.substring(0,5)}`; // Truncated Zip
    

    let conditions = [];
    if(document.getElementById('chkPox').checked) conditions.push("Chicken Pox");
    if(document.getElementById('chkMeasles').checked) conditions.push("Measles");
    if(document.getElementById('chkMumps').checked) conditions.push("Mumps");
    if(document.getElementById('chkHeart').checked) conditions.push("Heart Disease");
    if(document.getElementById('chkCovid').checked) conditions.push("Covid-19");
    const conditionsStr = conditions.length > 0 ? conditions.join(", ") : "None";


    const vacSelected = document.querySelector('input[name="vaccinated"]:checked').value;

    table.innerHTML = `
        <tr><th style="padding:8px; width:30%;">Field</th><th style="padding:8px; width:50%;">Data Entered</th><th style="padding:8px; width:20%;">Status</th></tr>
        <tr><td style="padding:5px;">Full Name</td><td style="padding:5px;">${fullName}</td><td style="padding:5px; color:green;">pass</td></tr>
        <tr><td style="padding:5px;">Date of Birth</td><td style="padding:5px;">${document.getElementById('dob').value}</td><td style="padding:5px; color:green;">pass</td></tr>
        <tr><td style="padding:5px;">Contact (Email/Phone)</td><td style="padding:5px;">${document.getElementById('email').value} / ${document.getElementById('phone').value}</td><td style="padding:5px; color:green;">pass</td></tr>
        <tr><td style="padding:5px;">Address</td><td style="padding:5px;">${fullAddress}</td><td style="padding:5px; color:green;">pass</td></tr>
        <tr><td style="padding:5px;">Medical Conditions</td><td style="padding:5px;">${conditionsStr}</td><td style="padding:5px; color:green;">pass</td></tr>
        <tr><td style="padding:5px;">Vaccinated?</td><td style="padding:5px;">${vacSelected}</td><td style="padding:5px; color:green;">pass</td></tr>
        <tr><td style="padding:5px;">Pain Level</td><td style="padding:5px;">${document.getElementById('painSlider').value}</td><td style="padding:5px; color:green;">pass</td></tr>
        <tr><td style="padding:5px;">Symptoms</td><td style="padding:5px;">${document.getElementById('symptoms').value}</td><td style="padding:5px; color:green;">pass</td></tr>
        <tr><td style="padding:5px;">User ID</td><td style="padding:5px;">${document.getElementById('userId').value}</td><td style="padding:5px; color:green;">pass</td></tr>
        <tr><td style="padding:5px;">Password</td><td style="padding:5px;">*******</td><td style="padding:5px; color:green;">pass</td></tr>
    `;
}
