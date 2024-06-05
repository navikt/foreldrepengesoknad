import { ArrowLeftIcon, ChatElipsisIcon, InformationIcon } from '@navikt/aksel-icons';
import { ContextRoutes, HvorMyeRoutes } from 'appData/routes';
import useVeilederNavigator from 'appData/useVeilederNavigator';
import VeilederPage from 'components/Page/VeilederPage';
import { FormattedMessage, useIntl } from 'react-intl';
import useScrollBehaviour from 'utils/useScrollBehaviour';

import { Button, ExpansionCard, HStack, VStack } from '@navikt/ds-react';

import { Dekningsgrad } from '@navikt/fp-types';
import { IconCircleWrapper, Infobox } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

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
    const { goToRoute } = useVeilederNavigator(ContextRoutes.HVOR_MYE);
    const { ref } = useScrollBehaviour();

    const gjennomsnittslønn = parseFloat(notEmpty(finnGjennomsnittslønn(notEmpty(arbeidssituasjon))));
    const grunnbeløpetGanger6 = GRUNNBELØPET * 6;

    const harIkkeRettTilFp = gjennomsnittslønn * 12 < minÅrslønn;

    return (
        <>
            <VeilederPage ref={ref} label={intl.formatMessage({ id: 'Tittel' })}>
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
            </VeilederPage>
            <FpEllerEsOgHvaSkjerNåLinkPanel />
        </>
    );
};

export default OppsummeringSide;
