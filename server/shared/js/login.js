import { loginUser } from "./hash.js";

//adds event listner to form, runs function "login()" on submit

document.getElementById("theForm").addEventListener(
	"submit",
	function (event) {
		event.preventDefault();
		login();
	},
	false
);

//checks so fields are not empty and then sends login post
function login() {
	const user = document.getElementById("username").value;
	const pass = document.getElementById("password").value;
	let errorBox = document.getElementById("errorText");

	if (user.length > 0 && pass.length > 0) {
		loginUser(user, pass, errorBox);
	}
}
