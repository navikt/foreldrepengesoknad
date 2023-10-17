import Environment from 'app/Environment';

export const redirect = (url: string) => {
    window.location.href = url;
};

export const redirectToLogin = () => {
    window.location.replace(Environment.LOGIN_URL + '?redirect=' + window.location.origin);
};
