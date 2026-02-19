import dayjs from 'dayjs';
import { FormattedMessage } from 'react-intl';

import { Alert, BodyShort, VStack } from '@navikt/ds-react';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { kanMisteDagerVedEndringTilFerie } from '../../felles/uttaksplanValidatorer';
import { erEøsUttakPeriode, erVanligUttakPeriode } from '../../types/UttaksplanPeriode';
import { useAlleUttakPerioderInklTapteDager } from '../../utils/lagHullPerioder';
import { EksisterendeValgtePerioder } from './EksisterendeValgtePerioder';
import { useKalenderRedigeringContext } from './context/KalenderRedigeringContext';
import { finnValgtePerioder } from './utils/kalenderPeriodeUtils';

interface Props {
    setSkalViseKnapper: (skalViseKnapper: boolean) => void;
}

export const PeriodeDetaljerOgInfoMeldinger = ({ setSkalViseKnapper }: Props) => {
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

    const harPeriodeMedPleiepenger = eksisterendePerioderSomErValgt.some(
        (p) =>
            erVanligUttakPeriode(p) &&
            p.resultat?.innvilget === false &&
            p.resultat.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER',
    );

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
                    setSkalViseKnapper={setSkalViseKnapper}
                />
            )}

            {erAdopsjon && harPeriodeFør && (
                <Alert variant="info" size="small">
                    <FormattedMessage id="RedigeringPanel.AdopsjonPeriodeFørFamiliehendelsedato" />
                </Alert>
            )}

            {eksisterendePerioderSomErValgt.some((p) => erEøsUttakPeriode(p)) && (
                <Alert variant="info" size="small">
                    <FormattedMessage id="RedigeringPanel.IkkeRedigerbarEøsUttakPeriode" />
                </Alert>
            )}

            {harPeriodeMedPleiepenger && (
                <Alert variant="info" size="small">
                    <FormattedMessage id="RedigeringPanel.IkkeRedigerbarGrunnetPleiepenger" />
                </Alert>
            )}

            {søker === 'MOR' &&
                !erAdopsjon &&
                !harPeriodeMedPleiepenger &&
                kanMisteDagerVedEndringTilFerie(sammenslåtteValgtePerioder, familiehendelsedato) && (
                    <Alert variant="info" size="small">
                        <FormattedMessage id="RedigeringPanel.KanMisteDager" />
                    </Alert>
                )}
        </VStack>
    );
};
