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
import { erEttBarn, erToBarn } from 'types/Barnet';
import { Dekningsgrad } from 'types/Dekningsgrad';
import { isAlene } from 'types/HvemPlanlegger';
import { HvorLangPeriode } from 'types/HvorLangPeriode';
import { TilgjengeligeStønadskontoerDTO } from 'types/TilgjengeligeStønadskontoerDTO';
import { utledHvemSomHarRett } from 'utils/hvemHarRettHjelper';
import {
    getAntallUker,
    getAntallUkerAktivitetsfriKvote,
    mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto,
} from 'utils/stønadskontoer';
import { finnUttaksdata } from 'utils/uttakHjelper';

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

    const dekningsgrad = formMethods.watch('dekningsgrad');

    const morHarIkkeRett =
        arbeidssituasjon.status === Arbeidsstatus.INGEN || arbeidssituasjon.status === Arbeidsstatus.UFØR;
    const farHarIkkeRett = arbeidssituasjon.jobberAnnenPart === false;

    const valgtStønadskonto =
        periode || dekningsgrad
            ? mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(
                  stønadskontoer[dekningsgrad || periode?.dekningsgrad],
              )
            : [];

    const antallUker = getAntallUker(valgtStønadskonto);
    const antallUkerAktivitetsfriKvote = getAntallUkerAktivitetsfriKvote(valgtStønadskonto);
    const antallUkerAktivitetskravKvote = antallUker - antallUkerAktivitetsfriKvote;

    const hvemHarRett = utledHvemSomHarRett(hvemPlanlegger, arbeidssituasjon);
    const { sluttdatoForeldrepenger } = finnUttaksdata(hvemHarRett, hvemPlanlegger, valgtStønadskonto, barnet);

    return (
        <PlanleggerStepPage steps={stepConfig}>
            <Form formMethods={formMethods} onSubmit={lagre} shouldUseFlexbox>
                <VStack gap="10" style={{ flex: 1 }}>
                    <Heading size="medium" spacing>
                        <FormattedMessage id="HvorLangPeriodeSteg.Tittel" />
                    </Heading>
                    <Infobox
                        header={<FormattedMessage id="HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTittel" />}
                        icon={<CalendarIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" />}
                        isGray
                    >
                        {erAlenesøker ? (
                            <BodyLong>
                                {erEttBarn(barnet) && (
                                    <FormattedMessage id="HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTekstDeg" />
                                )}
                                {erToBarn(barnet) && (
                                    <FormattedMessage id="HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTekst.ToBarn" />
                                )}
                            </BodyLong>
                        ) : (
                            <BodyLong>
                                {erEttBarn(barnet) && (
                                    <FormattedMessage id="HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTekst" />
                                )}
                                {erToBarn(barnet) && (
                                    <FormattedMessage id="HvorLangPeriodeSteg.Infoboks.HvorLangPeriodeTekst.ToBarn" />
                                )}
                            </BodyLong>
                        )}
                    </Infobox>
                    {!erAlenesøker && (morHarIkkeRett || farHarIkkeRett) && (
                        <Infobox
                            header={
                                <FormattedMessage
                                    id="HvorLangPeriodeSteg.Infoboks.NårBareEnPartHarRett"
                                    values={{ farHarIkkeRett }}
                                />
                            }
                            icon={<PersonGroupIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" />}
                            isGray
                        >
                            {farHarIkkeRett && (
                                <VStack gap="2">
                                    <BodyLong>
                                        <FormattedMessage id="HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.FårHelePerioden" />
                                    </BodyLong>
                                    <BodyLong>
                                        <FormattedMessage id="HvorLangPeriodeSteg.Infoboks.NårBareMorHarRett.IngenKravTilFar" />
                                    </BodyLong>
                                </VStack>
                            )}
                            {morHarIkkeRett && (
                                <VStack gap="2">
                                    <BodyLong>
                                        <FormattedMessage id="HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.KanFåhelePerioden" />
                                    </BodyLong>
                                    <BodyLong>
                                        <FormattedMessage
                                            id="HvorLangPeriodeSteg.Infoboks.NårBareFarHarRett.IngenKravTilMor"
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
                        </Infobox>
                    )}
                    <GreenRadioGroup
                        label={<FormattedMessage id="HvorLangPeriodeSteg.HvorLangPeriode" values={{ erAlenesøker }} />}
                        name="dekningsgrad"
                        validate={[
                            isRequired(
                                intl.formatMessage({
                                    id: 'ValidationMessage.Required',
                                }),
                            ),
                        ]}
                    >
                        <Radio value={Dekningsgrad.HUNDRE_PROSENT} autoFocus>
                            {erEttBarn(barnet) && <FormattedMessage id="HvorLangPeriodeSteg.100" />}
                            {erToBarn(barnet) && <FormattedMessage id="HvorLangPeriodeSteg.100.toBarn" />}
                        </Radio>
                        <Radio value={Dekningsgrad.ÅTTI_PROSENT}>
                            {erEttBarn(barnet) && <FormattedMessage id="HvorLangPeriodeSteg.80" />}
                            {erToBarn(barnet) && <FormattedMessage id="HvorLangPeriodeSteg.80.toBarn" />}{' '}
                        </Radio>
                    </GreenRadioGroup>
                    {dekningsgrad && (
                        <Infobox
                            header={
                                <FormattedMessage
                                    id="HvorLangPeriodeSteg.Infoboks.SisteDagTittel"
                                    values={{
                                        dato: dayjs(sluttdatoForeldrepenger).format('dddd DD. MMMM YYYY'),
                                    }}
                                />
                            }
                            icon={<CalendarIcon height={28} width={28} color="#020C1CAD" fontSize="1.5rem" />}
                        >
                            <BodyLong>
                                <FormattedMessage id="HvorLangPeriodeSteg.Infoboks.SisteDagTekst" />
                            </BodyLong>
                            {morHarIkkeRett && (
                                <VStack gap="2">
                                    <BodyLong>
                                        <FormattedMessage
                                            id="HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.FørsteUker"
                                            values={{
                                                uker: antallUkerAktivitetsfriKvote,
                                                uker2: antallUker,
                                                b: (msg: any) => <b>{msg}</b>,
                                            }}
                                        />
                                    </BodyLong>
                                    <BodyLong>
                                        <FormattedMessage
                                            id="HvorLangPeriodeSteg.Infoboks.SisteDagTekstFar.AndreUker"
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
                        </Infobox>
                    )}
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
