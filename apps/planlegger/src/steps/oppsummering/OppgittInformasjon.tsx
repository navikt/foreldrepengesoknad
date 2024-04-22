import { ChatElipsisIcon } from '@navikt/aksel-icons';
import GreenPanel from 'components/boxes/GreenPanel';
import IconCircleWrapper from 'components/iconCircle/IconCircleWrapper';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidssituasjon, Arbeidsstatus } from 'types/Arbeidssituasjon';
import { OmBarnet, erBarnetAdoptert, erBarnetFødt } from 'types/Barnet';
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
import { TilgjengeligeStønadskontoerDTO } from 'types/TilgjengeligeStønadskontoerDTO';
import { utledHvemSomHarRett } from 'utils/hvemHarRettHjelper';
import {
    getAntallUker,
    getAntallUkerFellesperiode,
    getAntallUkerForeldrepengerFørFødsel,
    mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto,
} from 'utils/stønadskontoer';

import { BodyLong, ExpansionCard, HStack, Heading, VStack } from '@navikt/ds-react';

interface Props {
    stønadskontoer: TilgjengeligeStønadskontoerDTO;
    barnet: OmBarnet;
    hvemPlanlegger: HvemPlanlegger;
    arbeidssituasjon: Arbeidssituasjon;
    hvorLangPeriode: HvorLangPeriode;
    fordeling?: Fordeling;
}

