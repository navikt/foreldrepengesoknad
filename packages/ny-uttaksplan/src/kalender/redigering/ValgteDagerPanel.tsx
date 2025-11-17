import { uniqueId } from 'lodash';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button, HStack, VStack } from '@navikt/ds-react';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { PeriodeHullType, Planperiode } from '../../types/Planperiode';
import { getFomPeriodeUtenUttakValidator } from '../../utils/dateFomValidators';
import { getTomPeriodeUtenUttakValidator } from '../../utils/dateTomValidators';
import { RedigeringPanel } from './RedigeringPanel';
import { useKalenderRedigeringContext } from './context/KalenderRedigeringContext';
import { usePeriodeValidator } from './utils/usePeriodeValidator';

export const ValgteDagerPanel = () => {
    const intl = useIntl();

    const { erFarEllerMedmor, familiehendelsedato, familiesituasjon } = useUttaksplanData();

    const {
        sammenslåtteValgtePerioder,
        erKunEnHelEksisterendePeriodeValgt,
        eksisterendePerioderSomErValgt,
        oppdaterUttaksplan,
        setValgtePerioder,
        setErIRedigeringsmodus,
    } = useKalenderRedigeringContext();

    const slettAllePerioder = () => {
        const planperioder = sammenslåtteValgtePerioder.map<Planperiode>((p) => ({
            forelder: erFarEllerMedmor ? 'FAR_MEDMOR' : 'MOR',
            periodeHullÅrsak: PeriodeHullType.PERIODE_UTEN_UTTAK,
            fom: p.fom,
            tom: p.tom,
            readOnly: false,
            id: uniqueId(),
        }));

        oppdaterUttaksplan(planperioder);

        setValgtePerioder([]);
    };

    const leggTilFerie = () => {
        oppdaterUttaksplan(
            sammenslåtteValgtePerioder.map<Planperiode>((p) => ({
                forelder: erFarEllerMedmor ? 'FAR_MEDMOR' : 'MOR',
                fom: p.fom,
                tom: p.tom,
                readOnly: false,
                id: uniqueId(),
                utsettelseÅrsak: 'LOVBESTEMT_FERIE',
            })),
        );

        setValgtePerioder([]);
    };

    const { erFeriePerioderGyldige } = usePeriodeValidator(sammenslåtteValgtePerioder);
    const erFerieValgbart = erFeriePerioderGyldige();

    const periodeUtenUttakValidatorerFom = getFomPeriodeUtenUttakValidator(intl, familiehendelsedato, familiesituasjon);
    const periodeUtenUttakValidatorerTom = getTomPeriodeUtenUttakValidator(intl, familiehendelsedato, familiesituasjon);

    const erSlettValgbart = sammenslåtteValgtePerioder.some(
        (p) => periodeUtenUttakValidatorerFom(p.fom) === null && periodeUtenUttakValidatorerTom(p.tom) === null,
    );

    return (
        <RedigeringPanel kanLeggeTilFerie={!erFerieValgbart}>
            <VStack gap="space-12">
                <Button variant="primary" size="small" onClick={() => setErIRedigeringsmodus(true)} type="button">
                    {erKunEnHelEksisterendePeriodeValgt ? (
                        <FormattedMessage id="RedigeringPanel.RedigerUttaksplan" />
                    ) : (
                        <FormattedMessage id="RedigeringPanel.NyUttaksplan" />
                    )}
                </Button>
                <HStack justify="space-between">
                    {erFerieValgbart && (
                        <Button variant="secondary" size="small" onClick={leggTilFerie} type="button">
                            <FormattedMessage id="RedigeringPanel.LeggInnFerie" />
                        </Button>
                    )}
                    {!erFerieValgbart && <div />}
                    {eksisterendePerioderSomErValgt.length > 0 && erSlettValgbart && (
                        <Button variant="tertiary" size="small" onClick={slettAllePerioder} type="button">
                            {eksisterendePerioderSomErValgt.length === 1 ? (
                                <FormattedMessage id="RedigeringPanel.Slett" />
                            ) : (
                                <FormattedMessage id="RedigeringPanel.SlettAlle" />
                            )}
                        </Button>
                    )}
                </HStack>
            </VStack>
        </RedigeringPanel>
    );
};
