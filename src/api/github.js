import axios from 'axios'

const GITHUB_API = 'https://api.github.com'
const token = import.meta.env.VITE_GITHUB_TOKEN || localStorage.getItem('GITHUB_TOKEN') || null

const axiosInstance = axios.create({
  baseURL: GITHUB_API,
  headers: token ? { Authorization: `Bearer ${token}` } : {}
})

export async function getUser(username) {
  const res = await axiosInstance.get(`/users/${username}`)
  return res.data
}

export async function getRepos(username, page = 1, per_page = 30, sort = 'updated') {
  const res = await axiosInstance.get(`/users/${username}/repos`, {
    params: { page, per_page, sort }
  })
  return res.data
}

export async function getFollowers(username, page = 1, per_page = 30) {
  const res = await axiosInstance.get(`/users/${username}/followers`, {
    params: { page, per_page }
  })
  return res.data
}

export async function getPinnedRepos(username) {
  if (!token) return []
  try {
    const query = `
      query($login:String!) {
        user(login:$login) {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                id
                name
                description
                url
                stargazerCount
                forkCount
                primaryLanguage { name color }
              }
            }
          }
        }
      }`
    const res = await axios.post('https://api.github.com/graphql', {
      query,
      variables: { login: username }
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return res.data.data.user?.pinnedItems?.nodes || []
  } catch (err) {
    console.warn('GraphQL pinned repos failed', err)
    return []
  }
}
