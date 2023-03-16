import moment from 'moment';
import { FormikErrors } from 'formik';
import { Tidsperiode } from 'app/types/Tidsperiode';
import { Utenlandsopphold, Oppholdstype } from 'app/types/InformasjonOmUtenlandsopphold';
import isEmpty from 'lodash/isEmpty';
import { isISODateString } from 'nav-datovelger';
import { dateToISOFormattedDateString } from 'common/util/datoUtils';

type Oppholdsfeil = FormikErrors<Utenlandsopphold>;

export const getDatoAvgrensninger = (type: Oppholdstype, fom: string, tom: string) => {
    const today = dateToISOFormattedDateString(new Date());

    return type === Oppholdstype.TIDLIGERE_OPPHOLD
        ? {
              fom: {
                  maksDato: dateToISOFormattedDateString(moment.min([moment(today), moment(tom)]).toDate()),
              },
              tom: {
                  minDato: fom,
                  maksDato: today,
              },
          }
        : {
              fom: {
                  minDato: today,
                  maksDato: tom,
              },
              tom: {
                  minDato: dateToISOFormattedDateString(moment.max([moment(today), moment(fom)]).toDate()),
              },
          };
};

const validatePeriode = ({ fom, tom }: Tidsperiode, type: Oppholdstype): Oppholdsfeil => {
    const errors: FormikErrors<Tidsperiode> = {};
    const today = moment().startOf('day');

    if (!fom) {
        errors.fom = 'valideringsfeil.utenlandsopphold.fom.påkrevd';
    } else {
        if (!isISODateString(fom)) {
            errors.fom = 'valideringsfeil.utenlandsopphold.fom.ugyldigDato';
        } else {
            if (type === Oppholdstype.TIDLIGERE_OPPHOLD && moment(fom).isAfter(today)) {
                errors.fom = 'valideringsfeil.tidligereOppholdMåVæreTilbakeITid';
            } else if (type === Oppholdstype.SENERE_OPPHOLD && moment(fom).isBefore(today)) {
                errors.fom = 'valideringsfeil.tidligereOppholdMåVæreFremoverITid';
            }
        }
    }

    if (!tom) {
        errors.tom = 'valideringsfeil.utenlandsopphold.tom.påkrevd';
    } else {
        if (!isISODateString(tom)) {
            errors.tom = 'valideringsfeil.utenlandsopphold.tom.ugyldigDato';
        } else {
            if (moment(tom).isBefore(fom)) {
                errors.tom = 'valideringsfeil.tidsreiserIkkeTillatt';
            }
        }
    }

    return !isEmpty(errors) ? { tidsperiode: errors } : {};
};

const validateOpphold =
    (type: Oppholdstype) =>
    (opphold: Utenlandsopphold): Oppholdsfeil => {
        const errors: Oppholdsfeil = {
            ...validatePeriode(opphold.tidsperiode, type),
        };

        if (opphold.land === '') {
            errors.land = 'valideringsfeil.utenlandsopphold.land.påkrevd';
        }

        return errors;
    };

export default validateOpphold;
