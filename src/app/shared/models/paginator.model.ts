
export interface Paginator {
  offset: number;
  page: number;
  itemPerPage: number;
  sort: string;
  search: string;
  count: number;
  len: number;
}
