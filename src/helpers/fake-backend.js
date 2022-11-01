export { fakeBackend };

// array in local storage for registered users
const usersKey = "currency-converter-app";
let users = JSON.parse(localStorage.getItem(usersKey)) || [];

function fakeBackend() {
  let realFetch = window.fetch;
  window.fetch = function (url, opts) {
    return new Promise((resolve, reject) => {
      // wrap in timeout to simulate server api call
      setTimeout(handleRoute, 500);

      function handleRoute() {
        switch (true) {
          case url.endsWith("/login") && opts.method === "POST":
            return authenticate();
          case url.endsWith("/register") && opts.method === "POST":
            return register();
          default:
            // pass through any requests not handled above
            return realFetch(url, opts)
              .then((response) => resolve(response))
              .catch((error) => reject(error));
        }
      }

      // route functions

      function authenticate() {
        const { email, password } = body();
        const user = users.find(
          (x) => x.email === email && x.password === password
        );

        if (!user) return error("Username or password is incorrect");

        return ok({
          ...basicDetails(user),
          token: "fake-jwt-token",
        });
      }

      function register() {
        const user = body();

        if (users.find((x) => x.email === user.email)) {
          return error('Email "' + user.email + '" is already used');
        }

        user.id = users.length ? Math.max(...users.map((x) => x.id)) + 1 : 1;
        users.push(user);
        localStorage.setItem(usersKey, JSON.stringify(users));
        return ok();
      }

      // helper functions

      function ok(body) {
        resolve({ ok: true, ...headers(), json: () => Promise.resolve(body) });
      }

      function unauthorized() {
        resolve({
          status: 401,
          ...headers(),
          json: () => Promise.resolve({ message: "Unauthorized" }),
        });
      }

      function error(message) {
        resolve({
          status: 400,
          ...headers(),
          json: () => Promise.resolve({ message }),
        });
      }

      function basicDetails(user) {
        const { id, email, name } = user;
        return { id, email, name };
      }

      function isAuthenticated() {
        return opts.headers["Authorization"] === "Bearer fake-jwt-token";
      }

      function body() {
        return opts.body && JSON.parse(opts.body);
      }

      function idFromUrl() {
        const urlParts = url.split("/");
        return parseInt(urlParts[urlParts.length - 1]);
      }

      function headers() {
        return {
          headers: {
            get(key) {
              return ["application/json"];
            },
          },
        };
      }
    });
  };
}
