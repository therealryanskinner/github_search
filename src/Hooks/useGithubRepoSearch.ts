import { Octokit } from "octokit";
import {
  TAdvancedSearchOptions,
  TGithubRepo,
  TSearchType,
  useSearchStore,
} from "../Store/searchStore";

const octokit = new Octokit({});

type TSearchParams = Partial<TAdvancedSearchOptions> & {
  page?: number;
  searchType?: TSearchType;
  searchQuery?: string;
};

function getQuery(searchArgs: TSearchParams) {
  const paramData = {
    ...(searchArgs?.perPage?.value
      ? { per_page: String(searchArgs.perPage.value) }
      : {}),
    ...(searchArgs?.sort?.value ? { sort: searchArgs.sort.value } : {}),
    ...(searchArgs?.direction?.value
      ? { direction: searchArgs.direction.value }
      : {}),
    ...(searchArgs?.repoType?.value ? { type: searchArgs.repoType.value } : {}),
    ...(searchArgs.page ? { page: String(searchArgs.page) } : {}),
  };
  const params = new URLSearchParams(paramData);

  switch (searchArgs.searchType) {
    case "org":
      return {
        endpoint: `/orgs/${searchArgs.searchQuery}/repos?${params.toString()}`,
        body: { org: searchArgs.searchQuery },
      };
    case "user":
      return {
        endpoint: `/users/${searchArgs.searchQuery}/repos?${params.toString()}`,
        body: { username: searchArgs.searchQuery },
      };
    default:
      return {
        endpoint: `/users/${searchArgs.searchQuery}`,
        body: { username: searchArgs.searchQuery },
      };
  }
}

function getMaxPages(
  currMax: number,
  link?: string,
  nextPage?: number
): { totalPages: number } {
  // If we're already at the max page, return the current max
  if (nextPage && nextPage === currMax) return { totalPages: currMax };

  const pages = link?.split(",");
  if (!pages) return { totalPages: 0 };

  // Find the last page in the link header
  const last = pages.find((page) => page.includes('rel="last"'));
  const rawLastPage = last?.split(";")[0];

  const pageNumRegex = /[?&]page=(\d+)/;
  const lastPage = rawLastPage?.match(pageNumRegex);

  return { totalPages: Number(lastPage?.[1]) };
}

export function useGithubRepoSearch() {
  const {
    searchQuery,
    searchType,
    setRepos,
    setLoading,
    setPagination,
    maxPages,
    advancedSearchOptions,
  } = useSearchStore((state) => state);

  async function searchGithub(overrides?: TSearchParams) {
    const query = (overrides?.searchQuery || searchQuery).trim()

    if (!query) {
      setRepos([]);
      setPagination(0, 0);
      return;
    }

    const { endpoint, body } = getQuery({
      ...advancedSearchOptions,
      ...overrides,
      searchQuery: query,
      searchType: overrides?.searchType || searchType,
    });

    try {
      setLoading(true);

      const res = await octokit.request(`GET ${endpoint}`, {
        ...body,
      });

      const { totalPages } = getMaxPages(
        maxPages,
        res?.headers?.link,
        overrides?.page
      );

      const data = res.data as TGithubRepo[];

      setRepos(data);
      setPagination(totalPages, overrides?.page || 1);
    } catch (e) {
      console.error("Error fetching data from Github API: ", e);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  }

  return { searchGithub };
}
