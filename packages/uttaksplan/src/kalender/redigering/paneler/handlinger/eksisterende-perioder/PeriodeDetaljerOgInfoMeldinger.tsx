import { FormattedMessage } from 'react-intl';

import { Alert, BodyShort, VStack } from '@navikt/ds-react';

import { TapteDagerForklaring } from '../../../../../felles/TapteDagerForklaring';
import { usePeriodeDetaljerAlerts } from '../../../../../regler/alert/informasjonsAlertHooks';
import { erTapteDagerHull } from '../../../../../types/UttaksplanPeriode';
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

    const { adopsjonFørFamhend, eøs, pleiepenger, kanMisteDager, ferieUke7EtterTermin } = usePeriodeDetaljerAlerts({
        sammenslåtteValgtePerioder,
        eksisterendePerioderSomErValgt,
    });

    // Forklaringen skal kun vises når de valgte dagene faktisk overlapper et
    // «dager du kan miste»-hull, ikke for vilkårlige nye dager.
    const valgteTapteDagerHull = uttakPerioderInkludertTapteDager
        .filter(erTapteDagerHull)
        .filter((hull) => sammenslåtteValgtePerioder.some((valgt) => valgt.fom <= hull.tom && valgt.tom >= hull.fom));

    const tapteDagerFom = valgteTapteDagerHull.map((hull) => hull.fom).sort((a, b) => a.localeCompare(b))[0];

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
                <EksisterendeValgtePerioder perioder={eksisterendePerioderSomErValgt} />
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

            {ferieUke7EtterTermin && (
                <Alert variant={ferieUke7EtterTermin.variant} size="small">
                    {ferieUke7EtterTermin.melding}
                </Alert>
            )}
        </VStack>
    );
};
