import { CalendarIcon, PersonGroupIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import Infoboks from 'components/boxes/Infoboks';
import GreenRadioGroup from 'components/formWrappers/GreenRadioGroup';
import PlanleggerStepPage from 'components/page/PlanleggerStepPage';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { ArbeidssituasjonEnum } from 'types/Arbeidssituasjon';
import { erBarnetIkkeFødt, erEttBarn, erToBarn } from 'types/Barnet';
import { Dekningsgrad } from 'types/Dekningsgrad';
import { isAlene } from 'types/HvemPlanlegger';
import { HvorLangPeriode } from 'types/HvorLangPeriode';
import { TilgjengeligeStønadskontoerDTO } from 'types/TilgjengeligeStønadskontoerDTO';
import {
    getAntallUker,
    getAntallUkerAktivitetsfriKvote,
    getAntallUkerFedrekvote,
    getAntallUkerFellesperiode,
    getAntallUkerMødrekvote,
    mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto,
} from 'utils/stønadskontoer';
import { getFørsteUttaksdagForeldrepengerFørFødsel } from 'utils/uttakHjelper';

import { BodyLong, Heading, Link, Loader, Radio, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { isRequired, notEmpty } from '@navikt/fp-validation';

interface Props {
    stønadskontoer?: TilgjengeligeStønadskontoerDTO;
}

const HvorLangPeriodeSteg: FunctionComponent<Props> = ({ stønadskontoer }) => {
    const intl = useIntl();
    const navigator = usePlanleggerNavigator();
    const stepConfig = useStepData();

    const periode = useContextGetData(ContextDataType.HVOR_LANG_PERIODE);
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const arbeidssituasjon = notEmpty(useContextGetData(ContextDataType.ARBEIDSSITUASJON));

    const lagrePeriode = useContextSaveData(ContextDataType.HVOR_LANG_PERIODE);

    const lagre = (formValues: HvorLangPeriode) => {
        lagrePeriode(formValues);

        const erAlenesøker = isAlene(hvemPlanlegger);
        return navigator.goToNextStep(erAlenesøker ? PlanleggerRoutes.OVERSIKT : PlanleggerRoutes.FORDELING);
    };

    const formMethods = useForm<HvorLangPeriode>({ defaultValues: periode });

    if (!stønadskontoer) {
        return <Loader />;
    }

    const dekningsgrad = formMethods.watch('dekningsgrad');

    const erAlenesøker = isAlene(hvemPlanlegger);
    const harBeggeRett = () => {
        if (
            arbeidssituasjon.arbeidssituasjon === ArbeidssituasjonEnum.INGEN ||
            (arbeidssituasjon.arbeidssituasjon === ArbeidssituasjonEnum.UFØR &&
                arbeidssituasjon.arbeidssituasjonAnnenPart === false)
        ) {
            return false;
        }
        if (
            arbeidssituasjon.arbeidssituasjon === ArbeidssituasjonEnum.UFØR &&
            arbeidssituasjon.arbeidssituasjonAnnenPart === true
        ) {
            return true;
        }
        return true;
    };
    const ingenHarRett = harBeggeRett();
    console.log(ingenHarRett);

    const harMorRett = () => {
        if (
            arbeidssituasjon.arbeidssituasjon === ArbeidssituasjonEnum.INGEN ||
            arbeidssituasjon.arbeidssituasjon === ArbeidssituasjonEnum.UFØR
        ) {
            return true;
        }
        return false;
    };
    const morHarIkkeRett = harMorRett();
    const harFarRett = () => {
        if (arbeidssituasjon.arbeidssituasjonAnnenPart === false) {
            return true;
        }
        return false;
    };
    const farHarIkkeRett = harFarRett();

    const selectedKonto =
        periode || dekningsgrad
            ? mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(
                  stønadskontoer[dekningsgrad || periode?.dekningsgrad],
              )
            : [];
    const termindato = erBarnetIkkeFødt(barnet) ? barnet.termindato : undefined;
    const antallUker = getAntallUker(selectedKonto);
    const antallUkerMødrekvote = getAntallUkerMødrekvote(selectedKonto);
    const antallUkerFedrekvote = getAntallUkerFedrekvote(selectedKonto);
    const antallUkerFellesperiode = getAntallUkerFellesperiode(selectedKonto);
    const antallUkerAktivitetsfriKvote = getAntallUkerAktivitetsfriKvote(selectedKonto);
    const antallUkerAktivitetskravKvote = antallUker - antallUkerAktivitetsfriKvote;

    const startdatoSøker1 = getFørsteUttaksdagForeldrepengerFørFødsel(dayjs(termindato).toDate());

    const sluttdatoForeldrepenger = startdatoSøker1
        ? dayjs(startdatoSøker1)
              .add(antallUkerMødrekvote, 'weeks')
              .add(antallUkerFedrekvote, 'weeks')
              .add(antallUkerFellesperiode, 'weeks')
        : dayjs(startdatoSøker1).add(antallUkerMødrekvote, 'weeks');

    return (
        <PlanleggerStepPage steps={stepConfig}>
            <Form formMethods={formMethods} onSubmit={lagre}>
                <VStack gap="10">
                    <VStack gap="5">
                        <Heading size="medium" spacing>
                            <FormattedMessage id="periode.tittel" />
                        </Heading>
                        <Infoboks
                            header={<FormattedMessage id="periode.infoboks.hvorLangPeriodeTittel" />}
                            icon={<CalendarIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" />}
                            isGray
                        >
                            {erAlenesøker ? (
                                <BodyLong>
                                    {erEttBarn(barnet) && (
                                        <FormattedMessage id="periode.infoboks.hvorLangPeriodeTekstDeg" />
                                    )}
                                    {erToBarn(barnet) && (
                                        <FormattedMessage id="periode.infoboks.hvorLangPeriodeTekst.toBarn" />
                                    )}
                                </BodyLong>
                            ) : (
                                <BodyLong>
                                    {erEttBarn(barnet) && (
                                        <FormattedMessage id="periode.infoboks.hvorLangPeriodeTekst" />
                                    )}
                                    {erToBarn(barnet) && (
                                        <FormattedMessage id="periode.infoboks.hvorLangPeriodeTekst.toBarn" />
                                    )}
                                </BodyLong>
                            )}
                        </Infoboks>
                        {!erAlenesøker && (morHarIkkeRett || farHarIkkeRett) && (
                            <Infoboks
                                header={
                                    <>
                                        {farHarIkkeRett && <FormattedMessage id="periode.infoboks.nårBareMorHarRett" />}
                                        {morHarIkkeRett && <FormattedMessage id="periode.infoboks.nårBareFarHarRett" />}
                                    </>
                                }
                                icon={<PersonGroupIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" />}
                                isGray
                            >
                                {farHarIkkeRett && (
                                    <VStack gap="2">
                                        <BodyLong>
                                            <FormattedMessage id="periode.infoboks.nårBareMorHarRett.fårHelePerioden" />
                                        </BodyLong>
                                        <BodyLong>
                                            <FormattedMessage id="periode.infoboks.nårBareMorHarRett.ingenKravTilFar" />
                                        </BodyLong>
                                    </VStack>
                                )}
                                {morHarIkkeRett && (
                                    <VStack gap="2">
                                        <BodyLong>
                                            <FormattedMessage id="periode.infoboks.nårBareFarHarRett.kanFåhelePerioden" />
                                        </BodyLong>
                                        <BodyLong>
                                            <FormattedMessage
                                                id="periode.infoboks.nårBareFarHarRett.ingenKravTilMor"
                                                values={{
                                                    a: (msg: any) => (
                                                        <Link
                                                            href={links.godkjentAktivitet}
                                                            className="lenke"
                                                            rel="noreferrer"
                                                            target="_blank"
                                                        >
                                                            {msg}
                                                        </Link>
                                                    ),
                                                }}
                                            />
                                        </BodyLong>
                                    </VStack>
                                )}
                            </Infoboks>
                        )}

                        <GreenRadioGroup
                            label={
                                erAlenesøker ? (
                                    <FormattedMessage id="periode.hvorLangPeriodeDeg" />
                                ) : (
                                    <FormattedMessage id="periode.hvorLangPeriode" />
                                )
                            }
                            name="dekningsgrad"
                            validate={[
                                isRequired(
                                    intl.formatMessage({
                                        id: 'validation.required',
                                    }),
                                ),
                            ]}
                        >
                            <Radio value={Dekningsgrad.HUNDRE_PROSENT} autoFocus>
                                {erEttBarn(barnet) && <FormattedMessage id="periode.100" />}
                                {erToBarn(barnet) && <FormattedMessage id="periode.100.toBarn" />}
                            </Radio>
                            <Radio value={Dekningsgrad.ÅTTI_PROSENT}>
                                {erEttBarn(barnet) && <FormattedMessage id="periode.80" />}
                                {erToBarn(barnet) && <FormattedMessage id="periode.80.toBarn" />}{' '}
                            </Radio>
                        </GreenRadioGroup>
                        {dekningsgrad && (
                            <Infoboks
                                header={
                                    <FormattedMessage
                                        id="periode.infoboks.sisteDagTittel"
                                        values={{
                                            dato: sluttdatoForeldrepenger.format('dddd DD. MMMM YYYY'),
                                        }}
                                    />
                                }
                                icon={<CalendarIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" />}
                            >
                                <BodyLong>
                                    <FormattedMessage id="periode.infoboks.sisteDagTekst" />
                                </BodyLong>
                                {morHarIkkeRett && (
                                    <VStack gap="2">
                                        <BodyLong>
                                            <FormattedMessage
                                                id="periode.infoboks.sisteDagTekstFar.førsteUker"
                                                values={{
                                                    uker: antallUkerAktivitetsfriKvote,
                                                    uker2: antallUker,
                                                    b: (msg: any) => <b>{msg}</b>,
                                                }}
                                            />
                                        </BodyLong>
                                        <BodyLong>
                                            <FormattedMessage
                                                id="periode.infoboks.sisteDagTekstFar.andreUker"
                                                values={{
                                                    uker: antallUkerAktivitetskravKvote,
                                                    uker2: antallUker,
                                                    a: (msg: any) => (
                                                        <Link
                                                            href={links.godkjentAktivitet}
                                                            className="lenke"
                                                            rel="noreferrer"
                                                            target="_blank"
                                                        >
                                                            {msg}
                                                        </Link>
                                                    ),
                                                    b: (msg: any) => <b>{msg}</b>,
                                                }}
                                            />
                                        </BodyLong>
                                    </VStack>
                                )}
                            </Infoboks>
                        )}
                    </VStack>
                    <VStack gap="10">
                        <StepButtonsHookForm<HvorLangPeriode>
                            saveDataOnPreviousClick={lagrePeriode}
                            goToPreviousStep={navigator.goToPreviousDefaultStep}
                            useSimplifiedTexts
                        />
                    </VStack>
                </VStack>
            </Form>
        </PlanleggerStepPage>
    );
};

export default HvorLangPeriodeSteg;
