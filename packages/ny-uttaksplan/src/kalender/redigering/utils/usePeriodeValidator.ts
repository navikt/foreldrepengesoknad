import { useCallback } from 'react';
import { useIntl } from 'react-intl';

import { BrukerRolleSak_fpoversikt, KontoTypeUttak } from '@navikt/fp-types';

import { useUttaksplanData } from '../../../context/UttaksplanDataContext';
import { getFomDiverseValidators, getFomFerieValidators } from '../../../utils/dateFomValidators';
import { getMaxDate, getMinDate } from '../../../utils/dateLimits';
import { getTomDiverseValidators, getTomFerieValidators } from '../../../utils/dateTomValidators';

type Periode = {
    fom: string;
    tom: string;
};

export const usePeriodeValidator = (perioder: Periode[]) => {
    const intl = useIntl();
    const { familiehendelsedato, familiesituasjon } = useUttaksplanData();

    const finnPerioderGyldigeFeilmeldinger = useCallback(
        (
            kontoType?: KontoTypeUttak,
            samtidigUttak?: boolean,
            skalDuJobbe?: boolean,
            forelder?: BrukerRolleSak_fpoversikt,
        ) => {
            const minDate = getMinDate({
                årsak: undefined,
                kontoType: kontoType,
                familiehendelsedato,
                gjelderAdopsjon: familiesituasjon === 'adopsjon',
            });
            const maxDate = getMaxDate({ familiehendelsedato, kontoType: kontoType, årsak: undefined });

            const fomValidators = getFomDiverseValidators(
                intl,
                familiehendelsedato,
                familiesituasjon,
                minDate,
                maxDate,
                samtidigUttak,
                kontoType,
                skalDuJobbe,
                forelder,
            );
            const tomValidators = getTomDiverseValidators(
                intl,
                familiehendelsedato,
                familiesituasjon,
                minDate,
                maxDate,
                skalDuJobbe,
                samtidigUttak,
                forelder,
                kontoType,
            );

            return perioder.flatMap((p) => {
                const fomFeilmeldinger = fomValidators.map((validator) => validator(p.fom));
                const tomFeilmeldinger = tomValidators.map((validator) => validator(p.tom));
                return fomFeilmeldinger.concat(tomFeilmeldinger).filter((v) => v !== null);
            });
        },
        [familiehendelsedato, familiesituasjon, intl, perioder],
    );

    const finnFeriePeriodeFeilmeldinger = useCallback(() => {
        const ferieValidatorerFom = getFomFerieValidators(intl, familiehendelsedato, familiesituasjon);
        const ferieValidatorerTom = getTomFerieValidators(intl, familiehendelsedato, familiesituasjon);

        return perioder.flatMap((p) => {
            const fomFeilmeldinger = ferieValidatorerFom.map((validator) => validator(p.fom));
            const tomFeilmeldinger = ferieValidatorerTom.map((validator) => validator(p.tom));
            return fomFeilmeldinger.concat(tomFeilmeldinger).filter((v) => v !== null);
        });
    }, [familiehendelsedato, familiesituasjon, intl, perioder]);

    return {
        finnPerioderGyldigeFeilmeldinger,
        erPerioderGyldige: (kontoType?: KontoTypeUttak, samtidigUttak?: boolean) =>
            finnPerioderGyldigeFeilmeldinger(kontoType, samtidigUttak).length === 0,
        finnFeriePeriodeFeilmeldinger,
        erFeriePerioderGyldige: () => finnFeriePeriodeFeilmeldinger().length === 0,
    };
};
