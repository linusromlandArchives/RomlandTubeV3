function registerUser(username, password, errorBox, infoBox, email) {
  let request = new XMLHttpRequest();
  let name = username;
  //hash the password with salting
  let pass = CryptoJS.MD5(password + name);
  request.open("POST", "/register", true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  //sends request to to server
  request.send(`name=${name}&email=${email}&password=${pass}`);
  //on return recives status codes
  request.onreadystatechange = function () {
    infoBox.innerText = "";
    if (request.status == 409) {
      errorBox.innerText = "Username taken!";
    } else if (request.status == 410) {
      errorBox.innerText = "Email taken!";
    } else if (request.status == 500) {
      errorBox.innerText = "Error occured!";
    } else if (request.status == 201) {
      loginUser(username, password, errorBox);
      return;
    } else {
      errorBox.innerText = "Unknown error";
    }
  };
}

function loginUser(name, password, errorBox) {
  let errorArea = errorBox;
  let request = new XMLHttpRequest();
  //hash the password with salting
  let pass = CryptoJS.MD5(password + name);
  request.open("POST", "/login", true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  //sends request to to server
  request.send(`name=${name}&password=${pass}`);
  request.onreadystatechange = function () {
    // This is ugly and I want to change it
    let urlToLogin =
      window.location.protocol + "//" + window.location.host + "/login";
    if (request.responseURL == urlToLogin) {
      errorArea.innerText = "Username or Password is incorrect";
    } else {
      window.location = "/auth";
    }
  };
}
// exports the functions
export { registerUser, loginUser };
