import {
    AnnenForelder,
    Barn,
    BarnFraNesteSak,
    EksisterendeSak,
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

const finnRettighetstype = (
    farHarRett: boolean,
    morHarRett: boolean,
    morErAleneOmOmsorg: boolean,
    farHarAleneomsorg: boolean,
) => {
    if (morErAleneOmOmsorg || farHarAleneomsorg) {
        return 'ALENEOMSORG';
    }
    if (farHarRett && morHarRett) {
        return 'BEGGE_RETT';
    }
    return 'BARE_SØKER_RETT';
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
    const søkerErFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);

    const fpUttakServiceDateFormat = 'YYYYMMDD';

    return {
        rettighetstype: finnRettighetstype(
            getFarHarRettINorge(erFarMedmor, annenForelder),
            getMorHarRettINorge(erFarMedmor, annenForelder),
            morErAleneOmOmsorg || false,
            farMedmorErAleneOmOmsorg || false,
        ),
        brukerrolle: søkerErFarEllerMedmor ? 'FAR' : 'MOR',
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
        morHarUføretrygd: getErMorUfør(annenForelder, søkerErFarEllerMedmor),
    };
};

export default getStønadskontoParams;
