import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { IntlShape } from 'react-intl';

import { Barn, isFødtBarn, isIkkeUtfyltTypeBarn, isUfødtBarn } from '@navikt/fp-common';
import { DDMMMMYYY_DATE_FORMAT, ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { BarnDto_fpoversikt } from '@navikt/fp-types';

import { ISOStringToDate } from './dateUtils';

dayjs.extend(utc);

export const getFamiliehendelsedato = (barn: Barn): string => {
    if (isFødtBarn(barn) || isIkkeUtfyltTypeBarn(barn)) {
        return barn.fødselsdatoer[0];
    }
    if (isUfødtBarn(barn)) {
        return barn.termindato;
    }

    return barn.adopsjonsdato;
};

export const getFamiliehendelsedatoDate = (barn: Barn): Date => {
    const familiehendelse = getFamiliehendelsedato(barn);
    return ISOStringToDate(familiehendelse)!;
};

type DateType = string | Date | undefined;

const barnFødselsdatoLikSakFødselsdato = (fødselsdatoer: string[] | undefined, regBarnFødselsdato: DateType) => {
    return fødselsdatoer !== undefined && regBarnFødselsdato !== undefined
        ? fødselsdatoer.some((fødselsdato) => dayjs(fødselsdato).isSame(regBarnFødselsdato))
        : false;
};

export const getRegistrerteBarnOmDeFinnes = (
    barn: Barn,
    registrerteBarn: BarnDto_fpoversikt[],
): BarnDto_fpoversikt[] | undefined => {
    return registrerteBarn.length > 0 && !isUfødtBarn(barn)
        ? registrerteBarn.filter(
              (regBarn) =>
                  barn.fnr?.includes(regBarn.fnr) ||
                  barnFødselsdatoLikSakFødselsdato(barn.fødselsdatoer, regBarn.fødselsdato),
          )
        : undefined;
};

export const getTermindato = (barn: Barn): string | undefined => {
    return isFødtBarn(barn) || isUfødtBarn(barn) ? barn.termindato : undefined;
};

export const getFødselsdato = (barn: Barn): string | undefined => {
    return isFødtBarn(barn) ? barn.fødselsdatoer[0] : undefined;
};

export const getDødeBarnetForMerEnn3MånederSiden = (registrerteBarn: BarnDto_fpoversikt) => {
    const dato3MånederTilbake = dayjs(new Date()).subtract(3, 'month');
    return (
        registrerteBarn.dødsdato !== undefined &&
        dayjs.utc(registrerteBarn.dødsdato).isBefore(dato3MånederTilbake, 'day')
    );
};

export const getTekstForAntallBarn = (antallBarn: number, intl: IntlShape): string => {
    if (antallBarn === 1) {
        return intl.formatMessage({ id: 'barn' });
    } else if (antallBarn === 2) {
        return intl.formatMessage({ id: 'tvillinger' });
    } else if (antallBarn === 3) {
        return intl.formatMessage({ id: 'trillinger' });
    }
    return intl.formatMessage({ id: 'flerlinger' });
};

export const getLeverBarnet = (barn: BarnDto_fpoversikt) => {
    return !barn.dødsdato;
};

export const getAndreBarnFødtSammenMedBarnet = (
    barnFnr: string | undefined,
    barnFødselsdato: string,
    registrerteBarn: BarnDto_fpoversikt[],
) => {
    const dagenFørFødsel = dayjs.utc(barnFødselsdato).subtract(1, 'day');
    const dagenEtterFødsel = dayjs.utc(barnFødselsdato).add(1, 'day');
    return registrerteBarn.filter(
        (b) =>
            b.fnr !== barnFnr &&
            dayjs.utc(b.fødselsdato).isSameOrAfter(dagenFørFødsel, 'day') &&
            dayjs.utc(b.fødselsdato).isSameOrBefore(dagenEtterFødsel, 'day'),
    );
};

export const getTittelBarnNårNavnSkalIkkeVises = (
    omsorgsovertagelsesdato: Date | undefined,
    fødselsdatoer: string[] | Date[] | undefined,
    antallBarn: number,
    intl: IntlShape,
): string => {
    if (omsorgsovertagelsesdato) {
        return intl.formatMessage(
            { id: 'velkommen.barnVelger.adoptertBarn' },
            {
                adopsjonsdato: dayjs(omsorgsovertagelsesdato).format(DDMMMMYYY_DATE_FORMAT),
            },
        );
    } else {
        const fødselsdatoTekst = formaterFødselsdatoerPåBarn(fødselsdatoer);
        const barnTekst = getTekstForAntallBarn(antallBarn, intl);

        return fødselsdatoer !== undefined && fødselsdatoer.length > 0
            ? intl.formatMessage(
                  { id: 'velkommen.barnVelger.fødtBarn.barn' },
                  {
                      barnTekst,
                      fødselsdato: fødselsdatoTekst,
                  },
              )
            : '';
    }
};

export const formaterNavnPåBarn = (
    fornavn: string[] | undefined,
    fødselsdatoer: string[] | Date[] | undefined,
    omsorgsovertagelsesdato: Date | undefined,
    alleBarnaLever: boolean,
    antallBarn: number,
    intl: IntlShape,
): string => {
    if (fornavn === undefined || fornavn.length === 0 || !alleBarnaLever) {
        return getTittelBarnNårNavnSkalIkkeVises(omsorgsovertagelsesdato, fødselsdatoer, antallBarn, intl);
    }

    if (fornavn.length > 1) {
        const fornavnene = fornavn.slice(0, -1).join(', ');
        const sisteFornavn = fornavn.at(-1);
        return `${fornavnene} og ${sisteFornavn}`;
    }
    return `${fornavn[0]}`;
};

export const formaterFødselsdatoerPåBarn = (fødselsdatoer: string[] | Date[] | undefined): string | undefined => {
    if (fødselsdatoer === undefined) {
        return undefined;
    }
    const unikeFødselsdatoer = [] as string[];
    for (const f of fødselsdatoer) {
        const finnesIUnikeFødselsdatoer = unikeFødselsdatoer.find((dato) => dayjs(dato).isSame(f, 'day'));
        if (finnesIUnikeFødselsdatoer === undefined) {
            const dateString = dayjs(f).format(ISO_DATE_FORMAT);
            unikeFødselsdatoer.push(dateString);
        }
    }

    if (unikeFødselsdatoer.length > 1) {
        const fødselsdatoerTekst = unikeFødselsdatoer.map((fd) => dayjs(fd).format(DDMMMMYYY_DATE_FORMAT));
        const førsteFødselsdaoer = fødselsdatoerTekst.slice(0, -1).join(', ');
        const sisteFødselsdato = fødselsdatoerTekst.at(-1);
        return `${førsteFødselsdaoer} og ${sisteFødselsdato}`;
    }
    return dayjs(unikeFødselsdatoer[0]).format(DDMMMMYYY_DATE_FORMAT);
};

export const sorterRegistrerteBarnEtterEldstOgNavn = (b1: BarnDto_fpoversikt, b2: BarnDto_fpoversikt) => {
    if (dayjs(b1.fødselsdato).isAfter(b2.fødselsdato, 'd')) {
        return 1;
    } else if (dayjs(b1.fødselsdato).isBefore(b2.fødselsdato, 'd')) {
        return -1;
    } else {
        return b1.navn.fornavn! < b2.navn.fornavn! ? -1 : 1; //TODO
    }
};
