import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import {
    AnnenForelder,
    Barn,
    BarnFraNesteSak,
    Dekningsgrad,
    EksisterendeSak,
    ISOStringToDate,
    andreAugust2022ReglerGjelder,
    getErMorUfør,
    getFarMedmorErAleneOmOmsorg,
    getMorErAleneOmOmsorg,
    isAdoptertAnnetBarn,
    isAdoptertStebarn,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
    isFødtBarn,
    isUfødtBarn,
} from '@navikt/fp-common';
import { SøkersituasjonFp } from '@navikt/fp-types';
import Søker from 'app/context/types/Søker';
import { AnnenPartVedtakDTO } from 'app/types/AnnenPartVedtakDTO';
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

const getTermindatoSomSkalBrukesFraSaksgrunnlagBeggeParter = (
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
    barn: Barn,
    annenForelder: AnnenForelder,
    søkersituasjon: SøkersituasjonFp,
    søker: Søker,
    barnFraNesteSak?: BarnFraNesteSak,
    annenPartsVedtak?: AnnenPartVedtakDTO,
    eksisterendeSak?: EksisterendeSak,
) => {
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const farMedmorErAleneOmOmsorg = getFarMedmorErAleneOmOmsorg(
        erFarEllerMedmor,
        søker.erAleneOmOmsorg,
        annenForelder,
    );

    const morErAleneOmOmsorg = getMorErAleneOmOmsorg(!erFarEllerMedmor, søker.erAleneOmOmsorg, annenForelder);

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

    const params = {
        antallBarn: saksgrunnlagsAntallBarn,
        startdatoUttak: getFamiliehendelsedato(barn),
        farHarRettINorge: getFarHarRettINorge(erFarMedmor, annenForelder),
        morHarRettINorge: getMorHarRettINorge(erFarMedmor, annenForelder),
        harAnnenForelderTilsvarendeRettEØS: getAnnenForelderHarRettIEØS(annenForelder),
        morHarAleneomsorg: morErAleneOmOmsorg,
        farHarAleneomsorg: farMedmorErAleneOmOmsorg,
        fødselsdato: isFødtBarn(barn) ? dateToISOString(barn.fødselsdatoer[0]) : undefined,
        omsorgsovertakelsesdato:
            isAdoptertAnnetBarn(barn) || isAdoptertStebarn(barn) ? dateToISOString(barn.adopsjonsdato) : undefined,
        termindato: getTermindatoSomSkalBrukes(barn, saksgrunnlagsTermindato),
        minsterett: andreAugust2022ReglerGjelder(familiehendelsesdato!),
        erMor: !søkerErFarEllerMedmor,
        morHarUføretrygd: getErMorUfør(annenForelder, søkerErFarEllerMedmor),
        familieHendelseDatoNesteSak: dateToISOString(familieHendelseDatoNesteSak),
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
