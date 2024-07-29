import { ArrowLeftIcon, ChatElipsisIcon, CheckmarkIcon, InformationIcon, WalletIcon } from '@navikt/aksel-icons';
import { ContextRoutes, HvorMyeRoutes } from 'appData/routes';
import useVeiviserNavigator from 'appData/useVeiviserNavigator';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { finnEngangsstønad, finnGrunnbeløp } from 'utils/satserUtils';
import useScrollBehaviour from 'utils/useScrollBehaviour';

import { BodyShort, Button, ExpansionCard, HStack, Heading, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { logAmplitudeEvent } from '@navikt/fp-metrics';
import { Dekningsgrad, Satser, TilgjengeligeStønadskontoer } from '@navikt/fp-types';
import { BluePanel, IconCircleWrapper, Infobox } from '@navikt/fp-ui';
import { capitalizeFirstLetter, formatCurrencyWithKr } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import VeiviserPage from '../../felles/VeiviserPage';
import { Arbeidssituasjon, finnGjennomsnittsMånedslønn } from '../arbeidssituasjon/ArbeidssituasjonSide';
import HarIkkeRettTilFpInfobox from '../felles/HarIkkeRettTilFpInfobox';
import HøyInntektInfobox from '../felles/HøyInntektInfobox';
import FpEllerEsOgHvaSkjerNåLinkPanel from './FpEllerEsOgHvaSkjerNåLinkPanel';
import Utbetalingspanel from './Utbetalingspanel';

export const getDailyPayment = (monthlyWage: number) => (monthlyWage * 12) / 260;

const finnHendelse = (
    harIkkeRettTilFp: boolean,
    erMellomMinÅrslønnOg1Komma5G: boolean,
    ikkeRettTilÅFåDekketAlt: boolean,
) => {
    if (harIkkeRettTilFp) {
        return 'UNDER_MIN_ÅRSLØNN';
    }
    if (erMellomMinÅrslønnOg1Komma5G) {
        return 'MELLOM_MIN_ÅRSLØNN_OG_1.5_G';
    }
    return ikkeRettTilÅFåDekketAlt ? 'OVER G*6' : 'HAR_RETT';
};

interface Props {
    arbeidssituasjon: Arbeidssituasjon;
    stønadskontoer: TilgjengeligeStønadskontoer;
    satser: Satser;
}

const OppsummeringSide: React.FunctionComponent<Props> = ({ arbeidssituasjon, stønadskontoer, satser }) => {
    const intl = useIntl();
    const { goToRoute } = useVeiviserNavigator(ContextRoutes.HVOR_MYE);
    const { ref } = useScrollBehaviour();

    const gjennomsnittslønnPerMåned = parseFloat(notEmpty(finnGjennomsnittsMånedslønn(notEmpty(arbeidssituasjon))));
    const årslønn = gjennomsnittslønnPerMåned * 12;

    const grunnbeløpet = finnGrunnbeløp(satser, dayjs());
    const grunnbeløpetGanger6 = grunnbeløpet * 6;
    const minÅrslønn = grunnbeløpet / 2;

    const engangsstønad = finnEngangsstønad(satser, dayjs());

    const harIkkeRettTilFp = årslønn < minÅrslønn;
    const erMellomMinÅrslønnOg1Komma5G = årslønn > minÅrslønn && årslønn < grunnbeløpet * 1.5;

    const forrigeMåned = dayjs().subtract(1, 'month');

    useEffect(() => {
        logAmplitudeEvent('applikasjon-hendelse', {
            app: 'veivisere',
            team: 'foreldrepenger',
            hendelse: finnHendelse(harIkkeRettTilFp, erMellomMinÅrslønnOg1Komma5G, årslønn > grunnbeløpetGanger6),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <VeiviserPage
                ref={ref}
                label={intl.formatMessage({ id: 'OppsummeringSide.Oppsummering' })}
                description={intl.formatMessage({ id: 'Tittel' })}
                icon={<CheckmarkIcon title="a11y-title" fontSize="1.5rem" aria-hidden />}
            >
                <VStack gap="5">
                    {årslønn > grunnbeløpetGanger6 && (
                        <HøyInntektInfobox maxÅrslønnDekket={grunnbeløpetGanger6} isGray />
                    )}
                    {harIkkeRettTilFp && (
                        <>
                            <HarIkkeRettTilFpInfobox antattÅrslønn={årslønn} minÅrslønn={minÅrslønn} />
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
                                gjennomsnittslønn={gjennomsnittslønnPerMåned}
                                stønadskontoer={stønadskontoer}
                                satser={satser}
                            />
                            <Utbetalingspanel
                                dekningsgrad={Dekningsgrad.ÅTTI_PROSENT}
                                gjennomsnittslønn={gjennomsnittslønnPerMåned}
                                stønadskontoer={stønadskontoer}
                                satser={satser}
                            />
                            {erMellomMinÅrslønnOg1Komma5G && (
                                <Infobox
                                    header={<FormattedMessage id="OppsummeringSide.SammenlignFpOgEs" />}
                                    icon={
                                        <WalletIcon
                                            height={24}
                                            width={24}
                                            color="#020C1CAD"
                                            fontSize="1.5rem"
                                            aria-hidden
                                        />
                                    }
                                    isGray
                                >
                                    <VStack gap="4">
                                        <BodyShort>
                                            <FormattedMessage
                                                id="OppsummeringSide.SammenlignFpOgEsInfoPart1"
                                                values={{ engangsstønad: formatCurrencyWithKr(engangsstønad) }}
                                            />
                                        </BodyShort>
                                        <BodyShort>
                                            <FormattedMessage id="OppsummeringSide.SammenlignFpOgEsInfoPart2" />
                                            <Link
                                                href={links.veiviser}
                                                className="lenke"
                                                rel="noreferrer"
                                                target="_blank"
                                            >
                                                <FormattedMessage id="OppsummeringSide.Veiviser" />
                                            </Link>
                                            <FormattedMessage id="OppsummeringSide.SammenlignFpOgEsInfoPart3" />
                                        </BodyShort>
                                    </VStack>
                                </Infobox>
                            )}
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
                                <BodyShort>
                                    <FormattedMessage id="OppsummeringSide.ArbeidsgiverFraNav" />
                                </BodyShort>
                            </Infobox>
                        </>
                    )}
                    <ExpansionCard aria-label="" size="small">
                        <ExpansionCard.Header>
                            <HStack gap="6" align="center" wrap={false}>
                                <IconCircleWrapper size="medium" color="lightBlue">
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
                                <VStack gap="10">
                                    <BluePanel>
                                        <VStack gap="1">
                                            <Heading size="small" level="4">
                                                <FormattedMessage id="OppsummeringSide.NæverendeArbeidssitasjon" />
                                            </Heading>
                                            {arbeidssituasjon.erArbeidstakerEllerFrilanser && (
                                                <FormattedMessage id="OppsummeringSide.ArbeidstakerEllerFrilanser" />
                                            )}
                                            {arbeidssituasjon.harUtbetalingFraNav && (
                                                <FormattedMessage id="OppsummeringSide.UtbetalingFraNav" />
                                            )}
                                        </VStack>
                                    </BluePanel>
                                    <BluePanel>
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
                                    </BluePanel>
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
