export const METHOD = 'POST'
export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer ${process.env.ACESS_TOKEN}`,
}

const now = new Date()
const year = new Date(now.getFullYear(), 0, 1, 0, 0, 0).toISOString()
const toDay = now.toISOString()

export const queryList = {
  total: {
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
  storages: {
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
  linkLists: (type: string, paths: string) => {
    const treeType = `
    ... on Tree {
      entries {
        path
        oid
        name
        nameRaw
        type
      }
    }
    `
    const blobType = `
    ... on Blob {
      text
    }
    `
    return {
      query: `
        query {
          repository(owner: "${process.env.GIT_OWNER}" name: "${process.env.GIT_REPOSITORY}") {
            object(expression: "main:${paths}") {
              ${type === 'tree' ? treeType : blobType}
            }
          }
        }`,
    }
  },
}
