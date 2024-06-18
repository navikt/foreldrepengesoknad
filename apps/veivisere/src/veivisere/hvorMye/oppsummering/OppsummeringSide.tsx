import { ArrowLeftIcon, ChatElipsisIcon, CheckmarkIcon, InformationIcon } from '@navikt/aksel-icons';
import { ContextRoutes, HvorMyeRoutes } from 'appData/routes';
import useVeiviserNavigator from 'appData/useVeiviserNavigator';
import { FormattedMessage, useIntl } from 'react-intl';
import useScrollBehaviour from 'utils/useScrollBehaviour';

import { Button, ExpansionCard, HStack, VStack } from '@navikt/ds-react';

import { Dekningsgrad } from '@navikt/fp-types';
import { IconCircleWrapper, Infobox } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import VeiviserPage from '../../felles/Page/VeiviserPage';
import { Arbeidssituasjon, finnGjennomsnittslønn } from '../arbeidssituasjon/ArbeidssituasjonSide';
import FpEllerEsOgHvaSkjerNåLinkPanel from '../felles/FpEllerEsOgHvaSkjerNåLinkPanel';
import HarIkkeRettTilFpInfobox from '../felles/HarIkkeRettTilFpInfobox';
import HøyInntektInfobox from '../felles/HøyInntektInfobox';
import Utbetalingspanel from './Utbetalingspanel';

//FIXME Hent frå tjeneste
const GRUNNBELØPET = 118620;
const minÅrslønn = 59310;
const engangsstønad = 92648;

export const getDailyPayment = (monthlyWage: number) => (monthlyWage * 12) / 260;

interface Props {
    arbeidssituasjon?: Arbeidssituasjon;
}

const OppsummeringSide: React.FunctionComponent<Props> = ({ arbeidssituasjon }) => {
    const intl = useIntl();
    const { goToRoute } = useVeiviserNavigator(ContextRoutes.HVOR_MYE);
    const { ref } = useScrollBehaviour();

    const gjennomsnittslønn = parseFloat(notEmpty(finnGjennomsnittslønn(notEmpty(arbeidssituasjon))));
    const grunnbeløpetGanger6 = GRUNNBELØPET * 6;

    const harIkkeRettTilFp = gjennomsnittslønn * 12 < minÅrslønn;

    return (
        <>
            <VeiviserPage
                ref={ref}
                label={intl.formatMessage({ id: 'OppsummeringSide.Oppsummering' })}
                description={intl.formatMessage({ id: 'Tittel' })}
                icon={<CheckmarkIcon title="a11y-title" fontSize="1.5rem" aria-hidden />}
            >
                <VStack gap="5">
                    {gjennomsnittslønn * 12 > grunnbeløpetGanger6 && (
                        <HøyInntektInfobox maxÅrslønnDekket={grunnbeløpetGanger6} isGray />
                    )}
                    {harIkkeRettTilFp && (
                        <>
                            <HarIkkeRettTilFpInfobox antattÅrslønn={gjennomsnittslønn * 12} minÅrslønn={minÅrslønn} />
                            <Infobox
                                header={<FormattedMessage id="OppsummeringSide.HvaErEr" />}
                                icon={
                                    <InformationIcon
                                        height={24}
                                        width={24}
                                        color="#020C1CAD"
                                        fontSize="1.5rem"
                                        aria-hidden
                                    />
                                }
                                isGray
                            >
                                <FormattedMessage id="OppsummeringSide.EsSkalBidra" values={{ engangsstønad }} />
                            </Infobox>
                        </>
                    )}
                    {!harIkkeRettTilFp && (
                        <>
                            <Utbetalingspanel
                                dekningsgrad={Dekningsgrad.HUNDRE_PROSENT}
                                gjennomsnittslønn={gjennomsnittslønn}
                            />
                            <Utbetalingspanel
                                dekningsgrad={Dekningsgrad.ÅTTI_PROSENT}
                                gjennomsnittslønn={gjennomsnittslønn}
                            />
                            <Infobox
                                header={<FormattedMessage id="OppsummeringSide.UtbetaltSomVanlig" />}
                                icon={
                                    <InformationIcon
                                        height={24}
                                        width={24}
                                        color="#020C1CAD"
                                        fontSize="1.5rem"
                                        aria-hidden
                                    />
                                }
                                isGray
                            >
                                <FormattedMessage id="OppsummeringSide.ArbeidsgiverFraNav" />
                            </Infobox>
                        </>
                    )}
                    <ExpansionCard aria-label="" size="small">
                        <ExpansionCard.Header>
                            <HStack gap="6" align="center" wrap={false}>
                                <IconCircleWrapper size="medium" color="green">
                                    <ChatElipsisIcon height={24} width={24} fontSize="1.5rem" aria-hidden />
                                </IconCircleWrapper>
                                <ExpansionCard.Title size="small">
                                    <FormattedMessage id="OppsummeringSide.DetteSvarteDu" />
                                </ExpansionCard.Title>
                            </HStack>
                        </ExpansionCard.Header>
                        <ExpansionCard.Content>todo</ExpansionCard.Content>
                    </ExpansionCard>
                    <Button
                        variant="secondary"
                        onClick={() => goToRoute(HvorMyeRoutes.ARBEIDSSITUASJON)}
                        icon={<ArrowLeftIcon aria-hidden height={24} width={24} />}
                    >
                        <FormattedMessage id="OppsummeringSide.Tilbake" />
                    </Button>
                </VStack>
            </VeiviserPage>
            <FpEllerEsOgHvaSkjerNåLinkPanel />
        </>
    );
};

export default OppsummeringSide;
