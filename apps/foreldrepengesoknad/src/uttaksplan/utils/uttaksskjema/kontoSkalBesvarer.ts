import { TidsperiodeDate } from '@navikt/fp-common';
import { isValidTidsperiode } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { andreAugust2022ReglerGjelder } from 'app/utils/dateUtils';
import dayjs from 'dayjs';
import { Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoUttak } from 'uttaksplan/types/StønadskontoUttak';

const kontoSkalBesvares = (
    periodetype: Periodetype,
    tidsperiode: TidsperiodeDate,
    stønadskontoer: StønadskontoUttak[],
    familiehendelsesdato: Date,
    erFarEllerMedmor: boolean
): boolean => {
    if (
        !isValidTidsperiode(tidsperiode) ||
        stønadskontoer.length === 0 ||
        (andreAugust2022ReglerGjelder(familiehendelsesdato) &&
            periodetype === Periodetype.Uttak &&
            erFarEllerMedmor &&
            dayjs(tidsperiode.fom).isBefore(familiehendelsesdato, 'day'))
    ) {
        return false;
    }

    return true;
};

export default kontoSkalBesvares;
