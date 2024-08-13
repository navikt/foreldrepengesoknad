import { ArrowLeftIcon, BabyWrappedIcon, InformationIcon, StrollerIcon } from '@navikt/aksel-icons';
import { ContextRoutes, FpEllerEsRoutes } from 'appData/routes';
import useVeiviserNavigator from 'appData/useVeiviserNavigator';
import dayjs from 'dayjs';
import { FormattedMessage } from 'react-intl';
import { finnEngangsstønad, finnGrunnbeløp } from 'utils/satserUtils';

import { BodyShort, Box, Button, HStack, Heading, VStack } from '@navikt/ds-react';

import { Satser } from '@navikt/fp-types';
import { IconCircleWrapper, Infobox } from '@navikt/fp-ui';
import { formatCurrency } from '@navikt/fp-utils';

import { FpEllerEsSituasjon } from '../situasjon/SituasjonSide';
import HvorforHarJegRettEsPanel from './boxes/HvorforHarJegRettEsPanel';
import HvorforHarJegRettPanel from './boxes/HvorforHarJegRettPanel';

interface Props {
    fpEllerEsSituasjon: FpEllerEsSituasjon;
    satser: Satser;
}

const HarRettFpEllerEs: React.FunctionComponent<Props> = ({ fpEllerEsSituasjon, satser }) => {
    const { goToRoute } = useVeiviserNavigator(ContextRoutes.FP_ELLER_ES);
    const grunnbeløpet = finnGrunnbeløp(satser, dayjs());

    const engangsstønad = finnEngangsstønad(satser, dayjs());

    return (
        <>
            <Box background="surface-alt-3-subtle" padding="8" borderRadius="large">
                <VStack gap="6">
                    <VStack gap="8" align="center">
                        <StrollerIcon height={48} width={48} fontSize="1.5rem" aria-hidden color="#66A3C4" />
                        <Heading size="medium" align="center" className="m-6">
                            <FormattedMessage id="OppsummeringFpEllerEsSide.DuHarRettFpEllerEs" />
                        </Heading>
                    </VStack>
                    <Box
                        background="surface-alt-3-subtle"
                        borderColor="border-info"
                        borderWidth="2"
                        padding="4"
                        borderRadius="large"
                    >
                        <VStack gap="3">
                            <HStack justify="space-between">
                                <Heading size="small">
                                    <FormattedMessage id="OppsummeringFpEllerEsSide.DuHarRettFpEllerEs.KanVelgeMellom" />
                                </Heading>
                                <IconCircleWrapper size="medium" color="blue">
                                    <BabyWrappedIcon
                                        height={24}
                                        width={24}
                                        color="#236B7D"
                                        fontSize="1.5rem"
                                        aria-hidden
                                    />
                                </IconCircleWrapper>
                            </HStack>

                            <VStack gap="2">
                                <Heading size="xsmall">
                                    <FormattedMessage id="FpEllerEsForside.Engangsstønad" />
                                </Heading>
                                <BodyShort>
                                    <FormattedMessage
                                        id="OppsummeringFpEllerEsSide.DuFårUtbetaltEs"
                                        values={{ engangsstønad: formatCurrency(engangsstønad) }}
                                    />
                                </BodyShort>
                            </VStack>
                            <VStack gap="2">
                                <Heading size="xsmall">
                                    <FormattedMessage id="FpEllerEsForside.Foreldrepenger" />
                                </Heading>
                                <BodyShort>
                                    <FormattedMessage
                                        id="OppsummeringFpEllerEsSide.BasertPåSvarene"
                                        values={{ utbetaling: formatCurrency(fpEllerEsSituasjon.lønnPerMåned) }}
                                    />
                                </BodyShort>
                            </VStack>
                        </VStack>
                    </Box>
                    <VStack gap="2">
                        <Box background="bg-default" padding="4" borderRadius="large">
                            <VStack gap="2">
                                <Heading size="xsmall">
                                    <FormattedMessage id="OppsummeringFpEllerEsSide.HvaErFp" />
                                </Heading>
                                <BodyShort>
                                    <FormattedMessage id="FpEllerEsForside.FpErstatte" />{' '}
                                    <FormattedMessage
                                        id="OppsummeringFpEllerEsSide.HvaErFp.KanVelgeMellom"
                                        values={{ b: (msg: any) => <b>{msg}</b> }}
                                    />
                                </BodyShort>
                            </VStack>
                        </Box>
                        <Box background="bg-default" padding="4" borderRadius="large">
                            <VStack gap="2">
                                <Heading size="xsmall">
                                    <FormattedMessage id="OppsummeringSide.HvaErEs" />
                                </Heading>
                                <BodyShort>
                                    <FormattedMessage
                                        id="OppsummeringSide.EsSkalBidra"
                                        values={{
                                            engangsstønad: formatCurrency(engangsstønad),
                                            b: (msg: any) => <b>{msg}</b>,
                                        }}
                                    />
                                </BodyShort>
                            </VStack>
                        </Box>
                    </VStack>
                </VStack>
            </Box>
            <Infobox
                icon={<InformationIcon height={24} width={24} color="#020C1CAD" fontSize="1.5rem" aria-hidden />}
                color="gray"
            >
                <BodyShort>
                    <FormattedMessage
                        id="OppsummeringFpEllerEsSide.KanOgsåHarRettTilEs"
                        values={{ b: (msg: any) => <b>{msg}</b> }}
                    />
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
                <HvorforHarJegRettPanel fpEllerEsSituasjon={fpEllerEsSituasjon} grunnbeløpet={grunnbeløpet} />
                <HvorforHarJegRettEsPanel fpEllerEsSituasjon={fpEllerEsSituasjon} grunnbeløpet={grunnbeløpet} />
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
        </>
    );
};

export default HarRettFpEllerEs;
