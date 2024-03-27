import {
  Box,
  Button,
  Dialog,
  Flex,
  Select,
  Text,
  TextField,
  Tooltip,
} from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGithubRepoSearch } from "../Hooks/useGithubRepoSearch";
import {
  TRepoType,
  TSearchType,
  TSortDirection,
  TSortType,
  useSearchStore,
} from "../Store/searchStore";
import { useEffect, useMemo } from "react";

type TAdvancedSearch = {
  page: number;
  perPage: number;
  sort: TSortType;
  direction: TSortDirection;
  repoType: TRepoType;
  searchType: TSearchType;
};

const schema = Yup.object().shape({
  searchType: Yup.string().oneOf(["org", "user"]).required(),
  page: Yup.number().min(1).required(),
  perPage: Yup.number().min(1).max(100).required(),
  sort: Yup.string()
    .oneOf(["full_name", "created", "updated", "pushed"])
    .required(),
  direction: Yup.string().oneOf(["asc", "desc"]).required(),
  repoType: Yup.string()
    .oneOf(["all", "public", "owner", "private", "forks", "sources", "member"])
    .required(),
});

const defaultValues: TAdvancedSearch = {
  page: 1,
  perPage: 10,
  sort: "full_name",
  direction: "asc",
  repoType: "all",
  searchType: "org",
};

export default function AdvancedSearchDialog() {
  const isOpen = useSearchStore((state) => state.advancedSearchOpen);
  const options = useSearchStore((state) => state.advancedSearchOptions);
  const setSearchType = useSearchStore((state) => state.setSearchType);
  const setAdvancedSearchOptions = useSearchStore(
    (state) => state.setAdvancedSearchOptions
  );
  const setAdvancedSearchOpen = useSearchStore(
    (state) => state.setAdvancedSearchOpen
  );

  const { searchGithub } = useGithubRepoSearch();

  const {
    setValue,
    watch,
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });

  async function onSubmit(data: TAdvancedSearch) {
    const commonData = {
      perPage: { ...options.perPage, value: data.perPage },
      sort: { ...options.sort, value: data.sort },
      direction: { ...options.direction, value: data.direction },
      repoType: { ...options.repoType, value: data.repoType },
    };

    await searchGithub({
      ...commonData,
      searchType: data.searchType,
      page: data.page,
    });

    setSearchType(data.searchType);
    setAdvancedSearchOptions(commonData);
  }

  const searchType = watch("searchType");

  useEffect(() => {
    setValue("repoType", "all");
  }, [searchType, setValue]);

  const repoTypeOptions = useMemo(() => {
    if (searchType === "org") {
      return [
        "all",
        "public",
        "private",
        "forks",
        "sources",
        "member",
      ] as TRepoType[];
    }

    return ["all", "owner", "member"] as TRepoType[];
  }, [searchType]);

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => setAdvancedSearchOpen(open)}
    >
      <Dialog.Content maxWidth="450px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Dialog.Title>Advanced search</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Update your search options to find the perfect match.
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Search by
              </Text>
              <Controller
                name="searchType"
                control={control}
                render={({ field }) => (
                  <Select.Root
                    defaultValue="org"
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <Select.Trigger />
                    <Select.Content>
                      <Select.Group>
                        <Select.Item value="org">Organization</Select.Item>
                        <Select.Item value="user">Username</Select.Item>
                      </Select.Group>
                    </Select.Content>
                  </Select.Root>
                )}
              />
            </label>
            <label>
              <Flex>
                <Text as="div" size="2" mb="1" weight="bold">
                  Repository type
                </Text>
                <Box ml="2">
                  <Tooltip content="Options may change based off of search type">
                    <InfoCircledIcon />
                  </Tooltip>
                </Box>
              </Flex>
              <Controller
                name="repoType"
                control={control}
                render={({ field }) => (
                  <Select.Root
                    defaultValue="all"
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <Select.Trigger />
                    <Select.Content>
                      <Select.Group>
                        {repoTypeOptions.map((type) => (
                          <Select.Item key={type} value={type}>
                            {type}
                          </Select.Item>
                        ))}
                      </Select.Group>
                    </Select.Content>
                  </Select.Root>
                )}
              />
            </label>
            <label>
              <Flex>
                <Text as="div" size="2" mb="1" weight="bold">
                  Results per page
                </Text>
                <Box ml="2">
                  <Tooltip content="Max 100">
                    <InfoCircledIcon />
                  </Tooltip>
                </Box>
              </Flex>
              <Box width="50px">
                <Controller
                  name="perPage"
                  control={control}
                  render={({ field }) => (
                    <TextField.Root
                      type="number"
                      min={1}
                      max={100}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  )}
                />
              </Box>
            </label>
            <label>
              <Flex>
                <Text as="div" size="2" mb="1" weight="bold">
                  Start page
                </Text>
              </Flex>
              <Box width="50px">
                <Controller
                  name="page"
                  control={control}
                  render={({ field }) => (
                    <TextField.Root
                      type="number"
                      min={1}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  )}
                />
              </Box>
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Sort by
              </Text>
              <Controller
                name="sort"
                control={control}
                render={({ field }) => (
                  <Select.Root
                    defaultValue="full_name"
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <Select.Trigger />
                    <Select.Content>
                      <Select.Group>
                        <Select.Item value="full_name">
                          Repository name
                        </Select.Item>
                        <Select.Item value="created">Created date</Select.Item>
                        <Select.Item value="updated">Updated date</Select.Item>
                        <Select.Item value="pushed">Pushed date</Select.Item>
                      </Select.Group>
                    </Select.Content>
                  </Select.Root>
                )}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Direction
              </Text>
              <Controller
                name="direction"
                control={control}
                render={({ field }) => (
                  <Select.Root
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <Select.Trigger />
                    <Select.Content>
                      <Select.Group>
                        <Select.Item value="asc">Ascending</Select.Item>
                        <Select.Item value="desc">Descending</Select.Item>
                      </Select.Group>
                    </Select.Content>
                  </Select.Root>
                )}
              />
            </label>
          </Flex>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button
                type="submit"
                variant="classic"
                disabled={!isValid}
              >
                Save
              </Button>
            </Dialog.Close>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
