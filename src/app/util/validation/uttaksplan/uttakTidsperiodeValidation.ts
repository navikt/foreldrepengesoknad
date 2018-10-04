import { DatoValidatorer } from '../../../bolker/tidsperiode-bolk/TidsperiodeBolk';
import { Tidsperiode } from 'common/types';
import { Uttaksdagen } from '../../uttaksplan/Uttaksdagen';
import { UttakFormPeriodeType } from '../../../components/uttak-form/UttakForm';
import { Periodetype, isForeldrepengerFørFødselUttaksperiode } from '../../../types/uttaksplan/periodetyper';
import { PeriodeValideringErrorKey } from '../../../redux/reducers/uttaksplanValideringReducer';
import { Validator } from 'common/lib/validation/types';
import { allValidatorsPass } from 'common/lib/validation/utils/runValidFormValidation';

const erUtfyltTest = (dato: Date | undefined, skalIkkeHaUttak: boolean): Validator => ({
    test: () => (skalIkkeHaUttak ? true : dato !== undefined),
    failText: { intlKey: `uttaksplan.validering.${PeriodeValideringErrorKey.PÅKREVD_VERDI_MANGLER}` }
});

const erUttaksdagTest = (dato: Date | undefined) => ({
    test: () => dato !== undefined && Uttaksdagen(dato).erUttaksdag(),
    failText: { intlKey: `uttaksplan.validering.${PeriodeValideringErrorKey.DATO_IKKE_UTTAKSDAG}` }
});

export const getUttakTidsperiodeValidatorer = (
    skalIkkeHaUttak: boolean,
    tidsperiode: Partial<Tidsperiode>
): DatoValidatorer | undefined => {
    if (skalIkkeHaUttak) {
        return undefined;
    }
    return {
        fra: [erUtfyltTest(tidsperiode.fom, skalIkkeHaUttak), erUttaksdagTest(tidsperiode.fom)],
        til: [erUtfyltTest(tidsperiode.tom, skalIkkeHaUttak), erUttaksdagTest(tidsperiode.tom)]
    };
};

export const uttakTidsperiodeErGyldig = (uttaksperiode: UttakFormPeriodeType): boolean => {
    const { tidsperiode } = uttaksperiode;
    if (tidsperiode !== undefined && uttaksperiode.type === Periodetype.Uttak) {
        const skalIkkeHaUttak = isForeldrepengerFørFødselUttaksperiode(uttaksperiode)
            ? uttaksperiode.skalIkkeHaUttakFørTermin
            : false;

        const validators = getUttakTidsperiodeValidatorer(skalIkkeHaUttak, tidsperiode as Tidsperiode);
        if (validators === undefined) {
            return true;
        }
        const fraDatoErGyldig = allValidatorsPass(validators.fra);
        const tilDatoErGyldig = allValidatorsPass(validators.til);

        return fraDatoErGyldig && tilDatoErGyldig;
    }
    return true;
};
