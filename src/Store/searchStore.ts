import { create } from "zustand";

export type TGithubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  created_at: string;
  updated_at: string;
};

export type TSortType = "full_name" | "created" | "updated" | "pushed";
export type TSortDirection = "asc" | "desc";
export type TRepoType =
  | "all"
  | "public"
  | "owner"
  | "private"
  | "forks"
  | "sources"
  | "member";
export type TSearchType = "org" | "user";

export type TAdvancedSearchOptions = {
  perPage: { name: string; value: number };
  sort: { name: string; value: TSortType };
  direction: { name: string; value: TSortDirection };
  repoType: { name: string; value: TRepoType };
};

interface ISearchState {
  loading: boolean;
  notFound?: boolean;
  repos: TGithubRepo[];
  maxPages: number;
  currentPage: number;
  searchQuery: string;
  searchType: TSearchType;
  advancedSearchOpen: boolean;
  advancedSearchOptions: TAdvancedSearchOptions;
  setSearchQuery: (searchQuery: string) => void;
  setLoading: (loading: boolean) => void;
  setRepos: (repos: TGithubRepo[]) => void;
  setPagination: (maxPages: number, currentPage: number) => void;
  setSearchType: (searchType: TSearchType) => void;
  setAdvancedSearchOpen: (advancedSearchOpen: boolean) => void;
  setAdvancedSearchOptions: (advancedSearchOptions: TAdvancedSearchOptions) => void;
  resetAdvancedSearch: () => void; 
}

const defaultAdvancedSearchOptions: TAdvancedSearchOptions = {
  perPage: { name: "Results per page", value: 10 },
  sort: { name: "Sort order", value: "full_name" },
  direction: { name: "Direction", value: "asc" },
  repoType: { name: "Repository type", value: "all" },
}

export const useSearchStore = create<ISearchState>()((set) => ({
  loading: false,
  repos: [],
  maxPages: 0,
  currentPage: 0,
  searchQuery: "",
  searchType: "org",
  advancedSearchOpen: false,
  advancedSearchOptions: defaultAdvancedSearchOptions,
  setSearchQuery: (searchQuery: string) => set({ searchQuery }),
  setLoading: (loading: boolean) => set({ loading }),
  setRepos: (repos: TGithubRepo[]) => set({ repos }),
  setPagination: (maxPages: number, currentPage: number) => set({ maxPages, currentPage }),
  setSearchType: (searchType: TSearchType) => set({ searchType }),
  setAdvancedSearchOpen: (advancedSearchOpen: boolean) => set({ advancedSearchOpen }),
  setAdvancedSearchOptions: (advancedSearchOptions: TAdvancedSearchOptions) => set({ advancedSearchOptions }), 
  resetAdvancedSearch: () => set({ advancedSearchOptions: defaultAdvancedSearchOptions }),
}));
