import { ArrowLeftIcon, CalendarIcon, TasklistStartIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import GreenPanel from 'components/boxes/GreenPanel';
import Infoboks from 'components/boxes/Infobox';
import Calendar from 'components/calendar/Calendar';
import IconCircleWrapper from 'components/iconCircle/IconCircleWrapper';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidsstatus } from 'types/Arbeidssituasjon';
import { erBarnetFødt } from 'types/Barnet';
import {
    finnAnnenPartTekst,
    finnSøkerTekst,
    getFornavnPåAnnenPart,
    getFornavnPåSøker,
    isAlene,
} from 'types/HvemPlanlegger';
import { TilgjengeligeStønadskontoerDTO } from 'types/TilgjengeligeStønadskontoerDTO';
import { utledHvemSomHarRett } from 'utils/hvemHarRettHjelper';
import { lagKalenderPerioder } from 'utils/kalenderPerioderHjelper';
import {
    getAntallUker,
    getAntallUkerFellesperiode,
    mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto,
} from 'utils/stønadskontoer';
import { finnUttaksdata } from 'utils/uttakHjelper';

import { Alert, BodyLong, Box, Button, ExpansionCard, HStack, Heading, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { DATE_3_YEARS_AGO } from '@navikt/fp-constants/src/dates';
import { notEmpty } from '@navikt/fp-validation';

import OppgittInformasjon from './OppgittInformasjon';
import OppsummeringHeader from './OppsummeringHeader';
import HvaSkjerNårIkon from './ikoner/HvaSkjerNårIkon';
import HvorMyeIkon from './ikoner/HvorMyeIkon';
import styles from './oppsummeringSteg.module.css';

interface Props {
    stønadskontoer: TilgjengeligeStønadskontoerDTO;
}

const OppsummeringSteg: FunctionComponent<Props> = ({ stønadskontoer }) => {
    const intl = useIntl();

    const navigator = usePlanleggerNavigator();

    const hvorLangPeriode = notEmpty(useContextGetData(ContextDataType.HVOR_LANG_PERIODE));
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const arbeidssituasjon = notEmpty(useContextGetData(ContextDataType.ARBEIDSSITUASJON));
    const fordeling = notEmpty(useContextGetData(ContextDataType.FORDELING));

    const erAleneforsørger = isAlene(hvemPlanlegger);

    const hvemHarRett = utledHvemSomHarRett(hvemPlanlegger, arbeidssituasjon);

    const valgtStønadskonto = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(
        stønadskontoer[hvorLangPeriode.dekningsgrad],
    );

    const harRett =
        (erBarnetFødt(barnet) && dayjs(barnet.fødselsdato).isBefore(DATE_3_YEARS_AGO)) ||
        (arbeidssituasjon?.status === Arbeidsstatus.INGEN && arbeidssituasjon?.jobberAnnenPart !== true) ||
        (arbeidssituasjon?.status === Arbeidsstatus.UFØR && arbeidssituasjon?.jobberAnnenPart !== true)
            ? false
            : true;

    const kunEnPartSkalHa = hvemHarRett !== 'beggeHarRett';

    const { sluttdatoSøker1, startdatoSøker1, startdatoSøker2, sluttdatoSøker2 } = finnUttaksdata(
        hvemHarRett,
        hvemPlanlegger,
        valgtStønadskonto,
        barnet,
        fordeling?.antallUkerSøker1,
    );
    const antallUkerFellesperiode = getAntallUkerFellesperiode(valgtStønadskonto);

    const antallUkerFellesperiodeSøker1 = fordeling ? fordeling.antallUkerSøker1 : '';
    const antallUkerFellesperiodeSøker2 = fordeling ? antallUkerFellesperiode - fordeling.antallUkerSøker1 : '';

    const uttaksperioder =
        valgtStønadskonto && arbeidssituasjon
            ? lagKalenderPerioder(
                  valgtStønadskonto,
                  barnet,
                  hvemPlanlegger,
                  arbeidssituasjon,
                  fordeling?.antallUkerSøker1,
              )
            : [];

    return (
        <>
            <OppsummeringHeader>
                <VStack gap="10">
                    {!harRett && (
                        <VStack gap="5">
                            <Infoboks
                                header={
                                    erAleneforsørger ? (
                                        <FormattedMessage id="OppsummeringSteg.Infoboks.IngenHarRettDeg" />
                                    ) : (
                                        <FormattedMessage id="OppsummeringSteg.Infoboks.IngenHarRett" />
                                    )
                                }
                                icon={<TasklistStartIcon height={28} width={28} color="#236B7D" aria-hidden />}
                            >
                                <BodyLong>
                                    <FormattedMessage
                                        id="OppsummeringSteg.Infoboks.BasertPåSvarene"
                                        values={{ erAleneforsørger }}
                                    />
                                </BodyLong>
                                <BodyLong>
                                    <FormattedMessage id="OppsummeringSteg.Infoboks.Engangsstønad" />
                                    <Link inlineText href={links.veiviser}>
                                        <FormattedMessage id="OppsummeringSteg.Infoboks.Engangsstønad.Link" />
                                    </Link>
                                </BodyLong>
                            </Infoboks>
                        </VStack>
                    )}
                    <Alert variant="info">
                        {!harRett ? (
                            <FormattedMessage id="OppsummeringSteg.InformasjonPlanleggerErUnderUtviklingIkkeRett" />
                        ) : (
                            <FormattedMessage
                                id="OppsummeringSteg.InformasjonPlanleggerErUnderUtvikling"
                                values={{
                                    a: (msg: any) => (
                                        <Link
                                            inlineText
                                            href={links.søknadForeldrepenger}
                                            target="_blank"
                                            className="lenke"
                                            rel="noreferrer"
                                        >
                                            {msg}
                                        </Link>
                                    ),
                                }}
                            />
                        )}
                    </Alert>
                    {stønadskontoer && valgtStønadskonto && hvorLangPeriode && arbeidssituasjon && (
                        <VStack gap="5">
                            {harRett && (
                                <ExpansionCard aria-label="">
                                    <ExpansionCard.Header>
                                        <HStack gap="5" align="center" wrap={false}>
                                            <IconCircleWrapper size="large" color="green">
                                                <CalendarIcon height={28} width={28} fontSize="1.5rem" aria-hidden />
                                            </IconCircleWrapper>
                                            <ExpansionCard.Title size="medium">
                                                <FormattedMessage
                                                    id="OppsummeringSteg.Planen"
                                                    values={{ erAlenesøker: isAlene(hvemPlanlegger) }}
                                                />
                                            </ExpansionCard.Title>
                                        </HStack>
                                    </ExpansionCard.Header>
                                    <ExpansionCard.Content>
                                        <VStack gap="5">
                                            {!erAleneforsørger && !kunEnPartSkalHa && (
                                                <GreenPanel>
                                                    <Heading level="3" size="small">
                                                        <FormattedMessage id="OppsummeringSteg.Perioden" />
                                                    </Heading>
                                                    <BodyLong>
                                                        <FormattedMessage
                                                            id="OppsummeringSteg.DereValgte"
                                                            values={{
                                                                prosent: hvorLangPeriode.dekningsgrad,
                                                                antallUker: getAntallUker(valgtStønadskonto),
                                                                hvem: finnSøkerTekst(intl, hvemPlanlegger),
                                                                hvem2: finnAnnenPartTekst(intl, hvemPlanlegger),
                                                                uker: antallUkerFellesperiodeSøker1,
                                                                uker2: antallUkerFellesperiodeSøker2,
                                                            }}
                                                        />
                                                    </BodyLong>
                                                    <BodyLong>
                                                        <FormattedMessage
                                                            id="OppsummeringSteg.Periodene"
                                                            values={{
                                                                hvem: getFornavnPåSøker(hvemPlanlegger, intl),
                                                                fom: dayjs(startdatoSøker1).format('DD MMM YY'),
                                                                tom: dayjs(sluttdatoSøker1).format('DD MMM YY'),
                                                                b: (msg: any) => <b>{msg}</b>,
                                                            }}
                                                        />
                                                    </BodyLong>
                                                    <BodyLong>
                                                        <FormattedMessage
                                                            id="OppsummeringSteg.Periodene"
                                                            values={{
                                                                hvem: getFornavnPåAnnenPart(hvemPlanlegger, intl),

                                                                fom: dayjs(startdatoSøker2).format('DD MMM YY'),
                                                                tom: dayjs(sluttdatoSøker2).format('DD MMM YY'),
                                                                b: (msg: any) => <b>{msg}</b>,
                                                            }}
                                                        />
                                                    </BodyLong>
                                                </GreenPanel>
                                            )}

                                            <Calendar periods={uttaksperioder} useSmallerWidth />
                                        </VStack>
                                    </ExpansionCard.Content>
                                </ExpansionCard>
                            )}
                            <OppgittInformasjon
                                stønadskontoer={stønadskontoer}
                                barnet={barnet}
                                hvemPlanlegger={hvemPlanlegger}
                                arbeidssituasjon={arbeidssituasjon}
                                hvorLangPeriode={hvorLangPeriode}
                                fordeling={fordeling}
                            />
                        </VStack>
                    )}
                    <VStack gap="10">
                        <HStack>
                            <Button
                                variant="secondary"
                                onClick={navigator.goToPreviousDefaultStep}
                                icon={<ArrowLeftIcon aria-hidden />}
                            >
                                <FormattedMessage id="OppsummeringSteg.TilbakeTil" />
                            </Button>
                        </HStack>
                    </VStack>
                </VStack>
            </OppsummeringHeader>
            <div className={styles.background}>
                <VStack gap="4" className={styles.content}>
                    <Heading level="2" size="medium">
                        <FormattedMessage id="OppsummeringSteg.AndreVeivisere" />
                    </Heading>
                    <Link
                        inlineText
                        href={links.veiviser}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.lenkepanel}
                    >
                        <Box
                            padding="4"
                            background="surface-default"
                            borderRadius="xlarge"
                            shadow="medium"
                            className={styles.panel}
                        >
                            <HStack gap="5" align="center">
                                <HvorMyeIkon />
                                <Heading level="3" size="small">
                                    <FormattedMessage id="OppsummeringSteg.VeiviserHvorMye" />
                                </Heading>
                            </HStack>
                        </Box>
                    </Link>
                    <Link
                        inlineText
                        href={links.veiviser}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.lenkepanel}
                    >
                        <Box
                            padding="4"
                            background="surface-default"
                            borderRadius="xlarge"
                            shadow="medium"
                            className={styles.panel}
                        >
                            <HStack gap="5" align="center">
                                <HvaSkjerNårIkon />
                                <Heading level="3" size="small">
                                    <FormattedMessage id="OppsummeringSteg.VeiviserHvaSkjerNår" />
                                </Heading>
                            </HStack>
                        </Box>
                    </Link>
                </VStack>
            </div>
        </>
    );
};
export default OppsummeringSteg;
