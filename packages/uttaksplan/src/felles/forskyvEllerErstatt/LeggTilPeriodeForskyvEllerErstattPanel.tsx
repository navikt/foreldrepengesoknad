import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Alert, BodyShort, Button, Detail, HStack, Radio, RadioGroup, VStack } from '@navikt/ds-react';

import { useForskyvEllerErstattAlerts } from '../../regler/alert/informasjonsAlertHooks';

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

    const { senerePerioderReadonly, valgteDagerFørSeksUker, valgteDagerFørFamhend } = useForskyvEllerErstattAlerts({
        valgtePerioder,
        erFerie,
        erGradert,
    });

    const harDisablingAlert = Boolean(senerePerioderReadonly || valgteDagerFørSeksUker || valgteDagerFørFamhend);

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
            {valgteDagerFørSeksUker && (
                <Alert variant={valgteDagerFørSeksUker.variant}>
                    <FormattedMessage id={valgteDagerFørSeksUker.meldingId} />
                </Alert>
            )}
            {valgteDagerFørFamhend && (
                <Alert variant={valgteDagerFørFamhend.variant}>
                    <FormattedMessage id={valgteDagerFørFamhend.meldingId} />
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
