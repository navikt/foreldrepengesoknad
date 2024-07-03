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
    getAntallUker,
    getAntallUkerOgDager,
    getAntallUkerOgDagerAktivitetsfriKvote,
    getAntallUkerOgDagerFellesperiode,
    getUkerOgDager,
} from 'utils/stønadskontoerUtils';
import { finnUttaksdata } from 'utils/uttakUtils';

import { BodyLong, BodyShort, Heading, VStack } from '@navikt/ds-react';

import { TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';
import { BluePanel, Calendar } from '@navikt/fp-ui';

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

    const erFarOgFar = hvemPlanlegger.type === Situasjon.FAR_OG_FAR;
    const fornavnSøker1 = getFornavnPåSøker1(hvemPlanlegger, intl);
    const fornavnSøker2 = getFornavnPåSøker2(hvemPlanlegger, intl);

    return (
        <VStack gap="5">
            {hvemHarRett === 'beggeHarRett' && !erFarOgFar && fornavnSøker2 && (
                <BluePanel>
                    <Heading level="4" size="small">
                        <FormattedMessage id="OppsummeringSteg.Perioden" />
                    </Heading>
                    <BodyLong>
                        <FormattedMessage
                            id="OppsummeringSteg.DereValgte"
                            values={{
                                prosent: hvorLangPeriode.dekningsgrad,
                                antallUker: getAntallUkerOgDager(valgtStønadskonto).uker,
                                antallDager: getAntallUkerOgDager(valgtStønadskonto).dager,
                                hvem: getFornavnPåSøker1(hvemPlanlegger, intl),
                                hvem2: getFornavnPåSøker2(hvemPlanlegger, intl),
                                uker: antallUkerOgDagerFellesperiodeSøker1?.uker,
                                dager: antallUkerOgDagerFellesperiodeSøker1?.dager || 0,
                                uker2: antallUkerOgDagerFellesperiodeSøker2?.uker,
                                dager2: antallUkerOgDagerFellesperiodeSøker2?.dager || 0,
                            }}
                        />
                    </BodyLong>
                    <BodyLong>
                        <FormattedMessage
                            id="OppsummeringSteg.Periodene"
                            values={{
                                hvem: getNavnGenitivEierform(fornavnSøker1, intl.locale),
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
                    <BodyLong>
                        <FormattedMessage
                            id="OppsummeringSteg.Periodene"
                            values={{
                                hvem: getNavnGenitivEierform(fornavnSøker2, intl.locale),
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
                        <Heading level="4" size="small">
                            <FormattedMessage id="OppsummeringSteg.Perioden" />
                        </Heading>
                        <BodyShort>
                            <FormattedMessage
                                id="OppsummeringSteg.DereValgteFedreEllerAlene"
                                values={{
                                    prosent: hvorLangPeriode.dekningsgrad,
                                    erAlenesøker: erAlenesøker(hvemPlanlegger),
                                    antallUker: getAntallUker(valgtStønadskonto),
                                }}
                            />
                        </BodyShort>
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
                    </VStack>
                </BluePanel>
            )}
            {hvemHarRett === 'kunSøker2HarRett' && !erFarOgFar && fornavnSøker2 && (
                <BluePanel>
                    <VStack gap="2">
                        <Heading level="4" size="small">
                            <FormattedMessage id="OppsummeringSteg.Perioden" />
                        </Heading>
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
                                    antallUker: getAntallUker(valgtStønadskonto),
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
                        </BodyShort>{' '}
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
            <Calendar periods={uttaksperioder} useSmallerWidth />
        </VStack>
    );
};
export default OppsummeringHarRett;
