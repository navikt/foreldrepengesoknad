import EnvUrls from '../../app/EnvUrls';

export const redirectToLogin = () => {
    window.location.href =
        EnvUrls.LOGIN_URL + '?redirect=' + window.location.href;
};
