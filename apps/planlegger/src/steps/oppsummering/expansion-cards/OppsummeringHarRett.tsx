import { CalendarIcon } from '@navikt/aksel-icons';
import CalendarLabels from 'components/labels/CalendarLabels';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { Fordeling } from 'types/Fordeling';
import { HvemPlanlegger, Situasjon } from 'types/HvemPlanlegger';
import { HvorLangPeriode } from 'types/HvorLangPeriode';
import {
    erAlenesøker,
    getFornavnPåSøker1,
    getFornavnPåSøker2,
    getNavnGenitivEierform,
} from 'utils/HvemPlanleggerUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';
import { lagKalenderPerioder } from 'utils/kalenderPerioderUtils';
import {
    getAntallUkerOgDager,
    getAntallUkerOgDagerAktivitetsfriKvote,
    getAntallUkerOgDagerFellesperiode,
    getUkerOgDager,
} from 'utils/stønadskontoerUtils';
import { finnAntallUkerOgDagerMedForeldrepenger, finnUttaksdata } from 'utils/uttakUtils';

import { BodyLong, BodyShort, ExpansionCard, HStack, VStack } from '@navikt/ds-react';

import { logAmplitudeEvent } from '@navikt/fp-metrics';
import { TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';
import { BluePanel, Calendar, IconCircleWrapper } from '@navikt/fp-ui';
import { capitalizeFirstLetter } from '@navikt/fp-utils';

const onToggleExpansionCard = (open: boolean) => {
    if (open) {
        logAmplitudeEvent('applikasjon-hendelse', {
            app: 'planlegger',
            team: 'foreldrepenger',
            pageKey: 'toggle-oppgitt-informasjon',
        });
    }
};

interface Props {
    valgtStønadskonto: TilgjengeligeStønadskontoerForDekningsgrad;
    hvorLangPeriode: HvorLangPeriode;
    hvemPlanlegger: HvemPlanlegger;
    barnet: OmBarnet;
    arbeidssituasjon: Arbeidssituasjon;
    fordeling?: Fordeling;
}

const OppsummeringHarRett: FunctionComponent<Props> = ({
    valgtStønadskonto,
    hvorLangPeriode,
    hvemPlanlegger,
    barnet,
    arbeidssituasjon,
    fordeling,
}) => {
    const intl = useIntl();

    const hvemHarRett = utledHvemSomHarRett(arbeidssituasjon);

    const uttaksdata = finnUttaksdata(
        hvemHarRett,
        hvemPlanlegger,
        valgtStønadskonto,
        barnet,
        fordeling?.antallDagerSøker1,
    );

    const antallDagerFellesperiode = getAntallUkerOgDagerFellesperiode(valgtStønadskonto).totaltAntallDager;
    const antallUkerOgDagerFellesperiodeSøker1 = fordeling ? getUkerOgDager(fordeling.antallDagerSøker1) : undefined;
    const antallUkerOgDagerFellesperiodeSøker2 = fordeling
        ? getUkerOgDager(antallDagerFellesperiode - fordeling.antallDagerSøker1)
        : undefined;
    const antallUkerOgDagerAktivitetsfriKvote = getAntallUkerOgDagerAktivitetsfriKvote(valgtStønadskonto);

    const uttaksperioder = lagKalenderPerioder(
        valgtStønadskonto,
        barnet,
        hvemPlanlegger,
        arbeidssituasjon,
        fordeling?.antallDagerSøker1,
    );

    const ukerOgDagerMedForeldrepenger = finnAntallUkerOgDagerMedForeldrepenger(uttaksdata);

    const erFarOgFar = hvemPlanlegger.type === Situasjon.FAR_OG_FAR;
    const fornavnSøker1 = getFornavnPåSøker1(hvemPlanlegger, intl);
    const fornavnSøker1Genitiv = getNavnGenitivEierform(fornavnSøker1, intl.locale);
    const fornavnSøker2 = getFornavnPåSøker2(hvemPlanlegger, intl);
    const fornavnSøker2Genitiv = fornavnSøker2 ? getNavnGenitivEierform(fornavnSøker2, intl.locale) : undefined;
    const { familiehendelsedato } = uttaksdata;

    return (
        <VStack gap="10">
            <ExpansionCard aria-label="" onToggle={onToggleExpansionCard} size="small">
                <ExpansionCard.Header>
                    <HStack gap="6" align="center" wrap={false}>
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
                    <VStack gap="5">
                        {hvemHarRett === 'beggeHarRett' && !erFarOgFar && fornavnSøker2 && fornavnSøker2Genitiv && (
                            <BluePanel>
                                <VStack gap="2">
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

                                    <BodyLong>
                                        <FormattedMessage
                                            id="OppsummeringSteg.Periodene"
                                            values={{
                                                hvem: capitalizeFirstLetter(fornavnSøker1Genitiv),
                                                fom: intl.formatDate(uttaksdata.startdatoPeriode1, {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric',
                                                }),
                                                tom: intl.formatDate(uttaksdata.sluttdatoPeriode1, {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric',
                                                }),
                                                b: (msg: any) => <b>{msg}</b>,
                                            }}
                                        />
                                    </BodyLong>
                                </VStack>

                                <BodyLong>
                                    <FormattedMessage
                                        id="OppsummeringSteg.Periodene"
                                        values={{
                                            hvem: capitalizeFirstLetter(fornavnSøker2Genitiv),
                                            fom: intl.formatDate(uttaksdata.startdatoPeriode2, {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                            }),
                                            tom: intl.formatDate(uttaksdata.sluttdatoPeriode2, {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                            }),
                                            b: (msg: any) => <b>{msg}</b>,
                                        }}
                                    />
                                </BodyLong>
                            </BluePanel>
                        )}
                        {(erAlenesøker(hvemPlanlegger) || erFarOgFar) && (
                            <BluePanel>
                                <VStack gap="2">
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
                                    {hvemHarRett === 'kunSøker1HarRett' ? (
                                        <BodyShort>
                                            <FormattedMessage
                                                id="OppsummeringSteg.Periode"
                                                values={{
                                                    fom: intl.formatDate(uttaksdata.startdatoPeriode1, {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    }),
                                                    tom: intl.formatDate(uttaksdata.sluttdatoPeriode2, {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    }),
                                                    b: (msg: any) => <b>{msg}</b>,
                                                }}
                                            />
                                        </BodyShort>
                                    ) : (
                                        <BodyShort>
                                            <FormattedMessage
                                                id="OppsummeringSteg.Periode"
                                                values={{
                                                    fom: intl.formatDate(uttaksdata.startdatoPeriode1, {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    }),
                                                    tom: intl.formatDate(uttaksdata.sluttdatoPeriode1, {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    }),
                                                    b: (msg: any) => <b>{msg}</b>,
                                                }}
                                            />
                                        </BodyShort>
                                    )}
                                </VStack>
                            </BluePanel>
                        )}
                        {hvemHarRett === 'kunSøker2HarRett' && !erFarOgFar && fornavnSøker2 && (
                            <BluePanel>
                                <VStack gap="2">
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
                                    <BodyShort>
                                        <FormattedMessage
                                            id="OppsummeringSteg.UtenAktivitetskrav"
                                            values={{
                                                fom: intl.formatDate(uttaksdata.startdatoPeriode1, {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric',
                                                }),
                                                tom: intl.formatDate(uttaksdata.sluttdatoPeriode1, {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric',
                                                }),
                                                b: (msg: any) => <b>{msg}</b>,
                                            }}
                                        />
                                    </BodyShort>
                                </VStack>
                                <BodyShort>
                                    <FormattedMessage
                                        id="OppsummeringSteg.MedAktivitetskrav"
                                        values={{
                                            fom: intl.formatDate(uttaksdata.startdatoPeriode2, {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                            }),
                                            tom: intl.formatDate(uttaksdata.sluttdatoPeriode2, {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                            }),
                                            b: (msg: any) => <b>{msg}</b>,
                                        }}
                                    />
                                </BodyShort>
                            </BluePanel>
                        )}
                        <CalendarLabels
                            uttaksdata={uttaksdata}
                            hvemPlanlegger={hvemPlanlegger}
                            barnet={barnet}
                            hvemHarRett={hvemHarRett}
                        />
                        <Calendar periods={uttaksperioder} familiehendelsedato={familiehendelsedato} useSmallerWidth />
                    </VStack>
                </ExpansionCard.Content>
            </ExpansionCard>
        </VStack>
    );
};
export default OppsummeringHarRett;
