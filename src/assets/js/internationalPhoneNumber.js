var phoneInput;
var phoneInputField;
var info;
var phoneCountry;

var countryCode;

var phoneNumberWithoutCountryCode;

var phoneNumber;

window.onload = (event) => {

    phoneInputField = document.querySelector("#phone");
    if (phoneInputField) {
        phoneInput = window.intlTelInput(phoneInputField, {
            initialCountry: "auto",
            geoIpLookup: getIp,
            utilsScript:
            "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        });
    }

    // alert(phoneCountry)

    // info = document.querySelector(".alert-info");
};

var rand = function() {
    return Math.random().toString(36).substr(2); // remove `0.`
};

var token = function() {
    return rand() + rand(); // to make it longer
};


function getIp(callback) {

    fetch('https://ipinfo.io/json?token=dbedabc9180597', { headers: { 'Accept': 'application/json' }})
    .then((resp) => resp.json())
    .catch(() => {
        return {
        country: 'us',
        };
    })
    .then((resp) => callback(
        phoneCountry = resp.country
    ));
}

function process(event) {

    // alert(1)

    event.preventDefault();

    phoneNumber = phoneInput.getNumber();

    phoneNumberWithoutCountryCode = document.querySelector("#phone").value;

    countryCode = phoneInput.j

    // to see country code
    console.log(phoneInput.j);
    // to see full phone number
    console.log("PHONE NUMBER " + phoneNumber);
    // to see phone number without country code
    console.log(phoneNumberWithoutCountryCode);

    info.style.display = "";
    info.innerHTML = `Phone number in E.164 format: <strong>${phoneNumber}</strong>`;
}

function getPhoneNumberCountryCode() {
    countryCode = phoneInput.getSelectedCountryData().dialCode
    // return phoneInput.getSelectedCountryData().dialCode
}