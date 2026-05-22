import { useIntl } from 'react-intl';

import { useUttaksplanData } from '../context/UttaksplanDataContext';
import { valider } from '../regler/validering/valider';
import { UttaksperiodeValidatorer } from '../utils/UttaksperiodeValidatorer';
import { LeggTilEllerEndrePeriodeFormFormValues } from './LeggTilEllerEndrePeriodeFellesForm';

export {
    lagStillingsprosentValidator as prosentValideringGradering,
} from '../regler/felt/stillingsprosent';
export {
    lagSamtidigUttaksprosentValidator as valideringSamtidigUttak,
} from '../regler/felt/samtidigUttaksprosent';

export const kanMisteDagerVedEndringTilFerie = (
    perioder: Array<{ fom: string; tom: string }>,
    familiehendelsedato: string,
) => {
    return (
        UttaksperiodeValidatorer.erNoenPerioderInnenforIntervalletFamDatoOgSeksUkerEtterFamDato(
            perioder,
            familiehendelsedato,
        ) ||
        UttaksperiodeValidatorer.erNoenPerioderInnenforIntervalletTreUkerFørFamDatoOgFamDato(
            perioder,
            familiehendelsedato,
        )
    );
};

export const useFormSubmitValidator = <T extends LeggTilEllerEndrePeriodeFormFormValues>() => {
    const intl = useIntl();
    const { familiehendelsedato, familiesituasjon, foreldreInfo, uttakPerioder, termindato, erEndringssøknad } =
        useUttaksplanData();

    return (perioder: Array<{ fom: string; tom: string }>, formValues: T): string | null =>
        valider(
            {
                formValues,
                perioder,
                uttakPerioder,
                familiehendelsedato,
                familiesituasjon,
                termindato,
                foreldreInfo,
                erEndringssøknad,
            },
            intl,
        );
};
