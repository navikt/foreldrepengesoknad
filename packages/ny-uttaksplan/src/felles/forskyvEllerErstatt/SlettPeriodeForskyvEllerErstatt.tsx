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
    avbryt: () => void;
    fjernPeriode: (skalForskyveBakover: boolean) => void;
}

export const SlettPeriodeForskyvEllerErstatt = ({ valgtePerioder, avbryt, fjernPeriode }: Props) => {
    const {
        familiesituasjon,
        erPeriodeneTilAnnenPartLåst,
        uttakPerioder,
        foreldreInfo: { søker },
        familiehendelsedato,
    } = useUttaksplanData();

    const [skalForskyvePeriode, setSkalForskyvePeriode] = useState<boolean | undefined>(undefined);

    const harPeriodeFørSeksUkerEtterFamiliehendelsedato = erNoenPerioderFørSeksUkerEtterFamiliehendelsesdato(
        valgtePerioder,
        familiehendelsedato,
    );

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
                legend={<FormattedMessage id="RedigeringPanel.HvaSkalSkjeSlette" />}
                description={<FormattedMessage id="RedigeringPanel.HvaSkalSkjeSletteBeskrivelse" />}
                onChange={(value: boolean) => setSkalForskyvePeriode(value)}
            >
                <Radio
                    value={true}
                    disabled={
                        harSenerePerioderSomErReadonly ||
                        (familiesituasjon !== 'adopsjon' && harPeriodeFørSeksUkerEtterFamiliehendelsedato)
                    }
                >
                    <VStack gap="space-4">
                        <BodyShort>
                            <FormattedMessage id="RedigeringPanel.SlettFlyttPlanen" />
                        </BodyShort>
                        {skalForskyvePeriode && (
                            <Detail>
                                <FormattedMessage id="RedigeringPanel.SlettFlyttPlanenDetaljer" />
                            </Detail>
                        )}
                    </VStack>
                </Radio>
                <Radio value={false}>
                    <VStack gap="space-4">
                        <BodyShort>
                            <FormattedMessage id="RedigeringPanel.SlettEndrePlanen" />
                        </BodyShort>
                        {skalForskyvePeriode === false && (
                            <Detail>
                                <FormattedMessage id="RedigeringPanel.SlettEndrePlanenDetaljer" />
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
            <HStack justify="space-between">
                <Button
                    type="button"
                    variant="primary"
                    size="small"
                    onClick={() => {
                        fjernPeriode(skalForskyvePeriode ?? false);
                    }}
                    disabled={skalForskyvePeriode === undefined}
                >
                    <FormattedMessage id="RedigeringPanel.Fortsett" />
                </Button>
                <Button type="button" variant="secondary" size="small" onClick={avbryt}>
                    <FormattedMessage id="RedigeringPanel.LukkRedigeringsmodus" />
                </Button>
            </HStack>
        </VStack>
    );
};
