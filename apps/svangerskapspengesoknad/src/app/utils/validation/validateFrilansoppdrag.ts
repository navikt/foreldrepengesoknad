import { FormikErrors } from 'formik';
import { FrilansOppdrag } from 'app/types/FrilansInformasjon';
import { isISODateString } from 'nav-datovelger';

type FrilansoppdragFeil = FormikErrors<FrilansOppdrag>;

const validateFrilansoppdrag =
    () =>
    (frilansOppdrag: Partial<FrilansOppdrag>): FrilansoppdragFeil => {
        const errors: FrilansoppdragFeil = {};

        if (frilansOppdrag.navnPåArbeidsgiver === undefined || frilansOppdrag.navnPåArbeidsgiver === '') {
            errors.navnPåArbeidsgiver = 'valideringsfeil.frilans.navnPåArbeidsgiver.påkrevd';
        }

        if (frilansOppdrag.navnPåArbeidsgiver !== undefined && frilansOppdrag.navnPåArbeidsgiver.length > 100) {
            errors.navnPåArbeidsgiver = 'valideringsfeil.frilans.navnPåArbeidsgiver.max100Tegn';
        }

        if (
            frilansOppdrag.tidsperiode === undefined ||
            (frilansOppdrag.tidsperiode !== undefined && frilansOppdrag.tidsperiode.fom === undefined)
        ) {
            errors.tidsperiode = { fom: 'valideringsfeil.frilans.fom.påkrevd' };
        }

        if (frilansOppdrag.tidsperiode !== undefined && !isISODateString(frilansOppdrag.tidsperiode.fom)) {
            errors.tidsperiode = { fom: 'valideringsfeil.frilans.fom.ugyldigDato' };
        }

        return errors;
    };
export default validateFrilansoppdrag;
