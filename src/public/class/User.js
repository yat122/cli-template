import Cookies from "js-cookie";

const TOKEN_KEY = "xx.com.token";

export const LoginType = {
    Temporary: 0, //临时
    Persistence: 1, //持久化
};

const LoginTimeMap = {
    [LoginType.Temporary]: undefined, //关闭浏览器清除
    [LoginType.Persistence]: 7, //七天后移除
};

export default class User {
    static login({ token, loginType = LoginType.Temporary }) {
        Cookies.set(TOKEN_KEY, token, { expires: LoginTimeMap[loginType] });
    }

    static logOut() {
        Cookies.remove(TOKEN_KEY);
    }

    static isLogin() {
        return !!Cookies.get(TOKEN_KEY);
    }

    static getToken() {
        return Cookies.get(TOKEN_KEY);
    }
}
