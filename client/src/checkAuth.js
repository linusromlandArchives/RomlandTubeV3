export default {
  notLoggedIn(router) {
    fetch("/api/getUser")
      .then((response) => response.json())
      .then((json) => {
        if (json.verfied) router.push("/");
        if (!response.json().verfied) router.push("/verifyemail");
      });
  },
  loggedIn(router) {
    fetch("/api/getUser").then((response) => {
      if (!response.json()) router.push("/login");
      if (!response.json().verfied) router.push("/verifyemail");
    });
  },
};
