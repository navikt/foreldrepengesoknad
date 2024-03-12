import { CalendarIcon, PersonGroupIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import Infoboks from 'components/Infoboks';
import InfoboksGenerell from 'components/InfoboksGenerell';
import GreenRadioGroup from 'components/formWrappers/GreenRadioGroup';
import PlanleggerPage from 'components/planleggerPage/PlanleggerPage';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { erBarnetIkkeFødt, erEttBarn, erToBarn } from 'types/Barnet';
import { isAlene, isFar, isMor } from 'types/HvemPlanlegger';
import { HvorLangPeriode } from 'types/HvorLangPeriode';
import { TilgjengeligeStønadskontoerDTO } from 'types/TilgjengeligeStønadskontoerDTO';
import {
    getAntallUkerAktivitetsfriKvote,
    getAntallUkerFedrekvote,
    getAntallUkerFellesperiode,
    getAntallUkerForeldrepengerFørFødsel,
    getAntallUkerMødrekvote,
    mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto,
} from 'utils/stønadskontoer';

import { BodyLong, Heading, Link, Loader, Radio, VStack } from '@navikt/ds-react';

import { Dekningsgrad, getFørsteUttaksdagForeldrepengerFørFødsel } from '@navikt/fp-common';
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
    const erMor = isMor(hvemPlanlegger);
    const erFar = isFar(hvemPlanlegger);

    const selectedKonto = periode
        ? mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(stønadskontoer[periode.dekningsgrad])
        : [];
    const termindato = erBarnetIkkeFødt(barnet) ? barnet.termindato : undefined;
    const antallUkerMødrekvote = getAntallUkerMødrekvote(selectedKonto);
    const antallUkerFedrekvote = getAntallUkerFedrekvote(selectedKonto);
    const antallUkerFellesperiode = getAntallUkerFellesperiode(selectedKonto);
    const antallUkerFørFødsel = getAntallUkerForeldrepengerFørFødsel(selectedKonto);
    const antallUkerAktivitetsfriKvote = getAntallUkerAktivitetsfriKvote(selectedKonto);

    const startdatoSøker1 = getFørsteUttaksdagForeldrepengerFørFødsel(dayjs(termindato).toDate());

    const sluttdatoForeldrepenger = startdatoSøker1
        ? dayjs(startdatoSøker1)
              .add(antallUkerMødrekvote, 'weeks')
              .add(antallUkerFedrekvote, 'weeks')
              .add(antallUkerFellesperiode, 'weeks')
        : dayjs(startdatoSøker1).add(antallUkerMødrekvote, 'weeks');

    const antallUkerTotalt =
        antallUkerMødrekvote + antallUkerFedrekvote + antallUkerFellesperiode + antallUkerFørFødsel;
    const antallUkerAktivitetskravKvote = antallUkerTotalt - antallUkerAktivitetsfriKvote;

    return (
        <PlanleggerPage steps={stepConfig}>
            <Form formMethods={formMethods} onSubmit={lagre}>
                <VStack gap="10">
                    <VStack gap="5">
                        <Heading size="medium" spacing>
                            <FormattedMessage id="periode.tittel" />
                        </Heading>
                        <InfoboksGenerell
                            header={<FormattedMessage id="periode.infoboks.hvorLangPeriodeTittel" />}
                            icon={<CalendarIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" />}
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
                        </InfoboksGenerell>
                        {
                            // TODO: endre fra erMor og erFar til at man er flere men bare mor eller far har rett
                            erAlenesøker && (
                                <InfoboksGenerell
                                    header={
                                        <>
                                            {erMor && <FormattedMessage id="periode.infoboks.nårBareMorHarRett" />}
                                            {erFar && <FormattedMessage id="periode.infoboks.nårBareFarHarRett" />}
                                        </>
                                    }
                                    icon={
                                        <PersonGroupIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" />
                                    }
                                >
                                    {erMor && (
                                        <VStack gap="2">
                                            <BodyLong>
                                                <FormattedMessage id="periode.infoboks.nårBareMorHarRett.fårHelePerioden" />
                                            </BodyLong>
                                            <BodyLong>
                                                <FormattedMessage id="periode.infoboks.nårBareMorHarRett.ingenKravTilFar" />
                                            </BodyLong>
                                        </VStack>
                                    )}
                                    {erFar && (
                                        <VStack gap="2">
                                            <BodyLong>
                                                <FormattedMessage id="periode.infoboks.nårBareFarHarRett.kanFåhelePerioden" />
                                            </BodyLong>
                                            <BodyLong>
                                                <FormattedMessage
                                                    id="periode.infoboks.nårBareFarHarRett.ingenKravTilMor"
                                                    values={{ a: (msg: any) => <Link>{msg}</Link> }}
                                                />
                                            </BodyLong>
                                        </VStack>
                                    )}
                                </InfoboksGenerell>
                            )
                        }

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
                                        id: 'feilmelding.periode.hvorLangPeriode.duMåOppgi',
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
                                {
                                    // TODO: endre fra erFar til at man er flere men bare far har rett
                                    erFar && (
                                        <VStack gap="2">
                                            <BodyLong>
                                                <FormattedMessage
                                                    id="periode.infoboks.sisteDagTekstFar.førsteUker"
                                                    values={{
                                                        uker: antallUkerAktivitetsfriKvote,
                                                        uker2: antallUkerTotalt,
                                                        a: (msg: any) => <Link>{msg}</Link>,
                                                        b: (msg: any) => <b>{msg}</b>,
                                                    }}
                                                />
                                            </BodyLong>
                                            <BodyLong>
                                                <FormattedMessage
                                                    id="periode.infoboks.sisteDagTekstFar.andreUker"
                                                    values={{
                                                        uker: antallUkerAktivitetskravKvote,
                                                        uker2: antallUkerTotalt,
                                                        a: (msg: any) => <Link>{msg}</Link>,
                                                        b: (msg: any) => <b>{msg}</b>,
                                                    }}
                                                />
                                            </BodyLong>
                                        </VStack>
                                    )
                                }
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
        </PlanleggerPage>
    );
};

export default HvorLangPeriodeSteg;
