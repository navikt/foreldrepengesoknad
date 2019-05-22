import Environment from '../../Environment';
import cookie from 'cookie';
import SHA256 from 'crypto-js/sha256';

export const redirectToLogin = () => {
    window.location.href = Environment.LOGIN_URL + '?redirect=' + window.location.origin;
};

const getCookieByName = (name: string) => {
    const cookies = cookie.parse(window.document.cookie);
    return cookies[name];
};

export const getAuthenticationCookieHash = (): string => {
    return SHA256(getCookieByName('selvbetjening-idtoken')).toString();
};
