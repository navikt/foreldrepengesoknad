import { ArrowLeftIcon, BabyWrappedIcon, InformationIcon, StrollerIcon } from '@navikt/aksel-icons';
import { FpEllerEsRoutes } from 'appData/routes';
import { useVeiviserNavigator } from 'appData/useVeiviserNavigator';
import { FormattedMessage } from 'react-intl';
import { finnSisteEngangsstønad, finnSisteGrunnbeløp } from 'utils/satserUtils';

import { BodyShort, Box, Button, HStack, Heading, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { Satser } from '@navikt/fp-types';
import { IconCircleWrapper, Infobox } from '@navikt/fp-ui';
import { formatCurrency } from '@navikt/fp-utils';

import { FpEllerEsSituasjon } from '../situasjon/SituasjonSide';
import { HvorforHarJegRettEsPanel } from './boxes/HvorforHarJegRettEsPanel';
import { HvorforHarJegRettPanel } from './boxes/HvorforHarJegRettPanel';

interface Props {
    fpEllerEsSituasjon: FpEllerEsSituasjon;
    satser: Satser;
}

export const HarRettFpEllerEs = ({ fpEllerEsSituasjon, satser }: Props) => {
    const { goToRoute } = useVeiviserNavigator();
    const grunnbeløpet = finnSisteGrunnbeløp(satser);

    const engangsstønad = finnSisteEngangsstønad(satser);

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
                                        id="OppsummeringFpEllerEsSide.EsSkalBidra"
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
                    <FormattedMessage id="OppsummeringFpEllerEsSide.KanOgsåHarRettTilEs" />
                </BodyShort>
            </Infobox>
            <HStack justify="space-around">
                <Link href={links.søknadForeldrepenger} target="_blank" rel="norefferer">
                    <Button>
                        <FormattedMessage id="OppsummeringFpEllerEsSide.SøkOmFp" />
                    </Button>
                </Link>
                <Link href={links.omForeldrepenger} target="_blank" rel="norefferer" underline={false}>
                    <Button variant="secondary">
                        <FormattedMessage id="OppsummeringFpEllerEsSide.MerOmFp" />
                    </Button>
                </Link>
            </HStack>
            <VStack gap="4">
                <HvorforHarJegRettPanel fpEllerEsSituasjon={fpEllerEsSituasjon} grunnbeløpet={grunnbeløpet} />
                <HvorforHarJegRettEsPanel fpEllerEsSituasjon={fpEllerEsSituasjon} />
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
