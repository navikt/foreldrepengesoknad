import Environment from 'app/Environment';

export const redirectToLogin = () => {
    window.location.replace(Environment.LOGIN_URL + '?redirect=' + window.location.origin);
};
