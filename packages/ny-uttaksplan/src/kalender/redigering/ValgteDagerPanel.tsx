import dayjs from 'dayjs';
import { uniqueId } from 'lodash';
import { FormattedMessage } from 'react-intl';

import { Button, HStack, VStack } from '@navikt/ds-react';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { Planperiode } from '../../types/Planperiode';
import { RedigeringPanel } from './RedigeringPanel';
import { useKalenderRedigeringContext } from './context/KalenderRedigeringContext';

export const ValgteDagerPanel = () => {
    const { erFarEllerMedmor, familiehendelsedato, familiesituasjon } = useUttaksplanData();

    const {
        sammenslåtteValgtePerioder,
        erKunEnHelEksisterendePeriodeValgt,
        oppdaterUttaksplan,
        setValgtePerioder,
        setErIRedigeringsmodus,
    } = useKalenderRedigeringContext();

    const leggTilFerie = () => {
        oppdaterUttaksplan(
            sammenslåtteValgtePerioder.map<Planperiode>((p) => ({
                erAnnenPartEøs: false,
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

    const harValgtPeriodeFørFamDato = sammenslåtteValgtePerioder.some((p) =>
        dayjs(p.fom).isBefore(familiehendelsedato),
    );

    return (
        <RedigeringPanel>
            <VStack gap="space-12">
                {!(harValgtPeriodeFørFamDato && familiesituasjon === 'adopsjon') && (
                    <Button variant="primary" size="small" onClick={() => setErIRedigeringsmodus(true)} type="button">
                        {erKunEnHelEksisterendePeriodeValgt ? (
                            <FormattedMessage id="RedigeringPanel.RedigerUttaksplan" />
                        ) : (
                            <FormattedMessage id="RedigeringPanel.NyUttaksplan" />
                        )}
                    </Button>
                )}
                <HStack justify="space-between">
                    <Button variant="secondary" size="small" onClick={leggTilFerie} type="button">
                        <FormattedMessage id="RedigeringPanel.LeggInnFerie" />
                    </Button>
                    <Button type="button" variant="tertiary" size="small" onClick={() => setValgtePerioder([])}>
                        <FormattedMessage id="RedigeringPanel.LukkRedigeringsmodus" />
                    </Button>
                </HStack>
            </VStack>
        </RedigeringPanel>
    );
};
