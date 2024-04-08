export const BASE_PATH = '/content';

export function replace(path: string) {
  window.location.replace(BASE_PATH + path);
}

export function getPathname() {
  return window.location.pathname.replace(BASE_PATH, '');
}

export function reload() {
  window.location.reload();
}

export function replaceState(pathname: string, searchParams: URLSearchParams) {
  window.history.replaceState({}, '', `${BASE_PATH}${pathname}?${searchParams}`);
}
