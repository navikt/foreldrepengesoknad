import { DatoValidatorer } from '../../../bolker/tidsperiode-bolk/TidsperiodeBolk';
import moment from 'moment';
import { Tidsperiode } from 'common/types';
import { Uttaksdagen } from '../../uttaksplan/Uttaksdagen';
import { UttakFormPeriodeType } from '../../../components/uttak-form/UttakForm';
import { Periodetype, isForeldrepengerFørFødselUttaksperiode } from '../../../types/uttaksplan/periodetyper';
import { PeriodeValideringErrorKey } from '../../../redux/reducers/uttaksplanValideringReducer';
import { Validator } from 'common/lib/validation/types';
import { allValidatorsPass } from 'common/lib/validation/utils/runValidFormValidation';
import { DateValue } from '../../../types/common';
import { uttaksdatoer } from '../../uttaksplan/uttaksdatoer';
import { isValidTidsperiode } from '../../uttaksplan/Tidsperioden';

const erUtfyltTest = (dato: DateValue, skalIkkeHaUttak: boolean): Validator => ({
    test: () => (skalIkkeHaUttak ? true : dato !== undefined),
    failText: { intlKey: `uttaksplan.validering.feil.${PeriodeValideringErrorKey.PÅKREVD_VERDI_MANGLER}` }
});

const erUttaksdagTest = (dato: DateValue) => ({
    test: () => dato !== undefined && Uttaksdagen(dato).erUttaksdag(),
    failText: { intlKey: `uttaksplan.validering.feil.${PeriodeValideringErrorKey.DATO_IKKE_UTTAKSDAG}` }
});

const starterInnenfor12UkerFørTermin = (dato: DateValue, familiehendelsesdato: Date) => ({
    test: () =>
        dato !== undefined &&
        moment(dato).isSameOrAfter(uttaksdatoer(familiehendelsesdato).førsteMuligeUttaksdagFørTermin),
    failText: { intlKey: 'uttaksplan.validering.før12UkerFørTermin' }
});

const slutterInnenforGyldigPermisjonsperiode = (dato: DateValue, familiehendelsesdato: Date) => ({
    test: () =>
        dato !== undefined &&
        moment(dato).isSameOrBefore(uttaksdatoer(familiehendelsesdato).sisteMuligeUttaksdagEtterTermin),
    failText: { intlKey: 'uttaksplan.validering.etterSistePermisjonsdag' }
});

export const getUttakTidsperiodeValidatorer = (
    skalIkkeHaUttak: boolean,
    tidsperiode: Partial<Tidsperiode>,
    familiehendelsesdato: Date
): DatoValidatorer | undefined => {
    if (skalIkkeHaUttak) {
        return undefined;
    }
    return {
        fra: [
            erUtfyltTest(tidsperiode.fom, skalIkkeHaUttak),
            erUttaksdagTest(tidsperiode.fom),
            starterInnenfor12UkerFørTermin(tidsperiode.fom, familiehendelsesdato)
        ],
        til: [
            erUtfyltTest(tidsperiode.tom, skalIkkeHaUttak),
            erUttaksdagTest(tidsperiode.tom),
            slutterInnenforGyldigPermisjonsperiode(tidsperiode.tom, familiehendelsesdato)
        ]
    };
};

export const uttakTidsperiodeErGyldig = (uttaksperiode: UttakFormPeriodeType, familiehendelsesdato: Date): boolean => {
    const { tidsperiode } = uttaksperiode;
    if (tidsperiode !== undefined && uttaksperiode.type === Periodetype.Uttak) {
        const skalIkkeHaUttak = isForeldrepengerFørFødselUttaksperiode(uttaksperiode)
            ? uttaksperiode.skalIkkeHaUttakFørTermin
            : false;

        if (isValidTidsperiode(tidsperiode) === false) {
            return false;
        }

        const validators = getUttakTidsperiodeValidatorer(
            skalIkkeHaUttak,
            tidsperiode as Tidsperiode,
            familiehendelsesdato
        );
        if (validators === undefined) {
            return true;
        }
        const fraDatoErGyldig = allValidatorsPass(validators.fra);
        const tilDatoErGyldig = allValidatorsPass(validators.til);

        return fraDatoErGyldig && tilDatoErGyldig;
    }
    return true;
};