const OppgittInformasjon: FunctionComponent<Props> = ({
    stønadskontoer,
    barnet,
    hvemPlanlegger,
    arbeidssituasjon,
    hvorLangPeriode,
    fordeling,
}) => {
    const intl = useIntl();

    const erFødt = erBarnetFødt(barnet);
    const erAdoptert = erBarnetAdoptert(barnet);
    const antallBarn = barnet.antallBarn;

    const erAlenesøker = isAlene(hvemPlanlegger);
    const fornavn1 = getFornavnPåSøker(hvemPlanlegger, intl);
    const fornavn2 = getFornavnPåAnnenPart(hvemPlanlegger, intl);

    const valgtStønadskonto = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(
        stønadskontoer[hvorLangPeriode.dekningsgrad],
    );
    const antallUkerFellesperiode = getAntallUkerFellesperiode(valgtStønadskonto);
    const antallUker = getAntallUker(valgtStønadskonto);

    const antallUkerAdopsjon = erAdoptert
        ? getAntallUker(valgtStønadskonto) - getAntallUkerForeldrepengerFørFødsel(valgtStønadskonto)
        : getAntallUker(valgtStønadskonto);

    const antallUkerFellesperiodeSøker1 = fordeling ? fordeling.antallUkerSøker1 : '';
    const antallUkerFellesperiodeSøker2 = fordeling ? antallUkerFellesperiode - fordeling.antallUkerSøker1 : '';

    const hvemHarRett = utledHvemSomHarRett(hvemPlanlegger, arbeidssituasjon);
    const kunEnPartSkalHa = hvemHarRett !== 'beggeHarRett';

    return (
        <VStack gap="10">
            <ExpansionCard aria-label="">
                <ExpansionCard.Header>
                    <HStack gap="5" align="center" wrap={false}>
                        <IconCircleWrapper size="large" color="green">
                            <ChatElipsisIcon height={28} width={28} fontSize="1.5rem" aria-hidden />
                        </IconCircleWrapper>
                        <ExpansionCard.Title size="medium">
                            <FormattedMessage id="OppgittInformasjon.OppgittInformasjon" values={{ erAlenesøker }} />
                        </ExpansionCard.Title>
                    </HStack>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <VStack gap="10">
                        <GreenPanel>
                            <>
                                <Heading size="small" level="4">
                                    <FormattedMessage id="OppgittInformasjon.Barnet.Tittel" values={{ antallBarn }} />
                                </Heading>

                                {erFødt && (
                                    <BodyLong>
                                        <FormattedMessage
                                            id="OppgittInformasjon.InformasjonOmBarn"
                                            values={{
                                                antallBarn,
                                                erFødt,
                                                dato: dayjs(barnet.fødselsdato).format('D. MMM YY'),
                                                dato2: dayjs(barnet.termindato).format('D. MMM YY'),
                                            }}
                                        />
                                    </BodyLong>
                                )}
                                {!erFødt && !erAdoptert && (
                                    <BodyLong>
                                        <FormattedMessage
                                            id="OppgittInformasjon.InformasjonOmBarn"
                                            values={{
                                                antallBarn,
                                                erFødt,
                                                dato: dayjs(barnet.termindato).format('D. MMM YY'),
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
                                                dato2: dayjs(barnet.fødselsdato).format('D. MMM YY'),
                                                dato: dayjs(barnet.overtakelsesdato).format('D. MMM YY'),
                                            }}
                                        />
                                    </BodyLong>
                                )}
                            </>
                        </GreenPanel>
                        <GreenPanel>
                            <>
                                <Heading size="small" level="4">
                                    <FormattedMessage id="OppgittInformasjon.Arbeid.Tittel" />
                                </Heading>

                                {!kunEnPartSkalHa ? (
                                    arbeidssituasjon.status === Arbeidsstatus.JOBBER &&
                                    arbeidssituasjon.jobberAnnenPart === true && (
                                        <BodyLong>
                                            <FormattedMessage
                                                id="OppgittInformasjon.ArbeidssituasjonBeggeJobber"
                                                values={{
                                                    navn: fornavn1,
                                                    navn2: fornavn2,
                                                    arbeidssituasjon: arbeidssituasjon.status,
                                                }}
                                            />
                                        </BodyLong>
                                    )
                                ) : (
                                    <>
                                        <BodyLong>
                                            <FormattedMessage
                                                id="OppgittInformasjon.Arbeidssituasjon"
                                                values={{
                                                    navn: fornavn1,
                                                    arbeidssituasjon: arbeidssituasjon.status,
                                                }}
                                            />
                                        </BodyLong>
                                        <BodyLong>
                                            <FormattedMessage
                                                id="OppgittInformasjon.ArbeidssituasjonAnnenPart"
                                                values={{
                                                    navn: fornavn2,
                                                    arbeidssituasjon: arbeidssituasjon.jobberAnnenPart,
                                                }}
                                            />
                                        </BodyLong>
                                    </>
                                )}
                                {erAlenesøker && (
                                    <BodyLong>
                                        <FormattedMessage
                                            id="OppgittInformasjon.Arbeidssituasjon"
                                            values={{
                                                navn: fornavn1,
                                                arbeidssituasjon: arbeidssituasjon.status,
                                            }}
                                        />
                                    </BodyLong>
                                )}
                            </>
                        </GreenPanel>
                        <GreenPanel>
                            <>
                                <Heading size="small" level="4">
                                    <FormattedMessage
                                        id="OppgittInformasjon.LengdeOgFordeling"
                                        values={{ kunEnPartSkalHa }}
                                    />
                                </Heading>
                                <VStack gap="5">
                                    <BodyLong>
                                        <FormattedMessage
                                            id="OppgittInformasjon.FordelingOptionsMedUker"
                                            values={{
                                                erAlenesøker,
                                                prosent: hvorLangPeriode.dekningsgrad,
                                                uker: erAdoptert ? antallUkerAdopsjon : antallUker,
                                                fellesuker: antallUkerFellesperiodeSøker1,
                                                fellesuker2: antallUkerFellesperiodeSøker2,
                                                hvem: finnSøkerTekst(intl, hvemPlanlegger),
                                                hvem2: finnAnnenPartTekst(intl, hvemPlanlegger),
                                                kunEnPartSkalHa,
                                            }}
                                        />
                                    </BodyLong>
                                </VStack>
                            </>
                        </GreenPanel>
                    </VStack>
                </ExpansionCard.Content>
            </ExpansionCard>
        </VStack>
    );
};

export default OppgittInformasjon;
