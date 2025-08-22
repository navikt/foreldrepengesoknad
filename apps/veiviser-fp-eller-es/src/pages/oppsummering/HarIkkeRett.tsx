import { ArrowLeftIcon, BabyWrappedIcon, StrollerIcon } from '@navikt/aksel-icons';
import { FpEllerEsRoutes } from 'appData/routes';
import { useVeiviserNavigator } from 'appData/useVeiviserNavigator';
import { FormattedMessage } from 'react-intl';
import { finnSisteGrunnbeløp } from 'utils/satserUtils';

import { BodyShort, Box, Button, HStack, Heading, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { Satser } from '@navikt/fp-types';
import { IconCircleWrapper } from '@navikt/fp-ui';

import { FpEllerEsSituasjon } from '../situasjon/SituasjonSide';
import { HvorforHarJegIkkeRettEsPanel } from './boxes/HvorforHarJegIkkeRettEsPanel';
import { HvorforHarJegIkkeRettPanel } from './boxes/HvorforHarJegIkkeRettPanel';

interface Props {
    fpEllerEsSituasjon: FpEllerEsSituasjon;
    satser: Satser;
}

export const HarIkkeRett = ({ fpEllerEsSituasjon, satser }: Props) => {
    const { goToRoute } = useVeiviserNavigator();
    const jobberIkkeINorge = fpEllerEsSituasjon.borDuINorge === false && fpEllerEsSituasjon.jobberDuINorge === false;
    const grunnbeløpet = finnSisteGrunnbeløp(satser);

    return (
        <>
            <Box.New background="neutral-moderate" borderColor="brand-blue" padding="8" borderRadius="large">
                <VStack gap="space-32">
                    <VStack gap="space-32" align="center">
                        <StrollerIcon
                            height={48}
                            width={48}
                            fontSize="1.5rem"
                            aria-hidden
                            color="var(--ax-accent-500)"
                        />
                        <Heading size="medium" align="center" className="m-6" level="2">
                            {jobberIkkeINorge ? (
                                <FormattedMessage id="OppsummeringFpEllerEsSide.DuHarIkkeRettNorge" />
                            ) : (
                                <FormattedMessage id="OppsummeringFpEllerEsSide.DuHarIkkeRett" />
                            )}
                        </Heading>
                    </VStack>
                    <Box.New background="neutral-moderate" borderWidth="2" padding="4" borderRadius="large">
                        <VStack gap="space-16">
                            <HStack gap="space-32" justify="space-between" wrap={false}>
                                <BodyShort>
                                    {jobberIkkeINorge ? (
                                        <FormattedMessage id="OppsummeringFpEllerEsSide.SidenDuIkkeJobberINorge" />
                                    ) : (
                                        <FormattedMessage id="OppsummeringFpEllerEsSide.DuHarIkkeRett.Folketrygden" />
                                    )}
                                </BodyShort>
                                <IconCircleWrapper size="medium" color="blue">
                                    <BabyWrappedIcon
                                        height={24}
                                        width={24}
                                        color="var(--ax-accent-800)"
                                        fontSize="1.5rem"
                                        aria-hidden
                                    />
                                </IconCircleWrapper>
                            </HStack>
                        </VStack>
                    </Box.New>
                </VStack>
            </Box.New>
            <HStack justify="space-around">
                <Link href={links.omForeldrepenger} target="_blank" rel="norefferer" underline={false}>
                    <Button type="submit" variant="secondary">
                        <FormattedMessage id="OppsummeringFpEllerEsSide.MerOmFp" />
                    </Button>
                </Link>
                <Link href={links.engangsstonad} target="_blank" rel="norefferer" underline={false}>
                    <Button type="submit" variant="secondary">
                        <FormattedMessage id="OppsummeringFpEllerEsSide.MerOmEs" />
                    </Button>
                </Link>
            </HStack>
            <VStack gap="space-16">
                <HvorforHarJegIkkeRettEsPanel fpEllerEsSituasjon={fpEllerEsSituasjon} />
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
        </>
    );
};
