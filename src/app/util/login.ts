export const redirectToLogin = () => {
    window.location.href =
        (window as any).LOGIN_URL + '?redirect=' + window.location.href;
};
