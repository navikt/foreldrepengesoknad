import { HeartFillIcon, InformationIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import Infobox from 'components/boxes/Infobox';
import Calendar from 'components/calendar/Calendar';
import PlanleggerStepPage from 'components/page/PlanleggerStepPage';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import { FunctionComponent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    finnFellesperiodeFordelingOptionTekst,
    getFellesperiodefordelingSelectOptions,
} from 'steps/fordeling/FordelingSteg';
import { OmBarnet, barnehagestartDato, erBarnetAdoptert, erBarnetFødt, erBarnetIkkeFødt } from 'types/Barnet';
import { Dekningsgrad } from 'types/Dekningsgrad';
import { Fordeling } from 'types/Fordeling';
import { erMorDelAvSøknaden, finnAnnenPartTekst, finnSøkerTekst, isAlene } from 'types/HvemPlanlegger';
import { TilgjengeligeStønadskontoerDTO } from 'types/TilgjengeligeStønadskontoerDTO';
import { utledHvemSomHarRett } from 'utils/hvemHarRettHjelper';
import { lagKalenderPerioder } from 'utils/kalenderPerioderHjelper';
import {
    getAntallUkerAktivitetsfriKvote,
    getAntallUkerFellesperiode,
    getAntallUkerForeldrepenger,
    mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto,
} from 'utils/stønadskontoer';
import { finnAntallUkerMedForeldrepenger, finnUttaksdata } from 'utils/uttakHjelper';

import { BodyLong, BodyShort, HStack, Heading, Spacer, ToggleGroup, VStack } from '@navikt/ds-react';

import { Form, Select } from '@navikt/fp-form-hooks';
import { StepButtons } from '@navikt/fp-ui';
import { capitalizeFirstLetter } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import OmÅTilpassePlanen from './OmÅTilpassePlanen';
import UforutsetteEndringer from './UforutsetteEndringer';
import BlåSirkel from './ikoner/BlåSirkel';
import GrønnSirkel from './ikoner/GrønnSirkel';
import styles from './oversiktSteg.module.css';

const termindatoEllerFødselsdato = (barnet: OmBarnet) => {
    const erFødt = erBarnetFødt(barnet);
    const erIkkeFødt = erBarnetIkkeFødt(barnet);
    const erAdoptert = erBarnetAdoptert(barnet);
    if (erFødt || erAdoptert) {
        return dayjs(barnet.fødselsdato).format('DD. MMM');
    }
    if (erIkkeFødt) {
        return dayjs(barnet.termindato).format('DD. MMM');
    }
    return undefined;
};

interface Props {
    stønadskontoer: TilgjengeligeStønadskontoerDTO;
}

const OversiktSteg: FunctionComponent<Props> = ({ stønadskontoer }) => {
    const intl = useIntl();
    const navigator = usePlanleggerNavigator();
    const stepConfig = useStepData();

    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const fordeling = useContextGetData(ContextDataType.FORDELING);
    const periode = notEmpty(useContextGetData(ContextDataType.HVOR_LANG_PERIODE));
    const lagreFordeling = useContextSaveData(ContextDataType.FORDELING);
    const arbeidssituasjon = notEmpty(useContextGetData(ContextDataType.ARBEIDSSITUASJON));

    const formMethods = useForm<Fordeling>({
        defaultValues: fordeling,
    });

    const antallUkerFellesperiodeSøker1 = formMethods.watch('antallUkerSøker1');

    const erFødt = erBarnetFødt(barnet);
    const erIkkeFødt = erBarnetIkkeFødt(barnet);
    const erAdoptert = erBarnetAdoptert(barnet);

    const [dekningsgrad, setDekningsgrad] = useState<Dekningsgrad>(periode.dekningsgrad);

    const stønadskonto100 = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(
        stønadskontoer[Dekningsgrad.HUNDRE_PROSENT],
    );
    const stønadskonto80 = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(
        stønadskontoer[Dekningsgrad.ÅTTI_PROSENT],
    );

    const valgtStønadskonto = dekningsgrad === Dekningsgrad.HUNDRE_PROSENT ? stønadskonto100 : stønadskonto80;

    const antallUkerFellesperiode = getAntallUkerFellesperiode(valgtStønadskonto);

    const hvemHarRett = utledHvemSomHarRett(hvemPlanlegger, arbeidssituasjon);

    const uttaksdata100 = finnUttaksdata(
        hvemHarRett,
        hvemPlanlegger,
        stønadskonto100,
        barnet,
        antallUkerFellesperiodeSøker1,
    );
    const uttaksdata80 = finnUttaksdata(
        hvemHarRett,
        hvemPlanlegger,
        stønadskonto80,
        barnet,
        antallUkerFellesperiodeSøker1,
    );

    const { startdatoSøker1, sluttdatoSøker1, startdatoSøker2, sluttdatoSøker2 } =
        dekningsgrad === Dekningsgrad.HUNDRE_PROSENT ? uttaksdata100 : uttaksdata80;

    const antallUker100 = finnAntallUkerMedForeldrepenger(uttaksdata100);
    const antallUker80 = finnAntallUkerMedForeldrepenger(uttaksdata80);

    const annenPartTekst = finnAnnenPartTekst(intl, hvemPlanlegger);

    const erAleneforsørger = isAlene(hvemPlanlegger);

    const uttaksperioder = lagKalenderPerioder(
        valgtStønadskonto,
        barnet,
        hvemPlanlegger,
        arbeidssituasjon,
        antallUkerFellesperiodeSøker1,
    );

    return (
        <Form formMethods={formMethods}>
            <PlanleggerStepPage steps={stepConfig}>
                <VStack gap="10">
                    <Heading size="large" spacing>
                        <FormattedMessage id="OversiktSteg.Tittel" values={{ erAleneforsørger }} />
                    </Heading>
                    <Infobox
                        header={<FormattedMessage id="OversiktSteg.Infoboks.Utkast" />}
                        isGray
                        icon={<InformationIcon height={24} width={24} fontSize="1-5rem" />}
                    >
                        <BodyLong>
                            <FormattedMessage id="OversiktSteg.Infoboks.Utkast.Tekst" values={{ erAleneforsørger }} />
                        </BodyLong>
                    </Infobox>
                    <ToggleGroup
                        defaultValue={periode?.dekningsgrad}
                        size="medium"
                        variant="neutral"
                        onChange={(value) => setDekningsgrad(value as Dekningsgrad)}
                        style={{ width: '100%' }}
                    >
                        <ToggleGroup.Item value={Dekningsgrad.HUNDRE_PROSENT}>
                            <FormattedMessage
                                id="OversiktSteg.100"
                                values={{
                                    uker: antallUker100,
                                }}
                            />
                        </ToggleGroup.Item>
                        <ToggleGroup.Item value={Dekningsgrad.ÅTTI_PROSENT}>
                            <FormattedMessage id="OversiktSteg.80" values={{ uker: antallUker80 }} />
                        </ToggleGroup.Item>
                    </ToggleGroup>
                    {!erAleneforsørger &&
                        antallUkerFellesperiodeSøker1 &&
                        hvemHarRett !== 'kunMedfarEllerMedmorHarRett' &&
                        hvemHarRett !== 'kunMorHarRett' && (
                            <Select
                                label={<FormattedMessage id="OversiktSteg.Fellesperiodefordeling" />}
                                name="antallUkerSøker1"
                                onChange={(e) => {
                                    lagreFordeling({ antallUkerSøker1: e.target.value });
                                }}
                            >
                                {getFellesperiodefordelingSelectOptions(antallUkerFellesperiode).map((value) => (
                                    <option key={value.antallUkerSøker1} value={value.antallUkerSøker1}>
                                        {finnFellesperiodeFordelingOptionTekst(intl, value, hvemPlanlegger)}
                                    </option>
                                ))}
                            </Select>
                        )}
                    <VStack gap="5">
                        {hvemHarRett !== 'kunMedfarEllerMedmorHarRett' ? (
                            <HStack gap="1">
                                <div className={styles.bluePanel}>
                                    <HStack gap="2" align="center">
                                        <BlåSirkel />
                                        <BodyShort>
                                            <FormattedMessage
                                                id="OversiktSteg.UkerForeldrepenger"
                                                values={{
                                                    hvem: capitalizeFirstLetter(finnSøkerTekst(intl, hvemPlanlegger)),
                                                    uker: dayjs(sluttdatoSøker1).diff(dayjs(startdatoSøker1), 'weeks'),
                                                    dato: dayjs(startdatoSøker1).format('dddd D MMM'),
                                                }}
                                            />
                                        </BodyShort>
                                    </HStack>
                                </div>
                                <Spacer />
                                {!erAleneforsørger && annenPartTekst && hvemHarRett !== 'kunMorHarRett' && (
                                    <HStack gap="3" wrap={false}>
                                        <div className={styles.greenPanel}>
                                            <HStack gap="2" align="center">
                                                <GrønnSirkel />
                                                <BodyShort>
                                                    <FormattedMessage
                                                        id="OversiktSteg.UkerForeldrepenger"
                                                        values={{
                                                            hvem: capitalizeFirstLetter(annenPartTekst),
                                                            uker: dayjs(sluttdatoSøker2).diff(
                                                                dayjs(startdatoSøker2),
                                                                'weeks',
                                                            ),
                                                            dato: dayjs(startdatoSøker2).format('dddd D MMM'),
                                                        }}
                                                    />
                                                </BodyShort>
                                            </HStack>
                                        </div>
                                    </HStack>
                                )}
                            </HStack>
                        ) : (
                            <>
                                {!erAleneforsørger && annenPartTekst && (
                                    <HStack gap="1">
                                        <div className={styles.bluePanel}>
                                            <HStack gap="2" align="center">
                                                <BlåSirkel />
                                                <BodyShort>
                                                    <FormattedMessage
                                                        id="OversiktSteg.UkerUtenAktivitetskrav"
                                                        values={{
                                                            hvem: capitalizeFirstLetter(annenPartTekst),
                                                            uker: getAntallUkerAktivitetsfriKvote(valgtStønadskonto),
                                                            erMorHovedsøker: erMorDelAvSøknaden(hvemPlanlegger.type),
                                                        }}
                                                    />
                                                </BodyShort>
                                            </HStack>
                                        </div>
                                        <Spacer />
                                        <HStack gap="3" wrap={false}>
                                            <div className={styles.greenPanel}>
                                                <HStack gap="2" align="center">
                                                    <GrønnSirkel />
                                                    <BodyShort>
                                                        <FormattedMessage
                                                            id="OversiktSteg.UkerMedAktivitetskrav"
                                                            values={{
                                                                hvem: capitalizeFirstLetter(annenPartTekst),
                                                                uker: getAntallUkerForeldrepenger(valgtStønadskonto),
                                                                erMorHovedsøker: erMorDelAvSøknaden(
                                                                    hvemPlanlegger.type,
                                                                ),
                                                            }}
                                                        />
                                                    </BodyShort>
                                                </HStack>
                                            </div>
                                        </HStack>
                                    </HStack>
                                )}
                            </>
                        )}
                        <div className={styles.pinkPanel}>
                            <HStack gap="2" align="center">
                                <HeartFillIcon color="#F68282" />
                                <BodyShort>
                                    {(erFødt || erAdoptert) && (
                                        <FormattedMessage
                                            id="OversiktSteg.TermindatoIkontekst"
                                            values={{
                                                mnd: barnehagestartDato(barnet),
                                                dato: termindatoEllerFødselsdato(barnet),
                                            }}
                                        />
                                    )}
                                    {erIkkeFødt && (
                                        <FormattedMessage
                                            id="OversiktSteg.FødselsdatoIkontekst"
                                            values={{
                                                mnd: barnehagestartDato(barnet),
                                                dato: termindatoEllerFødselsdato(barnet),
                                            }}
                                        />
                                    )}
                                </BodyShort>
                            </HStack>
                        </div>
                    </VStack>
                    <div className={styles.calendar}>
                        <Calendar periods={uttaksperioder} />
                    </div>
                    <VStack gap="5">
                        <OmÅTilpassePlanen />
                        <UforutsetteEndringer />
                    </VStack>
                    <StepButtons
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        nextButtonOnClick={navigator.goToNextDefaultStep}
                        useSimplifiedTexts
                    />
                </VStack>
            </PlanleggerStepPage>
        </Form>
    );
};

export default OversiktSteg;
