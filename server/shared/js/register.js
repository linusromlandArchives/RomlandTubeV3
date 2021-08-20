import { registerUser } from "./hash.js";

function regUsrOnSubmit() {
	const user = document.getElementById("username").value;
	const email = document.getElementById("email").value;
	const emailConfirm = document.getElementById("emailConfirm").value;
	const pass = document.getElementById("password").value;
	const confirm = document.getElementById("passwordConfirm").value;
	let errorBox = document.getElementById("errorText");
	//checks so the user as typed the same in confirm and normal field, then send register post
	try {
		if (
			pass == confirm &&
			user.length > 0 &&
			pass.length > 0 &&
			email.length > 0 &&
			email == emailConfirm
		) {
			registerUser(
				user,
				pass,
				errorBox,
				document.getElementById("infoText"),
				email
			);
		} else if (user.length == 0) {
			errorBox.innerText = "Please pick a name";
		} else if (email.length == 0) {
			errorBox.innerText = "Please pick a email!";
		} else if (email != emailConfirm) {
			errorBox.innerText = "Email does not match";
		} else if (pass.length == 0) {
			errorBox.innerText = "Please pick a password";
		} else if (pass != confirm) {
			errorBox.innerText = "Password does not match";
		} else {
			errorBox.innerText = "Unknown client error";
		}
	} catch (error) {
		alert(error);
	}
}

//adds event listner to form, runs function above ("regUsrOnSubmit()" on submit
document.getElementById("theForm").addEventListener(
	"submit",
	function (event) {
		event.preventDefault();
		regUsrOnSubmit();
	},
	false
);
