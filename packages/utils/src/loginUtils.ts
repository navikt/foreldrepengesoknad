export const redirect = (url: string) => {
    window.location.href = url;
};

export const redirectToLogin = (loginUrl: string) => {
    redirect(loginUrl + '?redirect=' + window.location.origin);
};
