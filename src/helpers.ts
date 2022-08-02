import {IApiListQueryResponse} from '@spinamp/spinamp-sdk';

export const flattenPaginatedItems = <ListItem>(
  pages?: IApiListQueryResponse<ListItem>[],
): ListItem[] => {
  if (!pages) {
    return [];
  }

  return pages.reduce<ListItem[]>(
    (result, page) => [...result, ...page.items],
    [],
  );
};

export const getPaginatedTotalCount = (
  pages?: IApiListQueryResponse<unknown>[],
): number | null => {
  if (!pages) {
    return null;
  }

  return pages[pages.length - 1].totalCount;
};
