import dayjs from 'dayjs';
import { uniqueId } from 'lodash';
import { FormattedMessage } from 'react-intl';

import { Button, HStack, VStack } from '@navikt/ds-react';

import { CalendarPeriod } from '@navikt/fp-ui';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { PeriodeHullType, Planperiode } from '../../types/Planperiode';
import { InfoPanel } from './InfoPanel';
import { type PlanperiodeMedAntallDager } from './Periodeoversikt';

type Props = {
    sammenslåtteValgtePerioder: CalendarPeriod[];
    erMinimert: boolean;
    erKunEnHelEksisterendePeriodeValgt: boolean;
    eksisterendePerioderSomErValgt: PlanperiodeMedAntallDager[];
    oppdaterUttaksplan: (oppdatertePerioder: Planperiode[]) => void;
    setValgtePerioder: React.Dispatch<React.SetStateAction<CalendarPeriod[]>>;
    setErIRedigeringsmodus: React.Dispatch<React.SetStateAction<boolean>>;
    setErMinimert: (erMinimert: boolean) => void;
};

export const InfoOgEnkelRedigeringPanel = ({
    sammenslåtteValgtePerioder,
    erMinimert,
    erKunEnHelEksisterendePeriodeValgt,
    eksisterendePerioderSomErValgt,
    oppdaterUttaksplan,
    setValgtePerioder,
    setErIRedigeringsmodus,
    setErMinimert,
}: Props) => {
    const { erFarEllerMedmor, familiehendelsedato } = useUttaksplanData();

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

    const kanIkkeLeggeTilFerie = sammenslåtteValgtePerioder.some((p) => erFerieIkkeLovlig(p, familiehendelsedato));

    return (
        <InfoPanel
            sammenslåtteValgtePerioder={sammenslåtteValgtePerioder}
            erMinimert={erMinimert}
            eksisterendePerioderSomErValgt={eksisterendePerioderSomErValgt}
            oppdaterUttaksplan={oppdaterUttaksplan}
            setValgtePerioder={setValgtePerioder}
            setErMinimert={setErMinimert}
            erEnkelRedigeringPanel
        >
            <VStack gap="space-12">
                <Button variant="primary" size="small" onClick={() => setErIRedigeringsmodus(true)} type="button">
                    {erKunEnHelEksisterendePeriodeValgt ? (
                        <FormattedMessage id="RedigeringPanel.RedigerUttaksplan" />
                    ) : (
                        <FormattedMessage id="RedigeringPanel.NyUttaksplan" />
                    )}
                </Button>
                <HStack justify="space-between">
                    {!kanIkkeLeggeTilFerie && (
                        <Button variant="secondary" size="small" onClick={leggTilFerie} type="button">
                            <FormattedMessage id="RedigeringPanel.LeggInnFerie" />
                        </Button>
                    )}
                    {kanIkkeLeggeTilFerie && <div />}
                    {eksisterendePerioderSomErValgt.length > 0 && (
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
        </InfoPanel>
    );
};

const erFerieIkkeLovlig = (periode: { fom: string; tom: string }, familiehendelsedato: string): boolean => {
    return dayjs(periode.tom).isBefore(familiehendelsedato);
};
