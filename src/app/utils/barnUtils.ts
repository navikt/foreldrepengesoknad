import { formatDate, intlUtils } from '@navikt/fp-common';
import { dateToISOString } from '@navikt/sif-common-formik/lib';
import Barn, { isFødtBarn, isIkkeUtfyltTypeBarn, isUfødtBarn } from 'app/context/types/Barn';
import { RegistrertBarn } from 'app/types/Person';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { IntlShape } from 'react-intl';

dayjs.extend(utc);

export const getFamiliehendelsedato = (barn: Barn): string => {
    if (isFødtBarn(barn) || isIkkeUtfyltTypeBarn(barn)) {
        return dateToISOString(barn.fødselsdatoer[0]);
    }
    if (isUfødtBarn(barn)) {
        return dateToISOString(barn.termindato);
    }

    return dateToISOString(barn.adopsjonsdato);
};

const barnFødselsdatoLikSakFødselsdato = (fødselsdatoer: Date[] | undefined, regBarnFødselsdato: Date | undefined) => {
    return fødselsdatoer !== undefined && regBarnFødselsdato !== undefined
        ? fødselsdatoer.find((fødselsdato) => dayjs(fødselsdato).isSame(regBarnFødselsdato)) !== undefined
        : false;
};

export const getRegistrertBarnOmDetFinnes = (
    barn: Barn,
    registrerteBarn: RegistrertBarn[]
): RegistrertBarn | undefined => {
    return registrerteBarn.length > 0 && !isUfødtBarn(barn)
        ? registrerteBarn.find(
              (regBarn) =>
                  barn.fnr?.includes(regBarn.fnr) ||
                  barnFødselsdatoLikSakFødselsdato(barn.fødselsdatoer, regBarn.fødselsdato)
          )
        : undefined;
};

export const getTermindato = (barn: Barn): Date | undefined => {
    return isFødtBarn(barn) || isUfødtBarn(barn) ? barn.termindato : undefined;
};

export const getFødselsdato = (barn: Barn): Date | undefined => {
    return isFødtBarn(barn) ? barn.fødselsdatoer[0] : undefined;
};

export const getDødeBarnetForMerEnn3MånederSiden = (registrerteBarn: RegistrertBarn) => {
    const dato3MånederTilbake = dayjs(new Date()).subtract(3, 'month');
    return (
        registrerteBarn.dødsdato !== undefined && dayjs(registrerteBarn.dødsdato).isBefore(dato3MånederTilbake, 'day')
    );
};

export const getTekstForAntallBarn = (antallBarn: number, intl: IntlShape): string => {
    if (antallBarn > 1) {
        return antallBarn > 2 ? intlUtils(intl, 'flerlinger') : intlUtils(intl, 'tvillinger');
    }
    return intlUtils(intl, 'barn');
};

export const getErDødfødtBarn = (barn: RegistrertBarn) => {
    return (
        barn.dødsdato &&
        dayjs(barn.fødselsdato).isSame(barn.dødsdato, 'd') &&
        barn.fornavn === undefined &&
        barn.etternavn === undefined
    );
};

export const getAndreBarnFødtSammenMedBarnet = (
    barnFnr: string | undefined,
    barnFødselsdato: Date,
    registrerteBarn: RegistrertBarn[]
) => {
    const dagenFørFødsel = dayjs(barnFødselsdato).subtract(1, 'day');
    const dagenEtterFødsel = dayjs(barnFødselsdato).add(1, 'day');
    return registrerteBarn.filter(
        (b) =>
            b.fnr !== barnFnr &&
            dayjs(b.fødselsdato).isSameOrAfter(dagenFørFødsel, 'day') &&
            dayjs(b.fødselsdato).isSameOrBefore(dagenEtterFødsel, 'day')
    );
};

export const formaterNavnPåFlereBarn = (
    fornavn: string[] | undefined,
    etternavn: string[] | undefined,
    fødselsdatoer: Date[] | undefined,
    omsorgsovertagelsesdato: Date | undefined,
    enAvBarnaErDødfødt: boolean | undefined,
    antallBarn: number,
    intl: IntlShape
): string => {
    if (
        fornavn === undefined ||
        fornavn.length === 0 ||
        etternavn === undefined ||
        etternavn.length === 0 ||
        !!enAvBarnaErDødfødt
    ) {
        if (omsorgsovertagelsesdato !== undefined) {
            return intlUtils(intl, 'velkommen.barnVelger.adoptertBarn', {
                adopsjonsdato: formatDate(omsorgsovertagelsesdato),
            });
        } else {
            const fødselsdatoTekst = formateFødselsdatoerPåFlereBarn(fødselsdatoer);
            const barnTekst = getTekstForAntallBarn(antallBarn, intl);

            return fødselsdatoer !== undefined && fødselsdatoer.length > 0
                ? intlUtils(intl, 'velkommen.barnVelger.fødtBarn.barn', {
                      barnTekst,
                      fødselsdato: fødselsdatoTekst,
                  })
                : '';
        }
    }

    const etterNavnet = etternavn[0];
    if (fornavn.length > 1) {
        const fornavnene = fornavn.slice(0, -1).join(', ');
        const sisteFornavn = fornavn[fornavn.length - 1];
        return `${fornavnene} og ${sisteFornavn} ${etterNavnet}`;
    }
    return `${fornavn[0]} ${etternavn}`;
};

export const formateFødselsdatoerPåFlereBarn = (fødselsdatoer: Date[] | undefined): string | undefined => {
    if (fødselsdatoer === undefined) {
        return undefined;
    }
    const unikeFødselsdatoer = [] as Date[];
    fødselsdatoer.forEach((f) => {
        const finnesIUnikeFødselsdatoer = unikeFødselsdatoer.find((dato) => dayjs(dato).isSame(f, 'day'));
        if (finnesIUnikeFødselsdatoer === undefined) {
            unikeFødselsdatoer.push(f);
        }
    });

    if (unikeFødselsdatoer.length > 1) {
        const fødselsdatoerTekst = unikeFødselsdatoer.map((fd) => formatDate(fd));
        const førsteFødselsdaoer = fødselsdatoerTekst.slice(0, -1).join(', ');
        const sisteFødselsdato = fødselsdatoerTekst[fødselsdatoerTekst.length - 1];
        return `${førsteFødselsdaoer} og ${sisteFødselsdato}`;
    }
    return formatDate(unikeFødselsdatoer[0]);
};
