import InformasjonOmUtenlandsopphold from 'app/types/InformasjonOmUtenlandsopphold';
import { UtenlandsoppholdFormData, initialUtenlandsoppholdFormData } from './utenlandsoppholdFormTypes';
import {
    convertBooleanOrUndefinedToYesOrNo,
    convertYesOrNoOrUndefinedToBoolean,
} from '@navikt/fp-common/src/common/utils/formUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';

export const getInitialUtenlandsoppholdValuesFromState = (
    init: InformasjonOmUtenlandsopphold,
): UtenlandsoppholdFormData => {
    return {
        ...initialUtenlandsoppholdFormData,
        harBoddINorgeSiste12Mnd: convertBooleanOrUndefinedToYesOrNo(init.iNorgeSiste12Mnd),
        skalBoINorgeNeste12Mnd: convertBooleanOrUndefinedToYesOrNo(init.iNorgeNeste12Mnd),
    };
};

export const mapUtenlandsoppholdFormDataToState = (
    formValues: Partial<UtenlandsoppholdFormData>,
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold,
): InformasjonOmUtenlandsopphold => {
    const { harBoddINorgeSiste12Mnd, skalBoINorgeNeste12Mnd } = formValues;
    const oppdaterteTidligereOpphold =
        harBoddINorgeSiste12Mnd === YesOrNo.YES ? [] : informasjonOmUtenlandsopphold.tidligereOpphold;
    const oppdaterteSenereOpphold =
        skalBoINorgeNeste12Mnd === YesOrNo.YES ? [] : informasjonOmUtenlandsopphold.senereOpphold;
    const iNorgePåHendelsestidspunktet =
        harBoddINorgeSiste12Mnd === YesOrNo.YES && skalBoINorgeNeste12Mnd === YesOrNo.YES;

    return {
        ...informasjonOmUtenlandsopphold,
        iNorgeSiste12Mnd: convertYesOrNoOrUndefinedToBoolean(harBoddINorgeSiste12Mnd)!,
        iNorgeNeste12Mnd: convertYesOrNoOrUndefinedToBoolean(skalBoINorgeNeste12Mnd)!,
        tidligereOpphold: oppdaterteTidligereOpphold,
        senereOpphold: oppdaterteSenereOpphold,
        iNorgePåHendelsestidspunktet: iNorgePåHendelsestidspunktet,
    };
};
