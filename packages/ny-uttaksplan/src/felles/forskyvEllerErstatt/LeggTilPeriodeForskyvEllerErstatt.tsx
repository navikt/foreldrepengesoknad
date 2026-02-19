import dayjs from 'dayjs';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Alert, BodyShort, Button, Detail, HStack, Radio, RadioGroup, VStack } from '@navikt/ds-react';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import {
    erDetReadonlyPerioderEtterValgtePerioder,
    erNoenPerioderFørSeksUkerEtterFamiliehendelsesdato,
} from '../../utils/periodeUtils';

interface Props {
    valgtePerioder: Array<{ fom: string; tom: string }>;
    erFerie: boolean;
    setVisEndreEllerForskyvPanel: React.Dispatch<React.SetStateAction<boolean>>;
    leggTilEllerForskyvPeriode: (skalForskyve: boolean) => void;
}

export const LeggTilPeriodeForskyvEllerErstatt = ({
    valgtePerioder,
    erFerie,
    setVisEndreEllerForskyvPanel,
    leggTilEllerForskyvPeriode,
}: Props) => {
    const {
        familiesituasjon,
        familiehendelsedato,
        uttakPerioder,
        erPeriodeneTilAnnenPartLåst,
        foreldreInfo: { søker },
    } = useUttaksplanData();

    const [skalForskyvePeriode, setSkalForskyvePeriode] = useState<boolean | undefined>(undefined);

    const harPeriodeFørFamiliehendelsedato = valgtePerioder.some((p) => dayjs(p.fom).isBefore(familiehendelsedato));
    const harPeriodeFørSeksUkerEtterFamiliehendelsedato = erFerie
        ? erNoenPerioderFørSeksUkerEtterFamiliehendelsesdato(valgtePerioder, familiehendelsedato)
        : false;

    const forelderSomHarLåstePerioder = erPeriodeneTilAnnenPartLåst
        ? søker === 'MOR'
            ? 'FAR_MEDMOR'
            : 'MOR'
        : undefined;
    const harSenerePerioderSomErReadonly = erDetReadonlyPerioderEtterValgtePerioder(
        uttakPerioder,
        valgtePerioder,
        forelderSomHarLåstePerioder,
    );

    return (
        <VStack gap="space-16">
            <RadioGroup
                legend={<FormattedMessage id="RedigeringPanel.HvaSkalSkje" />}
                description={<FormattedMessage id="RedigeringPanel.HvaSkalSkjeBeskrivelse" />}
                onChange={(value: boolean) => setSkalForskyvePeriode(value)}
            >
                <Radio
                    value={true}
                    disabled={
                        harSenerePerioderSomErReadonly ||
                        (familiesituasjon !== 'adopsjon' &&
                            (harPeriodeFørSeksUkerEtterFamiliehendelsedato || harPeriodeFørFamiliehendelsedato))
                    }
                >
                    <VStack gap="space-4">
                        <BodyShort>
                            <FormattedMessage id="RedigeringPanel.FlyttPlanen" />
                        </BodyShort>
                        {skalForskyvePeriode && (
                            <Detail>
                                <FormattedMessage id="RedigeringPanel.FlyttPlanenDetaljer" />
                            </Detail>
                        )}
                    </VStack>
                </Radio>
                <Radio value={false}>
                    <VStack gap="space-4">
                        <BodyShort>
                            <FormattedMessage id="RedigeringPanel.EndrePlanen" />
                        </BodyShort>
                        {skalForskyvePeriode === false && (
                            <Detail>
                                <FormattedMessage id="RedigeringPanel.EndrePlanenDetaljer" />
                            </Detail>
                        )}
                    </VStack>
                </Radio>
            </RadioGroup>
            {harSenerePerioderSomErReadonly && (
                <Alert variant="info">
                    <FormattedMessage id="RedigeringPanel.SenerePerioderReadonly" />
                </Alert>
            )}
            {familiesituasjon !== 'adopsjon' && harPeriodeFørSeksUkerEtterFamiliehendelsedato && (
                <Alert variant="info">
                    <FormattedMessage id="RedigeringPanel.ValgtDagerFørSeksUkerEtterFamDato" />
                </Alert>
            )}
            {familiesituasjon !== 'adopsjon' &&
                !harPeriodeFørSeksUkerEtterFamiliehendelsedato &&
                harPeriodeFørFamiliehendelsedato && (
                    <Alert variant="info">
                        <FormattedMessage id="RedigeringPanel.ValgtDagerFørFamiliehendelsesdato" />
                    </Alert>
                )}
            <HStack justify="space-between">
                <Button
                    type="button"
                    variant="primary"
                    size="small"
                    onClick={() => leggTilEllerForskyvPeriode(skalForskyvePeriode ?? false)}
                    disabled={skalForskyvePeriode === undefined}
                >
                    <FormattedMessage id="RedigeringPanel.Fortsett" />
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    size="small"
                    onClick={() => setVisEndreEllerForskyvPanel(false)}
                >
                    <FormattedMessage id="RedigeringPanel.LukkRedigeringsmodus" />
                </Button>
            </HStack>
        </VStack>
    );
};
