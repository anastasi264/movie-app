export type SearchParams = {
  [key: string]: string | number | string[] | null,
};

export function getSearchWith(
  currentParams: URLSearchParams,
  paramsToUpdate: SearchParams, // it's our custom type
): string {
  const newParams = new URLSearchParams(
    currentParams.toString(),
  );

  Object.entries(paramsToUpdate)
    .forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else if (Array.isArray(value)) {
        // we delete the key to remove old values
        newParams.delete(key);

        value.forEach(part => {
          newParams.append(key, part);
        });
      } else {
        newParams.set(key, value.toString());
      }
    });

  return newParams.toString();
}
