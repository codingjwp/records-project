export const METHOD = 'POST'
export const HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': `Bearer ${process.env.ACESS_TOKEN}`,
}

const now = new Date();
const year = new Date(now.getFullYear(), 0, 1, 0, 0, 0).toISOString();
const toDay = now.toISOString();

export const queryList = {
  "total": {
    query: `
      query {
        viewer {
          pinnedItems(first: 10) {
            totalCount
          }
        contributionsCollection(from: "${year}" to: "${toDay}") {
          contributionCalendar {
            totalContributions
          }
        }
      }
    }`,
  },
  "storages" : {
    query: `
      query {
        viewer {
          pinnedItems(first: 10) {
            nodes {
              ... on Repository {
                databaseId
                name
                description
                url
                openGraphImageUrl
              }
            }
          }
        }
      }`,
  },
  "records" : {
    query: `
      query {
        repository(owner: "${process.env.GIT_OWNER}" name: "${process.env.GIT_REPOSITORY}") {
          object(expression: "main:") {
            ... on Tree {
              entries {
                oid
                name
                nameRaw
                type
              }
            }
          }
        }
      }`
  },
  "folders" : (name: string) => {
    return ({
      query: `
        query {
          repository(owner: "${process.env.GIT_OWNER}" name: "${process.env.GIT_REPOSITORY}") {
            object(expression: "main:${name}") {
              ... on Tree {
                entries {
                  oid
                  name
                  nameRaw
                  type
                }
              }
            }
          }
        }`
    })
  },
  "markdown" : (folder: string, file: string) => {
    return ({
      query: `
        query {
          repository(owner: "${process.env.GIT_OWNER}" name: "${process.env.GIT_REPOSITORY}") {   
            object( expression: "main:${folder}/${file}") {
              ... on Blob {
                text
              }
            }
          }
        }`
    })
  }
}