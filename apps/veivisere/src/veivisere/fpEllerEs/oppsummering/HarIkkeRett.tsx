import { ArrowLeftIcon, InformationIcon, KronerIcon, StrollerIcon } from '@navikt/aksel-icons';
import { ContextRoutes, FpEllerEsRoutes } from 'appData/routes';
import useVeiviserNavigator from 'appData/useVeiviserNavigator';
import dayjs from 'dayjs';
import { FormattedMessage } from 'react-intl';
import { finnGrunnbeløp } from 'utils/satserUtils';

import { BodyShort, Box, Button, HStack, Heading, VStack } from '@navikt/ds-react';

import { Satser } from '@navikt/fp-types';
import { IconCircleWrapper, Infobox } from '@navikt/fp-ui';

import { FpEllerEsSituasjon } from '../situasjon/SituasjonSide';
import HvorforHarJegIkkeRettEsPanel from './boxes/HvorforHarJegIkkeRettEsPanel';
import HvorforHarJegIkkeRettPanel from './boxes/HvorforHarJegIkkeRettPanel';

interface Props {
    fpEllerEsSituasjon: FpEllerEsSituasjon;
    satser: Satser;
}

const HarIkkeRett: React.FunctionComponent<Props> = ({ fpEllerEsSituasjon, satser }) => {
    const { goToRoute } = useVeiviserNavigator(ContextRoutes.FP_ELLER_ES);

    const grunnbeløpet = finnGrunnbeløp(satser, dayjs());

    return (
        <VStack gap="8">
            <Box background="surface-alt-3-subtle" padding="4" borderRadius="large">
                <VStack gap="8">
                    <VStack gap="8" align="center">
                        <IconCircleWrapper size="xl" color="blue">
                            <StrollerIcon height={48} width={48} fontSize="1.5rem" aria-hidden />
                        </IconCircleWrapper>
                        <HStack justify="center">
                            <Heading size="medium" align="center">
                                <FormattedMessage id="OppsummeringFpEllerEsSide.DuHarIkkeRett" />
                            </Heading>
                        </HStack>
                    </VStack>
                    <Box
                        background="surface-alt-3-subtle"
                        borderColor="border-info"
                        borderWidth="2"
                        padding="4"
                        borderRadius="large"
                    >
                        <VStack gap="4">
                            <HStack gap="8" justify="space-between" wrap={false}>
                                <BodyShort>
                                    <FormattedMessage id="OppsummeringFpEllerEsSide.FpSkalErstatteInntekt" />
                                </BodyShort>
                                <IconCircleWrapper size="medium" color="blue">
                                    <KronerIcon height={24} width={24} color="#236B7D" fontSize="1.5rem" aria-hidden />
                                </IconCircleWrapper>
                            </HStack>
                        </VStack>
                    </Box>
                </VStack>
            </Box>
            <Infobox
                icon={<InformationIcon height={24} width={24} color="#020C1CAD" fontSize="1.5rem" aria-hidden />}
                color="gray"
            >
                <BodyShort>
                    <FormattedMessage id="OppsummeringFpEllerEsSide.KanOgsåHarRettTilEs" />
                </BodyShort>
            </Infobox>
            <HStack justify="space-around">
                <Button type="submit">
                    <FormattedMessage id="OppsummeringFpEllerEsSide.SøkOmFp" />
                </Button>
                <Button variant="secondary" type="submit">
                    <FormattedMessage id="OppsummeringFpEllerEsSide.MerOmFp" />
                </Button>
            </HStack>
            <VStack gap="4">
                <HvorforHarJegIkkeRettEsPanel fpEllerEsSituasjon={fpEllerEsSituasjon} grunnbeløpet={grunnbeløpet} />
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

export default HarIkkeRett;
