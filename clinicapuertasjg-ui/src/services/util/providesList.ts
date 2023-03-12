import { ID_LIST } from '../../constants/users';

export function providesList<R extends { id: string | number }[], T extends string>(
  resultsWithIds: R | undefined,
  tagType: T,
) {
  return resultsWithIds
    ? [{ type: tagType, id: ID_LIST }, ...resultsWithIds.map(({ id }) => ({ type: tagType, id }))]
    : [{ type: tagType, id: ID_LIST }];
}
