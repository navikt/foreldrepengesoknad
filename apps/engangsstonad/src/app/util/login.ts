import Environment from 'app/Environment';

export const redirectToLogin = () => {
    redirect(Environment.LOGIN_URL + '?redirect=' + window.location.origin);
};

export const redirect = (url: string) => {
    window.location.href = url;
};
