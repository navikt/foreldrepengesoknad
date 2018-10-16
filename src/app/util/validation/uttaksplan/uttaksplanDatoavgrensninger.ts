import { Avgrensninger } from 'nav-datovelger';
import moment from 'moment';
import { Uttaksdagen } from '../../uttaksplan/Uttaksdagen';
import { getPermisjonsregler } from '../../uttaksplan/permisjonsregler';

function sisteMuligePermisjonsdag(familiehendelsedato: Date): Date {
    const permisjonsregler = getPermisjonsregler();
    const startDato = Uttaksdagen(familiehendelsedato).denneEllerNeste();
    return Uttaksdagen(
        moment(startDato)
            .add(permisjonsregler.maksPermisjonslengdeIÅr, 'years')
            .toDate()
    ).denneEllerNeste();
}

const defaultPermisjonsperiodeAvgrensning = (familiehendelsesdato: Date): Avgrensninger => {
    const minDato = Uttaksdagen(familiehendelsesdato).denneEllerNeste();
    const maksDato = sisteMuligePermisjonsdag(familiehendelsesdato);
    return {
        minDato,
        maksDato,
        helgedagerIkkeTillatt: true
    };
};

const startdatoFørTermin = (familiehendelsesdato: Date): Avgrensninger => {
    const permisjonsregler = getPermisjonsregler();
    const maksDato = Uttaksdagen(familiehendelsesdato).forrige();
    const minDato = Uttaksdagen(maksDato).trekkFra(permisjonsregler.maksAntallUkerForeldrepengerFørFødsel * 5 - 1);
    return {
        minDato,
        maksDato,
        helgedagerIkkeTillatt: true
    };
};

const startdatoFørTerminForeldrepengerFørFødselKonto = (familiehendelsesdato: Date): Avgrensninger => {
    const permisjonsregler = getPermisjonsregler();
    const maksDato = Uttaksdagen(familiehendelsesdato).forrige();
    const minDato = Uttaksdagen(maksDato).trekkFra(permisjonsregler.antallUkerForeldrepengerFørFødsel * 5 - 1);
    return {
        minDato,
        maksDato,
        helgedagerIkkeTillatt: true
    };
};

const startdatoPermisjonVedAdopsjon = (familiehendelsesdato: Date): Avgrensninger => {
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
    startdatoPermisjonVedAdopsjon,
    morsSisteUttaksdag,
    startdatoPermisjonFarMedmor,
    startdatoFørTerminForeldrepengerFørFødselKonto
};
