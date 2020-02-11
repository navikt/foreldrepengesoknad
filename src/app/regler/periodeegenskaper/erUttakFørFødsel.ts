import moment from 'moment';
import { Periode, StønadskontoType, Periodetype } from '../../types/uttaksplan/periodetyper';

export const erUttakFørFødsel = (periode: Periode, familiehendelsesdato: Date): boolean => {
    const { tidsperiode } = periode;
    const tom = tidsperiode && tidsperiode.tom;
    return (
        (periode.type === Periodetype.Uttak && periode.konto === StønadskontoType.ForeldrepengerFørFødsel) ||
        (tom !== undefined && moment(tom).isBefore(familiehendelsesdato, 'day'))
    );
};
