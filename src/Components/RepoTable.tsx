import { Button, Table } from "@radix-ui/themes";
import EmptyResults from "./EmptyResults";
import TableLoading from "./TableLoading";
import Pagination from "./Pagination";
import { useSearchStore } from "../Store/searchStore";
import moment from 'moment'

export default function RepoTable() {
  const repos = useSearchStore((state) => state.repos);
  const loading = useSearchStore((state) => state.loading);

  if (loading) {
    return <TableLoading />;
  }

  if (!repos.length) {
    return <EmptyResults />;
  }

  return (
    <>
      <Table.Root variant="surface" layout="fixed">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Updated</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {repos.map((repo) => (
            <Table.Row key={repo.id}>
              <Table.RowHeaderCell>
                <Button variant="ghost" onClick={() => window.open(repo.html_url)}>
                  {repo.name}
                </Button>
              </Table.RowHeaderCell>
              <Table.Cell>{moment(repo.created_at).format("MM/DD/YYYY hh:mm A")}</Table.Cell>
              <Table.Cell>{moment(repo.updated_at).format("MM/DD/YYYY hh:mm A")}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination />
    </>
  );
}
