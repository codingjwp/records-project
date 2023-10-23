import { cache } from "react";
import { METHOD, HEADERS, queryList } from "./queryList";

interface TotalContribution {
  totalPinStorages: number;
  totalContributions: number;
}

export const totalCountInfo = cache(async (): Promise<TotalContribution> => {
  const options = {
    method: METHOD,
    headers: HEADERS,
    body: JSON.stringify(queryList.total)
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

interface RecordsInfo {
  oid: string;
  name: string;
  nameRaw: string;
  type: string;
  hasLink: boolean;
}

interface NavigationInfo {
  keyId: string;
  label: string;
  hasLink: boolean;
  childs?: RecordsInfo[];
}

export const headerList = cache(async (): Promise<NavigationInfo[]> => {
  const options = {
    method: METHOD,
    headers: HEADERS,
    body: JSON.stringify(queryList.records)
  }
  const response = await fetch(`${process.env.GITHUB_API}`, options);
  if (!response.ok)
    throw new Error("fetch error response");
  const { data } = await response.json();
  const list: NavigationInfo[] = [
    { keyId: 'storages', label: '저장소', hasLink: true, childs: undefined },
    { 
      keyId: 'records',
      label: '기록소',
      hasLink: false, 
      childs: data.repository.object.entries.filter(
        (item: RecordsInfo) => item.type === 'tree'
      ).map((after: RecordsInfo) => {
        return {...after, hasLink: true}
      })
    }];
    return list;
})

interface StorageInfo {
  databaseId: number;
  name: string;
  description: string;
  url: string;
  openGraphImageUrl: string;
}

export const storageInfo = cache(async (): Promise<StorageInfo[]> => {
  const options = {
    method: METHOD,
    headers: HEADERS,
    body: JSON.stringify(queryList.storages)
  }
  const response = await fetch(`${process.env.GITHUB_API}`, options)
  if (!response.ok)
    throw new Error("fetch error response");
  const { data } = await response.json();
  return data.viewer.pinnedItems.nodes as StorageInfo[];
});

export const recordsList = cache(async (name: string): Promise<RecordsInfo[]> => {
  const options = {
    method: METHOD,
    headers: HEADERS,
    body: JSON.stringify(queryList.folders(name)),
  }
  const response = await fetch(`${process.env.GITHUB_API}`, options)
  if (!response.ok)
    throw new Error("fetch error response");
  const { data } = await response.json();
  const newData: RecordsInfo[] = data.repository.object.entries.map((item: RecordsInfo) => {
    if (item.type === 'tree')
      return {...item, hasLink: false};
    else if (item.type === 'blob')
      return {...item, hasLink: true};
  })
  return newData;
});

export const markdownText = cache(async (folder: string, file: string): Promise<string> => {
  const options = {
    method: METHOD,
    headers: HEADERS,
    body: JSON.stringify(queryList.markdown(folder, file)),
  }
  const response = await fetch(`${process.env.GITHUB_API}`, options)
  if (!response.ok)
    throw new Error("fetch error response");
  const { data } = await response.json();
  return data.repository.object.text;
})