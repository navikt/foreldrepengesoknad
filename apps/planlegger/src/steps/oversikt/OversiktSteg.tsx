import { HeartFillIcon, InformationIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import Infobox from 'components/boxes/Infobox';
import OversiktKalender from 'components/calendar/OversiktKalender';
import PlanleggerStepPage from 'components/page/PlanleggerStepPage';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import { FunctionComponent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import {
    getFellesperiodefordelingOptionValues,
    getFellesperiodefordelingSelectOptions,
} from 'steps/fordeling/FordelingSteg';
import { ArbeidssituasjonEnum } from 'types/Arbeidssituasjon';
import { OmBarnet, barnehagestartDato, erBarnetAdoptert, erBarnetFødt, erBarnetIkkeFødt } from 'types/Barnet';
import { Dekningsgrad } from 'types/Dekningsgrad';
import { Fordeling } from 'types/Fordeling';
import { HvemPlanlegger, isAlene, isFar, isFarOgFar, isMor, isMorOgFar, isMorOgMedmor } from 'types/HvemPlanlegger';
import { SøkersituasjonEnum } from 'types/Søkersituasjon';
import { TilgjengeligeStønadskontoerDTO } from 'types/TilgjengeligeStønadskontoerDTO';
import {
    getAntallUkerAktivitetsfriKvote,
    getAntallUkerFedrekvote,
    getAntallUkerFellesperiode,
    getAntallUkerForeldrepenger,
    getAntallUkerMødrekvote,
    mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto,
} from 'utils/stønadskontoer';
import { getFørsteUttaksdagForeldrepengerFørFødsel } from 'utils/uttakHjelper';

import { BodyLong, BodyShort, HStack, Heading, Loader, Spacer, ToggleGroup, VStack } from '@navikt/ds-react';

import { Form, Select } from '@navikt/fp-form-hooks';
import { StepButtons } from '@navikt/fp-ui';
import { capitalizeFirstLetter } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import OmÅTilpassePlanen from './OmÅTilpassePlanen';
import UforutsetteEndringer from './UforutsetteEndringer';
import BlåSirkel from './ikoner/BlåSirkel';
import GrønnSirkel from './ikoner/GrønnSirkel';

dayjs.locale('nb');

const termindatoEllerFødselsdato = (barnet: OmBarnet) => {
    const erFødt = erBarnetFødt(barnet);
    const erIkkeFødt = erBarnetIkkeFødt(barnet);
    const erAdoptert = erBarnetAdoptert(barnet);
    if (erFødt || erAdoptert) {
        const dato = barnet.fødselsdato;
        return dayjs(dato).format('DD. MMM');
    }
    if (erIkkeFødt) {
        const dato = barnet.termindato;
        return dayjs(dato).format('DD. MMM');
    }
    return undefined;
};

const finnAnnenPartTekst = (intl: IntlShape, hvemPlanlegger: HvemPlanlegger): string | undefined => {
    if (isMorOgMedmor(hvemPlanlegger)) {
        return intl.formatMessage({ id: 'FlereForsørgere.Medmor' });
    }
    if (isFar(hvemPlanlegger) || isFarOgFar(hvemPlanlegger) || isMorOgFar(hvemPlanlegger)) {
        return intl.formatMessage({ id: 'FlereForsørgere.Far' });
    }
    return undefined;
};

const finnSøkerTekst = (intl: IntlShape, hvemPlanlegger: HvemPlanlegger): string =>
    isMorOgFar(hvemPlanlegger) || isMorOgMedmor(hvemPlanlegger) || isMor(hvemPlanlegger)
        ? intl.formatMessage({ id: 'FlereForsørgere.Mor' })
        : intl.formatMessage({ id: 'FlereForsørgere.Far' });

interface Props {
    stønadskontoer?: TilgjengeligeStønadskontoerDTO;
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
        defaultValues: {
            fellesperiodefordeling: fordeling?.fellesperiodefordeling,
        },
    });
    const fellesperiodefordeling = formMethods.watch('fellesperiodefordeling');

    const erFødt = erBarnetFødt(barnet);
    const erIkkeFødt = erBarnetIkkeFødt(barnet);
    const erAdoptert = erBarnetAdoptert(barnet);

    const [dekningsgrad, setDekningsgrad] = useState<Dekningsgrad>(periode.dekningsgrad);

    if (!stønadskontoer) {
        return <Loader />;
    }

    const selectedKonto = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(stønadskontoer[dekningsgrad]);

    const termindato = erBarnetIkkeFødt(barnet) ? barnet.termindato : undefined;

    const antallUkerMødrekvote = getAntallUkerMødrekvote(selectedKonto);
    const antallUkerFedrekvote = getAntallUkerFedrekvote(selectedKonto);
    const antallUkerFellesperiode = getAntallUkerFellesperiode(selectedKonto);
    const startdatoSøker1 = getFørsteUttaksdagForeldrepengerFørFødsel(dayjs(termindato).toDate());

    const fellesperiodeOptionValues = getFellesperiodefordelingOptionValues(antallUkerFellesperiode);
    const antallUkerFellesperiodeSøker1 = fellesperiodefordeling
        ? fellesperiodeOptionValues[fellesperiodefordeling]
        : undefined;
    const antallUkerFellesperiodeSøker2 = fellesperiodefordeling
        ? fellesperiodeOptionValues[fellesperiodefordeling]
        : undefined;

    const sluttdatoSøker1 =
        antallUkerFellesperiodeSøker1 && antallUkerFellesperiodeSøker1.antallUkerSøker1
            ? dayjs(startdatoSøker1)
                  .add(antallUkerMødrekvote, 'weeks')
                  .add(antallUkerFellesperiodeSøker1.antallUkerSøker1, 'weeks')
            : dayjs(startdatoSøker1).add(antallUkerMødrekvote, 'weeks');

    const startdatoSøker2 = sluttdatoSøker1 ? dayjs(sluttdatoSøker1).add(1, 'day') : undefined;
    const sluttdatoSøker2 =
        antallUkerFellesperiodeSøker2 && antallUkerFellesperiodeSøker2.antallUkerSøker2
            ? dayjs(startdatoSøker2)
                  .add(antallUkerFellesperiodeSøker2.antallUkerSøker2, 'weeks')
                  .add(antallUkerFedrekvote, 'weeks')
            : dayjs(startdatoSøker2).add(antallUkerFedrekvote, 'weeks');

    const fellesperiodeSelectOptions = getFellesperiodefordelingSelectOptions(
        intl,
        fellesperiodeOptionValues,
        hvemPlanlegger,
    );
    const antallUkerSøker1 = dayjs(sluttdatoSøker1).diff(dayjs(startdatoSøker1), 'weeks');
    const antallUkerSøker2 = dayjs(sluttdatoSøker2).diff(dayjs(startdatoSøker2), 'weeks');

    const søkerTekst = finnSøkerTekst(intl, hvemPlanlegger);
    const annenPartTekst = finnAnnenPartTekst(intl, hvemPlanlegger);
    const hvem1 = capitalizeFirstLetter(søkerTekst);

    const erAleneforsørger = isAlene(hvemPlanlegger);

    const kunFarHarRettHovedsøker =
        hvemPlanlegger.type === SøkersituasjonEnum.FAR_OG_FAR &&
        (arbeidssituasjon.arbeidssituasjon === ArbeidssituasjonEnum.JOBBER ||
            arbeidssituasjon.arbeidssituasjonAnnenPart);

    const kunFarHarRettMedsøker =
        hvemPlanlegger.type === SøkersituasjonEnum.MOR_OG_FAR &&
        arbeidssituasjon.arbeidssituasjon !== ArbeidssituasjonEnum.JOBBER &&
        arbeidssituasjon.arbeidssituasjonAnnenPart;

    const kunFarHarRett = kunFarHarRettHovedsøker || kunFarHarRettMedsøker;

    const aktivitetsfriUker = getAntallUkerAktivitetsfriKvote(selectedKonto);
    const totalUker = getAntallUkerForeldrepenger(selectedKonto);
    const aktivitetskravUker = totalUker - aktivitetsfriUker;

    const kunMorHarRett =
        hvemPlanlegger.type !== SøkersituasjonEnum.FAR &&
        hvemPlanlegger.type !== SøkersituasjonEnum.FAR_OG_FAR &&
        arbeidssituasjon.arbeidssituasjon === ArbeidssituasjonEnum.JOBBER &&
        arbeidssituasjon.arbeidssituasjonAnnenPart !== true;

    return (
        <Form formMethods={formMethods}>
            <PlanleggerStepPage steps={stepConfig}>
                <VStack gap="10">
                    <Heading size="large" spacing>
                        {erAleneforsørger && <FormattedMessage id="oversikt.tittelDeg" />}
                        {!erAleneforsørger && <FormattedMessage id="oversikt.tittel" />}
                    </Heading>
                    <Infobox
                        header={<FormattedMessage id="oversikt.infoboks.utkast" />}
                        isGray
                        icon={<InformationIcon height={24} width={24} fontSize="1-5rem" />}
                    >
                        <BodyLong>
                            {erAleneforsørger ? (
                                <FormattedMessage id="oversikt.infoboks.utkast.tekstDeg" />
                            ) : (
                                <FormattedMessage id="oversikt.infoboks.utkast.tekst" />
                            )}
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
                            <FormattedMessage id="oversikt.100" />
                        </ToggleGroup.Item>
                        <ToggleGroup.Item value={Dekningsgrad.ÅTTI_PROSENT}>
                            <FormattedMessage id="oversikt.80" />
                        </ToggleGroup.Item>
                    </ToggleGroup>
                    {!erAleneforsørger && fordeling?.fellesperiodefordeling && !kunFarHarRett && !kunMorHarRett && (
                        <Select
                            label={<FormattedMessage id="oversikt.fellesperiodefordeling" />}
                            name="fellesperiodefordeling"
                            onChange={(e) => {
                                lagreFordeling({ fellesperiodefordeling: e.target.value });
                            }}
                        >
                            {fellesperiodeSelectOptions}
                        </Select>
                    )}
                    <VStack gap="5">
                        {!kunFarHarRett ? (
                            <HStack gap="1">
                                <div className="bluePanel">
                                    <HStack gap="2" align="center">
                                        <BlåSirkel />
                                        <BodyShort>
                                            <FormattedMessage
                                                id="ukerForeldrepenger"
                                                values={{
                                                    hvem: hvem1,
                                                    uker: antallUkerSøker1,
                                                    dato: dayjs(startdatoSøker1).format('dddd D MMM'),
                                                }}
                                            />
                                        </BodyShort>
                                    </HStack>
                                </div>
                                <Spacer />
                                {!erAleneforsørger && annenPartTekst && !kunMorHarRett && (
                                    <HStack gap="3" wrap={false}>
                                        <div className="greenPanel">
                                            <HStack gap="2" align="center">
                                                <GrønnSirkel />
                                                <BodyShort>
                                                    <FormattedMessage
                                                        id="ukerForeldrepenger"
                                                        values={{
                                                            hvem: capitalizeFirstLetter(annenPartTekst),
                                                            uker: antallUkerSøker2,
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
                                        <div className="bluePanel">
                                            <HStack gap="2" align="center">
                                                <BlåSirkel />
                                                <BodyShort>
                                                    <FormattedMessage
                                                        id="ukerUtenAktivitetskrav"
                                                        values={{
                                                            hvem: capitalizeFirstLetter(annenPartTekst),
                                                            uker: aktivitetsfriUker,
                                                        }}
                                                    />
                                                </BodyShort>
                                            </HStack>
                                        </div>
                                        <Spacer />
                                        <HStack gap="3" wrap={false}>
                                            <div className="greenPanel">
                                                <HStack gap="2" align="center">
                                                    <GrønnSirkel />
                                                    <BodyShort>
                                                        <FormattedMessage
                                                            id="ukerMedAktivitetskrav"
                                                            values={{
                                                                hvem: capitalizeFirstLetter(annenPartTekst),
                                                                uker: aktivitetskravUker,
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

                        <div className="pinkPanel">
                            <HStack gap="2" align="center">
                                <HeartFillIcon color="#F68282" />
                                <BodyShort>
                                    {(erFødt || erAdoptert) && (
                                        <FormattedMessage
                                            id="fødselsdatoIkontekst"
                                            values={{
                                                mnd: barnehagestartDato(barnet),
                                                dato: termindatoEllerFødselsdato(barnet),
                                            }}
                                        />
                                    )}
                                    {erIkkeFødt && (
                                        <FormattedMessage
                                            id="termindatoIkontekst"
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

                    <OversiktKalender
                        valgtStønadskonto={selectedKonto}
                        omBarnet={barnet}
                        fellesperiodefordeling={fellesperiodefordeling}
                    />
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
