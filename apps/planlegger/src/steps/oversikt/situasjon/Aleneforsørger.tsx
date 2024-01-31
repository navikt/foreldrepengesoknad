import { PencilIcon } from '@navikt/aksel-icons';
import { BodyLong, BodyShort, Box, Button, HStack, Heading, VStack } from '@navikt/ds-react';
import { notEmpty } from '@navikt/fp-validation';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import BlåSirkel from 'components/ikoner/BlåSirkel';
import Hjerte from 'components/ikoner/Hjerte';
import RosaSirkel from 'components/ikoner/RosaSirkel';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { PeriodeEnum } from 'types/Periode';

const Aleneforsørger: FunctionComponent = () => {
    const valgtPeriode = notEmpty(useContextGetData(ContextDataType.PERIODE));

    return (
        <VStack gap="10">
            <BodyLong size="large">
                <FormattedMessage id="oversikt.ingressDeg" />
            </BodyLong>
            <Box padding="4" borderRadius="large" borderColor="border-alt-3" borderWidth="2">
                <Heading size="small" spacing>
                    <FormattedMessage id="oversikt.valgtTittelDeg" />
                </Heading>

                <HStack align="center" justify="space-between">
                    <BodyLong>
                        {valgtPeriode.periode === PeriodeEnum.HUNDRE && <FormattedMessage id="oversikt.100" />}
                        {valgtPeriode.periode === PeriodeEnum.ÅTTI && <FormattedMessage id="oversikt.80" />}
                    </BodyLong>
                    <Button icon={<PencilIcon aria-hidden />} className="icon-right" />
                </HStack>
            </Box>
            <VStack gap="2">
                <HStack gap="32">
                    <HStack gap="5" align="center">
                        <BlåSirkel />
                        <BodyShort>
                            {valgtPeriode.periode === PeriodeEnum.HUNDRE && (
                                <FormattedMessage id="ukerForeldrepenger.100" />
                            )}
                            {valgtPeriode.periode === PeriodeEnum.ÅTTI && (
                                <FormattedMessage id="ukerForeldrepenger.80" />
                            )}
                        </BodyShort>
                    </HStack>

                    <HStack gap="5" align="center">
                        <Hjerte />
                        <BodyShort>
                            <FormattedMessage id="termindatoIkontekst" />
                        </BodyShort>
                    </HStack>
                </HStack>

                <HStack gap="4">
                    <HStack gap="5" align="center">
                        <RosaSirkel />
                        <BodyShort>
                            <FormattedMessage id="barnehagestartIkontekst" />
                        </BodyShort>
                    </HStack>
                </HStack>
            </VStack>
        </VStack>
    );
};

export default Aleneforsørger;
