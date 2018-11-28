import moment from 'moment';
import { Periodetype, StønadskontoType, Periode } from '../types/uttaksplan/periodetyper';

export const erUttakFørFødsel = (periode: Periode, familiehendelsesdato: Date): boolean => {
    const { tidsperiode } = periode;
    const tom = tidsperiode && tidsperiode.tom;
    return (
        (periode.type === Periodetype.Uttak && periode.konto === StønadskontoType.ForeldrepengerFørFødsel) ||
        (tom && moment(tom).isBefore(familiehendelsesdato, 'day'))
    );
};

const Perioderegler = {
    erUttakFørFødsel
};

export default Perioderegler;
