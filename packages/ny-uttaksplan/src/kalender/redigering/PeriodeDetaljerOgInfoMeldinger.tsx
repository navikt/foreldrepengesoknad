import dayjs from 'dayjs';
import { FormattedMessage } from 'react-intl';

import { Alert, BodyShort, VStack } from '@navikt/ds-react';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { useAlleSaksperioderInklTapteDager } from '../../utils/lagHullPerioder';
import { EksisterendeValgtePerioder } from './EksisterendeValgtePerioder';
import { useKalenderRedigeringContext } from './context/KalenderRedigeringContext';
import { finnValgtePerioder } from './utils/kalenderPeriodeUtils';
import { usePeriodeValidator } from './utils/usePeriodeValidator';

export const PeriodeDetaljerOgInfoMeldinger = () => {
    const {
        familiehendelsedato,
        familiesituasjon,
        foreldreInfo: { søker },
    } = useUttaksplanData();

    const erAdopsjon = familiesituasjon === 'adopsjon';

    const { sammenslåtteValgtePerioder } = useKalenderRedigeringContext();

    const harPeriodeFør = sammenslåtteValgtePerioder.some((p) => dayjs(p.fom).isBefore(familiehendelsedato));
    const harPeriodeEtter = sammenslåtteValgtePerioder.some((p) => dayjs(p.tom).isSameOrAfter(familiehendelsedato));
    const harPeriodeFørEllerEtter = harPeriodeFør || harPeriodeEtter;

    const harKunValgtPerioderMerEnnTreUkerFørFamiliehendelsedato = !sammenslåtteValgtePerioder.some((periode) =>
        dayjs(periode.tom).isAfter(dayjs(familiehendelsedato).subtract(22, 'days')),
    );

    const { erFeriePerioderGyldige } = usePeriodeValidator(sammenslåtteValgtePerioder);
    const erFerieValgbart = erFeriePerioderGyldige();

    const saksperioderInkludertHull = useAlleSaksperioderInklTapteDager();

    const eksisterendePerioderSomErValgt = finnValgtePerioder(sammenslåtteValgtePerioder, saksperioderInkludertHull);

    return (
        <VStack gap="space-16">
            {eksisterendePerioderSomErValgt.length > 0 && (
                <BodyShort>
                    <FormattedMessage
                        id="RedigeringPanel.EksisterendePerioder"
                        values={{ antall: eksisterendePerioderSomErValgt.length }}
                    />
                </BodyShort>
            )}
            {eksisterendePerioderSomErValgt.length === 0 && (
                <BodyShort>
                    <FormattedMessage id="RedigeringPanel.NyeDagerForklaring" />
                </BodyShort>
            )}

            {eksisterendePerioderSomErValgt.length > 0 && (
                <EksisterendeValgtePerioder perioder={eksisterendePerioderSomErValgt} />
            )}

            {erAdopsjon && harPeriodeFør && (
                <Alert variant="info" size="small">
                    <FormattedMessage id="RedigeringPanel.AdopsjonPeriodeFørFamiliehendelsedato" />
                </Alert>
            )}

            {!erAdopsjon &&
                søker !== 'FAR_ELLER_MEDMOR' &&
                !erFerieValgbart &&
                harPeriodeFørEllerEtter &&
                !harKunValgtPerioderMerEnnTreUkerFørFamiliehendelsedato && (
                    <Alert variant="info" size="small">
                        <FormattedMessage id="RedigeringPanel.KanMisteDager" />
                    </Alert>
                )}
        </VStack>
    );
};
