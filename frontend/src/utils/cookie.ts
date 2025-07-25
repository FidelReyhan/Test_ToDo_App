import Cookies, { type CookieSetOptions } from "universal-cookie";

const cookies = new Cookies(null, { path: "/" });

function getCookie(name: string): string | undefined {
  return cookies.get(name);
}

function setCookie(
  name: string,
  value: string,
  options?: CookieSetOptions
): void {
  cookies.set(name, value, options);
}

function removeCookie(name: string, options?: CookieSetOptions): void {
  cookies.remove(name, options);
}

export { getCookie, removeCookie, setCookie };
