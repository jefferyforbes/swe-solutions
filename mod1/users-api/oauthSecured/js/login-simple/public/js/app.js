
let auth0 = null;

const fetchAuthConfig = () => fetch("/auth_config.json");

// configgure the Auth0 client
const configureClient = async () => {
    const response = await fetchAuthConfig();
    const config = await response.json();
  
    auth0 = await createAuth0Client({
      domain: config.domain,
      client_id: config.clientId
    });
};

const updateUI = async () => {
    const isAuthenticated = await auth0.isAuthenticated();
  
    document.getElementById("btn-logout").disabled = !isAuthenticated;
    document.getElementById("btn-login").disabled = isAuthenticated;
};

// login using Auth0 and redirect to the current page
const login = async () => {
    await auth0.loginWithRedirect({
      redirect_uri: window.location.origin
    });
};

const logout = () => {
    auth0.logout({
      returnTo: window.location.origin
    });
};

// actions to perform when the page is loaded
window.onload = async () => {
    await configureClient();

    updateUI();

    const isAuthenticated = await auth0.isAuthenticated();

    if (isAuthenticated) {
      // show the gated content
      return;
    }
  
    // check for the code and state parameters ??
    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")) {
  
      // Process the login state
      await auth0.handleRedirectCallback();
      
      updateUI();
  
      // Use replaceState to redirect the user away and remove the querystring parameters
      window.history.replaceState({}, document.title, "/");
    }
};