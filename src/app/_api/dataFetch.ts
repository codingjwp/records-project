import { cache } from 'react';

const now = new Date();
const year = new Date(now.getFullYear(), 0, 1, 0, 0, 0).toISOString();
const toDay = now.toISOString();
const METHOD = 'POST'

export const totalContributionsFetch = cache(async () => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${process.env.ACESS_TOKEN}`,
  }
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
    headers: headers,
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
  name: string
  description: string
  url: string
  openGraphImageUrl: string
}

export const storageInfo = cache(async (): Promise<StorageInfo[]> => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${process.env.ACESS_TOKEN}`,
  }
  const query = {
    query: `
      query {
        viewer {
          pinnedItems(first: 10) {
            nodes {
              ... on Repository {
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
    headers: headers,
    body: JSON.stringify(query)
  }
  const response = await fetch(`${process.env.GITHUB_API}`, options)
  if (!response.ok)
    throw new Error("fetch error response");
  const { data } = await response.json();
  return data.viewer.pinnedItems.nodes as StorageInfo[];
})