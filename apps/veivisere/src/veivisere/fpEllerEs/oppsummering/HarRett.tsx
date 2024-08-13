import { ArrowLeftIcon, InformationIcon, StrollerIcon } from '@navikt/aksel-icons';
import { ContextRoutes, FpEllerEsRoutes } from 'appData/routes';
import useVeiviserNavigator from 'appData/useVeiviserNavigator';
import dayjs from 'dayjs';
import { FormattedMessage } from 'react-intl';
import { finnGrunnbeløp } from 'utils/satserUtils';

import { BodyShort, Box, Button, HStack, Heading, VStack } from '@navikt/ds-react';

import { Satser } from '@navikt/fp-types';
import { Infobox } from '@navikt/fp-ui';

import { FpEllerEsSituasjon } from '../situasjon/SituasjonSide';
import HvorforHarJegRettPanel from './boxes/HvorforHarJegRettPanel';

interface Props {
    fpEllerEsSituasjon: FpEllerEsSituasjon;
    satser: Satser;
}

const HarRett: React.FunctionComponent<Props> = ({ fpEllerEsSituasjon, satser }) => {
    const { goToRoute } = useVeiviserNavigator(ContextRoutes.FP_ELLER_ES);

    const grunnbeløpet = finnGrunnbeløp(satser, dayjs());
    const erMor = fpEllerEsSituasjon.situasjon === 'mor';

    return (
        <>
            <Box background="surface-alt-3-subtle" padding="8" borderRadius="large">
                <VStack gap="8">
                    <VStack gap="8" align="center">
                        <StrollerIcon height={48} width={48} fontSize="1.5rem" aria-hidden color="#66A3C4" />
                        <Heading size="medium" align="center" className="m-6">
                            {erMor ? (
                                <FormattedMessage id="OppsummeringFpEllerEsSide.DuHarRett" />
                            ) : (
                                <FormattedMessage id="OppsummeringFpEllerEsSide.DuKanHaRett" />
                            )}
                        </Heading>
                    </VStack>
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
                </VStack>
            </Box>
            {erMor && (
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
            )}
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
        </>
    );
};

export default HarRett;
