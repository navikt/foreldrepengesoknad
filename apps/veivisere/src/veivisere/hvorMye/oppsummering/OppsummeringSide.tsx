import { ArrowLeftIcon, ChatElipsisIcon, CheckmarkIcon, InformationIcon } from '@navikt/aksel-icons';
import { ContextRoutes, HvorMyeRoutes } from 'appData/routes';
import useVeiviserNavigator from 'appData/useVeiviserNavigator';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';
import { finnEngangsstønad, finnGrunnbeløp } from 'utils/satserUtils';
import useScrollBehaviour from 'utils/useScrollBehaviour';

import { BodyShort, Button, ExpansionCard, HStack, Heading, VStack } from '@navikt/ds-react';

import { Dekningsgrad, Satser, TilgjengeligeStønadskontoer } from '@navikt/fp-types';
import { IconCircleWrapper, Infobox } from '@navikt/fp-ui';
import { capitalizeFirstLetter, formatCurrencyWithKr } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import VeiviserPage from '../../felles/Page/VeiviserPage';
import { Arbeidssituasjon, finnGjennomsnittsMånedslønn } from '../arbeidssituasjon/ArbeidssituasjonSide';
import HarIkkeRettTilFpInfobox from '../felles/HarIkkeRettTilFpInfobox';
import HøyInntektInfobox from '../felles/HøyInntektInfobox';
import FpEllerEsOgHvaSkjerNåLinkPanel from './FpEllerEsOgHvaSkjerNåLinkPanel';
import Utbetalingspanel from './Utbetalingspanel';

export const getDailyPayment = (monthlyWage: number) => (monthlyWage * 12) / 260;

interface Props {
    arbeidssituasjon: Arbeidssituasjon;
    stønadskontoer: TilgjengeligeStønadskontoer;
    satser: Satser;
}

const OppsummeringSide: React.FunctionComponent<Props> = ({ arbeidssituasjon, stønadskontoer, satser }) => {
    const intl = useIntl();
    const { goToRoute } = useVeiviserNavigator(ContextRoutes.HVOR_MYE);
    const { ref } = useScrollBehaviour();

    const gjennomsnittslønn = parseFloat(notEmpty(finnGjennomsnittsMånedslønn(notEmpty(arbeidssituasjon))));
    const grunnbeløpet = finnGrunnbeløp(satser, dayjs());
    const grunnbeløpetGanger6 = grunnbeløpet * 6;
    const minÅrslønn = grunnbeløpet / 2;

    const engangsstønad = finnEngangsstønad(satser, dayjs());

    const harIkkeRettTilFp = gjennomsnittslønn * 12 < minÅrslønn;

    const forrigeMåned = dayjs().subtract(1, 'month');

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
                                stønadskontoer={stønadskontoer}
                                satser={satser}
                            />
                            <Utbetalingspanel
                                dekningsgrad={Dekningsgrad.ÅTTI_PROSENT}
                                gjennomsnittslønn={gjennomsnittslønn}
                                stønadskontoer={stønadskontoer}
                                satser={satser}
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
                        <ExpansionCard.Content>
                            {(arbeidssituasjon.erArbeidstakerEllerFrilanser ||
                                arbeidssituasjon.harUtbetalingFraNav) && (
                                <VStack gap="5">
                                    <div>
                                        <Heading size="small">
                                            {capitalizeFirstLetter(
                                                forrigeMåned.subtract(2, 'month').format('MMMM YYYY'),
                                            )}
                                        </Heading>
                                        <BodyShort>
                                            {formatCurrencyWithKr(parseInt(arbeidssituasjon.lønnMåned1, 10))}
                                        </BodyShort>
                                    </div>
                                    <div>
                                        <Heading size="small">
                                            {capitalizeFirstLetter(
                                                forrigeMåned.subtract(1, 'month').format('MMMM YYYY'),
                                            )}
                                        </Heading>
                                        <BodyShort>
                                            {formatCurrencyWithKr(parseInt(arbeidssituasjon.lønnMåned2, 10))}
                                        </BodyShort>
                                    </div>
                                    <div>
                                        <Heading size="small">
                                            {capitalizeFirstLetter(forrigeMåned.format('MMMM YYYY'))}
                                        </Heading>
                                        <BodyShort>
                                            {formatCurrencyWithKr(parseInt(arbeidssituasjon.lønnMåned3, 10))}
                                        </BodyShort>
                                    </div>
                                </VStack>
                            )}
                        </ExpansionCard.Content>
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
