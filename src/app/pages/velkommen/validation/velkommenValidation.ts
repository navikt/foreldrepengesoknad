export const validateHarForståttRettigheterOgPlikter = (value: boolean) => {
    let result;
    if (value !== true) {
        result = 'påkrevd';
    }
    return result;
};
