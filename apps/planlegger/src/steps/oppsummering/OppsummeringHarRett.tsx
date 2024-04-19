import { CalendarIcon } from '@navikt/aksel-icons';
import GreenPanel from 'components/boxes/GreenPanel';
import Calendar from 'components/calendar/Calendar';
import IconCircleWrapper from 'components/iconCircle/IconCircleWrapper';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { OmBarnet } from 'types/Barnet';
import { Fordeling } from 'types/Fordeling';
import {
    HvemPlanlegger,
    finnAnnenPartTekst,
    finnSøkerTekst,
    getFornavnPåAnnenPart,
    getFornavnPåSøker,
    isAlene,
} from 'types/HvemPlanlegger';
import { HvorLangPeriode } from 'types/HvorLangPeriode';
import { utledHvemSomHarRett } from 'utils/hvemHarRettHjelper';
import { lagKalenderPerioder } from 'utils/kalenderPerioderHjelper';
import { TilgjengeligStønadskonto, getAntallUker, getAntallUkerFellesperiode } from 'utils/stønadskontoer';
import { finnUttaksdata } from 'utils/uttakHjelper';

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
                                values={{ erAlenesøker: isAlene(hvemPlanlegger) }}
                            />
                        </ExpansionCard.Title>
                    </HStack>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <VStack gap="5">
                        {hvemHarRett === 'beggeHarRett' && (
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
        </>
    );
};
export default OppsummeringHarRett;
