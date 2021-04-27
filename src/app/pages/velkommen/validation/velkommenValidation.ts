export const validateHarForståttRettigheterOgPlikter = (value: boolean) => {
    let result;
    if (value !== true) {
        result = 'valideringsfeil.velkommen.harForståttRettigheterOgPlikter.påkrevd';
    }
    return result;
};
