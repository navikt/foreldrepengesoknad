import {
    selectBarn,
    selectSituasjon,
    selectSøkerrolle,
    selectAnnenForelder,
    selectAnnenForelderHarRettPåForeldrepenger,
    selectSøkerErAleneOmOmsorg,
    selectAntallBarn,
    selectEkstrainfo,
    selectSaksgrunnlag
} from './søknadSelector';
import { createSelector } from 'reselect';
import { RecursivePartial } from '../types/Partial';
import { Barn } from '../types/søknad/Barn';
import { Søkersituasjon } from '../types/søknad/Søknad';
import { getFamiliehendelsedato } from '../util/uttaksplan';
import { getErSøkerFarEllerMedmor } from '../util/domain/personUtil';
import { getFarEllerMedmorHarRettPåForeldrepenger } from '../regler/søknad/farEllerMedmorHarRettPåForeldrepenger';
import { getMorHarAleneomsorg } from '../regler/søknad/morHarAleneomsorg';
import { getMorHarRettPåForeldrepenger } from '../regler/søknad/morHarRettPåForeldrepenger';
import { getFarEllerMedmorHarAleneomsorg } from '../regler/søknad/farEllerMedmorHarAleneomsorg';
import { getErFlerbarnssøknad } from '../regler/søknad/erFlerbarnssøknad';
import AnnenForelder from 'app/types/søknad/AnnenForelder';
import { selectSøkerinfo } from './apiSelector';
import { Kjønn } from 'app/types/common';

const getKjønnFromFnr = (fnr: string): Kjønn | undefined => {
    if (fnr.length !== 11) {
        return undefined;
    }
    return parseInt(fnr.charAt(8), 10) % 2 === 0 ? Kjønn.KVINNE : Kjønn.MANN;
};
const barnHasRequiredValues = (barn: RecursivePartial<Barn> | undefined): barn is Barn =>
    barn !== undefined && barn.antallBarn !== undefined;

const søkersituasjonHasRequiredValues = (
    situasjon: RecursivePartial<Søkersituasjon> | undefined
): situasjon is Søkersituasjon => situasjon !== undefined;

export const selectFamiliehendelsesdato = createSelector(
    [selectBarn, selectSituasjon],
    (barn, situasjon): Date | undefined =>
        barnHasRequiredValues(barn) && søkersituasjonHasRequiredValues(situasjon)
            ? getFamiliehendelsedato(barn, situasjon)
            : undefined
);

export const selectErFlerbarnssøknad = createSelector(
    [selectAntallBarn],
    (antallBarn): boolean | undefined => {
        return antallBarn === undefined ? undefined : getErFlerbarnssøknad(antallBarn);
    }
);

export const selectErFødsel = createSelector(
    [selectSituasjon],
    (situasjon): boolean | undefined => {
        return situasjon ? situasjon === Søkersituasjon.FØDSEL : undefined;
    }
);

export const selectErAdopsjon = createSelector(
    [selectSituasjon],
    (situasjon): boolean | undefined => {
        return situasjon ? situasjon === Søkersituasjon.ADOPSJON : undefined;
    }
);

export const selectSøkerErFarEllerMedmor = createSelector(
    [selectSøkerrolle],
    (søkerrolle): boolean => {
        return søkerrolle ? getErSøkerFarEllerMedmor(søkerrolle) : false;
    }
);

export const selectSøkerErMor = createSelector(
    [selectSøkerrolle],
    (søkerrolle): boolean => {
        return søkerrolle ? getErSøkerFarEllerMedmor(søkerrolle) === false : false;
    }
);

export const selectHarMidlertidigOmsorg = createSelector(
    [selectSøkerErMor, selectSaksgrunnlag, selectSøkerErAleneOmOmsorg],
    (erMor, saksgrunnlag, erAleneOmOmsorg): boolean => {
        if (saksgrunnlag !== undefined) {
            if (erMor) {
                return !erAleneOmOmsorg && saksgrunnlag.farMedmorErAleneOmOmsorg;
            }

            if (!erMor) {
                return !erAleneOmOmsorg && saksgrunnlag.morErAleneOmOmsorg;
            }
        }

        return false;
    }
);

