import { CalendarIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { barnehagestartDato } from 'steps/barnehageplass/BarnehageplassSteg';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { Fordeling } from 'types/Fordeling';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { HvorLangPeriode } from 'types/HvorLangPeriode';
import {
    erAlenesøker,
    getErFarEllerMedmor,
    getFornavnPåSøker1,
    getFornavnPåSøker2,
    getNavnGenitivEierform,
} from 'utils/HvemPlanleggerUtils';
import { utledHvemSomHarRett, utledRettighet } from 'utils/hvemHarRettUtils';
import {
    getAntallUkerOgDager,
    getAntallUkerOgDagerAktivitetsfriKvote,
    getAntallUkerOgDagerFellesperiode,
    getUkerOgDager,
} from 'utils/stønadskontoerUtils';
import { loggExpansionCardOpen } from 'utils/umamiUtils';
import { useLagUttaksplanForslag } from 'utils/useLagUttaksplanForslag';
import { finnAntallUkerOgDagerMedForeldrepenger, getAnnenpartsPerioder, getSøkersPerioder } from 'utils/uttakUtils';

import { BodyLong, BodyShort, ExpansionCard, HStack, VStack } from '@navikt/ds-react';

import { HvemPlanleggerType, KontoBeregningDto } from '@navikt/fp-types';
import { BluePanel, IconCircleWrapper } from '@navikt/fp-ui';
import { capitalizeFirstLetter } from '@navikt/fp-utils';
import { UttaksplanDataProvider, UttaksplanKalender } from '@navikt/fp-uttaksplan-ny';

import { ContextDataType, useContextGetData } from '../../../app-data/PlanleggerDataContext';
import { mapOmBarnetTilBarn } from '../../../utils/barnetUtils';

interface Props {
    valgtStønadskonto: KontoBeregningDto;
    hvorLangPeriode: HvorLangPeriode;
    hvemPlanlegger: HvemPlanlegger;
    barnet: OmBarnet;
    arbeidssituasjon: Arbeidssituasjon;
    fordeling?: Fordeling;
}

export const OppsummeringHarRett = ({
    valgtStønadskonto,
    hvorLangPeriode,
    hvemPlanlegger,
    barnet,
    arbeidssituasjon,
    fordeling,
}: Props) => {
    const intl = useIntl();

    const uttaksplan = useContextGetData(ContextDataType.UTTAKSPLAN);

    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);

    const antallDagerFellesperiode = getAntallUkerOgDagerFellesperiode(valgtStønadskonto).totaltAntallDager;
    const antallUkerOgDagerFellesperiodeSøker1 = fordeling ? getUkerOgDager(fordeling.antallDagerSøker1) : undefined;
    const antallUkerOgDagerFellesperiodeSøker2 = fordeling
        ? getUkerOgDager(antallDagerFellesperiode - fordeling.antallDagerSøker1)
        : undefined;
    const antallUkerOgDagerAktivitetsfriKvote = getAntallUkerOgDagerAktivitetsfriKvote(valgtStønadskonto);

    const erFarEllerMedmor = getErFarEllerMedmor(hvemPlanlegger, hvemHarRett);

    const erAleneOmOmsorg =
        hvemPlanlegger.type === HvemPlanleggerType.FAR || hvemPlanlegger.type === HvemPlanleggerType.MOR;

    const ukerOgDagerMedForeldrepenger = finnAntallUkerOgDagerMedForeldrepenger(valgtStønadskonto);

    const erFarOgFar = hvemPlanlegger.type === HvemPlanleggerType.FAR_OG_FAR;
    const fornavnSøker1 = getFornavnPåSøker1(hvemPlanlegger, intl);
    const fornavnSøker1Genitiv = getNavnGenitivEierform(fornavnSøker1, intl.locale);
    const fornavnSøker2 = getFornavnPåSøker2(hvemPlanlegger, intl);
    const fornavnSøker2Genitiv = fornavnSøker2 ? getNavnGenitivEierform(fornavnSøker2, intl.locale) : undefined;

    const barnehagestartdato = barnehagestartDato(barnet);

    const erDeltUttak = fordeling !== undefined;

    const planforslag = useLagUttaksplanForslag(valgtStønadskonto);

    const søker1Plan = uttaksplan ? getSøkersPerioder(erDeltUttak, uttaksplan, erFarEllerMedmor) : planforslag.søker1;
    const søker2Plan = uttaksplan
        ? getAnnenpartsPerioder(erDeltUttak, uttaksplan, erFarEllerMedmor)
        : planforslag.søker2;

    return (
        <VStack gap="space-40">
            <ExpansionCard aria-label="" onToggle={loggExpansionCardOpen('toggle-oppgitt-informasjon')} size="small">
                <ExpansionCard.Header>
                    <HStack gap="space-24" align="center" wrap={false}>
                        <IconCircleWrapper size="medium" color="lightBlue">
                            <CalendarIcon height={24} width={24} fontSize="1.5rem" aria-hidden />
                        </IconCircleWrapper>
                        <ExpansionCard.Title size="small">
                            <FormattedMessage
                                id="PlanenDeresOppsummering.Tittel"
                                values={{ erAlenesøker: erAlenesøker(hvemPlanlegger) }}
                            />
                        </ExpansionCard.Title>
                    </HStack>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <VStack gap="space-20">
                        {hvemHarRett === 'beggeHarRett' && !erFarOgFar && fornavnSøker2 && fornavnSøker2Genitiv && (
                            <BluePanel>
                                <VStack gap="space-8">
                                    <BodyLong>
                                        <FormattedMessage
                                            id="OppsummeringSteg.DereValgte"
                                            values={{
                                                prosent: hvorLangPeriode.dekningsgrad,
                                                antallUker: ukerOgDagerMedForeldrepenger.uker,
                                                antallDager: ukerOgDagerMedForeldrepenger.dager,
                                                hvem: getFornavnPåSøker1(hvemPlanlegger, intl),
                                                hvem2: getFornavnPåSøker2(hvemPlanlegger, intl),
                                                uker: antallUkerOgDagerFellesperiodeSøker1?.uker || 0,
                                                dager: antallUkerOgDagerFellesperiodeSøker1?.dager || 0,
                                                uker2: antallUkerOgDagerFellesperiodeSøker2?.uker || 0,
                                                dager2: antallUkerOgDagerFellesperiodeSøker2?.dager || 0,
                                            }}
                                        />
                                    </BodyLong>

                                    {søker1Plan.length > 0 && (
                                        <BodyLong>
                                            <FormattedMessage
                                                id="OppsummeringSteg.Periodene"
                                                values={{
                                                    hvem: capitalizeFirstLetter(fornavnSøker1Genitiv),
                                                    fom: intl.formatDate(søker1Plan[0]!.fom, {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    }),
                                                    tom: intl.formatDate(søker1Plan.at(-1)!.tom, {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    }),
                                                    b: (msg) => <b>{msg}</b>,
                                                }}
                                            />
                                        </BodyLong>
                                    )}
                                </VStack>

                                <>
                                    {søker2Plan.length > 0 && (
                                        <BodyLong>
                                            <FormattedMessage
                                                id="OppsummeringSteg.Periodene"
                                                values={{
                                                    hvem: capitalizeFirstLetter(fornavnSøker2Genitiv),
                                                    fom: intl.formatDate(søker2Plan[0]!.fom, {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    }),
                                                    tom: intl.formatDate(søker2Plan.at(-1)!.tom, {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    }),
                                                    b: (msg) => <b>{msg}</b>,
                                                }}
                                            />
                                        </BodyLong>
                                    )}
                                </>
                            </BluePanel>
                        )}
                        {(erAlenesøker(hvemPlanlegger) || erFarOgFar) && (
                            <BluePanel>
                                <VStack gap="space-8">
                                    <BodyShort>
                                        <FormattedMessage
                                            id="OppsummeringSteg.DereValgteFedreEllerAlene"
                                            values={{
                                                prosent: hvorLangPeriode.dekningsgrad,
                                                erAlenesøker: erAlenesøker(hvemPlanlegger),
                                                antallUker: ukerOgDagerMedForeldrepenger.uker,
                                                antallDager: ukerOgDagerMedForeldrepenger.dager,
                                            }}
                                        />
                                    </BodyShort>
                                    {søker1Plan.length > 0 && (
                                        <BodyShort>
                                            <FormattedMessage
                                                id="OppsummeringSteg.Periode"
                                                values={{
                                                    fom: intl.formatDate(søker1Plan[0]!.fom, {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    }),
                                                    tom: intl.formatDate(søker1Plan.at(-1)!.tom, {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    }),
                                                    b: (msg) => <b>{msg}</b>,
                                                }}
                                            />
                                        </BodyShort>
                                    )}
                                </VStack>
                            </BluePanel>
                        )}
                        {hvemHarRett === 'kunSøker2HarRett' && !erFarOgFar && fornavnSøker2 && (
                            <BluePanel>
                                <VStack gap="space-8">
                                    <BodyShort>
                                        <FormattedMessage
                                            id="OppsummeringSteg.DereValgteAktivitetskrav"
                                            values={{
                                                uker1: antallUkerOgDagerAktivitetsfriKvote.uker,
                                                dager1: antallUkerOgDagerAktivitetsfriKvote.dager,
                                                uker2:
                                                    getAntallUkerOgDager(valgtStønadskonto).uker -
                                                    antallUkerOgDagerAktivitetsfriKvote.uker,
                                                dager2:
                                                    getAntallUkerOgDager(valgtStønadskonto).dager -
                                                    antallUkerOgDagerAktivitetsfriKvote.dager,
                                                hvem: fornavnSøker1,
                                                prosent: hvorLangPeriode.dekningsgrad,
                                                antallUker: getAntallUkerOgDager(valgtStønadskonto).uker,
                                                dager: getAntallUkerOgDager(valgtStønadskonto).dager,
                                            }}
                                        />
                                    </BodyShort>
                                </VStack>
                            </BluePanel>
                        )}
                        <UttaksplanDataProvider
                            barn={mapOmBarnetTilBarn(barnet)}
                            foreldreInfo={{
                                søker: erFarEllerMedmor ? 'FAR_ELLER_MEDMOR' : 'MOR',
                                navnPåForeldre: { mor: fornavnSøker1, farMedmor: fornavnSøker2 || '' },
                                rettighetType: utledRettighet(erAleneOmOmsorg, erDeltUttak),
                                erMedmorDelAvSøknaden: hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_MEDMOR,
                                erIkkeSøkerSpesifisert: erDeltUttak,
                            }}
                            valgtStønadskonto={valgtStønadskonto}
                            harAktivitetskravIPeriodeUtenUttak={false}
                            saksperioder={uttaksplan ?? [...planforslag.søker1, ...planforslag.søker2]}
                        >
                            <UttaksplanKalender barnehagestartdato={barnehagestartdato} readOnly />
                        </UttaksplanDataProvider>
                    </VStack>
                </ExpansionCard.Content>
            </ExpansionCard>
        </VStack>
    );
};
