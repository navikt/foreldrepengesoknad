import { BoIUtlandetFormData, initialBoIUtlandetFormData } from './boIUtlandetFormConfig';
import dayjs from 'dayjs';
import { BostedUtland } from 'app/types/BostedUtland';
import { getMinInputTilOgMedValue, hasValue } from 'app/utils/validationUtils';
import InformasjonOmUtenlandsopphold, {
    Utenlandsopphold,
    UtenlandsoppholdInput,
} from 'app/types/InformasjonOmUtenlandsopphold';

export const getUferdigBostedUtlandInput = (): UtenlandsoppholdInput => {
    return {
        fom: '',
        tom: '',
        land: '',
    };
};

const getErINorgePåFamiliehendelsedato = (
    familiehendelsedato: Date,
    tidligereOpphold: Utenlandsopphold[],
    senereOpphold: Utenlandsopphold[],
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

export const getInitialBostedIUtlandetFormData = (
    bostedIUtlandet: Utenlandsopphold[] | undefined,
): BoIUtlandetFormData => {
    if (bostedIUtlandet === undefined || bostedIUtlandet.length === 0) {
        return initialBoIUtlandetFormData;
    }
    const mappedOpphold = bostedIUtlandet.map((opphold) => {
        return {
            fom: opphold.tidsperiode.fom,
            tom: opphold.tidsperiode.tom,
            land: opphold.land,
        };
    });

    return { bostedIUtlandet: mappedOpphold };
};

export const mapBostedUtland = (
    formValues: Partial<BoIUtlandetFormData>,
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold,
    familiehendelsedato: Date,
    oppgirIFortid: boolean,
): InformasjonOmUtenlandsopphold => {
    const mappedUtenlandsopphold = formValues.bostedIUtlandet!.map((bosted) => {
        return {
            land: bosted.land,
            tidsperiode: {
                fom: bosted.fom,
                tom: bosted.tom,
            },
        };
    });

    const tidligereOpphold = oppgirIFortid ? mappedUtenlandsopphold : informasjonOmUtenlandsopphold.tidligereOpphold;
    const senereOpphold = oppgirIFortid ? informasjonOmUtenlandsopphold.senereOpphold : mappedUtenlandsopphold;
    const iNorgePåHendelsestidspunktet = getErINorgePåFamiliehendelsedato(
        familiehendelsedato,
        tidligereOpphold,
        senereOpphold,
    );
    if (oppgirIFortid) {
        return {
            ...informasjonOmUtenlandsopphold,
            tidligereOpphold: mappedUtenlandsopphold,
            iNorgePåHendelsestidspunktet: iNorgePåHendelsestidspunktet,
        };
    }
    return {
        ...informasjonOmUtenlandsopphold,
        senereOpphold: mappedUtenlandsopphold,
        iNorgePåHendelsestidspunktet: iNorgePåHendelsestidspunktet,
    };
};

export const getMinValueTomInput = (oppgirIFortid: boolean, fom: string | undefined, datobegrensning: Date) => {
    if (oppgirIFortid) {
        return fom && hasValue(fom) ? new Date(fom) : undefined;
    }
    return getMinInputTilOgMedValue(fom, datobegrensning);
};

export const getInitialOppholdFormData = (selectedOpphold: BostedUtland | undefined) => {
    if (selectedOpphold === undefined) {
        return { ...initialBoIUtlandetFormData };
    }
    return {
        ...initialBoIUtlandetFormData,
        fom: selectedOpphold.fom,
        tom: selectedOpphold.tom,
        land: selectedOpphold.landkode,
    };
};
