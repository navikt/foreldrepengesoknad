import { AnnenForelder, isAnnenForelderOppgitt } from 'types/AnnenForelder';
import { getErMorUfør } from 'utils/annenForelderUtils';
import { getFamiliehendelsedato } from 'utils/barnUtils';
import { mapAnnenPartsEksisterendeSakFromDTO } from 'utils/eksisterendeSakUtils';
import { isFarEllerMedmor } from 'utils/isFarEllerMedmor';
import { getFarMedmorErAleneOmOmsorg, getMorErAleneOmOmsorg } from 'utils/personUtils';

import {
    AnnenPartSak_fpoversikt,
    Barn,
    KontoBeregningGrunnlagDto,
    SøkersituasjonFp,
    isAdoptertBarn,
    isFødtBarn,
    isUfødtBarn,
} from '@navikt/fp-types';

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

const getTermindatoSomSkalBrukes = (barn: Barn, termindatoSaksgrunnlag?: string): string | undefined => {
    if (isFødtBarn(barn) || isUfødtBarn(barn)) {
        return termindatoSaksgrunnlag ? termindatoSaksgrunnlag : barn.termindato;
    }

    return undefined;
};

export const getTermindatoSomSkalBrukesFraSaksgrunnlagBeggeParter = (
    erFarEllerMedmor: boolean,
    termindatoSaksgrunnlag?: string,
    termindatoSaksgrunnlagAnnenPart?: string,
): string | undefined => {
    if (termindatoSaksgrunnlagAnnenPart && erFarEllerMedmor) {
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

const finnRettighetstype = (
    farHarRett: boolean,
    morHarRett: boolean,
    morErAleneOmOmsorg: boolean,
    farHarAleneomsorg: boolean,
    annenForelderHarRettIEØS: boolean,
) => {
    if (morErAleneOmOmsorg || farHarAleneomsorg) {
        return 'ALENEOMSORG';
    }
    if ((farHarRett && morHarRett) || annenForelderHarRettIEØS) {
        return 'BEGGE_RETT';
    }
    return 'BARE_SØKER_RETT';
};

export type StønadskontoParams = KontoBeregningGrunnlagDto;

export const getStønadskontoParams = (
    barn: Barn,
    annenForelder: AnnenForelder,
    søkersituasjon: SøkersituasjonFp,
    annenPartsVedtak: AnnenPartSak_fpoversikt | undefined,
    termindatoEksisterendeSak?: string,
): KontoBeregningGrunnlagDto => {
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

    const eksisterendeVedtakAnnenPart = mapAnnenPartsEksisterendeSakFromDTO(
        annenPartsVedtak,
        barn,
        erFarEllerMedmor,
        getFamiliehendelsedato(barn),
    );

    const saksgrunnlagsAntallBarn = getAntallBarnSomSkalBrukesFraSaksgrunnlagBeggeParter(
        erFarEllerMedmor,
        barn.antallBarn,
        eksisterendeVedtakAnnenPart?.grunnlag.antallBarn,
    );

    const saksgrunnlagsTermindato = getTermindatoSomSkalBrukesFraSaksgrunnlagBeggeParter(
        erFarEllerMedmor,
        termindatoEksisterendeSak,
        eksisterendeVedtakAnnenPart?.grunnlag.termindato,
    );

    const erFarMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const søkerErFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const annenForelderHarRettIEØS = isAnnenForelderOppgitt(annenForelder) && annenForelder.harRettPåForeldrepengerIEØS;
    return {
        rettighetstype: finnRettighetstype(
            getFarHarRettINorge(erFarMedmor, annenForelder),
            getMorHarRettINorge(erFarMedmor, annenForelder),
            morErAleneOmOmsorg,
            farMedmorErAleneOmOmsorg,
            annenForelderHarRettIEØS || false,
        ),
        brukerrolle: søkerErFarEllerMedmor ? 'FAR' : 'MOR',
        antallBarn: saksgrunnlagsAntallBarn,
        fødselsdato: isFødtBarn(barn) ? barn.fødselsdatoer[0] : undefined,
        termindato: getTermindatoSomSkalBrukes(barn, saksgrunnlagsTermindato),
        omsorgsovertakelseDato: isAdoptertBarn(barn) ? barn.adopsjonsdato : undefined,
        morHarUføretrygd: getErMorUfør(annenForelder, søkerErFarEllerMedmor),
    };
};