export const selectErDeltUttak = createSelector(
    [selectAnnenForelder, selectHarMidlertidigOmsorg],
    (annenForelder, harMidlertidigOmsorg): boolean | undefined => {
        return (annenForelder as AnnenForelder).harRettPåForeldrepenger === true && !harMidlertidigOmsorg;
    }
);

export const selectMorErUfør = createSelector(
    [selectAnnenForelder, selectSøkerErFarEllerMedmor],
    (annenForelder, erFarEllerMedmor): boolean | undefined => {
        if (annenForelder !== undefined) {
            return erFarEllerMedmor === true && annenForelder.erUfør === true;
        }
        return undefined;
    }
);

export const selectMorHarAleneomsorg = createSelector(
    [selectSøkerErMor, selectSøkerErAleneOmOmsorg, selectAnnenForelder],
    (søkerErMor, søkerErAleneOmOmsorg, annenForelder): boolean | undefined => {
        if (annenForelder !== undefined) {
            return getMorHarAleneomsorg(søkerErMor === true, søkerErAleneOmOmsorg === true, annenForelder);
        }
        return undefined;
    }
);

export const selectMorHarRett = createSelector(
    [selectSøkerrolle, selectSøkerErFarEllerMedmor, selectAnnenForelder],
    (søkerrolle, erFarEllerMedmor, annenForelder): boolean | undefined => {
        if (søkerrolle !== undefined && annenForelder !== undefined) {
            return getMorHarRettPåForeldrepenger(søkerrolle, erFarEllerMedmor === true, annenForelder);
        }
        return undefined;
    }
);
export const selectFarEllerMedmorHarRett = createSelector(
    [selectSøkerrolle, selectSøkerErFarEllerMedmor, selectAnnenForelderHarRettPåForeldrepenger],
    (søkerrolle, søkerErFarEllerMedmor, annenForelderHarRettPåForeldrepenger): boolean | undefined => {
        if (søkerrolle !== undefined) {
            return getFarEllerMedmorHarRettPåForeldrepenger(
                søkerrolle,
                søkerErFarEllerMedmor === true,
                annenForelderHarRettPåForeldrepenger === true
            );
        }
        return undefined;
    }
);

export const selectFarEllerMedmorHarAleneomsorg = createSelector(
    [selectSøkerErFarEllerMedmor, selectSøkerErAleneOmOmsorg, selectAnnenForelder],
    (søkerErFarEllerMedmor, søkerErAleneOmOmsorg, annenForelder): boolean | undefined => {
        if (annenForelder !== undefined) {
            return getFarEllerMedmorHarAleneomsorg(
                søkerErFarEllerMedmor === true,
                søkerErAleneOmOmsorg === true,
                annenForelder
            );
        }
        return undefined;
    }
);

export const selectSøkerKjønn = createSelector(
    [selectSøkerinfo],
    (søkerinfo): Kjønn | undefined => {
        return søkerinfo ? søkerinfo.person.kjønn : undefined;
    }
);

export const selectAnnenForelderKjønn = createSelector(
    [selectAnnenForelder],
    (annenForelder): Kjønn | undefined => {
        if (annenForelder && annenForelder.utenlandskFnr !== true && annenForelder.fnr) {
            return getKjønnFromFnr(annenForelder.fnr);
        }
        return undefined;
    }
);

export const selectHarKomplettUttaksplan = createSelector(
    [selectEkstrainfo],
    (ekstrainfo): boolean => {
        if (ekstrainfo === undefined) {
            return false;
        }
        return ekstrainfo.eksisterendeSak !== undefined && ekstrainfo.eksisterendeSak.uttaksplan !== undefined;
    }
);
