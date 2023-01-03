import { dateToISOString } from '@navikt/sif-common-formik/lib';
import AnnenForelder, { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import Barn, { isAdoptertAnnetBarn, isAdoptertStebarn, isFødtBarn, isUfødtBarn } from 'app/context/types/Barn';
import Søkersituasjon from 'app/context/types/Søkersituasjon';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import { getErMorUfør } from 'app/utils/annenForelderUtils';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { andreAugust2022ReglerGjelder, ISOStringToDate } from 'app/utils/dateUtils';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import { TilgjengeligeStønadskontoerParams } from './api';

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
    termindatoSaksgrunnlagAnnenPart?: string
) => {
    if (termindatoSaksgrunnlagAnnenPart) {
        return termindatoSaksgrunnlagAnnenPart;
    }

    return termindatoSaksgrunnlag ? termindatoSaksgrunnlag : undefined;
};

const getStønadskontoParams = (
    dekningsgrad: Dekningsgrad,
    barn: Barn,
    annenForelder: AnnenForelder,
    søkersituasjon: Søkersituasjon,
    farHarAleneomsorg: boolean,
    morHarAleneomsorg: boolean,
    familieHendelseDatoNesteSak: string | undefined,
    oppgittTermindato?: string
): TilgjengeligeStønadskontoerParams => {
    const erFarMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const familiehendelsesdato = ISOStringToDate(getFamiliehendelsedato(barn));
    const søkerErFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    return {
        antallBarn: barn.antallBarn.toString(),
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
