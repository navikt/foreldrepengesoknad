import moment from 'moment';
import { Uttaksdagen } from '../../uttaksplan/Uttaksdagen';
import { getPermisjonsregler } from '../../uttaksplan/permisjonsregler';
import { DatoAvgrensninger } from 'common/types';

function sisteMuligePermisjonsdag(familiehendelsedato: Date): Date {
    const permisjonsregler = getPermisjonsregler();
    const startDato = Uttaksdagen(familiehendelsedato).denneEllerNeste();
    return Uttaksdagen(
        moment(startDato)
            .add(permisjonsregler.maksPermisjonslengdeIÅr, 'years')
            .toDate()
    ).denneEllerNeste();
}

const defaultPermisjonsperiodeAvgrensning = (familiehendelsesdato: Date): DatoAvgrensninger => {
    const minDato = Uttaksdagen(familiehendelsesdato).denneEllerNeste();
    const maksDato = sisteMuligePermisjonsdag(familiehendelsesdato);
    return {
        minDato,
        maksDato,
        helgedagerIkkeTillatt: true
    };
};

const startdatoFørTermin = (familiehendelsesdato: Date): DatoAvgrensninger => {
    const permisjonsregler = getPermisjonsregler();
    const maksDato = Uttaksdagen(familiehendelsesdato).forrige();
    const minDato = Uttaksdagen(maksDato).trekkFra(permisjonsregler.maksAntallUkerForeldrepengerFørFødsel * 5 - 1);
    return {
        minDato,
        maksDato,
        helgedagerIkkeTillatt: true
    };
};

const startdatoFørTerminForeldrepengerFørFødselKonto = (familiehendelsesdato: Date): DatoAvgrensninger => {
    const permisjonsregler = getPermisjonsregler();
    const maksDato = Uttaksdagen(familiehendelsesdato).forrige();
    const minDato = Uttaksdagen(maksDato).trekkFra(permisjonsregler.antallUkerForeldrepengerFørFødsel * 5 - 1);
    return {
        minDato,
        maksDato,
        helgedagerIkkeTillatt: true
    };
};

const ekstrauttakFørFødsel = (familiehendelsesdato: Date): DatoAvgrensninger => {
    const permisjonsregler = getPermisjonsregler();
    const sisteDagFørFødsel = Uttaksdagen(familiehendelsesdato).forrige();
    const minDato = Uttaksdagen(sisteDagFørFødsel).trekkFra(
        permisjonsregler.maksAntallUkerForeldrepengerFørFødsel * 5 - 1
    );
    const maksDato = Uttaksdagen(sisteDagFørFødsel).trekkFra(
        permisjonsregler.antallUkerForeldrepengerFørFødsel * 5 - 1
    );
    return {
        minDato,
        maksDato,
        helgedagerIkkeTillatt: true
    };
};

const startdatoPermisjonAleneomsorgFarMedmor = (
    datoForAleneomsorg: Date,
    familiehendelsesdato: Date
): DatoAvgrensninger => {
    return {
        helgedagerIkkeTillatt: true,
        minDato: Uttaksdagen(datoForAleneomsorg).denneEllerNeste(),
        maksDato: sisteMuligePermisjonsdag(familiehendelsesdato)
    };
};

const startdatoPermisjonAdopsjon = (familiehendelsesdato: Date): DatoAvgrensninger => {
    return defaultPermisjonsperiodeAvgrensning(familiehendelsesdato);
};

const morsSisteUttaksdag = (familiehendelsesdato: Date): DatoAvgrensninger => {
    return defaultPermisjonsperiodeAvgrensning(familiehendelsesdato);
};

const startdatoPermisjonFarMedmor = (familiehendelsesdato: Date): DatoAvgrensninger => {
    return defaultPermisjonsperiodeAvgrensning(familiehendelsesdato);
};

export const uttaksplanDatoavgrensninger = {
    startdatoFørTermin,
    morsSisteUttaksdag,
    startdatoPermisjonFarMedmor,
    startdatoPermisjonAdopsjon,
    startdatoPermisjonAleneomsorgFarMedmor,
    startdatoFørTerminForeldrepengerFørFødselKonto,
    ekstrauttakFørFødsel
};
