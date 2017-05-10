
export interface ApplicationListState {
  filters: {
    statuses: { [key: string]: boolean };
    sortBy: string;
    sortDirection: string;
  };
};
