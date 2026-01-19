import dayjs from 'dayjs';
import { FormattedMessage } from 'react-intl';

import { Alert, BodyShort, VStack } from '@navikt/ds-react';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { kanMisteDagerVedEndringTilFerie } from '../../felles/validators';
import { useAlleUttakPerioderInklTapteDager } from '../../utils/lagHullPerioder';
import { EksisterendeValgtePerioder } from './EksisterendeValgtePerioder';
import { useKalenderRedigeringContext } from './context/KalenderRedigeringContext';
import { finnValgtePerioder } from './utils/kalenderPeriodeUtils';

export const PeriodeDetaljerOgInfoMeldinger = () => {
    const {
        familiehendelsedato,
        familiesituasjon,
        foreldreInfo: { søker },
    } = useUttaksplanData();

    const erAdopsjon = familiesituasjon === 'adopsjon';

    const { sammenslåtteValgtePerioder } = useKalenderRedigeringContext();

    const harPeriodeFør = sammenslåtteValgtePerioder.some((p) => dayjs(p.fom).isBefore(familiehendelsedato));

    const uttakPerioderInkludertTapteDager = useAlleUttakPerioderInklTapteDager();

    const eksisterendePerioderSomErValgt = finnValgtePerioder(
        sammenslåtteValgtePerioder,
        uttakPerioderInkludertTapteDager,
    );

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

            {søker === 'MOR' &&
                !erAdopsjon &&
                kanMisteDagerVedEndringTilFerie(sammenslåtteValgtePerioder, familiehendelsedato) && (
                    <Alert variant="info" size="small">
                        <FormattedMessage id="RedigeringPanel.KanMisteDager" />
                    </Alert>
                )}
        </VStack>
    );
};
