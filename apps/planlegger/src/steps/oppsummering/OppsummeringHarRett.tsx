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
    finnSøker1Tekst,
    finnSøker2Tekst,
    getFornavnPåSøker1,
    getFornavnPåSøker2,
    getNavnGenitivEierform,
} from 'utils/HvemPlanleggerUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';
import { lagKalenderPerioder } from 'utils/kalenderPerioderUtils';
import { getAntallUker, getAntallUkerAktivitetsfriKvote, getAntallUkerFellesperiode } from 'utils/stønadskontoerUtils';
import { finnUttaksdata } from 'utils/uttakUtils';

import { BodyLong, BodyShort, Heading, VStack } from '@navikt/ds-react';

import { TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';
import { Calendar, GreenPanel } from '@navikt/fp-ui';

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
        fordeling?.antallUkerSøker1,
    );

    const antallUkerFellesperiode = getAntallUkerFellesperiode(valgtStønadskonto);
    const antallUkerFellesperiodeSøker1 = fordeling ? fordeling.antallUkerSøker1 : '';
    const antallUkerFellesperiodeSøker2 = fordeling ? antallUkerFellesperiode - fordeling.antallUkerSøker1 : '';
    const antallUkerAktivitetsfriKvote = getAntallUkerAktivitetsfriKvote(valgtStønadskonto);
    const antallUkerAktivitetskrav = getAntallUker(valgtStønadskonto) - antallUkerAktivitetsfriKvote;

    const uttaksperioder = lagKalenderPerioder(
        valgtStønadskonto,
        barnet,
        hvemPlanlegger,
        arbeidssituasjon,
        fordeling?.antallUkerSøker1,
    );

    const erFarOgFar = hvemPlanlegger.type === Situasjon.FAR_OG_FAR;
    const fornavnSøker1 = getFornavnPåSøker1(hvemPlanlegger, intl);
    const fornavnSøker2 = getFornavnPåSøker2(hvemPlanlegger, intl);

    return (
        <>
            <VStack gap="5">
                {hvemHarRett === 'beggeHarRett' && !erFarOgFar && fornavnSøker2 && (
                    <GreenPanel>
                        <Heading level="4" size="small">
                            <FormattedMessage id="OppsummeringSteg.Perioden" />
                        </Heading>
                        <BodyLong>
                            <FormattedMessage
                                id="OppsummeringSteg.DereValgte"
                                values={{
                                    prosent: hvorLangPeriode.dekningsgrad,
                                    antallUker: getAntallUker(valgtStønadskonto),
                                    hvem: finnSøker1Tekst(intl, hvemPlanlegger),
                                    hvem2: finnSøker2Tekst(intl, hvemPlanlegger),
                                    uker: antallUkerFellesperiodeSøker1,
                                    uker2: antallUkerFellesperiodeSøker2,
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
                    </GreenPanel>
                )}
                {(erAlenesøker(hvemPlanlegger) || erFarOgFar) && (
                    <GreenPanel>
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
                    </GreenPanel>
                )}
                {hvemHarRett === 'kunSøker2HarRett' && fornavnSøker2 && (
                    <GreenPanel>
                        <VStack gap="2">
                            <Heading level="4" size="small">
                                <FormattedMessage id="OppsummeringSteg.Perioden" />
                            </Heading>
                            <BodyShort>
                                <FormattedMessage
                                    id="OppsummeringSteg.DereValgteAktivitetskrav"
                                    values={{
                                        uker1: antallUkerAktivitetsfriKvote,
                                        uker2: antallUkerAktivitetskrav,
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
                    </GreenPanel>
                )}
                <CalendarLabels
                    uttaksdata={uttaksdata}
                    hvemPlanlegger={hvemPlanlegger}
                    barnet={barnet}
                    valgtStønadskonto={valgtStønadskonto}
                    hvemHarRett={hvemHarRett}
                />
                <Calendar periods={uttaksperioder} useSmallerWidth />
            </VStack>
        </>
    );
};
export default OppsummeringHarRett;
