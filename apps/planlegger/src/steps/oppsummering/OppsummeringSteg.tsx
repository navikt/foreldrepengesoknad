import { ArrowLeftIcon, TasklistStartIcon, WalletIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import { useEffektivHvemPlanlegger } from 'appData/useEffektivHvemPlanlegger';
import { usePlanleggerNavigator } from 'appData/usePlanleggerNavigator';
import dayjs from 'dayjs';
import { FormattedMessage } from 'react-intl';
import { erAlenesøker } from 'utils/HvemPlanleggerUtils';
import { erBarnetAdoptert, erBarnetFødt } from 'utils/barnetUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';

import { BodyShort, Box, Button, HStack, Heading, Link, LinkCard, VStack } from '@navikt/ds-react';

import { DATE_3_YEARS_AGO, links } from '@navikt/fp-constants';
import { SkyraSurvey } from '@navikt/fp-observability';
import { KontoBeregningResultatDto, Satser } from '@navikt/fp-types';
import { Infobox } from '@navikt/fp-ui';
import { useScrollBehaviour } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { ShareDataInfobox } from '../../components/boxes/ShareDataInfobox';
import { OppsummeringHeader } from './OppsummeringHeader';
import { SøkOmForeldrepenger } from './SøkOmForeldrepenger';
import { BarnehageplassOppsummering, getFamiliehendelsedato } from './expansion-cards/BarnehageplassOppsummering';
import { OppgittInformasjon } from './expansion-cards/OppgittInformasjon';
import { OppsummeringHarRett } from './expansion-cards/OppsummeringHarRett';
import { HvorMyeOppsummering } from './expansion-cards/hvor-mye/HvorMyeOppsummering';

interface Props {
    stønadskvoter?: KontoBeregningResultatDto;
    satser: Satser;
}

export const OppsummeringSteg = ({ stønadskvoter, satser }: Props) => {
    const navigator = usePlanleggerNavigator();

    useScrollBehaviour();

    // hvemPlanlegger her er "effektiv" (kan ha byttet søker1/søker2) for likekjønnede par ved adopsjon som har
    // svart på hvem som starter permisjonen. Dette gjelder kun når fordeling.antallDagerSøker1 finnes (dvs. begge
    // har rett), så det påvirker ikke visning knyttet til lønn (som er oppgitt uavhengig av rettighetsvurderingen).
    const hvemPlanlegger = useEffektivHvemPlanlegger();
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const hvorLangPeriode = useContextGetData(ContextDataType.HVOR_LANG_PERIODE);
    const arbeidssituasjon = useContextGetData(ContextDataType.ARBEIDSSITUASJON);
    const fordeling = useContextGetData(ContextDataType.FORDELING);
    const hvorMye = useContextGetData(ContextDataType.HVOR_MYE);

    const erAleneforsørger = erAlenesøker(hvemPlanlegger);

    const valgtStønadskvote =
        stønadskvoter && hvorLangPeriode ? stønadskvoter[hvorLangPeriode.dekningsgrad] : undefined;

    const erBarnetFødtForMerEnnTreÅrSiden =
        erBarnetFødt(barnet) && dayjs(barnet.fødselsdato).isBefore(DATE_3_YEARS_AGO);

    const hvemHarRett = arbeidssituasjon ? utledHvemSomHarRett(arbeidssituasjon) : 'ingenHarRett';

    const harRettTilForeldrepenger = !erBarnetFødtForMerEnnTreÅrSiden && hvemHarRett !== 'ingenHarRett';
    const familiehendelsedato = getFamiliehendelsedato(barnet);
    const svangerskapsuke22EllerSenere = dayjs().add(18, 'weeks').add(3, 'days').toDate();
    const erAdoptert = erBarnetAdoptert(barnet);
    const harOppgittLønn = hvorMye?.lønnSøker1 !== undefined || hvorMye?.lønnSøker2 !== undefined;

    return (
        <>
            <OppsummeringHeader>
                <VStack gap="space-40">
                    <VStack gap="space-20">
                        {!harRettTilForeldrepenger && (
                            <VStack gap="space-20">
                                <Infobox
                                    header={
                                        erAleneforsørger ? (
                                            <FormattedMessage id="OppsummeringSteg.Infoboks.IngenHarRettDeg" />
                                        ) : (
                                            <FormattedMessage id="OppsummeringSteg.Infoboks.IngenHarRett" />
                                        )
                                    }
                                    icon={
                                        <TasklistStartIcon
                                            height={24}
                                            width={24}
                                            color="var(--ax-bg-success-strong)"
                                            aria-hidden
                                        />
                                    }
                                    color="green"
                                >
                                    <BodyShort>
                                        <FormattedMessage
                                            id="OppsummeringSteg.Infoboks.BasertPåSvarene"
                                            values={{ erAleneforsørger }}
                                        />
                                    </BodyShort>
                                    <BodyShort>
                                        <FormattedMessage id="OppsummeringSteg.Infoboks.Engangsstønad" />
                                        <Link inlineText href={links.veiviser}>
                                            <FormattedMessage id="OppsummeringSteg.Infoboks.Engangsstønad.Link" />
                                        </Link>
                                        .
                                    </BodyShort>
                                </Infobox>
                            </VStack>
                        )}
                        {stønadskvoter && valgtStønadskvote && hvorLangPeriode && arbeidssituasjon && (
                            <VStack gap="space-8">
                                <SkyraSurvey slug="arbeids-og-velferdsetaten-nav/planlegg-foreldrepenger-inline" />

                                {harRettTilForeldrepenger && (
                                    <OppsummeringHarRett
                                        valgtStønadskvote={valgtStønadskvote}
                                        hvorLangPeriode={hvorLangPeriode}
                                        hvemPlanlegger={hvemPlanlegger}
                                        barnet={barnet}
                                        arbeidssituasjon={arbeidssituasjon}
                                        fordeling={fordeling}
                                    />
                                )}
                                {harOppgittLønn && <HvorMyeOppsummering satser={satser} />}
                                {!erAdoptert && (
                                    <BarnehageplassOppsummering hvemPlanlegger={hvemPlanlegger} barnet={barnet} />
                                )}
                                <OppgittInformasjon
                                    stønadskvoter={stønadskvoter}
                                    barnet={barnet}
                                    hvemPlanlegger={hvemPlanlegger}
                                    arbeidssituasjon={arbeidssituasjon}
                                    hvorLangPeriode={hvorLangPeriode}
                                    fordeling={fordeling}
                                    satser={satser}
                                />
                            </VStack>
                        )}
                        <ShareDataInfobox erAlenesøker={erAleneforsørger} />
                        {((harRettTilForeldrepenger &&
                            dayjs(familiehendelsedato).isBefore(svangerskapsuke22EllerSenere)) ||
                            (harRettTilForeldrepenger && erAdoptert)) && (
                            <SøkOmForeldrepenger erAlenesøker={erAleneforsørger} barnet={barnet} />
                        )}
                    </VStack>

                    <VStack gap="space-40">
                        <HStack>
                            <Button
                                variant="secondary"
                                onClick={navigator.goToPreviousDefaultStep}
                                icon={<ArrowLeftIcon aria-hidden height={24} width={24} />}
                            >
                                <FormattedMessage id="OppsummeringSteg.TilbakeTil" />
                            </Button>
                        </HStack>
                    </VStack>
                </VStack>
            </OppsummeringHeader>
            <div className="bg-ax-neutral-200 pb-4">
                <VStack gap="space-16" className="mx-auto max-w-[560px] px-8 py-4">
                    <Heading level="2" size="medium">
                        <FormattedMessage id="OppsummeringSteg.AndreVeivisere" />
                    </Heading>
                    <LinkCard size="small">
                        <Box asChild style={{ backgroundColor: 'var(--ax-bg-moderateA)' }}>
                            <LinkCard.Icon>
                                <WalletIcon height={43} width={43} />
                            </LinkCard.Icon>
                        </Box>
                        <LinkCard.Title>
                            <LinkCard.Anchor href={links.hvorMye} target="_blank" rel="noreferrer">
                                <FormattedMessage id="OppsummeringSteg.VeiviserHvorMye" />
                            </LinkCard.Anchor>
                        </LinkCard.Title>
                    </LinkCard>
                    <LinkCard size="small">
                        <Box asChild style={{ backgroundColor: 'var(--ax-bg-moderateA)' }}>
                            <LinkCard.Icon>
                                <WalletIcon height={43} width={43} />
                            </LinkCard.Icon>
                        </Box>
                        <LinkCard.Title>
                            <LinkCard.Anchor href={links.veiviser} target="_blank" rel="noreferrer">
                                <FormattedMessage id="OppsummeringSteg.VeiviserFpEllerEs" />
                            </LinkCard.Anchor>
                        </LinkCard.Title>
                    </LinkCard>
                </VStack>
            </div>
        </>
    );
};
