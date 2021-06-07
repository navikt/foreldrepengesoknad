export const validateHarGodkjentOppsummering = (value: boolean) => {
    if (value !== true) {
        return 'valideringsfeil.oppsummering.harGodkjentOppsummering.påkrevd';
    }

    return undefined;
};
