import { CalendarIcon } from '@navikt/aksel-icons';
import GreenPanel from 'components/boxes/GreenPanel';
import Calendar from 'components/calendar/Calendar';
import IconCircleWrapper from 'components/iconCircle/IconCircleWrapper';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { Fordeling } from 'types/Fordeling';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { HvorLangPeriode } from 'types/HvorLangPeriode';
import {
    erAlenesøker,
    finnSøker1Tekst,
    finnSøker2Tekst,
    getFornavnPåSøker1,
    getFornavnPåSøker2,
} from 'utils/HvemPlanleggerUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';
import { lagKalenderPerioder } from 'utils/kalenderPerioderUtils';
import { TilgjengeligStønadskonto, getAntallUker, getAntallUkerFellesperiode } from 'utils/stønadskontoerUtils';
import { finnUttaksdata } from 'utils/uttakUtils';

import { BodyLong, ExpansionCard, HStack, Heading, VStack } from '@navikt/ds-react';

interface Props {
    valgtStønadskonto: TilgjengeligStønadskonto[];
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

    const hvemHarRett = utledHvemSomHarRett(hvemPlanlegger, arbeidssituasjon);

    const { sluttdatoPeriode1, startdatoPeriode1, startdatoPeriode2, sluttdatoPeriode2 } = finnUttaksdata(
        hvemHarRett,
        hvemPlanlegger,
        valgtStønadskonto,
        barnet,
        fordeling?.antallUkerSøker1,
    );

    const antallUkerFellesperiode = getAntallUkerFellesperiode(valgtStønadskonto);
    const antallUkerFellesperiodeSøker1 = fordeling ? fordeling.antallUkerSøker1 : '';
    const antallUkerFellesperiodeSøker2 = fordeling ? antallUkerFellesperiode - fordeling.antallUkerSøker1 : '';

    const uttaksperioder = lagKalenderPerioder(
        valgtStønadskonto,
        barnet,
        hvemPlanlegger,
        arbeidssituasjon,
        fordeling?.antallUkerSøker1,
    );

    return (
        <>
            <ExpansionCard aria-label="">
                <ExpansionCard.Header>
                    <HStack gap="5" align="center" wrap={false}>
                        <IconCircleWrapper size="large" color="green">
                            <CalendarIcon height={28} width={28} fontSize="1.5rem" aria-hidden />
                        </IconCircleWrapper>
                        <ExpansionCard.Title size="medium">
                            <FormattedMessage
                                id="OppsummeringSteg.Planen"
                                values={{ erAlenesøker: erAlenesøker(hvemPlanlegger) }}
                            />
                        </ExpansionCard.Title>
                    </HStack>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <VStack gap="5">
                        {hvemHarRett === 'beggeHarRett' && (
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
                                            hvem: getFornavnPåSøker1(hvemPlanlegger, intl),
                                            fom: intl.formatDate(startdatoPeriode1, {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                            }),
                                            tom: intl.formatDate(sluttdatoPeriode1, {
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
                                            hvem: getFornavnPåSøker2(hvemPlanlegger, intl),
                                            fom: intl.formatDate(startdatoPeriode2, {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                            }),
                                            tom: intl.formatDate(sluttdatoPeriode2, {
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
                        <Calendar periods={uttaksperioder} useSmallerWidth />
                    </VStack>
                </ExpansionCard.Content>
            </ExpansionCard>
        </>
    );
};
export default OppsummeringHarRett;
