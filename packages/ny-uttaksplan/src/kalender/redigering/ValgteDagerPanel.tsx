import dayjs from 'dayjs';
import { uniqueId } from 'lodash';
import { FormattedMessage } from 'react-intl';

import { Button, HStack, Show, VStack } from '@navikt/ds-react';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { Planperiode } from '../../types/Planperiode';
import { RedigeringPanel } from './RedigeringPanel';
import { useKalenderRedigeringContext } from './context/KalenderRedigeringContext';

export const ValgteDagerPanel = () => {
    const { erFarEllerMedmor } = useUttaksplanData();

    const { sammenslåtteValgtePerioder, oppdaterUttaksplan, setValgtePerioder } = useKalenderRedigeringContext();

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

    return (
        <RedigeringPanel>
            <VStack gap="space-12">
                <Show above="md">
                    <LeggTilOgEndreKnapp />
                </Show>

                <HStack justify="space-between">
                    <Show below="md">
                        <LeggTilOgEndreKnapp />
                    </Show>
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

const LeggTilOgEndreKnapp = () => {
    const { familiehendelsedato, familiesituasjon } = useUttaksplanData();

    const { sammenslåtteValgtePerioder, erKunEnHelEksisterendePeriodeValgt, setErIRedigeringsmodus } =
        useKalenderRedigeringContext();

    const harValgtPeriodeFørFamDato = sammenslåtteValgtePerioder.some((p) =>
        dayjs(p.fom).isBefore(familiehendelsedato),
    );

    if (!(harValgtPeriodeFørFamDato && familiesituasjon === 'adopsjon')) {
        return (
            <Button
                variant="primary"
                size="small"
                onClick={() => setErIRedigeringsmodus(true)}
                type="button"
                className="w-full"
            >
                {erKunEnHelEksisterendePeriodeValgt ? (
                    <FormattedMessage id="RedigeringPanel.RedigerUttaksplan" />
                ) : (
                    <FormattedMessage id="RedigeringPanel.NyUttaksplan" />
                )}
            </Button>
        );
    }

    return null;
};
