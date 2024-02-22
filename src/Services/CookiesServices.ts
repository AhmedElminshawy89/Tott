import Cookies, { CookieSetOptions } from "universal-cookie";

const O_Cookie = new Cookies();

class CookieService {
  get<T>(name: string): T {
    return O_Cookie.get<T>(name);
  }
  set(name: string, value: unknown, options?: CookieSetOptions): void {
    O_Cookie.set(name, value, options);
  }
  remove(name: string): void {
    O_Cookie.remove(name);
  }
}

export default new CookieService();
