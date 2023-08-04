import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { BostedUtland } from 'app/types/BostedUtland';
import InformasjonOmUtenlandsopphold, { Utenlandsopphold } from 'app/types/InformasjonOmUtenlandsopphold';
import { UtenlandsoppholdFormData, initialUtenlandsoppholdFormData } from './utenlandsoppholdFormTypes';
import {
    convertBooleanOrUndefinedToYesOrNo,
    convertYesOrNoOrUndefinedToBoolean,
} from '@navikt/fp-common/src/common/utils/formUtils';

export const getInitialUtenlandsoppholdValuesFromState = (
    init: InformasjonOmUtenlandsopphold
): UtenlandsoppholdFormData => {
    return {
        ...initialUtenlandsoppholdFormData,
        harBoddINorgeSiste12Mnd: convertBooleanOrUndefinedToYesOrNo(init.iNorgeSiste12Mnd),
        skalBoINorgeNeste12Mnd: convertBooleanOrUndefinedToYesOrNo(init.iNorgeNeste12Mnd),
    };
};

const mapBostedUtlandToUtenlandsopphold = (bostedUtland: BostedUtland[]): Utenlandsopphold[] => {
    return bostedUtland.map((bosted) => ({
        land: bosted.landkode,
        tidsperiode: {
            fom: bosted.fom,
            tom: bosted.tom,
        },
    }));
};

export const mapUtenlandsoppholdFormDataToState = (
    formValues: Partial<UtenlandsoppholdFormData>,
    utenlandsoppholdNeste12Mnd: BostedUtland[],
    utenlandsoppholdSiste12Mnd: BostedUtland[]
): InformasjonOmUtenlandsopphold => {
    const { harBoddINorgeSiste12Mnd, skalBoINorgeNeste12Mnd } = formValues;

    return {
        iNorgeSiste12Mnd: convertYesOrNoOrUndefinedToBoolean(harBoddINorgeSiste12Mnd)!,
        iNorgeNeste12Mnd: convertYesOrNoOrUndefinedToBoolean(skalBoINorgeNeste12Mnd)!,
        senereOpphold:
            skalBoINorgeNeste12Mnd === YesOrNo.NO ? mapBostedUtlandToUtenlandsopphold(utenlandsoppholdNeste12Mnd!) : [],
        tidligereOpphold:
            harBoddINorgeSiste12Mnd === YesOrNo.NO
                ? mapBostedUtlandToUtenlandsopphold(utenlandsoppholdSiste12Mnd!)
                : [],
        jobbetINorgeSiste12Mnd: true, //TODO - what does this do?
        iNorgePåHendelsestidspunktet: true, //TODO - what does this do?
    };
};
