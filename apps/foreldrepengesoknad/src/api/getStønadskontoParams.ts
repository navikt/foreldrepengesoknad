import { getErMorUfør } from 'utils/annenForelderUtils';
import { getFamiliehendelsedato } from 'utils/barnUtils';
import { mapAnnenPartsEksisterendeSakFromDTO } from 'utils/eksisterendeSakUtils';
import { isFarEllerMedmor } from 'utils/isFarEllerMedmor';
import { getFarMedmorErAleneOmOmsorg, getMorErAleneOmOmsorg } from 'utils/personUtils';

import {
    AnnenForelder,
    Barn,
    BarnFraNesteSak,
    EksisterendeSak,
    isAdoptertAnnetBarn,
    isAdoptertStebarn,
    isAnnenForelderOppgitt,
    isFødtBarn,
    isUfødtBarn,
} from '@navikt/fp-common';
import { AnnenPartSak, SøkersituasjonFp } from '@navikt/fp-types';

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

export const getStønadskontoParams = ({
    barn,
    annenForelder,
    søkersituasjon,
    barnFraNesteSak,
    annenPartsVedtak,
    eksisterendeSak,
}: {
    barn: Barn;
    annenForelder: AnnenForelder;
    søkersituasjon: SøkersituasjonFp;
    barnFraNesteSak?: BarnFraNesteSak;
    annenPartsVedtak: AnnenPartSak | undefined;
    eksisterendeSak?: EksisterendeSak;
}) => {
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
        erFarEllerMedmor,
        eksisterendeSak?.grunnlag.termindato,
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
        antallBarn: saksgrunnlagsAntallBarn.toString(),
        fødselsdato: isFødtBarn(barn) ? barn.fødselsdatoer[0] : undefined,
        termindato: getTermindatoSomSkalBrukes(barn, saksgrunnlagsTermindato),
        omsorgsovertakelseDato: isAdoptertAnnetBarn(barn) || isAdoptertStebarn(barn) ? barn.adopsjonsdato : undefined,
        morHarUføretrygd: getErMorUfør(annenForelder, søkerErFarEllerMedmor),
        familieHendelseDatoNesteSak: førsteUttaksdagNesteBarnsSak,
    };
};
