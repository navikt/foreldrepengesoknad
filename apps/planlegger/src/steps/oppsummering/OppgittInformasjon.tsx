import { ChatElipsisIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import GreenPanel from 'components/boxes/GreenPanel';
import IconCircleWrapper from 'components/iconCircle/IconCircleWrapper';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { erBarnetAdoptert, erBarnetFødt, erBarnetIkkeFødt } from 'types/Barnet';
import { Fellesperiodefordeling } from 'types/Fordeling';
import {
    getFornavnPåAnnenPart,
    getFornavnPåSøker,
    getNavnPåAnnenPart,
    getNavnPåSøker,
    isAlene,
} from 'types/HvemPlanlegger';
import { TilgjengeligeStønadskontoerDTO } from 'types/TilgjengeligeStønadskontoerDTO';
import {
    getAntallUker,
    getAntallUkerFedrekvote,
    getAntallUkerFellesperiode,
    getAntallUkerForeldrepengerFørFødsel,
    getAntallUkerMødrekvote,
    mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto,
} from 'utils/stønadskontoer';
import { getFørsteUttaksdagForeldrepengerFørFødsel } from 'utils/uttakHjelper';

import { BodyLong, ExpansionCard, HStack, Heading, Loader, VStack } from '@navikt/ds-react';

import { DDMMYYYY_DATE_FORMAT } from '@navikt/fp-constants';
import { notEmpty } from '@navikt/fp-validation';

const getFellesperiodefordelingOptionValues = (antallUkerFellesperiode: number): Fellesperiodefordeling[] => {
    const values = [{ id: 0, antallUkerSøker1: undefined, antallUkerSøker2: undefined }] as Fellesperiodefordeling[];

    for (let i = 0; i <= antallUkerFellesperiode; i++) {
        const value = { id: i + 1, antallUkerSøker2: antallUkerFellesperiode - i, antallUkerSøker1: i };
        values.push(value);
    }
    return values;
};
interface Props {
    stønadskontoer?: TilgjengeligeStønadskontoerDTO;
}

const OppgittInformasjon: FunctionComponent<Props> = ({ stønadskontoer }) => {
    const intl = useIntl();
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const erFødt = erBarnetFødt(barnet);
    const erIkkeFødt = erBarnetIkkeFødt(barnet);
    const erAdoptert = erBarnetAdoptert(barnet);
    const antallBarn = barnet.antallBarn;
    const arbeidssituasjon = notEmpty(useContextGetData(ContextDataType.ARBEIDSSITUASJON));
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const { dekningsgrad } = notEmpty(useContextGetData(ContextDataType.HVOR_LANG_PERIODE));

    const erAleneforsørger = isAlene(hvemPlanlegger);
    const navn1 = getNavnPåSøker(hvemPlanlegger, intl);
    const navn2 = getNavnPåAnnenPart(hvemPlanlegger, intl);
    const fornavn1 = getFornavnPåSøker(hvemPlanlegger, intl);
    const fornavn2 = getFornavnPåAnnenPart(hvemPlanlegger, intl);
    const arbeidssituasjonSøker1 = arbeidssituasjon.arbeidssituasjon;
    const arbeidssituasjonAnnenPart = () => {
        if (arbeidssituasjon.arbeidssituasjonAnnenPart === true) {
            return 'Jobber';
        }
        return 'Jobber ikke';
    };
    const fordeling = useContextGetData(ContextDataType.FORDELING);
    if (!stønadskontoer) {
        return <Loader />;
    }

    const selectedKonto = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(stønadskontoer[dekningsgrad]);
    const antallUkerFellesperiode = getAntallUkerFellesperiode(selectedKonto);
    const antallUker = getAntallUker(selectedKonto);
    const antallUkerVedAdopsjon = () => {
        if (erAdoptert) {
            return getAntallUker(selectedKonto) - getAntallUkerForeldrepengerFørFødsel(selectedKonto);
        }
        return getAntallUker(selectedKonto);
    };
    const antallUkerAdopsjon = antallUkerVedAdopsjon();

    const list = getFellesperiodefordelingOptionValues(antallUkerFellesperiode);
    const antallUkerFellesperiodeSøker1 = fordeling ? list[fordeling.fellesperiodefordeling].antallUkerSøker1 : '';
    const antallUkerFellesperiodeSøker2 = fordeling ? list[fordeling.fellesperiodefordeling].antallUkerSøker2 : '';
    const termindato = erBarnetIkkeFødt(barnet) ? barnet.termindato : undefined;
    const antallUkerMødrekvote = getAntallUkerMødrekvote(selectedKonto);
    const antallUkerFedrekvote = getAntallUkerFedrekvote(selectedKonto);

    const startdatoSøker1 = getFørsteUttaksdagForeldrepengerFørFødsel(dayjs(termindato).toDate());

    const sluttdatoSøker1 =
        antallUkerFellesperiodeSøker1 && antallUkerFellesperiodeSøker1
            ? dayjs(startdatoSøker1).add(antallUkerMødrekvote, 'weeks').add(antallUkerFellesperiodeSøker1, 'weeks')
            : dayjs(startdatoSøker1).add(antallUkerMødrekvote, 'weeks');
    const startdatoSøker2 = sluttdatoSøker1 ? dayjs(sluttdatoSøker1) : undefined;
    const sluttdatoSøker2 =
        antallUkerFellesperiodeSøker2 && antallUkerFellesperiodeSøker2
            ? dayjs(startdatoSøker2).add(antallUkerFellesperiodeSøker2, 'weeks').add(antallUkerFedrekvote, 'weeks')
            : undefined;
    return (
        <VStack gap="10">
            <ExpansionCard aria-label="">
                <ExpansionCard.Header>
                    <HStack gap="5" align="center">
                        <IconCircleWrapper size="large" color="green">
                            <ChatElipsisIcon height={28} width={28} fontSize="1.5rem" />
                        </IconCircleWrapper>
                        <ExpansionCard.Title size="medium">
                            {isAlene(hvemPlanlegger) ? (
                                <FormattedMessage id="oppsummering.oppgittInformasjonDeg" />
                            ) : (
                                <FormattedMessage id="oppsummering.oppgittInformasjon" />
                            )}
                        </ExpansionCard.Title>
                    </HStack>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <VStack gap="10">
                        <GreenPanel>
                            <Heading size="small">
                                {erAleneforsørger ? (
                                    <FormattedMessage id="oppsummering.forelder" />
                                ) : (
                                    <FormattedMessage id="oppsummering.foreldre" />
                                )}
                            </Heading>

                            <BodyLong>
                                {erAleneforsørger ? (
                                    <FormattedMessage id="navn" values={{ navn: navn1 }} />
                                ) : (
                                    <FormattedMessage id="navnBegge" values={{ navn1: navn1, navn2: navn2 }} />
                                )}
                            </BodyLong>
                        </GreenPanel>

                        <GreenPanel>
                            <>
                                <Heading size="small">
                                    <FormattedMessage id="barnet.tittel" />
                                </Heading>

                                {erAdoptert && (
                                    <BodyLong>
                                        <FormattedMessage id="barnet.adopsjon" />
                                    </BodyLong>
                                )}
                                <BodyLong>
                                    <FormattedMessage id="oppsummering.antallBarn" values={{ antall: antallBarn }} />
                                </BodyLong>
                                {erFødt && (
                                    <BodyLong>
                                        <FormattedMessage
                                            id="oppsummering.fødselsdato"
                                            values={{
                                                dato: dayjs(barnet.fødselsdato).format(DDMMYYYY_DATE_FORMAT),
                                            }}
                                        />
                                    </BodyLong>
                                )}
                                {(erIkkeFødt || (erFødt && !erAdoptert)) && (
                                    <BodyLong>
                                        <FormattedMessage
                                            id="oppsummering.termindato"
                                            values={{ dato: dayjs(barnet.termindato).format(DDMMYYYY_DATE_FORMAT) }}
                                        />
                                    </BodyLong>
                                )}
                                {erAdoptert && (
                                    <BodyLong>
                                        <FormattedMessage
                                            id="oppsummering.overtakelsesdato"
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
                                    <FormattedMessage id="arbeid.tittel" />
                                </Heading>
                                <BodyLong>
                                    <FormattedMessage
                                        id="arbeidssituasjon"
                                        values={{ navn: fornavn1, arbeidssituasjon: arbeidssituasjonSøker1 }}
                                    />
                                </BodyLong>

                                {!erAleneforsørger && (
                                    <BodyLong>
                                        <FormattedMessage
                                            id="arbeidssituasjon"
                                            values={{
                                                navn: fornavn2,
                                                arbeidssituasjon: arbeidssituasjonAnnenPart(),
                                            }}
                                        />
                                    </BodyLong>
                                )}
                            </>
                        </GreenPanel>

                        <GreenPanel>
                            <>
                                <Heading size="small">
                                    <FormattedMessage id="periode" />
                                </Heading>

                                <BodyLong>
                                    {erAdoptert ? (
                                        <FormattedMessage
                                            id="periode.perioder"
                                            values={{ prosent: dekningsgrad, uker: antallUkerAdopsjon }}
                                        />
                                    ) : (
                                        <FormattedMessage
                                            id="periode.perioder"
                                            values={{ prosent: dekningsgrad, uker: antallUker }}
                                        />
                                    )}
                                </BodyLong>
                                {!erAleneforsørger && (
                                    <VStack gap="5">
                                        <BodyLong>
                                            <FormattedMessage
                                                id="fordeling.fordelingOptionsMedUker"
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
                                                    id="fordeling.infoboksTekst.førsteDag"
                                                    values={{
                                                        hvem: fornavn1,
                                                        dag: dayjs(startdatoSøker1).format('DD.MM.YY'),
                                                    }}
                                                />
                                            </BodyLong>
                                            <BodyLong>
                                                <FormattedMessage
                                                    id="fordeling.infoboksTekst.sisteDag"
                                                    values={{
                                                        hvem: fornavn1,
                                                        dag: dayjs(sluttdatoSøker1).format('DD.MM.YY'),
                                                    }}
                                                />
                                            </BodyLong>
                                            <BodyLong>
                                                <FormattedMessage
                                                    id="fordeling.infoboksTekst.førsteDag"
                                                    values={{
                                                        hvem: fornavn2,
                                                        dag: dayjs(startdatoSøker2).add(1, 'day').format('DD.MM.YY'),
                                                    }}
                                                />
                                            </BodyLong>
                                            <BodyLong>
                                                <FormattedMessage
                                                    id="fordeling.infoboksTekst.sisteDag"
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
