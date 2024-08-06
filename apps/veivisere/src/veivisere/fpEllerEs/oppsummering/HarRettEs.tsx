import { ArrowLeftIcon, StrollerIcon } from '@navikt/aksel-icons';
import { ContextRoutes, FpEllerEsRoutes } from 'appData/routes';
import useVeiviserNavigator from 'appData/useVeiviserNavigator';
import dayjs from 'dayjs';
import { FormattedMessage } from 'react-intl';
import { finnGrunnbeløp } from 'utils/satserUtils';

import { BodyShort, Box, Button, HStack, Heading, VStack } from '@navikt/ds-react';

import { Satser } from '@navikt/fp-types';
import { IconCircleWrapper } from '@navikt/fp-ui';

import { FpEllerEsSituasjon } from '../situasjon/SituasjonSide';
import HvorforHarJegIkkeRettPanel from './boxes/HvorforHarJegIkkeRettPanel';
import HvorforHarJegRettEsPanel from './boxes/HvorforHarJegRettEsPanel';

interface Props {
    fpEllerEsSituasjon: FpEllerEsSituasjon;
    satser: Satser;
}

const HarRettEs: React.FunctionComponent<Props> = ({ fpEllerEsSituasjon, satser }) => {
    const { goToRoute } = useVeiviserNavigator(ContextRoutes.FP_ELLER_ES);

    const grunnbeløpet = finnGrunnbeløp(satser, dayjs());
    const engangsstønad = 'TODO';

    return (
        <VStack gap="8">
            <Box background="surface-alt-3-subtle" padding="4" borderRadius="large">
                <VStack gap="8">
                    <VStack gap="8" align="center">
                        <IconCircleWrapper size="xl" color="blue">
                            <StrollerIcon height={48} width={48} fontSize="1.5rem" aria-hidden />
                        </IconCircleWrapper>
                        <HStack justify="center">
                            <Heading size="medium">
                                <FormattedMessage id="OppsummeringFpEllerEsSide.DuHarRettPåEs" />
                            </Heading>
                        </HStack>
                    </VStack>
                    <Box background="bg-default" padding="4" borderRadius="large">
                        <VStack gap="2">
                            <Heading size="xsmall">
                                <FormattedMessage id="OppsummeringSide.HvaErEs" />
                            </Heading>
                            <BodyShort>
                                <FormattedMessage
                                    id="OppsummeringSide.EsSkalBidra"
                                    values={{ engangsstønad, b: (msg: any) => <b>{msg}</b> }}
                                />
                            </BodyShort>
                        </VStack>
                    </Box>
                </VStack>
            </Box>

            <HStack justify="space-around">
                <Button type="submit">
                    <FormattedMessage id="OppsummeringFpEllerEsSide.SøkOmFp" />
                </Button>
                <Button variant="secondary" type="submit">
                    <FormattedMessage id="OppsummeringFpEllerEsSide.MerOmFp" />
                </Button>
            </HStack>
            <VStack gap="4">
                <HvorforHarJegRettEsPanel fpEllerEsSituasjon={fpEllerEsSituasjon} grunnbeløpet={grunnbeløpet} />
                <HvorforHarJegIkkeRettPanel fpEllerEsSituasjon={fpEllerEsSituasjon} grunnbeløpet={grunnbeløpet} />
            </VStack>
            <HStack>
                <Button
                    variant="secondary"
                    onClick={() => goToRoute(FpEllerEsRoutes.SITUASJON)}
                    icon={<ArrowLeftIcon aria-hidden height={24} width={24} />}
                >
                    <FormattedMessage id="OppsummeringFpEllerEsSide.Tilbake" />
                </Button>
            </HStack>
        </VStack>
    );
};

export default HarRettEs;
