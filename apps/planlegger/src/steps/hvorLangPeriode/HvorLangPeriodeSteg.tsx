import { CalendarIcon, PersonGroupIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import Infoboks from 'components/Infoboks';
import InfoboksGenerell from 'components/InfoboksGenerell';
import HvorforSpørNAVOmDette from 'components/expansionCard/HvorforSpørNAVOmDette';
import GreenRadioGroup from 'components/formWrappers/GreenRadioGroup';
import PlanleggerPage from 'components/planleggerPage/PlanleggerPage';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { erBarnetIkkeFødt, erEttBarn, erToBarn } from 'types/Barnet';
import { isAlene, isFar, isMor } from 'types/HvemPlanlegger';
import { HvorLangPeriode } from 'types/HvorLangPeriode';
import {
    getAntallUkerAktivitetsfriKvote,
    getAntallUkerFedrekvote,
    getAntallUkerFellesperiode,
    getAntallUkerForeldrepenger,
    getAntallUkerForeldrepengerFørFødsel,
    getAntallUkerMødrekvote,
    mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto,
} from 'utils/stønadskontoer';

import { BodyLong, Heading, Link, Radio, VStack } from '@navikt/ds-react';

import { Dekningsgrad, getFørsteUttaksdagForeldrepengerFørFødsel } from '@navikt/fp-common';
import { Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { isRequired, notEmpty } from '@navikt/fp-validation';

const HvorLangPeriodeSteg: FunctionComponent = () => {
    const intl = useIntl();
    const navigator = usePlanleggerNavigator();
    const stepConfig = useStepData();

    const periode = useContextGetData(ContextDataType.HVOR_LANG_PERIODE);
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const lagrePeriode = useContextSaveData(ContextDataType.HVOR_LANG_PERIODE);

    const lagre = (formValues: HvorLangPeriode) => {
        lagrePeriode(formValues);
        return navigator.goToNextDefaultStep();
    };

    const formMethods = useForm<HvorLangPeriode>({ defaultValues: periode });

    // TODO: hent fra api
    const konto100 = {
        kontoer: {
            MØDREKVOTE: 75,
            FEDREKVOTE: 75,
            FELLESPERIODE: 80,
            FORELDREPENGER_FØR_FØDSEL: 15,
        },
        minsteretter: {
            farRundtFødsel: 0,
            generellMinsterett: 0,
            toTette: 0,
        },
    };
    const konto80 = {
        kontoer: {
            MØDREKVOTE: 95,
            FEDREKVOTE: 95,
            FELLESPERIODE: 90,
            FORELDREPENGER_FØR_FØDSEL: 15,
        },
        minsteretter: {
            farRundtFødsel: 0,
            generellMinsterett: 0,
            toTette: 0,
        },
    };

    const konto100tvillinger = {
        kontoer: {
            MØDREKVOTE: 75,
            FEDREKVOTE: 75,
            FELLESPERIODE: 165,
            FORELDREPENGER_FØR_FØDSEL: 15,
        },
        minsteretter: {
            farRundtFødsel: 0,
            generellMinsterett: 0,
            toTette: 0,
        },
    };
    const konto80tvillinger = {
        kontoer: {
            MØDREKVOTE: 75,
            FEDREKVOTE: 75,
            FELLESPERIODE: 200,
            FORELDREPENGER_FØR_FØDSEL: 15,
        },
        minsteretter: {
            farRundtFødsel: 0,
            generellMinsterett: 0,
            toTette: 0,
        },
    };

    const konto80aleneomsorgFar = {
        kontoer: {
            FORELDREPENGER: 280,
        },
        minsteretter: {
            generellMinsterett: 0,
            farRundtFødsel: 10,
            toTette: 0,
        },
    };

    const mappedKonto100 = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(konto100);
    const mappedKonto80 = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(konto80);
    const mappedKonto100tvillinger = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(konto100tvillinger);
    const mappedKonto80tvillinger = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(konto80tvillinger);
    const mappedKonto80aleneomsorgFar = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(konto80aleneomsorgFar);

    const dekningsgrad = formMethods.watch('dekningsgrad');

    const toBarn = barnet.hvorMange === 'to';
    const ettBarn = barnet.hvorMange === 'ett';

    const erAlenesøker = isAlene(hvemPlanlegger);
    const erMor = isMor(hvemPlanlegger);
    const erFar = isFar(hvemPlanlegger);

    const finnSelectedKonto = () => {
        if (dekningsgrad === Dekningsgrad.ÅTTI_PROSENT && erFar) {
            return mappedKonto80aleneomsorgFar;
        }
        if (dekningsgrad === Dekningsgrad.HUNDRE_PROSENT && ettBarn) {
            return mappedKonto100;
        }
        if (dekningsgrad === Dekningsgrad.ÅTTI_PROSENT && ettBarn) {
            return mappedKonto80;
        }
        if (dekningsgrad === Dekningsgrad.HUNDRE_PROSENT && toBarn) {
            return mappedKonto100tvillinger;
        }
        if (dekningsgrad === Dekningsgrad.ÅTTI_PROSENT && toBarn) {
            return mappedKonto80tvillinger;
        }

        return mappedKonto100;
    };

    const selectedKonto = finnSelectedKonto();
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

    console.log('selected', selectedKonto);
    const totalt = getAntallUkerForeldrepenger(selectedKonto);
    console.log('totalt', totalt);
    console.log('aktivitetsfri', antallUkerAktivitetsfriKvote);
    console.log('aktivitetskrav', antallUkerAktivitetskravKvote);
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
                        <HvorforSpørNAVOmDette text="TODO" />
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
