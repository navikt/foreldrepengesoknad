import {
    AnnenForelder,
    Barn,
    BarnFraNesteSak,
    Dekningsgrad,
    EksisterendeSak,
    ISOStringToDate,
    andreAugust2022ReglerGjelder,
    formaterDato,
    getErMorUfør,
    getFarMedmorErAleneOmOmsorg,
    getMorErAleneOmOmsorg,
    hasValue,
    isAdoptertAnnetBarn,
    isAdoptertStebarn,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
    isFødtBarn,
    isUfødtBarn,
} from '@navikt/fp-common';
import { dateToISOString } from '@navikt/fp-formik';
import { SøkersituasjonFp } from '@navikt/fp-types';

import { AnnenPartVedtakDTO } from 'app/types/AnnenPartVedtakDTO';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { mapAnnenPartsEksisterendeSakFromDTO } from 'app/utils/eksisterendeSakUtils';

const getFarHarRettINorge = (erFarMedmor: boolean, annenForelder: AnnenForelder): boolean => {
    if (erFarMedmor) {
        return true;
    }

    if (isAnnenForelderOppgitt(annenForelder)) {
        return !!annenForelder.harRettPåForeldrepengerINorge;
    }

    return false;
};

export const getMorHarRettINorge = (erFarMedmor: boolean, annenForelder: AnnenForelder): boolean => {
    if (!erFarMedmor) {
        return true;
    }

    if (isAnnenForelderOppgitt(annenForelder)) {
        return !!annenForelder.harRettPåForeldrepengerINorge;
    }

    return false;
};

const getAnnenForelderHarRettIEØS = (annenForelder: AnnenForelder): boolean => {
    if (isAnnenForelderOppgitt(annenForelder)) {
        return !!annenForelder.harRettPåForeldrepengerIEØS;
    }

    return false;
};

const getTermindatoSomSkalBrukes = (barn: Barn, termindatoSaksgrunnlag?: string): string | undefined => {
    if (isFødtBarn(barn) || isUfødtBarn(barn)) {
        return termindatoSaksgrunnlag ? termindatoSaksgrunnlag : barn.termindato;
    }

    return undefined;
};

export const getTermindatoSomSkalBrukesFraSaksgrunnlagBeggeParter = (
    termindatoSaksgrunnlag?: string,
    termindatoSaksgrunnlagAnnenPart?: string,
): string | undefined => {
    if (termindatoSaksgrunnlagAnnenPart) {
        return termindatoSaksgrunnlagAnnenPart;
    }

    return termindatoSaksgrunnlag ? termindatoSaksgrunnlag : undefined;
};

export const getAntallBarnSomSkalBrukesFraSaksgrunnlagBeggeParter = (
    erFarEllerMedmor: boolean,
    antallBarnSaksgrunnlag: number,
    antallBarnSaksgrunnlagAnnenPart?: number,
): number => {
    if (erFarEllerMedmor && antallBarnSaksgrunnlagAnnenPart) {
        return antallBarnSaksgrunnlagAnnenPart;
    }

    return antallBarnSaksgrunnlag;
};

const formaterStønadskontoParamsDatoer = (dato: string | undefined, datoformat?: string): string | undefined => {
    return hasValue(dato) ? formaterDato(dato, datoformat) : undefined;
};

const getStønadskontoParams = (
    barn: Barn,
    annenForelder: AnnenForelder,
    søkersituasjon: SøkersituasjonFp,
    barnFraNesteSak?: BarnFraNesteSak,
    annenPartsVedtak?: AnnenPartVedtakDTO,
    eksisterendeSak?: EksisterendeSak,
) => {
    const oppgittAnnenForelder = isAnnenForelderOppgitt(annenForelder) ? annenForelder : undefined;
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const farMedmorErAleneOmOmsorg = getFarMedmorErAleneOmOmsorg(
        erFarEllerMedmor,
        oppgittAnnenForelder?.erAleneOmOmsorg || false,
        annenForelder,
    );

    const morErAleneOmOmsorg = getMorErAleneOmOmsorg(
        !erFarEllerMedmor,
        oppgittAnnenForelder?.erAleneOmOmsorg || false,
        annenForelder,
    );

    const familieHendelseDatoNesteSak = barnFraNesteSak?.familiehendelsesdato;

    const førsteUttaksdagNesteBarnsSak =
        barnFraNesteSak !== undefined ? barnFraNesteSak.startdatoFørsteStønadsperiode : undefined;

    const eksisterendeVedtakAnnenPart = mapAnnenPartsEksisterendeSakFromDTO(
        annenPartsVedtak,
        barn,
        erFarEllerMedmor,
        getFamiliehendelsedato(barn),
        førsteUttaksdagNesteBarnsSak,
    );

    const saksgrunnlagsAntallBarn = getAntallBarnSomSkalBrukesFraSaksgrunnlagBeggeParter(
        erFarEllerMedmor,
        barn.antallBarn,
        eksisterendeVedtakAnnenPart?.grunnlag.antallBarn,
    );

    const saksgrunnlagsTermindato = getTermindatoSomSkalBrukesFraSaksgrunnlagBeggeParter(
        eksisterendeSak?.grunnlag.termindato,
        eksisterendeVedtakAnnenPart?.grunnlag.termindato,
    );

    const erFarMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const familiehendelsesdato = ISOStringToDate(getFamiliehendelsedato(barn));
    const søkerErFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);

    const fpUttakServiceDateFormat = 'YYYYMMDD';

    const params = {
        farHarRett: getFarHarRettINorge(erFarMedmor, annenForelder),
        morHarRett: getMorHarRettINorge(erFarMedmor, annenForelder),
        harAnnenForelderTilsvarendeRettEØS: getAnnenForelderHarRettIEØS(annenForelder),
        morHarAleneomsorg: morErAleneOmOmsorg || false,
        farHarAleneomsorg: farMedmorErAleneOmOmsorg || false,
        antallBarn: saksgrunnlagsAntallBarn,
        fødselsdato: formaterStønadskontoParamsDatoer(
            isFødtBarn(barn) ? barn.fødselsdatoer[0] : undefined,
            fpUttakServiceDateFormat,
        ),
        termindato: formaterStønadskontoParamsDatoer(
            getTermindatoSomSkalBrukes(barn, saksgrunnlagsTermindato),
            fpUttakServiceDateFormat,
        ),
        omsorgsovertakelseDato: formaterStønadskontoParamsDatoer(
            isAdoptertAnnetBarn(barn) || isAdoptertStebarn(barn) ? barn.adopsjonsdato : undefined,
            fpUttakServiceDateFormat,
        ),
        startdatoUttak: formaterStønadskontoParamsDatoer(getFamiliehendelsedato(barn), fpUttakServiceDateFormat),
        minsterett: andreAugust2022ReglerGjelder(familiehendelsesdato!),
        erMor: !søkerErFarEllerMedmor,
        morHarUføretrygd: getErMorUfør(annenForelder, søkerErFarEllerMedmor),

        familieHendelseDatoNesteSak: formaterStønadskontoParamsDatoer(
            dateToISOString(familieHendelseDatoNesteSak),
            fpUttakServiceDateFormat,
        ),
    };

    return {
        stønadskontoParams100: {
            ...params,
            dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        },
        stønadskontoParams80: {
            ...params,
            dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
        },
    };
};

export default getStønadskontoParams;
