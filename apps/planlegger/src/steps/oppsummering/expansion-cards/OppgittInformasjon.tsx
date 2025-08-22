import { ChatElipsisIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { Fordeling } from 'types/Fordeling';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { HvorLangPeriode } from 'types/HvorLangPeriode';
import { erAlenesøker as erAlene, erFarOgFar, getFornavnPåSøker1, getFornavnPåSøker2 } from 'utils/HvemPlanleggerUtils';
import { loggExpansionCardOpen } from 'utils/amplitudeUtils';
import { erBarnetAdoptert, erBarnetFødt } from 'utils/barnetUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';
import { finnSisteGrunnbeløp } from 'utils/satserUtils';
import { getAntallUkerOgDagerFellesperiode, getUkerOgDager } from 'utils/stønadskontoerUtils';
import { finnAntallUkerOgDagerMedForeldrepenger } from 'utils/uttakUtils';

import { BodyLong, ExpansionCard, HStack, Heading, VStack } from '@navikt/ds-react';

import { HvemPlanleggerType, Satser, TilgjengeligeStønadskontoer } from '@navikt/fp-types';
import { BluePanel, IconCircleWrapper } from '@navikt/fp-ui';
import { capitalizeFirstLetter, formatCurrencyWithKr } from '@navikt/fp-utils';

interface Props {
    stønadskontoer: TilgjengeligeStønadskontoer;
    barnet: OmBarnet;
    hvemPlanlegger: HvemPlanlegger;
    arbeidssituasjon: Arbeidssituasjon;
    hvorLangPeriode: HvorLangPeriode;
    fordeling?: Fordeling;
    satser: Satser;
}

export const OppgittInformasjon = ({
    stønadskontoer,
    barnet,
    hvemPlanlegger,
    arbeidssituasjon,
    hvorLangPeriode,
    fordeling,
    satser,
}: Props) => {
    const intl = useIntl();

    const erFødt = erBarnetFødt(barnet);
    const erAdoptert = erBarnetAdoptert(barnet);
    const antallBarn = barnet.antallBarn;

    const erFedre = erFarOgFar(hvemPlanlegger);
    const erAlenesøker = erAlene(hvemPlanlegger);
    const fornavn1 = getFornavnPåSøker1(hvemPlanlegger, intl);
    const fornavn2 = getFornavnPåSøker2(hvemPlanlegger, intl);

    const getTekstTilFar1 = () => {
        if (erFarOgFar(hvemPlanlegger) && !hvemPlanlegger.navnPåFar) {
            return <FormattedMessage id="OppgittInformasjon.TekstFar1" />;
        }
        return getFornavnPåSøker1(hvemPlanlegger, intl);
    };
    const getTekstTilFar2 = () => {
        if (erFarOgFar(hvemPlanlegger) && !hvemPlanlegger.navnPåMedfar) {
            return <FormattedMessage id="OppgittInformasjon.TekstFar2" />;
        }
        return getFornavnPåSøker2(hvemPlanlegger, intl);
    };

    const denEneFaren = getTekstTilFar1();
    const denAndreFaren = getTekstTilFar2();

    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);
    const valgtStønadskonto = stønadskontoer[hvorLangPeriode.dekningsgrad];

    const ukerOgDagerMedForeldrepenger = finnAntallUkerOgDagerMedForeldrepenger(valgtStønadskonto);

    const antallUkerOgDagerFellesperiode = getAntallUkerOgDagerFellesperiode(valgtStønadskonto);

    const antallUkerOgDagerFellesperiodeSøker1 = fordeling ? getUkerOgDager(fordeling.antallDagerSøker1) : undefined;
    const antallUkerOgDagerFellesperiodeSøker2 = fordeling
        ? getUkerOgDager(antallUkerOgDagerFellesperiode.totaltAntallDager - fordeling.antallDagerSøker1)
        : undefined;

    const erFarOgFarFødsel = hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR && !erAdoptert;

    const minsteInntekt = formatCurrencyWithKr(finnSisteGrunnbeløp(satser) / 2);

    return (
        <VStack gap="space-40">
            <ExpansionCard aria-label="" onToggle={loggExpansionCardOpen('toggle-oppgitt-informasjon')} size="small">
                <ExpansionCard.Header>
                    <HStack gap="space-24" align="center" wrap={false}>
                        <IconCircleWrapper size="medium" color="lightBlue">
                            <ChatElipsisIcon height={24} width={24} fontSize="1.5rem" aria-hidden />
                        </IconCircleWrapper>
                        <ExpansionCard.Title size="small">
                            <FormattedMessage id="OppgittInformasjon.OppgittInformasjon" values={{ erAlenesøker }} />
                        </ExpansionCard.Title>
                    </HStack>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <VStack gap="space-8">
                        <BluePanel>
                            <VStack gap="space-8">
                                <Heading size="xsmall" level="4">
                                    <FormattedMessage id="OppgittInformasjon.Barnet.Tittel" values={{ antallBarn }} />
                                </Heading>

                                {barnet.erFødsel && erFødt && (
                                    <BodyLong>
                                        <FormattedMessage
                                            id="OppgittInformasjon.InformasjonOmBarn"
                                            values={{
                                                antallBarn,
                                                erFødt,
                                                dato: intl.formatDate(barnet.fødselsdato, {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                }),
                                                dato2: intl.formatDate(barnet.termindato, {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                }),
                                            }}
                                        />
                                    </BodyLong>
                                )}
                                {barnet.erFødsel && !erFødt && !erAdoptert && (
                                    <BodyLong>
                                        <FormattedMessage
                                            id="OppgittInformasjon.InformasjonOmBarn"
                                            values={{
                                                antallBarn,
                                                erFødt,
                                                dato: intl.formatDate(barnet.termindato, {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                }),
                                            }}
                                        />
                                    </BodyLong>
                                )}
                                {erAdoptert && (
                                    <BodyLong>
                                        <FormattedMessage
                                            id="OppgittInformasjon.InformasjonOmBarnAdopsjon"
                                            values={{
                                                antallBarn,
                                                dato2: intl.formatDate(barnet.fødselsdato, {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                }),
                                                dato: intl.formatDate(barnet.overtakelsesdato, {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                }),
                                            }}
                                        />
                                    </BodyLong>
                                )}
                            </VStack>
                        </BluePanel>
                        <BluePanel>
                            <VStack gap="space-8">
                                <Heading size="xsmall" level="4">
                                    <FormattedMessage id="OppgittInformasjon.Arbeid.Tittel" />
                                </Heading>
                                {erAlenesøker && (
                                    <BodyLong>
                                        <FormattedMessage
                                            id="OppgittInformasjon.Arbeidssituasjon"
                                            values={{
                                                navn: capitalizeFirstLetter(fornavn1),
                                                arbeidssituasjon: arbeidssituasjon.status,
                                                minsteInntekt,
                                            }}
                                        />
                                    </BodyLong>
                                )}
                                {!erAlenesøker && fornavn2 && (
                                    <>
                                        {hvemHarRett === 'beggeHarRett' && (
                                            <BodyLong>
                                                <FormattedMessage
                                                    id="OppgittInformasjon.ArbeidssituasjonBeggeJobber"
                                                    values={{
                                                        navn: fornavn1,
                                                        navn2: fornavn2,
                                                        arbeidssituasjon: arbeidssituasjon.status,
                                                        minsteInntekt,
                                                    }}
                                                />
                                            </BodyLong>
                                        )}
                                        {hvemHarRett !== 'beggeHarRett' && erFedre && (
                                            <>
                                                <BodyLong>
                                                    <FormattedMessage
                                                        id="OppgittInformasjon.Arbeidssituasjon"
                                                        values={{
                                                            navn: denEneFaren ?? capitalizeFirstLetter(fornavn1),
                                                            arbeidssituasjon: arbeidssituasjon.status,
                                                            minsteInntekt,
                                                        }}
                                                    />
                                                </BodyLong>
                                                <BodyLong>
                                                    <FormattedMessage
                                                        id="OppgittInformasjon.ArbeidssituasjonAnnenPart"
                                                        values={{
                                                            navn: denAndreFaren ?? capitalizeFirstLetter(fornavn2),
                                                            arbeidssituasjon: arbeidssituasjon.jobberAnnenPart,
                                                            minsteInntekt,
                                                        }}
                                                    />
                                                </BodyLong>
                                            </>
                                        )}
                                        {hvemHarRett !== 'beggeHarRett' && !erFedre && (
                                            <>
                                                <BodyLong>
                                                    <FormattedMessage
                                                        id="OppgittInformasjon.Arbeidssituasjon"
                                                        values={{
                                                            navn: capitalizeFirstLetter(fornavn1),
                                                            arbeidssituasjon: arbeidssituasjon.status,
                                                            minsteInntekt,
                                                        }}
                                                    />
                                                </BodyLong>
                                                <BodyLong>
                                                    <FormattedMessage
                                                        id="OppgittInformasjon.ArbeidssituasjonAnnenPart"
                                                        values={{
                                                            navn: capitalizeFirstLetter(fornavn2),
                                                            arbeidssituasjon: arbeidssituasjon.jobberAnnenPart,
                                                            minsteInntekt,
                                                        }}
                                                    />
                                                </BodyLong>
                                            </>
                                        )}
                                    </>
                                )}
                            </VStack>
                        </BluePanel>
                        <BluePanel>
                            <VStack gap="space-8">
                                <Heading size="xsmall" level="4">
                                    <FormattedMessage
                                        id="OppgittInformasjon.LengdeOgFordeling"
                                        values={{ kunEnPartSkalHa: hvemHarRett !== 'beggeHarRett' }}
                                    />
                                </Heading>
                                <BodyLong>
                                    {!erFarOgFarFødsel && (
                                        <FormattedMessage
                                            id="OppgittInformasjon.FordelingOptionsMedUker"
                                            values={{
                                                erAlenesøker,
                                                prosent: hvorLangPeriode.dekningsgrad,
                                                uker: ukerOgDagerMedForeldrepenger.uker,
                                                dager: ukerOgDagerMedForeldrepenger.dager,
                                                fellesuker: antallUkerOgDagerFellesperiodeSøker1?.uker || 0,
                                                fellesdager: antallUkerOgDagerFellesperiodeSøker1?.dager || 0,
                                                fellesuker2: antallUkerOgDagerFellesperiodeSøker2?.uker || 0,
                                                fellesdager2: antallUkerOgDagerFellesperiodeSøker2?.dager || 0,
                                                hvem: getFornavnPåSøker1(hvemPlanlegger, intl),
                                                hvem2: getFornavnPåSøker2(hvemPlanlegger, intl),
                                                kunEnPartSkalHa: hvemHarRett !== 'beggeHarRett',
                                            }}
                                        />
                                    )}
                                    {erFarOgFarFødsel && (
                                        <FormattedMessage
                                            id="OppgittInformasjon.FordelingOptionsMedUkerFarOgFarFødsel"
                                            values={{
                                                erAlenesøker,
                                                prosent: hvorLangPeriode.dekningsgrad,
                                                uker: ukerOgDagerMedForeldrepenger.uker,
                                                dager: ukerOgDagerMedForeldrepenger.dager,
                                            }}
                                        />
                                    )}
                                </BodyLong>
                            </VStack>
                        </BluePanel>
                    </VStack>
                </ExpansionCard.Content>
            </ExpansionCard>
        </VStack>
    );
};
