import Environment from 'app/Environment';

export const redirectToLogin = () => {
    window.location.href = Environment.LOGIN_URL + '?redirect=' + window.location.origin;
};
