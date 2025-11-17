import { uniqueId } from 'lodash';
import { FormattedMessage, useIntl } from 'react-intl';
import { getTomPeriodeUtenUttakValidator } from 'utils/dateTomValidators';

import { Button, HStack, VStack } from '@navikt/ds-react';

import { CalendarPeriod } from '@navikt/fp-ui';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { PeriodeHullType, Planperiode } from '../../types/Planperiode';
import { getFomPeriodeUtenUttakValidator } from '../../utils/dateFomValidators';
import { type PlanperiodeMedAntallDager } from './EksisterendeValgtePerioder';
import { InfoPanel } from './InfoPanel';
import { usePeriodeValidator } from './valideringshjelper';

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

export const ValgteDagerPanel = ({
    sammenslåtteValgtePerioder,
    erMinimert,
    erKunEnHelEksisterendePeriodeValgt,
    eksisterendePerioderSomErValgt,
    oppdaterUttaksplan,
    setValgtePerioder,
    setErIRedigeringsmodus,
    setErMinimert,
}: Props) => {
    const intl = useIntl();
    const { familiesituasjon } = useUttaksplanData();

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

    const { erFeriePerioderGyldige } = usePeriodeValidator(sammenslåtteValgtePerioder);
    const erFerieValgbart = erFeriePerioderGyldige();

    const periodeUtenUttakValidatorerFom = getFomPeriodeUtenUttakValidator(intl, familiehendelsedato, familiesituasjon);
    const periodeUtenUttakValidatorerTom = getTomPeriodeUtenUttakValidator(intl, familiehendelsedato, familiesituasjon);

    const erSlettValgbart = sammenslåtteValgtePerioder.some(
        (p) => periodeUtenUttakValidatorerFom(p.fom) === null && periodeUtenUttakValidatorerTom(p.tom) === null,
    );

    return (
        <InfoPanel
            sammenslåtteValgtePerioder={sammenslåtteValgtePerioder}
            erMinimert={erMinimert}
            eksisterendePerioderSomErValgt={eksisterendePerioderSomErValgt}
            oppdaterUttaksplan={oppdaterUttaksplan}
            setValgtePerioder={setValgtePerioder}
            setErMinimert={setErMinimert}
            erEnkelRedigeringPanel
            erFerieValgbart={erFerieValgbart}
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
        </InfoPanel>
    );
};
