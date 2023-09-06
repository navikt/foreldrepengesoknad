import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { BostedUtland } from 'app/types/BostedUtland';
import InformasjonOmUtenlandsopphold, { Utenlandsopphold } from 'app/types/InformasjonOmUtenlandsopphold';
import { UtenlandsoppholdFormData, initialUtenlandsoppholdFormData } from './utenlandsoppholdFormTypes';
import {
    convertBooleanOrUndefinedToYesOrNo,
    convertYesOrNoOrUndefinedToBoolean,
} from '@navikt/fp-common/src/common/utils/formUtils';
import dayjs from 'dayjs';

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

const getErINorgePåFamiliehendelsedato = (
    familiehendelsedato: Date,
    tidligereOpphold: Utenlandsopphold[],
    senereOpphold: Utenlandsopphold[]
): boolean => {
    let erINorge = true;

    tidligereOpphold.forEach((tidOpphold) => {
        if (dayjs(familiehendelsedato).isBetween(tidOpphold.tidsperiode.fom, tidOpphold.tidsperiode.tom, 'day', '[]')) {
            erINorge = false;
        }
    });

    senereOpphold.forEach((senOpphold) => {
        if (dayjs(familiehendelsedato).isBetween(senOpphold.tidsperiode.fom, senOpphold.tidsperiode.tom, 'day', '[]')) {
            erINorge = false;
        }
    });

    return erINorge;
};

export const mapUtenlandsoppholdFormDataToState = (
    formValues: Partial<UtenlandsoppholdFormData>,
    utenlandsoppholdNeste12Mnd: BostedUtland[],
    utenlandsoppholdSiste12Mnd: BostedUtland[],
    familiehendelsedato: Date
): InformasjonOmUtenlandsopphold => {
    const { harBoddINorgeSiste12Mnd, skalBoINorgeNeste12Mnd } = formValues;

    const tidligereOpphold =
        harBoddINorgeSiste12Mnd === YesOrNo.NO ? mapBostedUtlandToUtenlandsopphold(utenlandsoppholdSiste12Mnd!) : [];
    const senereOpphold =
        skalBoINorgeNeste12Mnd === YesOrNo.NO ? mapBostedUtlandToUtenlandsopphold(utenlandsoppholdNeste12Mnd!) : [];

    return {
        iNorgeSiste12Mnd: convertYesOrNoOrUndefinedToBoolean(harBoddINorgeSiste12Mnd)!,
        iNorgeNeste12Mnd: convertYesOrNoOrUndefinedToBoolean(skalBoINorgeNeste12Mnd)!,
        senereOpphold,
        tidligereOpphold,
        jobbetINorgeSiste12Mnd: true, //TODO - what does this do?
        iNorgePåHendelsestidspunktet: getErINorgePåFamiliehendelsedato(
            familiehendelsedato,
            tidligereOpphold,
            senereOpphold
        ),
    };
};
