import { DatoValidatorer } from '../../../bolker/tidsperiode-bolk/TidsperiodeBolk';
import { Tidsperiode } from 'common/types';
import { Uttaksdagen } from '../../uttaksplan/Uttaksdagen';
import { UttakFormPeriodeType } from '../../../components/uttak-form/UttakForm';
import { Periodetype } from '../../../types/uttaksplan/periodetyper';
import { PeriodeValideringErrorKey } from '../../../redux/reducers/uttaksplanValideringReducer';
import { Validator } from 'common/lib/validation/types';

const erUtfyltTest = (dato: Date | undefined, skalIkkeHaUttak: boolean): Validator => ({
    test: () => (skalIkkeHaUttak ? true : dato !== undefined),
    failText: { intlKey: PeriodeValideringErrorKey.PÅKREVD_VERDI_MANGLER }
});

const erUttaksdagTest = (dato: Date | undefined) => ({
    test: () => dato !== undefined && Uttaksdagen(dato).erUttaksdag(),
    failText: { intlKey: PeriodeValideringErrorKey.DATO_IKKE_UTTAKSDAG }
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
    if (uttaksperiode.type === Periodetype.Uttak) {
        // const skalIkkeHaUttak =
        //     isForeldrepengerFørFødselUttaksperiode(uttaksperiode) && uttaksperiode.skalIkkeHaUttakFørTermin;
    }
    return true;
};
