import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Alert, BodyShort, Button, Detail, HStack, Radio, RadioGroup, VStack } from '@navikt/ds-react';

import { useForskyvEllerErstattAlerts } from '../../regler/alert/informasjonsAlerts';

interface Props {
    valgtePerioder: Array<{ fom: string; tom: string }>;
    erFerie: boolean;
    erGradert: boolean;
    setVisEndreEllerForskyvPanel: (skalVisPanel: boolean) => void;
    leggTilEllerForskyvPeriode: (skalForskyve: boolean) => void;
}

export const LeggTilPeriodeForskyvEllerErstattPanel = ({
    valgtePerioder,
    erFerie,
    erGradert,
    setVisEndreEllerForskyvPanel,
    leggTilEllerForskyvPeriode,
}: Props) => {
    const [skalForskyvePeriode, setSkalForskyvePeriode] = useState<boolean | undefined>(undefined);

    const { senerePerioderReadonly, valgteDagarFørSeksUker, valgteDagarFørFamhend } = useForskyvEllerErstattAlerts({
        valgtePerioder,
        erFerie,
        erGradert,
    });

    const harDisablingAlert = Boolean(senerePerioderReadonly || valgteDagarFørSeksUker || valgteDagarFørFamhend);

    return (
        <VStack gap="space-16">
            <RadioGroup
                legend={<FormattedMessage id="RedigeringPanel.HvaSkalSkje" />}
                description={<FormattedMessage id="RedigeringPanel.HvaSkalSkjeBeskrivelse" />}
                onChange={(value: boolean) => setSkalForskyvePeriode(value)}
            >
                <Radio
                    value={true}
                    disabled={harDisablingAlert}
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
            {senerePerioderReadonly && (
                <Alert variant={senerePerioderReadonly.variant}>
                    <FormattedMessage id={senerePerioderReadonly.meldingId} />
                </Alert>
            )}
            {valgteDagarFørSeksUker && (
                <Alert variant={valgteDagarFørSeksUker.variant}>
                    <FormattedMessage id={valgteDagarFørSeksUker.meldingId} />
                </Alert>
            )}
            {valgteDagarFørFamhend && (
                <Alert variant={valgteDagarFørFamhend.variant}>
                    <FormattedMessage id={valgteDagarFørFamhend.meldingId} />
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
