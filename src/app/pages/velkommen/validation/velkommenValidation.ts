export const validateHarForståttRettigheterOgPlikter = (value: boolean) => {
    if (value !== true) {
        return 'valideringsfeil.velkommen.harForståttRettigheterOgPlikter.påkrevd';
    }

    return undefined;
};
