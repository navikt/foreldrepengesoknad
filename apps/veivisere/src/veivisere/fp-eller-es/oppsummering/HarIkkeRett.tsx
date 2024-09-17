import { ArrowLeftIcon, BabyWrappedIcon, StrollerIcon } from '@navikt/aksel-icons';
import { ContextRoutes, FpEllerEsRoutes } from 'appData/routes';
import useVeiviserNavigator from 'appData/useVeiviserNavigator';
import { FormattedMessage } from 'react-intl';
import { finnSisteGrunnbeløp } from 'utils/satserUtils';

import { BodyShort, Box, Button, HStack, Heading, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { Satser } from '@navikt/fp-types';
import { IconCircleWrapper } from '@navikt/fp-ui';

import { FpEllerEsSituasjon } from '../situasjon/SituasjonSide';
import HvorforHarJegIkkeRettEsPanel from './boxes/HvorforHarJegIkkeRettEsPanel';
import HvorforHarJegIkkeRettPanel from './boxes/HvorforHarJegIkkeRettPanel';

interface Props {
    fpEllerEsSituasjon: FpEllerEsSituasjon;
    satser: Satser;
}

const HarIkkeRett: React.FunctionComponent<Props> = ({ fpEllerEsSituasjon, satser }) => {
    const { goToRoute } = useVeiviserNavigator(ContextRoutes.FP_ELLER_ES);
    const jobberIkkeINorge = fpEllerEsSituasjon.borDuINorge === false && fpEllerEsSituasjon.jobberDuINorge === false;
    const grunnbeløpet = finnSisteGrunnbeløp(satser);

    return (
        <>
            <Box background="bg-subtle" padding="8" borderRadius="large">
                <VStack gap="8">
                    <VStack gap="8" align="center">
                        <StrollerIcon height={48} width={48} fontSize="1.5rem" aria-hidden color="#66A3C4" />
                        <Heading size="medium" align="center" className="m-6">
                            {jobberIkkeINorge ? (
                                <FormattedMessage id="OppsummeringFpEllerEsSide.DuHarIkkeRettNorge" />
                            ) : (
                                <FormattedMessage id="OppsummeringFpEllerEsSide.DuHarIkkeRett" />
                            )}
                        </Heading>
                    </VStack>
                    <Box
                        background="bg-subtle"
                        borderColor="border-info"
                        borderWidth="2"
                        padding="4"
                        borderRadius="large"
                    >
                        <VStack gap="4">
                            <HStack gap="8" justify="space-between" wrap={false}>
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
                                        color="#236B7D"
                                        fontSize="1.5rem"
                                        aria-hidden
                                    />
                                </IconCircleWrapper>
                            </HStack>
                        </VStack>
                    </Box>
                </VStack>
            </Box>
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
            <VStack gap="4">
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

export default HarIkkeRett;
