import Environment from '../../Environment';

export const redirectToLogin = () => {
    window.location.href = Environment.LOGIN_URL + '?redirect=' + window.location.origin;
};
