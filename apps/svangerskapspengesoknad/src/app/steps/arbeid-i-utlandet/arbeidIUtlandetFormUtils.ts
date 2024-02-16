import { ArbeidIUtlandet, ArbeidIUtlandetInput } from 'app/types/ArbeidIUtlandet';

export const getUferdigArbeidIUtlandetInput = (): ArbeidIUtlandetInput => {
    return {
        fom: '',
        tom: '',
        pågående: undefined!,
        arbeidsgiverNavn: '',
        land: '',
    };
};

export const initialArbeidIUtlandetFormValues: ArbeidIUtlandet = {
    arbeidIUtlandet: [getUferdigArbeidIUtlandetInput()],
};

export const getInitialArbeidIUtlandetFormData = (arbeidIUtlandet: ArbeidIUtlandet | undefined): ArbeidIUtlandet => {
    if (arbeidIUtlandet === undefined || arbeidIUtlandet.arbeidIUtlandet.length === 0) {
        return initialArbeidIUtlandetFormValues;
    }
    const mappedArbeid = arbeidIUtlandet.arbeidIUtlandet.map((arbeid) => {
        return {
            fom: arbeid.fom,
            tom: arbeid.tom,
            pågående: arbeid.pågående,
            arbeidsgiverNavn: arbeid.arbeidsgiverNavn,
            land: arbeid.land,
        };
    });
    return { arbeidIUtlandet: mappedArbeid };
};

export const cleanUpArbeidIUtlandetFormData = (values: ArbeidIUtlandet): ArbeidIUtlandet => {
    const cleanedArbeidIUtlandet = values.arbeidIUtlandet.map((arbeid) => {
        return {
            ...arbeid,
            tom: arbeid.pågående === false ? arbeid.tom : getUferdigArbeidIUtlandetInput().tom,
        };
    });
    const cleanedData: ArbeidIUtlandet = { arbeidIUtlandet: cleanedArbeidIUtlandet };
    return cleanedData;
};
