import { FormattedMessage } from 'react-intl';

import { Alert, BodyShort, VStack } from '@navikt/ds-react';

import { usePeriodeDetaljerAlerts } from '../../../../../regler/alert/informasjonsAlertHooks';
import { useAlleUttakPerioderInklTapteDager } from '../../../../../utils/lagHullPerioder';
import { useKalenderRedigeringContext } from '../../../context/KalenderRedigeringContext';
import { finnValgtePerioder } from '../../../utils/kalenderPeriodeUtils';
import { EksisterendeValgtePerioder } from './EksisterendeValgtePerioder';

interface Props {
    erForskyvEllerErstattPanelvisningPå: boolean;
}

export const PeriodeDetaljerOgInfoMeldinger = ({
    erForskyvEllerErstattPanelvisningPå,
}: Props) => {
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

    return (
        <VStack gap="space-16">
            {eksisterendePerioderSomErValgt.length === 0 && (
                <BodyShort>
                    <FormattedMessage id="RedigeringPanel.NyeDagerForklaring" />
                </BodyShort>
            )}

            {eksisterendePerioderSomErValgt.length > 0 && (
                <EksisterendeValgtePerioder
                    perioder={eksisterendePerioderSomErValgt}
                />
            )}

            {!erForskyvEllerErstattPanelvisningPå && (
                <>
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
                </>
            )}
        </VStack>
    );
};
