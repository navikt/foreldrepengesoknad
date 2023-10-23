import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { TilgjengeligeStønadskontoerParams } from './api';
import { dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import {
    AnnenForelder,
    Barn,
    Dekningsgrad,
    ISOStringToDate,
    Søkersituasjon,
    andreAugust2022ReglerGjelder,
    getErMorUfør,
    isAdoptertAnnetBarn,
    isAdoptertStebarn,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
    isFødtBarn,
    isUfødtBarn,
} from '@navikt/fp-common';

const getFarHarRettINorge = (erFarMedmor: boolean, annenForelder: AnnenForelder): boolean => {
    if (erFarMedmor) {
        return true;
    }

    if (isAnnenForelderOppgitt(annenForelder)) {
        return !!annenForelder.harRettPåForeldrepengerINorge;
    }

    return false;
};

const getMorHarRettINorge = (erFarMedmor: boolean, annenForelder: AnnenForelder): boolean => {
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

const getTermindatoSomSkalBrukes = (barn: Barn, termindatoSaksgrunnlag?: string) => {
    if (isFødtBarn(barn) || isUfødtBarn(barn)) {
        return termindatoSaksgrunnlag ? termindatoSaksgrunnlag : dateToISOString(barn.termindato);
    }

    return undefined;
};

export const getTermindatoSomSkalBrukesFraSaksgrunnlagBeggeParter = (
    termindatoSaksgrunnlag?: string,
    termindatoSaksgrunnlagAnnenPart?: string,
) => {
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

const getStønadskontoParams = (
    dekningsgrad: Dekningsgrad,
    barn: Barn,
    annenForelder: AnnenForelder,
    søkersituasjon: Søkersituasjon,
    farHarAleneomsorg: boolean,
    morHarAleneomsorg: boolean,
    familieHendelseDatoNesteSak: string | undefined,
    antallBarn: number,
    oppgittTermindato?: string,
): TilgjengeligeStønadskontoerParams => {
    const erFarMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const familiehendelsesdato = ISOStringToDate(getFamiliehendelsedato(barn));
    const søkerErFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    return {
        antallBarn: antallBarn.toString(),
        startdatoUttak: getFamiliehendelsedato(barn),
        dekningsgrad: dekningsgrad,
        farHarRettINorge: getFarHarRettINorge(erFarMedmor, annenForelder),
        morHarRettINorge: getMorHarRettINorge(erFarMedmor, annenForelder),
        harAnnenForelderTilsvarendeRettEØS: getAnnenForelderHarRettIEØS(annenForelder),
        morHarAleneomsorg,
        farHarAleneomsorg,
        fødselsdato: isFødtBarn(barn) ? dateToISOString(barn.fødselsdatoer[0]) : undefined,
        omsorgsovertakelsesdato:
            isAdoptertAnnetBarn(barn) || isAdoptertStebarn(barn) ? dateToISOString(barn.adopsjonsdato) : undefined,
        termindato: getTermindatoSomSkalBrukes(barn, oppgittTermindato),
        minsterett: andreAugust2022ReglerGjelder(familiehendelsesdato!),
        erMor: !søkerErFarEllerMedmor,
        morHarUføretrygd: getErMorUfør(annenForelder, søkerErFarEllerMedmor),
        familieHendelseDatoNesteSak: familieHendelseDatoNesteSak,
    };
};

export default getStønadskontoParams;
