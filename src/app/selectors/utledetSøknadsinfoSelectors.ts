import {
    selectBarn,
    selectSituasjon,
    selectSøkerrolle,
    selectAnnenForelder,
    selectAnnenForelderHarRettPåForeldrepenger,
    selectSøkerErAleneOmOmsorg,
    selectAntallBarn
} from './søknadSelector';
import { createSelector } from 'reselect';
import { getErDeltUttak } from 'app/util/uttaksplan/forslag/util';
import { RecursivePartial } from '../types/Partial';
import { Barn } from '../types/søknad/Barn';
import { Søkersituasjon } from '../types/søknad/Søknad';
import { getFamiliehendelsedato } from '../util/uttaksplan';
import { getErSøkerFarEllerMedmor } from '../util/domain/personUtil';
import { getFarEllerMedmorHarRettPåForeldrepenger } from './regler/farEllerMedmorHarRettPåForeldrepenger';
import { getMorHarAleneomsorg } from './regler/morHarAleneomsorg';
import { getMorHarRettPåForeldrepenger } from './regler/morHarRettPåForeldrepenger';
import { getFarEllerMedmorHarAleneomsorg } from './regler/farEllerMedmorHarAleneomsorg';
import { getErFlerbarnssøknad } from './regler/erFlerbarnssøknad';
import { selectTilgjengeligeStønadskontoer } from './apiSelector';

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

export const selectErFlerbarnssøknad = createSelector([selectAntallBarn], (antallBarn): boolean | undefined => {
    return antallBarn === undefined ? undefined : getErFlerbarnssøknad(antallBarn);
});

export const selectErFødsel = createSelector([selectSituasjon], (situasjon): boolean | undefined => {
    return situasjon ? situasjon === Søkersituasjon.FØDSEL : undefined;
});

export const selectErDeltUttak = createSelector([selectTilgjengeligeStønadskontoer], (tilgjengeligeStønadskontoer):
    | boolean
    | undefined => {
    return getErDeltUttak(tilgjengeligeStønadskontoer);
});

export const selectSøkerErFarEllerMedmor = createSelector([selectSøkerrolle], (søkerrolle): boolean | undefined => {
    return søkerrolle ? getErSøkerFarEllerMedmor(søkerrolle) : undefined;
});

export const selectSøkerErMor = createSelector([selectSøkerrolle], (søkerrolle): boolean | undefined => {
    return søkerrolle ? getErSøkerFarEllerMedmor(søkerrolle) === false : undefined;
});

export const selectMorErUfør = createSelector(
    [selectAnnenForelder, selectSøkerErFarEllerMedmor],
    (annenForelder, erFarEllerMedmor): boolean | undefined => {
        if (erFarEllerMedmor !== undefined && annenForelder !== undefined) {
            return erFarEllerMedmor === true && annenForelder.erUfør === true;
        }
        return undefined;
    }
);

export const selectMorHarAleneomsorg = createSelector(
    [selectSøkerErMor, selectSøkerErAleneOmOmsorg, selectAnnenForelder],
    (søkerErMor, søkerErAleneOmOmsorg, annenForelder): boolean | undefined => {
        if (søkerErMor !== undefined && søkerErAleneOmOmsorg !== undefined && annenForelder !== undefined) {
            return getMorHarAleneomsorg(søkerErMor, søkerErAleneOmOmsorg, annenForelder);
        }
        return undefined;
    }
);

export const selectMorHarRett = createSelector(
    [selectSøkerrolle, selectSøkerErFarEllerMedmor, selectAnnenForelder],
    (søkerrolle, erFarEllerMedmor, annenForelder): boolean | undefined => {
        if (søkerrolle !== undefined && erFarEllerMedmor !== undefined && annenForelder !== undefined) {
            return getMorHarRettPåForeldrepenger(søkerrolle, erFarEllerMedmor, annenForelder);
        }
        return undefined;
    }
);
export const selectFarEllerMedmorHarRett = createSelector(
    [selectSøkerrolle, selectSøkerErFarEllerMedmor, selectAnnenForelderHarRettPåForeldrepenger],
    (søkerrolle, søkerErFarEllerMedmor, annenForelderHarRettPåForeldrepenger): boolean | undefined => {
        if (
            søkerrolle !== undefined &&
            søkerErFarEllerMedmor !== undefined &&
            annenForelderHarRettPåForeldrepenger !== undefined
        ) {
            return getFarEllerMedmorHarRettPåForeldrepenger(
                søkerrolle,
                søkerErFarEllerMedmor,
                annenForelderHarRettPåForeldrepenger
            );
        }
        return undefined;
    }
);

export const selectFarEllerMedmorHarAleneomsorg = createSelector(
    [selectSøkerErFarEllerMedmor, selectSøkerErAleneOmOmsorg, selectAnnenForelder],
    (søkerErFarEllerMedmor, søkerErAleneOmOmsorg, annenForelder): boolean | undefined => {
        if (søkerErFarEllerMedmor !== undefined && søkerErAleneOmOmsorg !== undefined && annenForelder !== undefined) {
            return getFarEllerMedmorHarAleneomsorg(søkerErFarEllerMedmor, søkerErAleneOmOmsorg, annenForelder);
        }
        return undefined;
    }
);
