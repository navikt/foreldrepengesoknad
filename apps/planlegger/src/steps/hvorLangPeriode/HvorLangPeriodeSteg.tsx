import { CalendarIcon, PersonGroupIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import Infobox from 'components/boxes/Infobox';
import GreenRadioGroup from 'components/formWrappers/GreenRadioGroup';
import PlanleggerStepPage from 'components/page/PlanleggerStepPage';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidsstatus } from 'types/Arbeidssituasjon';
import { erBarnetAdoptert, erBarnetFødt } from 'types/Barnet';
import { Dekningsgrad } from 'types/Dekningsgrad';
import { erMorDelAvSøknaden, finnAnnenPartTekst, finnSøkerTekst, isAlene } from 'types/HvemPlanlegger';
import { HvorLangPeriode } from 'types/HvorLangPeriode';
import { TilgjengeligeStønadskontoerDTO } from 'types/TilgjengeligeStønadskontoerDTO';
import { utledHvemSomHarRett } from 'utils/hvemHarRettHjelper';
import {
    getAntallUkerAktivitetsfriKvote,
    getAntallUkerForeldrepenger,
    mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto,
} from 'utils/stønadskontoer';
import useScrollBehaviour from 'utils/useScrollBehaviour';
import { finnAntallUkerMedForeldrepenger, finnUttaksdata } from 'utils/uttakHjelper';

