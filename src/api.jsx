import { getState, setState, unsetState } from './state';


const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return '';
};

const unsetCookie = (name) => {
  document.cookie = `${name}=something; expires=Thu, 18 Dec 2013 12:00:00 UTC";`;
};

const setCookie = (name, value) => {
  document.cookie = `${name}=${value}`;
};

const refresh = async (refreshToken) => {
  unsetState('globalerror');
  return fetch('https://small-project-api.herokuapp.com/access-tokens/refresh', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  }).then(async (response) => {
    if (!response.ok) {
      unsetCookie('idea-pool-jwt');
      unsetCookie('idea-pool-refresh-token');
      window.location.reload();
      return Promise.reject();
    }
    const json = await response.json();
    setState('user.jwt', json.jwt);
    setState('user.refreshToken', json.refresh_token);
    setCookie('idea-pool-jwt', json.jwt);
    setCookie('idea-pool-refresh-token', json.refreshToken);
    return response;
  });
};


export const authenticatedRequest = async (url, options) => {
  const user = getState('user');
  const { jwt, refreshToken } = user;
  options.headers['X-Access-Token'] = jwt;
  return fetch(url, options).then(async (response) => {
    if (response.status === 401) {
      return refresh(refreshToken).then(async () => fetch(url, options).then(async () => response));
    }
    return response;
  });
};


export const getCurrentUser = async () => {
  unsetState('globalerror');
  return authenticatedRequest('https://small-project-api.herokuapp.com/me', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (response) => {
    const json = await response.json();
    if (response.ok) {
      setState('user.email', json.email);
      setState('user.name', json.name);
      setState('user.avatarUrl', json.avatar_url);
      return;
    }
    setState('globalerror', json.reason);
  });
};

export const getCurrentUserFromCookies = async () => {
  const jwt = getCookie('idea-pool-jwt');
  const refreshToken = getCookie('idea-pool-refresh-token');
  if (jwt) {
    setState('user.jwt', jwt);
    setState('user.refreshToken', refreshToken);
    return getCurrentUser().then(() => {
      setState('ready', true);
    });
  }
  setState('ready', true);
  return Promise.resolve();
};

export const signup = async (email, password, name) => {
  unsetState('globalerror');
  return fetch('https://small-project-api.herokuapp.com/users', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  }).then(async (response) => {
    const json = await response.json();
    if (response.ok) {
      setState('user.jwt', json.jwt);
      setState('user.refreshToken', json.refresh_token);
      setCookie('idea-pool-jwt', json.jwt);
      setCookie('idea-pool-refresh-token', json.refresh_token);
      await getCurrentUser();
      return;
    }
    setState('globalerror', json.reason);
  });
};

export const signin = async (email, password) => {
  unsetState('globalerror');
  return fetch('https://small-project-api.herokuapp.com/access-tokens', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(async (response) => {
    const json = await response.json();
    if (response.ok) {
      setState('user.jwt', json.jwt);
      setState('user.refreshToken', json.refresh_token);
      setCookie('idea-pool-jwt', json.jwt);
      setCookie('idea-pool-refresh-token', json.refresh_token);
      await getCurrentUser();
      return;
    }
    setState('globalerror', json.reason);
  });
};

export const signout = async () => {
  const { jwt, refreshToken } = getState('user');
  unsetState('globalerror');
  return fetch(`https://small-project-api.herokuapp.com/access-tokens?refresh_token=${refreshToken}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Token': jwt,
    },
  }).then(async (response) => {
    if (response.ok) {
      unsetState('user');
      unsetCookie('idea-pool-jwt');
      unsetCookie('idea-pool-refresh-token');
      return;
    }
    const json = await response.json();
    if (json.reason === 'you can not pass!') {
      unsetState('user');
      unsetCookie('idea-pool-jwt');
      unsetCookie('idea-pool-refresh-token');
    }
    setState('globalerror', json.reason);
  });
};

export const getIdeaPage = async (ideaPage) => {
  unsetState('globalerror');
  unsetState('ideaPageReady');
  return authenticatedRequest(`https://small-project-api.herokuapp.com/ideas?page=${ideaPage}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (response) => {
    const json = await response.json();
    if (response.ok) {
      setState('ideaPageReady', true);
      setState('ideas', json);
      return;
    }
    setState('globalerror', json.reason);
  });
};

export const createIdea = async (content, impact, ease, confidence) => {
  unsetState('globalerror');
  return authenticatedRequest('https://small-project-api.herokuapp.com/ideas', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content, impact, ease, confidence,
    }),
  }).then(async (response) => {
    const json = await response.json();
    if (response.ok) {
      return json;
    }
    setState('globalerror', json.reason);
    return Promise.reject();
  });
};

export const updateIdea = async (id, content, impact, ease, confidence) => {
  unsetState('globalerror');
  return authenticatedRequest(`https://small-project-api.herokuapp.com/ideas/${id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content, impact, ease, confidence,
    }),
  }).then(async (response) => {
    const json = await response.json();
    if (response.ok) {
      return json;
    }
    setState('globalerror', json.reason);
    return Promise.reject();
  });
};

export const deleteIdea = async (id) => {
  unsetState('globalerror');
  return authenticatedRequest(`https://small-project-api.herokuapp.com/ideas/${id}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (response) => {
    if (response.ok) {
      return Promise.resolve();
    }
    const json = await response.json();
    setState('globalerror', json.reason);
    return Promise.reject();
  });
};
