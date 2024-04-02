import { CalendarIcon, PersonGroupIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/PlanleggerDataContext';
import { PlanleggerRoutes } from 'appData/routes';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import useStepData from 'appData/useStepData';
import Infobox from 'components/boxes/Infobox';
import GreenRadioGroup from 'components/formWrappers/GreenRadioGroup';
import PlanleggerStepPage from 'components/page/PlanleggerStepPage';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidsstatus } from 'types/Arbeidssituasjon';
import { erEttBarn, erToBarn } from 'types/Barnet';
import { Dekningsgrad } from 'types/Dekningsgrad';
import { isAlene } from 'types/HvemPlanlegger';
import { HvorLangPeriode } from 'types/HvorLangPeriode';
import { TilgjengeligeStønadskontoerDTO } from 'types/TilgjengeligeStønadskontoerDTO';
import {
    getAntallUker,
    getAntallUkerAktivitetsfriKvote,
    mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto,
} from 'utils/stønadskontoer';
import { finnUttaksdata } from 'utils/uttakHjelper';

import { BodyLong, Heading, Link, Radio, VStack } from '@navikt/ds-react';

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

    const formMethods = useForm<HvorLangPeriode>({ defaultValues: periode });

    const erAlenesøker = isAlene(hvemPlanlegger);

    const lagre = (formValues: HvorLangPeriode) => {
        oppdaterPeriode(formValues);
        return navigator.goToNextStep(erAlenesøker ? PlanleggerRoutes.OVERSIKT : PlanleggerRoutes.FORDELING);
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

    const { sluttdatoForeldrepenger } = finnUttaksdata(valgtStønadskonto, barnet);

    return (
        <PlanleggerStepPage steps={stepConfig}>
            <Form formMethods={formMethods} onSubmit={lagre}>
                <VStack gap="10">
                    <VStack gap="5">
                        <Heading size="medium" spacing>
                            <FormattedMessage id="periode.tittel" />
                        </Heading>
                        <Infobox
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
                        </Infobox>
                        {!erAlenesøker && (morHarIkkeRett || farHarIkkeRett) && (
                            <Infobox
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
                            </Infobox>
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
                            <Infobox
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
                            </Infobox>
                        )}
                    </VStack>
                    <VStack gap="10">
                        <StepButtonsHookForm<HvorLangPeriode>
                            saveDataOnPreviousClick={oppdaterPeriode}
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
