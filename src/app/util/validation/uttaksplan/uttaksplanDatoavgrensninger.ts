import moment from 'moment';
import { Uttaksdagen } from '../../uttaksplan/Uttaksdagen';
import { Avgrensninger } from 'common/types';
import uttaksConstants from 'app/constants';

function sisteMuligePermisjonsdag(familiehendelsedato: Date): Date {
    const startDato = Uttaksdagen(familiehendelsedato).denneEllerNeste();
    return Uttaksdagen(
        moment(startDato).add(uttaksConstants.MAKS_PERMISJONSLENGDE_I_ÅR, 'years').toDate()
    ).denneEllerNeste();
}

const defaultPermisjonsperiodeAvgrensning = (familiehendelsesdato: Date): Avgrensninger => {
    const minDato = Uttaksdagen(familiehendelsesdato).denneEllerNeste();
    const maksDato = sisteMuligePermisjonsdag(familiehendelsesdato);
    return {
        minDato,
        maksDato,
        helgedagerIkkeTillatt: true,
    };
};

const startdatoFørTermin = (familiehendelsesdato: Date): Avgrensninger => {
    const maksDato = Uttaksdagen(familiehendelsesdato).forrige();
    const minDato = Uttaksdagen(maksDato).trekkFra(uttaksConstants.MAKS_ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5 - 1);
    return {
        minDato,
        maksDato,
        helgedagerIkkeTillatt: true,
    };
};

const startdatoFørTerminForeldrepengerFørFødselKonto = (familiehendelsesdato: Date): Avgrensninger => {
    const maksDato = Uttaksdagen(familiehendelsesdato).forrige();
    const minDato = Uttaksdagen(maksDato).trekkFra(uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5 - 1);
    return {
        minDato,
        maksDato,
        helgedagerIkkeTillatt: true,
    };
};

const ekstrauttakFørFødsel = (familiehendelsesdato: Date): Avgrensninger => {
    const sisteDagFørFødsel = Uttaksdagen(familiehendelsesdato).forrige();
    const minDato = Uttaksdagen(sisteDagFørFødsel).trekkFra(
        uttaksConstants.MAKS_ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5 - 1
    );
    const maksDato = Uttaksdagen(sisteDagFørFødsel).trekkFra(
        uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5 - 1
    );
    return {
        minDato,
        maksDato,
        helgedagerIkkeTillatt: true,
    };
};

const startdatoPermisjonAleneomsorgFarMedmor = (
    datoForAleneomsorg: Date,
    familiehendelsesdato: Date
): Avgrensninger => {
    return {
        helgedagerIkkeTillatt: true,
        minDato: Uttaksdagen(datoForAleneomsorg).denneEllerNeste(),
        maksDato: sisteMuligePermisjonsdag(familiehendelsesdato),
    };
};

const startdatoPermisjonAdopsjon = (familiehendelsesdato: Date): Avgrensninger => {
    return defaultPermisjonsperiodeAvgrensning(familiehendelsesdato);
};

const morsSisteUttaksdag = (familiehendelsesdato: Date): Avgrensninger => {
    return defaultPermisjonsperiodeAvgrensning(familiehendelsesdato);
};

const startdatoPermisjonFarMedmor = (familiehendelsesdato: Date): Avgrensninger => {
    return defaultPermisjonsperiodeAvgrensning(familiehendelsesdato);
};

export const uttaksplanDatoavgrensninger = {
    startdatoFørTermin,
    morsSisteUttaksdag,
    startdatoPermisjonFarMedmor,
    startdatoPermisjonAdopsjon,
    startdatoPermisjonAleneomsorgFarMedmor,
    startdatoFørTerminForeldrepengerFørFødselKonto,
    ekstrauttakFørFødsel,
};
