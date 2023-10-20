import { cache } from 'react';

const now = new Date();
const year = new Date(now.getFullYear(), 0, 1, 0, 0, 0).toISOString();
const toDay = now.toISOString();
const METHOD = 'POST'
const HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': `Bearer ${process.env.ACESS_TOKEN}`,
}

export const totalContributionsFetch = cache(async () => {
  const query = {
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
  }
  const options = {
    method: METHOD,
    headers: HEADERS,
    body: JSON.stringify(query)
  }
  const response = await fetch(`${process.env.GITHUB_API}`, options)
  if (!response.ok)
    throw new Error("fetch error response");
  const { data } = await response.json();

  return {
    totalPinStorages: data.viewer.pinnedItems.totalCount,
    totalContributions: data.viewer.contributionsCollection.contributionCalendar.totalContributions
  };
})

interface StorageInfo {
  databaseId: number;
  name: string;
  description: string;
  url: string;
  openGraphImageUrl: string;
}

export const storageInfo = cache(async (): Promise<StorageInfo[]> => {
  const query = {
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
  }
  const options = {
    method: METHOD,
    headers: HEADERS,
    body: JSON.stringify(query)
  }
  const response = await fetch(`${process.env.GITHUB_API}`, options)
  if (!response.ok)
    throw new Error("fetch error response");
  const { data } = await response.json();
  return data.viewer.pinnedItems.nodes as StorageInfo[];
});

interface RecordsRoot {
  oid: string;
  name: string;
  type: string;
}
export const recordRoot = cache(async (): Promise<RecordsRoot[]> => {
  const query = {
    query: `
      query {
        repository(owner: "${process.env.GIT_OWNER}" name: "${process.env.GIT_REPOSITORY}") {
          object(expression: "main:") {
            ... on Tree {
              entries {
                oid
                name
                type
            }
          }
        }
      }
    }`
  }
  const options = {
    method: METHOD,
    headers: HEADERS,
    body: JSON.stringify(query)
  }
  const response = await fetch(`${process.env.GITHUB_API}`, options);
  if (!response.ok)
    throw new Error("fetch error response");
  const { data } = await response.json();
  const filterData: RecordsRoot[] = data.repository.object.entries;
  return filterData.filter((item: RecordsRoot) => item.type === 'tree');
})
