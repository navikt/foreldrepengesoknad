enum AdopsjonStartdatoValg {
    ANKOMST = 'ankomst',
    OMSORGSOVERTAKELSE = 'omsorgsovertakelse',
    ANNEN = 'annen',
}

export const finnEnum = (valg?: string): AdopsjonStartdatoValg | undefined => {
    if (valg === AdopsjonStartdatoValg.ANKOMST) {
        return AdopsjonStartdatoValg.ANKOMST;
    }
    if (valg === AdopsjonStartdatoValg.OMSORGSOVERTAKELSE) {
        return AdopsjonStartdatoValg.OMSORGSOVERTAKELSE;
    }
    if (valg === AdopsjonStartdatoValg.ANNEN) {
        return AdopsjonStartdatoValg.ANNEN;
    }
    return undefined;
};

export default AdopsjonStartdatoValg;
