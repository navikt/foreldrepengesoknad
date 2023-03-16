
export const redirectToLogin = () => {
    redirect((window as any).LOGIN_URL + '?redirect=' + window.location.origin);
};

export const redirect = (url: string) => {
    window.location.href = url;
};
