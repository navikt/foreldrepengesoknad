import { initialUtenlandsoppholdFormData, UtenlandsoppholdFormData } from './utenlandsoppholdFormTypes';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import InformasjonOmUtenlandsopphold, { Utenlandsopphold } from 'app/context/types/InformasjonOmUtenlandsopphold';
import { convertBooleanOrUndefinedToYesOrNo, convertYesOrNoOrUndefinedToBoolean } from 'app/utils/formUtils';
import { BostedUtland } from './bostedUtlandListAndDialog/types';

const mapUtenlandsoppholdTilBostedUtland = (opphold: Utenlandsopphold): BostedUtland => ({
    fom: opphold.tidsperiode.fom,
    tom: opphold.tidsperiode.tom!,
    landkode: opphold.land,
});

export const getInitialUtenlandsoppholdValuesFromState = (
    init: InformasjonOmUtenlandsopphold
): UtenlandsoppholdFormData => {
    return {
        ...initialUtenlandsoppholdFormData,
        harBoddUtenforNorgeSiste12Mnd: convertBooleanOrUndefinedToYesOrNo(init.iNorgeSiste12Mnd),
        skalBoUtenforNorgeNeste12Mnd: convertBooleanOrUndefinedToYesOrNo(init.iNorgeNeste12Mnd),
        utenlandsoppholdNeste12Mnd: init.senereOpphold.map(mapUtenlandsoppholdTilBostedUtland),
        utenlandsoppholdSiste12Mnd: init.tidligereOpphold.map(mapUtenlandsoppholdTilBostedUtland),
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
    formValues: Partial<UtenlandsoppholdFormData>
): InformasjonOmUtenlandsopphold => {
    const {
        harBoddUtenforNorgeSiste12Mnd,
        skalBoUtenforNorgeNeste12Mnd,
        utenlandsoppholdNeste12Mnd,
        utenlandsoppholdSiste12Mnd,
    } = formValues;

    return {
        iNorgeSiste12Mnd: convertYesOrNoOrUndefinedToBoolean(harBoddUtenforNorgeSiste12Mnd),
        iNorgeNeste12Mnd: convertYesOrNoOrUndefinedToBoolean(skalBoUtenforNorgeNeste12Mnd),
        senereOpphold:
            skalBoUtenforNorgeNeste12Mnd === YesOrNo.YES
                ? mapBostedUtlandToUtenlandsopphold(utenlandsoppholdNeste12Mnd!)
                : [],
        tidligereOpphold:
            harBoddUtenforNorgeSiste12Mnd === YesOrNo.YES
                ? mapBostedUtlandToUtenlandsopphold(utenlandsoppholdSiste12Mnd!)
                : [],
    };
};
