import { ArrowLeftIcon, StrollerIcon } from '@navikt/aksel-icons';
import { ContextRoutes, FpEllerEsRoutes } from 'appData/routes';
import useVeiviserNavigator from 'appData/useVeiviserNavigator';
import { FormattedMessage } from 'react-intl';
import { finnSisteEngangsstønad, finnSisteGrunnbeløp } from 'utils/satserUtils';

import { BodyShort, Box, Button, HStack, Heading, VStack } from '@navikt/ds-react';

import { Satser } from '@navikt/fp-types';
import { formatCurrency } from '@navikt/fp-utils';

import { FpEllerEsSituasjon } from '../situasjon/SituasjonSide';
import HvorforHarJegIkkeRettPanel from './boxes/HvorforHarJegIkkeRettPanel';
import HvorforHarJegRettEsPanel from './boxes/HvorforHarJegRettEsPanel';

interface Props {
    fpEllerEsSituasjon: FpEllerEsSituasjon;
    satser: Satser;
}

const HarRettEs: React.FunctionComponent<Props> = ({ fpEllerEsSituasjon, satser }) => {
    const { goToRoute } = useVeiviserNavigator(ContextRoutes.FP_ELLER_ES);

    const grunnbeløpet = finnSisteGrunnbeløp(satser);
    const engangsstønad = finnSisteEngangsstønad(satser);
    const erMor = fpEllerEsSituasjon.situasjon === 'mor';

    return (
        <>
            <Box background="surface-alt-3-subtle" padding="8" borderRadius="large">
                <VStack gap="8">
                    <VStack gap="8" align="center">
                        <StrollerIcon height={48} width={48} fontSize="1.5rem" aria-hidden color="#66A3C4" />
                        <Heading size="medium" align="center" className="m-6">
                            {erMor ? (
                                <FormattedMessage id="OppsummeringFpEllerEsSide.DuHarRettPåEs" />
                            ) : (
                                <FormattedMessage id="OppsummeringFpEllerEsSide.DuKanHaRettPåEs" />
                            )}
                        </Heading>
                    </VStack>
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
            </Box>

            <HStack justify="space-around">
                <Button type="submit">
                    <FormattedMessage id="OppsummeringFpEllerEsSide.SøkOmEs" />
                </Button>
                <Button variant="secondary" type="submit">
                    <FormattedMessage id="OppsummeringFpEllerEsSide.MerOmEs" />
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
        </>
    );
};

export default HarRettEs;
