import { cache } from 'react'
import { METHOD, HEADERS, queryList } from './queryList'

interface TotalContribution {
  totalPinStorages: number
  totalContributions: number
}

interface TotalQuery {
  data: {
    viewer: {
      pinnedItems: {
        totalCount: number
      }
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number
        }
      }
    }
  }
}

export const totalCountInfo = cache(
  async (): Promise<TotalContribution | null> => {
    const options = {
      method: METHOD,
      headers: HEADERS,
      body: JSON.stringify(queryList.total),
    }
    const response = await fetch(`${process.env.GITHUB_API}`, options)
    if (!response.ok) throw new Error('fetch error response')
    const { data } = (await response.json()) as TotalQuery
    return {
      totalPinStorages: data?.viewer?.pinnedItems?.totalCount,
      totalContributions:
        data?.viewer?.contributionsCollection?.contributionCalendar
          ?.totalContributions,
    }
  },
)

interface RecordsInfo {
  path: string;
  oid: string
  name: string
  nameRaw: string
  type: string
  hasLink: boolean
}

interface NavigationInfo {
  keyId: string
  label: string
  hasLink: boolean
  childs?: RecordsInfo[]
}

interface RecordsQuery {
  data: {
    repository: {
      object: {
        entries: RecordsInfo[]
      }
    }
  }
}

export const headerList = cache(
  async (): Promise<NavigationInfo[]> => {
    const options = {
      method: METHOD,
      headers: HEADERS,
      body: JSON.stringify(queryList.linkLists('tree', '')),
    }
    const response = await fetch(`${process.env.GITHUB_API}`, options)
    if (!response.ok) throw new Error('fetch error response')
    const { data } = (await response.json()) as RecordsQuery
    const list: NavigationInfo[] = [
      { keyId: 'storages', label: '저장소', hasLink: true, childs: undefined },
      {
        keyId: 'records',
        label: '기록소',
        hasLink: false,
        childs: data?.repository?.object?.entries
          ?.filter((item: RecordsInfo) => item.type === 'tree')
          .map((after: RecordsInfo) => {
            return { ...after, hasLink: true }
          }),
      },
    ]
    return list
  },
)

interface StorageInfo {
  databaseId: number
  name: string
  description: string
  url: string
  openGraphImageUrl: string
}

interface StorageQuery {
  data: {
    viewer: {
      pinnedItems: {
        nodes: StorageInfo[]
      }
    }
  }
}

export const storageInfo = cache(
  async (): Promise<StorageInfo[] | null> => {
    const options = {
      method: METHOD,
      headers: HEADERS,
      body: JSON.stringify(queryList.storages),
    }
    const response = await fetch(`${process.env.GITHUB_API}`, options)
    if (!response.ok) throw new Error('fetch error response')
    const { data } = (await response.json()) as StorageQuery
    return data?.viewer?.pinnedItems?.nodes
  },
)

export const recordsList = cache(
  async (paths?: string): Promise<RecordsInfo[] | null> => {
    if (!paths) return null
    const options = {
      method: METHOD,
      headers: HEADERS,
      body: JSON.stringify(queryList.linkLists('tree', paths)),
    }
    const response = await fetch(`${process.env.GITHUB_API}`, options)
    if (!response.ok) throw new Error('fetch error response')
    const { data } = (await response.json()) as RecordsQuery
    const newData: RecordsInfo[] = data?.repository?.object?.entries?.map(
      (item: RecordsInfo) => {
        if (item.type === 'tree') return { ...item, hasLink: false }
        else return { ...item, hasLink: true }
      },
    )
    return newData.sort((beforObj, afterObj) => {
      if (beforObj.type === 'tree' && afterObj.type !== 'tree') {
        return -1;
      }
      if (beforObj.type !== 'tree' && afterObj.type === 'tree') {
        return 1;
      }
      else {
        return 0;
      }
    })
  },
)

interface MarkdownQuery {
  data: {
    repository: {
      object: {
        text: string
      }
    }
  }
}

export const markdownText = cache(
  async (paths?: string): Promise<string | null> => {
    if (!paths) return null
    const options = {
      method: METHOD,
      headers: HEADERS,
      body: JSON.stringify(queryList.linkLists('blob', paths)),
    }
    const response = await fetch(`${process.env.GITHUB_API}`, options)
    if (!response.ok) throw new Error('fetch error response')
    const { data } = (await response.json()) as MarkdownQuery
    return data?.repository?.object?.text
  },
)

export const convertUtfToBase64 = (types: 'utf8' | 'base64', str: string) => {
  return types === 'utf8'
  ? Buffer.from(str, 'base64').toString('utf-8')
  : Buffer.from(str, 'utf-8').toString('base64')
}