import { BodyLong, Heading, Link, Radio, Spacer, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { isRequired, notEmpty } from '@navikt/fp-validation';

interface Props {
    stønadskontoer: TilgjengeligeStønadskontoerDTO;
}

const HvorLangPeriodeSteg: FunctionComponent<Props> = ({ stønadskontoer }) => {
    const intl = useIntl();
    const navigator = usePlanleggerNavigator();
    const stepConfig = useStepData();

    const periode = useContextGetData(ContextDataType.HVOR_LANG_PERIODE);
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const arbeidssituasjon = notEmpty(useContextGetData(ContextDataType.ARBEIDSSITUASJON));

    const oppdaterPeriode = useContextSaveData(ContextDataType.HVOR_LANG_PERIODE);
    const oppdaterFordeling = useContextSaveData(ContextDataType.FORDELING);

    const formMethods = useForm<HvorLangPeriode>({ defaultValues: periode });

    const erAlenesøker = isAlene(hvemPlanlegger);
    const lagre = (formValues: HvorLangPeriode) => {
        oppdaterPeriode(formValues);
        const nextRoute =
            arbeidssituasjon.status === Arbeidsstatus.JOBBER && !!arbeidssituasjon.jobberAnnenPart
                ? PlanleggerRoutes.FORDELING
                : PlanleggerRoutes.OVERSIKT;

        if (nextRoute === PlanleggerRoutes.OVERSIKT) {
            oppdaterFordeling(undefined);
        }

        return navigator.goToNextStep(nextRoute);
    };

    const antallBarn = barnet.antallBarn;
    const dekningsgrad = formMethods.watch('dekningsgrad');

    const morHarIkkeRett =
        arbeidssituasjon.status === Arbeidsstatus.INGEN || arbeidssituasjon.status === Arbeidsstatus.UFØR;

    const farHarIkkeRett = arbeidssituasjon.jobberAnnenPart === false;
    const hvemHarRett = utledHvemSomHarRett(hvemPlanlegger, arbeidssituasjon);
    const kunEnPartSkalHa = erAlenesøker || morHarIkkeRett || farHarIkkeRett;

    const stønadskonto100 = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(
        stønadskontoer[Dekningsgrad.HUNDRE_PROSENT],
    );
    const stønadskonto80 = mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(
        stønadskontoer[Dekningsgrad.ÅTTI_PROSENT],
    );
    const valgtDekningsgrad = dekningsgrad || periode?.dekningsgrad;
    const valgtStønadskonto = valgtDekningsgrad
        ? valgtDekningsgrad === Dekningsgrad.HUNDRE_PROSENT
            ? stønadskonto100
            : stønadskonto80
        : [];

    const uttaksdata100 = finnUttaksdata(hvemHarRett, hvemPlanlegger, stønadskonto100, barnet);
    const uttaksdata80 = finnUttaksdata(hvemHarRett, hvemPlanlegger, stønadskonto80, barnet);

    const antallUker100 = finnAntallUkerMedForeldrepenger(uttaksdata100);
    const antallUker80 = finnAntallUkerMedForeldrepenger(uttaksdata80);
    const antallUker = valgtDekningsgrad === Dekningsgrad.HUNDRE_PROSENT ? antallUker100 : antallUker80;

    const erAdopsjon = erBarnetAdoptert(barnet);
    const erFødt = erBarnetFødt(barnet);
    const uttaksdata = finnUttaksdata(hvemHarRett, hvemPlanlegger, valgtStønadskonto, barnet);
    const familiehendelsedato = dayjs(uttaksdata.familiehendelsedato).format('D. MMMM');

    const sluttdatoSøker1 =
        valgtDekningsgrad === Dekningsgrad.HUNDRE_PROSENT
            ? uttaksdata100.sluttdatoSøker1
            : uttaksdata80.sluttdatoSøker1;

    const sluttdatoSøker2 =
        valgtDekningsgrad === Dekningsgrad.HUNDRE_PROSENT
            ? uttaksdata100.sluttdatoSøker2
            : uttaksdata80.sluttdatoSøker2;

    const { ref, scrollToBottom } = useScrollBehaviour();

    return (
        <PlanleggerStepPage ref={ref} steps={stepConfig}>
            <Form formMethods={formMethods} onSubmit={lagre} shouldUseFlexbox>
                <VStack gap="10" style={{ flex: 1 }}>
                    <VStack gap="8">
                        <Heading size="medium" spacing level="2">
                            <FormattedMessage id="HvorLangPeriodeSteg.Tittel" />
                        </Heading>
                        <Infobox
                            header={<FormattedMessage id="HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTittel" />}
                            icon={
                                <CalendarIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" aria-hidden />
                            }
                            isGray
                        >
                            <BodyLong>
                                <FormattedMessage
                                    id="HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTekst"
                                    values={{
                                        erAlenesøker,
                                        uker100: antallUker100,
                                        uker80: antallUker80,
                                    }}
                                />
                            </BodyLong>
                        </Infobox>
                        {!erAlenesøker && (morHarIkkeRett || farHarIkkeRett) && (
                            <Infobox
                                header={
                                    morHarIkkeRett ? (
                                        <FormattedMessage
                                            id="HvorLangPeriodeSteg.Infoboks.NårBareEnPartHarRett"
                                            values={{
                                                hvem: finnAnnenPartTekst(intl, hvemPlanlegger),
                                            }}
                                        />
                                    ) : (
                                        <FormattedMessage
                                            id="HvorLangPeriodeSteg.Infoboks.NårBareEnPartHarRett"
                                            values={{
                                                hvem: finnSøkerTekst(intl, hvemPlanlegger),
                                            }}
                                        />
                                    )
                                }
                                icon={
                                    <PersonGroupIcon
                                        height={28}
                                        width={28}
                                        color="#020C1CAD"
                                        fontSize="1.5rem"
                                        aria-hidden
                                    />
                                }
                                isGray
                            >
                                {farHarIkkeRett && (
                                    <VStack gap="2">
                                        <BodyLong>
                                            <FormattedMessage
                                                id="HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.FårHelePerioden"
                                                values={{ hvem: finnSøkerTekst(intl, hvemPlanlegger) }}
                                            />
                                        </BodyLong>
                                        <BodyLong>
                                            <FormattedMessage
                                                id="HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.IngenKravTilFar"
                                                values={{
                                                    hvem: finnAnnenPartTekst(intl, hvemPlanlegger),
                                                    hvem2: finnSøkerTekst(intl, hvemPlanlegger),
                                                }}
                                            />
                                        </BodyLong>
                                    </VStack>
                                )}
                                {morHarIkkeRett && (
                                    <VStack gap="2">
                                        <BodyLong>
                                            <FormattedMessage
                                                id="HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.KanFåhelePerioden"
                                                values={{
                                                    hvem: finnAnnenPartTekst(intl, hvemPlanlegger),
                                                    hvem2: finnSøkerTekst(intl, hvemPlanlegger),
                                                }}
                                            />
                                        </BodyLong>
                                        <BodyLong>
                                            <FormattedMessage
                                                id="HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.IngenKravTilMor"
                                                values={{
                                                    a: (msg: any) => (
                                                        <Link
                                                            inlineText
                                                            href={links.godkjentAktivitet}
                                                            className="lenke"
                                                            rel="noreferrer"
                                                            target="_blank"
                                                        >
                                                            {msg}
                                                        </Link>
                                                    ),
                                                    hvem: finnAnnenPartTekst(intl, hvemPlanlegger),
                                                    erMorHovedsøker: erMorDelAvSøknaden(hvemPlanlegger.type),
                                                }}
                                            />
                                        </BodyLong>
                                    </VStack>
                                )}
                            </Infobox>
                        )}
                        <GreenRadioGroup
                            label={
                                <FormattedMessage id="HvorLangPeriodeSteg.HvorLangPeriode" values={{ erAlenesøker }} />
                            }
                            name="dekningsgrad"
                            validate={[
                                isRequired(
                                    intl.formatMessage({
                                        id: 'ValidationMessage.Required',
                                    }),
                                ),
                            ]}
                            onChange={scrollToBottom}
                        >
                            <Radio value={Dekningsgrad.HUNDRE_PROSENT} autoFocus>
                                <FormattedMessage id="HvorLangPeriodeSteg.100" values={{ uker100: antallUker100 }} />
                            </Radio>
                            <Radio value={Dekningsgrad.ÅTTI_PROSENT}>
                                <FormattedMessage id="HvorLangPeriodeSteg.80" values={{ uker80: antallUker80 }} />
                            </Radio>
                        </GreenRadioGroup>
                        {dekningsgrad && (
                            <Infobox
                                header={
                                    <FormattedMessage
                                        id="HvorLangPeriodeSteg.Infoboks.SisteDagTittel"
                                        values={{
                                            dato: intl.formatDate(sluttdatoSøker2 || sluttdatoSøker1, {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric',
                                                weekday: 'long',
                                            }),
                                        }}
                                    />
                                }
                                icon={
                                    <CalendarIcon
                                        height={28}
                                        width={28}
                                        color="#020C1CAD"
                                        fontSize="1.5rem"
                                        aria-hidden
                                    />
                                }
                                shouldFadeIn
                            >
                                <BodyLong>
                                    {erAdopsjon && (
                                        <FormattedMessage
                                            id="HvorLangPeriodeSteg.Infoboks.SisteDagTekstAdopsjon"
                                            values={{ antallBarn, kunEnPartSkalHa, dato: familiehendelsedato }}
                                        />
                                    )}
                                    {!erAdopsjon && erFødt && (
                                        <FormattedMessage
                                            id="HvorLangPeriodeSteg.Infoboks.SisteDagTekstFødsel"
                                            values={{
                                                antallBarn,
                                                erMorDelAvSøknaden: erMorDelAvSøknaden(hvemPlanlegger.type),
                                                dato: familiehendelsedato,
                                                kunEnPartSkalHa,
                                            }}
                                        />
                                    )}
                                    {!erAdopsjon && !erFødt && (
                                        <FormattedMessage
                                            id="HvorLangPeriodeSteg.Infoboks.SisteDagTekstTermin"
                                            values={{
                                                antallBarn,
                                                erMorDelAvSøknaden: erMorDelAvSøknaden(hvemPlanlegger.type),
                                                kunEnPartSkalHa,
                                            }}
                                        />
                                    )}
                                </BodyLong>
                                {morHarIkkeRett && (
                                    <VStack gap="2">
                                        <BodyLong>
                                            <FormattedMessage
                                                id="HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.FørsteUker"
                                                values={{
                                                    uker: getAntallUkerAktivitetsfriKvote(valgtStønadskonto),
                                                    uker2: antallUker,
                                                    b: (msg: any) => <b>{msg}</b>,
                                                    hvem: finnAnnenPartTekst(intl, hvemPlanlegger),
                                                    erMorHovedsøker: erMorDelAvSøknaden(hvemPlanlegger.type),
                                                }}
                                            />
                                        </BodyLong>
                                        <BodyLong>
                                            <FormattedMessage
                                                id="HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.AndreUker"
                                                values={{
                                                    uker: getAntallUkerForeldrepenger(valgtStønadskonto),
                                                    uker2: antallUker,
                                                    a: (msg: any) => (
                                                        <Link
                                                            inlineText
                                                            href={links.godkjentAktivitet}
                                                            className="lenke"
                                                            rel="noreferrer"
                                                            target="_blank"
                                                        >
                                                            {msg}
                                                        </Link>
                                                    ),
                                                    b: (msg: any) => <b>{msg}</b>,
                                                    hvem: finnAnnenPartTekst(intl, hvemPlanlegger),
                                                    erMorHovedsøker: erMorDelAvSøknaden(hvemPlanlegger.type),
                                                }}
                                            />
                                        </BodyLong>
                                    </VStack>
                                )}
                            </Infobox>
                        )}
                    </VStack>
                    <Spacer />
                    <StepButtonsHookForm<HvorLangPeriode>
                        saveDataOnPreviousClick={oppdaterPeriode}
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        useSimplifiedTexts
                    />
                </VStack>
            </Form>
        </PlanleggerStepPage>
    );
};

export default HvorLangPeriodeSteg;
