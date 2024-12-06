export const headers: HeadersInit = {
  Accept: "application/json",
};

export const next: NextFetchRequestConfig = {
  revalidate: 300, // 5m chache
};
