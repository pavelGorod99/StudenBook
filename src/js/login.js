function SetSessionLocalStorage(USER_ID) {

	localStorage.setItem('USER_ID', USER_ID);
}

function SetErrorLabel(id, innerText, color) {

	var elem = document.getElementById(id);
	elem.innerHTML = innerText;
	elem.style.color = color;
}

$(document).ready(function() {

	$("#userPassword").on("input", function() {

		// if ($(this).val().length < 4)
		// 	SetErrorLabel("usernamePassErr", "* Minimum 4 characters required for password", "green");
		// else SetErrorLabel("usernamePassErr", "", "green");
	});
});