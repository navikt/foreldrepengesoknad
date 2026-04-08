import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { IntlShape } from 'react-intl';

import { Barn, isFødtBarn, isIkkeUtfyltTypeBarn, isUfødtBarn } from '@navikt/fp-common';
import { DDMMMMYYY_DATE_FORMAT, ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { FpBarnDto_fpoversikt } from '@navikt/fp-types';

dayjs.extend(utc);

export const getFamiliehendelsedato = (barn: Barn): string => {
    if (isFødtBarn(barn) || isIkkeUtfyltTypeBarn(barn)) {
        return barn.fødselsdatoer[0]!;
    }
    if (isUfødtBarn(barn)) {
        return barn.termindato;
    }

    return barn.adopsjonsdato;
};

export const getFamiliehendelsedatoDate = (barn: Barn): string => {
    return getFamiliehendelsedato(barn);
};

type DateType = string | undefined;

const barnFødselsdatoLikSakFødselsdato = (fødselsdatoer: string[] | undefined, regBarnFødselsdato: DateType) => {
    return fødselsdatoer !== undefined && regBarnFødselsdato !== undefined
        ? fødselsdatoer.some((fødselsdato) => dayjs(fødselsdato).isSame(regBarnFødselsdato))
        : false;
};

export const getRegistrerteBarnOmDeFinnes = (
    barn: Barn,
    registrerteBarn: FpBarnDto_fpoversikt[],
): FpBarnDto_fpoversikt[] | undefined => {
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

export const getDødeBarnetForMerEnn3MånederSiden = (registrerteBarn: FpBarnDto_fpoversikt) => {
    const dato3MånederTilbake = dayjs().subtract(3, 'month');
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

export const getLeverBarnet = (barn: FpBarnDto_fpoversikt) => {
    return !barn.dødsdato;
};

export const getAndreBarnFødtSammenMedBarnet = (
    barnFnr: string | undefined,
    barnFødselsdato: string,
    registrerteBarn: FpBarnDto_fpoversikt[],
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
    omsorgsovertagelsesdato: string | undefined,
    fødselsdatoer: string[] | undefined,
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
    fødselsdatoer: string[] | undefined,
    omsorgsovertagelsesdato: string | undefined,
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

export const formaterFødselsdatoerPåBarn = (fødselsdatoer: string[] | undefined): string | undefined => {
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
