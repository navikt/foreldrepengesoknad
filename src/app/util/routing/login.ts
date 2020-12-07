import Environment from '../../Environment';

export const redirectToLogin = () => {
    if ((Environment.LOGIN_URL as string).includes('loginservice-q')) {
        window.location.href = Environment.LOGIN_URL + '?level=Level3&redirect=' + window.location.origin;
    } else {
        window.location.href = Environment.LOGIN_URL + '?redirect=' + window.location.origin;
    }
};
