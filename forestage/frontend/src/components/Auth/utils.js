const TOKEN_NAME = 'authToken'

const getAuthToken = () => {
  return localStorage.getItem(TOKEN_NAME)
}

const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token)
}

const removeAuthToken = () => {
  localStorage.removeItem(TOKEN_NAME)
}

export { getAuthToken, setAuthToken, removeAuthToken }
