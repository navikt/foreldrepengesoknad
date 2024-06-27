import { ArrowLeftIcon, CalculatorIcon, InformationIcon } from '@navikt/aksel-icons';
import { ContextRoutes, FpEllerEsRoutes } from 'appData/routes';
import useVeiviserNavigator from 'appData/useVeiviserNavigator';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';
import { finnGrunnbeløp } from 'utils/satserUtils';
import useScrollBehaviour from 'utils/useScrollBehaviour';

import { BodyShort, Box, Button, HStack, Heading, VStack } from '@navikt/ds-react';

import { Satser } from '@navikt/fp-types';
import { Infobox } from '@navikt/fp-ui';

import VeiviserPage from '../../felles/VeiviserPage';
import { FpEllerEsSituasjon } from '../situasjon/SituasjonSide';
import HvorMyeOgHvaSkjerNåLinkPanel from './HvorMyeOgHvaSkjerNåLinkPanel';
import HvorforHarJegRettPanel from './HvorforHarJegRettPanel';

interface Props {
    fpEllerEsSituasjon: FpEllerEsSituasjon;
    satser: Satser;
}

const OppsummeringFpEllerEsSide: React.FunctionComponent<Props> = ({ fpEllerEsSituasjon, satser }) => {
    const intl = useIntl();
    const { goToRoute } = useVeiviserNavigator(ContextRoutes.FP_ELLER_ES);
    const { ref } = useScrollBehaviour();

    const grunnbeløpet = finnGrunnbeløp(satser, dayjs());

    return (
        <>
            <VeiviserPage
                ref={ref}
                label={intl.formatMessage({ id: 'OppsummeringFpEllerEsSide.Oppsummering' })}
                icon={<CalculatorIcon title="a11y-title" fontSize="1.5rem" aria-hidden />}
            >
                <VStack gap="8">
                    <Box background="surface-alt-3-subtle" padding="4" borderRadius="large">
                        <VStack gap="10">
                            <HStack justify="center">
                                <Heading size="large">
                                    <FormattedMessage id="OppsummeringFpEllerEsSide.DuHarRett" />
                                </Heading>
                            </HStack>
                            <Box background="bg-default" padding="4" borderRadius="large">
                                <VStack gap="2">
                                    <Heading size="xsmall">
                                        <FormattedMessage id="OppsummeringFpEllerEsSide.HvaErFp" />
                                    </Heading>
                                    <BodyShort>
                                        <FormattedMessage id="OppsummeringFpEllerEsSide.FpSkalErstatteInntekt" />
                                    </BodyShort>
                                </VStack>
                            </Box>
                        </VStack>
                    </Box>
                    <Infobox
                        isGray
                        icon={
                            <InformationIcon height={24} width={24} color="#020C1CAD" fontSize="1.5rem" aria-hidden />
                        }
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
                    <HvorforHarJegRettPanel fpEllerEsSituasjon={fpEllerEsSituasjon} grunnbeløpet={grunnbeløpet} />
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
            </VeiviserPage>
            <HvorMyeOgHvaSkjerNåLinkPanel />
        </>
    );
};

export default OppsummeringFpEllerEsSide;
