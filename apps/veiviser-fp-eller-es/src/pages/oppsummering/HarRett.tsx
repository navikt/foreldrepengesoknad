import { ArrowLeftIcon, InformationIcon, StrollerIcon } from '@navikt/aksel-icons';
import { FpEllerEsRoutes } from 'appData/routes';
import { useVeiviserNavigator } from 'appData/useVeiviserNavigator';
import { FormattedMessage } from 'react-intl';
import { finnSisteGrunnbeløp } from 'utils/satserUtils';

import { BodyShort, Box, Button, HStack, Heading, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { Satser } from '@navikt/fp-types';
import { Infobox } from '@navikt/fp-ui';

import { FpEllerEsSituasjon } from '../situasjon/SituasjonSide';
import { HvorforHarJegRettPanel } from './boxes/HvorforHarJegRettPanel';

interface Props {
    fpEllerEsSituasjon: FpEllerEsSituasjon;
    satser: Satser;
}

export const HarRett = ({ fpEllerEsSituasjon, satser }: Props) => {
    const { goToRoute } = useVeiviserNavigator();

    const grunnbeløpet = finnSisteGrunnbeløp(satser);
    const erMor = fpEllerEsSituasjon.situasjon === 'mor';

    return (
        <>
            <Box background="brand-blue-moderate" padding="space-32" borderRadius="large">
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
                            {erMor ? (
                                <FormattedMessage id="OppsummeringFpEllerEsSide.DuHarRett" />
                            ) : (
                                <FormattedMessage id="OppsummeringFpEllerEsSide.DuKanHaRett" />
                            )}
                        </Heading>
                    </VStack>
                    <Box background="default" padding="space-16" borderRadius="large">
                        <VStack gap="space-8">
                            <Heading size="xsmall" level="3">
                                <FormattedMessage id="OppsummeringFpEllerEsSide.HvaErFp" />
                            </Heading>
                            <BodyShort>
                                <FormattedMessage id="FpEllerEsForside.FpErstatte" />{' '}
                                <FormattedMessage
                                    id="OppsummeringFpEllerEsSide.HvaErFp.KanVelgeMellom"
                                    values={{ b: (msg) => <b>{msg}</b> }}
                                />
                            </BodyShort>
                        </VStack>
                    </Box>
                </VStack>
            </Box>
            {erMor && (
                <Infobox
                    icon={
                        <InformationIcon
                            height={24}
                            width={24}
                            color="var(--ax-bg-neutral-strong)"
                            fontSize="1.5rem"
                            aria-hidden
                        />
                    }
                    color="gray"
                >
                    <BodyShort>
                        <FormattedMessage id="OppsummeringFpEllerEsSide.KanOgsåHarRettTilEs" />
                    </BodyShort>
                </Infobox>
            )}
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
        </>
    );
};
