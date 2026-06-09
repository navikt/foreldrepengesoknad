import { FormattedMessage } from 'react-intl';

import { Alert, BodyShort, VStack } from '@navikt/ds-react';

import { TapteDagerForklaring } from '../../../../../felles/TapteDagerForklaring';
import { usePeriodeDetaljerAlerts } from '../../../../../regler/alert/informasjonsAlertHooks';
import { useAlleUttakPerioderInklTapteDager } from '../../../../../utils/lagHullPerioder';
import { useKalenderRedigeringContext } from '../../../context/KalenderRedigeringContext';
import { finnValgtePerioder } from '../../../utils/kalenderPeriodeUtils';
import { EksisterendeValgtePerioder } from './EksisterendeValgtePerioder';

export const PeriodeDetaljerOgInfoMeldinger = () => {
    const { sammenslåtteValgtePerioder } = useKalenderRedigeringContext();

    const uttakPerioderInkludertTapteDager = useAlleUttakPerioderInklTapteDager();

    const eksisterendePerioderSomErValgt = finnValgtePerioder(
        sammenslåtteValgtePerioder,
        uttakPerioderInkludertTapteDager,
    );

    const { adopsjonFørFamhend, eøs, pleiepenger, kanMisteDager } = usePeriodeDetaljerAlerts({
        sammenslåtteValgtePerioder,
        eksisterendePerioderSomErValgt,
    });

    const tapteDagerFom = [...sammenslåtteValgtePerioder]
        .map((p) => p.fom)
        .sort((a, b) => a.localeCompare(b))[0];

    return (
        <VStack gap="space-16">
            {eksisterendePerioderSomErValgt.length === 0 && (
                <>
                    <BodyShort>
                        <FormattedMessage id="RedigeringPanel.NyeDagerForklaring" />
                    </BodyShort>
                    {tapteDagerFom && <TapteDagerForklaring fom={tapteDagerFom} />}
                </>
            )}

            {eksisterendePerioderSomErValgt.length > 0 && (
                <EksisterendeValgtePerioder
                    perioder={eksisterendePerioderSomErValgt}
                />
            )}

            {adopsjonFørFamhend && (
                <Alert variant={adopsjonFørFamhend.variant} size="small">
                    {adopsjonFørFamhend.melding}
                </Alert>
            )}

            {eøs && (
                <Alert variant={eøs.variant} size="small">
                    {eøs.melding}
                </Alert>
            )}

            {pleiepenger && (
                <Alert variant={pleiepenger.variant} size="small">
                    {pleiepenger.melding}
                </Alert>
            )}

            {kanMisteDager && (
                <Alert variant={kanMisteDager.variant} size="small">
                    {kanMisteDager.melding}
                </Alert>
            )}
        </VStack>
    );
};
