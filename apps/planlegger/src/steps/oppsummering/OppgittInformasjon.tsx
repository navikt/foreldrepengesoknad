import { ChatElipsisIcon } from '@navikt/aksel-icons';
import GreenPanel from 'components/boxes/GreenPanel';
import IconCircleWrapper from 'components/iconCircle/IconCircleWrapper';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidssituasjon } from 'types/Arbeidssituasjon';
import { OmBarnet, erBarnetAdoptert, erBarnetFødt, erBarnetIkkeFødt } from 'types/Barnet';
import { Fordeling } from 'types/Fordeling';
import {
    HvemPlanlegger,
    getFornavnPåAnnenPart,
    getFornavnPåSøker,
    getNavnPåAnnenPart,
    getNavnPåSøker,
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
import { finnUttaksdata } from 'utils/uttakHjelper';

import { BodyLong, ExpansionCard, HStack, Heading, VStack } from '@navikt/ds-react';

import { DDMMYYYY_DATE_FORMAT } from '@navikt/fp-constants';

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

    const erAleneforsørger = isAlene(hvemPlanlegger);
    const navn1 = getNavnPåSøker(hvemPlanlegger, intl);
    const navn2 = getNavnPåAnnenPart(hvemPlanlegger, intl);
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
    const { sluttdatoSøker1, startdatoSøker1, sluttdatoSøker2 } = finnUttaksdata(
        hvemHarRett,
        valgtStønadskonto,
        barnet,
        fordeling?.antallUkerSøker1,
    );

    return (
        <VStack gap="10">
            <ExpansionCard aria-label="">
                <ExpansionCard.Header>
                    <HStack gap="5" align="center">
                        <IconCircleWrapper size="large" color="green">
                            <ChatElipsisIcon height={28} width={28} fontSize="1.5rem" />
                        </IconCircleWrapper>
                        <ExpansionCard.Title size="medium">
                            <FormattedMessage
                                id="OppgittInformasjon.OppgittInformasjon"
                                values={{ erAleneforsørger }}
                            />
                        </ExpansionCard.Title>
                    </HStack>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <VStack gap="10">
                        <GreenPanel>
                            <Heading size="small">
                                <FormattedMessage id="OppgittInformasjon.Forelder" values={{ erAleneforsørger }} />
                            </Heading>
                            <BodyLong>
                                {erAleneforsørger ? (
                                    navn1
                                ) : (
                                    <FormattedMessage
                                        id="OppgittInformasjon.NavnBegge"
                                        values={{ navn1: navn1, navn2: navn2 }}
                                    />
                                )}
                            </BodyLong>
                        </GreenPanel>
                        <GreenPanel>
                            <>
                                <Heading size="small">
                                    <FormattedMessage id="OppgittInformasjon.Barnet.Tittel" />
                                </Heading>
                                {erAdoptert && (
                                    <BodyLong>
                                        <FormattedMessage id="OppgittInformasjon.Adopsjon.Tittel" />
                                    </BodyLong>
                                )}
                                <BodyLong>
                                    <FormattedMessage
                                        id="OppgittInformasjon.AntallBarn"
                                        values={{ antall: barnet.antallBarn }}
                                    />
                                </BodyLong>
                                {erFødt && (
                                    <BodyLong>
                                        <FormattedMessage
                                            id="OppgittInformasjon.Fødselsdato"
                                            values={{
                                                dato: dayjs(barnet.fødselsdato).format(DDMMYYYY_DATE_FORMAT),
                                            }}
                                        />
                                    </BodyLong>
                                )}
                                {(erBarnetIkkeFødt(barnet) || (erFødt && !erAdoptert)) && (
                                    <BodyLong>
                                        <FormattedMessage
                                            id="OppgittInformasjon.Termindato"
                                            values={{ dato: dayjs(barnet.termindato).format(DDMMYYYY_DATE_FORMAT) }}
                                        />
                                    </BodyLong>
                                )}
                                {erAdoptert && (
                                    <BodyLong>
                                        <FormattedMessage
                                            id="OppgittInformasjon.Overtakelsesdato"
                                            values={{
                                                dato: dayjs(barnet.overtakelsesdato).format(DDMMYYYY_DATE_FORMAT),
                                            }}
                                        />
                                    </BodyLong>
                                )}
                            </>
                        </GreenPanel>
                        <GreenPanel>
                            <>
                                <Heading size="small">
                                    <FormattedMessage id="OppgittInformasjon.Arbeid.Tittel" />
                                </Heading>
                                <BodyLong>
                                    <FormattedMessage
                                        id="OppgittInformasjon.Arbeidssituasjon"
                                        values={{ navn: fornavn1, arbeidssituasjon: arbeidssituasjon.status }}
                                    />
                                </BodyLong>

                                {!erAleneforsørger && (
                                    <BodyLong>
                                        <FormattedMessage
                                            id="OppgittInformasjon.Arbeidssituasjon"
                                            values={{
                                                navn: fornavn2,
                                                arbeidssituasjon:
                                                    //TODO Hardkoda tekstar
                                                    arbeidssituasjon.jobberAnnenPart === true
                                                        ? 'Jobber'
                                                        : 'Jobber ikke',
                                            }}
                                        />
                                    </BodyLong>
                                )}
                            </>
                        </GreenPanel>
                        <GreenPanel>
                            <>
                                <Heading size="small">
                                    <FormattedMessage id="OppgittInformasjon.Periode" />
                                </Heading>

                                <BodyLong>
                                    <FormattedMessage
                                        id="OppgittInformasjon.Perioder"
                                        values={{
                                            prosent: hvorLangPeriode.dekningsgrad,
                                            uker: erAdoptert ? antallUkerAdopsjon : antallUker,
                                        }}
                                    />
                                </BodyLong>
                                {!erAleneforsørger && (
                                    <VStack gap="5">
                                        <BodyLong>
                                            <FormattedMessage
                                                id="OppgittInformasjon.FordelingOptionsMedUker"
                                                values={{
                                                    uker: antallUkerFellesperiodeSøker1,
                                                    uker2: antallUkerFellesperiodeSøker2,
                                                    hvem: fornavn1,
                                                    hvem2: fornavn2,
                                                }}
                                            />
                                        </BodyLong>
                                        <div>
                                            <BodyLong>
                                                <FormattedMessage
                                                    id="OppgittInformasjon.InfoboksTekst.FørsteDag"
                                                    values={{
                                                        hvem: fornavn1,
                                                        dag: dayjs(startdatoSøker1).format('DD.MM.YY'),
                                                    }}
                                                />
                                            </BodyLong>
                                            <BodyLong>
                                                <FormattedMessage
                                                    id="OppgittInformasjon.InfoboksTekst.SisteDag"
                                                    values={{
                                                        hvem: fornavn1,
                                                        dag: dayjs(sluttdatoSøker1).format('DD.MM.YY'),
                                                    }}
                                                />
                                            </BodyLong>
                                            <BodyLong>
                                                <FormattedMessage
                                                    id="OppgittInformasjon.InfoboksTekst.FørsteDag"
                                                    values={{
                                                        hvem: fornavn2,
                                                        dag: dayjs(sluttdatoSøker1).add(1, 'day').format('DD.MM.YY'),
                                                    }}
                                                />
                                            </BodyLong>
                                            <BodyLong>
                                                <FormattedMessage
                                                    id="OppgittInformasjon.InfoboksTekst.SisteDag"
                                                    values={{
                                                        hvem: fornavn2,
                                                        dag: dayjs(sluttdatoSøker2).format('DD.MM.YY'),
                                                    }}
                                                />
                                            </BodyLong>
                                        </div>
                                    </VStack>
                                )}
                            </>
                        </GreenPanel>
                    </VStack>
                </ExpansionCard.Content>
            </ExpansionCard>
        </VStack>
    );
};

export default OppgittInformasjon;
