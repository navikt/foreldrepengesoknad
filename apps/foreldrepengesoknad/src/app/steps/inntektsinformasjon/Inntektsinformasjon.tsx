import { useState } from 'react';
import { useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import {
    Block,
    ISOStringToDate,
    Step,
    TidsperiodeMedValgfriSluttdato,
    getAktiveArbeidsforhold,
    intlUtils,
    isFarEllerMedmor,
} from '@navikt/fp-common';
import { Skjemanummer } from '@navikt/fp-constants';
import { Arbeidsforhold, Attachment, AttachmentMetadataType } from '@navikt/fp-types';
import { StepButtons } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import useFpNavigator from 'app/appData/useFpNavigator';
import useStepConfig from 'app/appData/useStepConfig';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import { AnnenInntekt, AnnenInntektType } from 'app/context/types/AnnenInntekt';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';

import AndreInntekter from './components/andre-inntekter/AndreInntekter';
import ArbeidsforholdInformasjon from './components/arbeidsforhold-informasjon/ArbeidsforholdInformasjon';
import EgenNæring from './components/egen-næring/EgenNæring';
import Frilans from './components/frilans/Frilans';
import InfoTilFiskere from './components/info-til-fiskere/InfoTilFiskere';
import inntektsinforMasjonQuestionsConfig from './inntektsInformasjonQuestionsConfig';
import { InntektsinformasjonFormComponents, InntektsinformasjonFormData } from './inntektsinformasjonFormConfig';
import {
    getInitialInntektsinformasjonFormValues,
    mapInntektsinformasjonFormDataToState,
} from './inntektsinformasjonFormUtils';

const getPerioderSomDokumenteres = (andreInntekterInformasjon: AnnenInntekt[], type: AnnenInntektType) => {
    return andreInntekterInformasjon.reduce((res, info) => {
        if (info.type === type) {
            const tidsperiode: TidsperiodeMedValgfriSluttdato = {
                fom: info.tidsperiode.fom,
                tom: info.tidsperiode.tom,
            };

            res.push(tidsperiode);
        }

        return res;
    }, [] as TidsperiodeMedValgfriSluttdato[]);
};

const leggTilMetadataPåAndreInntekter = (
    vedlegg: Attachment[] | undefined,
    andreInntekterInformasjon: AnnenInntekt[],
    type: AnnenInntektType,
) => {
    if (!vedlegg || vedlegg.length === 0) {
        return vedlegg;
    }

    return vedlegg.map((v) => {
        return {
            ...v,
            dokumenterer: {
                type: AttachmentMetadataType.OPPTJENING,
                perioder: getPerioderSomDokumenteres(andreInntekterInformasjon, type),
            },
        } as Attachment;
    });
};

type Props = {
    arbeidsforhold: Arbeidsforhold[];
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
};

const Inntektsinformasjon: React.FunctionComponent<Props> = ({
    arbeidsforhold,
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
}) => {
    const intl = useIntl();

    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useFpNavigator(arbeidsforhold, mellomlagreSøknadOgNaviger);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const vedlegg = useContextGetData(ContextDataType.VEDLEGG);
    const søker = useContextGetData(ContextDataType.SØKER_DATA);

    const oppdaterVedlegg = useContextSaveData(ContextDataType.VEDLEGG);
    const oppdaterSøker = useContextSaveData(ContextDataType.SØKER_DATA);

    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const [egenNæringInformasjon, setEgenNæringsInformasjon] = useState(
        søker?.selvstendigNæringsdrivendeInformasjon ? søker.selvstendigNæringsdrivendeInformasjon : [],
    );
    const [andreInntekterInformasjon, setAndreInntekterInformasjon] = useState(
        søker?.andreInntekterSiste10Mnd ? søker.andreInntekterSiste10Mnd : [],
    );

    const [etterlønnVedlegg, setEtterlønnVedlegg] = useState(
        vedlegg ? vedlegg[Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG] : [],
    );

    const [militærVedlegg, setMilitærVedlegg] = useState(
        vedlegg ? vedlegg[Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE] : [],
    );

    const onSubmit = (values: Partial<InntektsinformasjonFormData>) => {
        setIsSubmitting(true);

        const updatedSøker = mapInntektsinformasjonFormDataToState(
            values,
            andreInntekterInformasjon,
            egenNæringInformasjon,
        );

        oppdaterSøker(updatedSøker);

        if (vedlegg) {
            oppdaterVedlegg({
                ...vedlegg,
                [Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG]: leggTilMetadataPåAndreInntekter(
                    etterlønnVedlegg,
                    andreInntekterInformasjon,
                    AnnenInntektType.SLUTTPAKKE,
                ),
                [Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE]: leggTilMetadataPåAndreInntekter(
                    militærVedlegg,
                    andreInntekterInformasjon,
                    AnnenInntektType.MILITÆRTJENESTE,
                ),
            });
        }

        if (!vedlegg) {
            oppdaterVedlegg({
                [Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG]: leggTilMetadataPåAndreInntekter(
                    etterlønnVedlegg,
                    andreInntekterInformasjon,
                    AnnenInntektType.SLUTTPAKKE,
                ),
                [Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE]: leggTilMetadataPåAndreInntekter(
                    militærVedlegg,
                    andreInntekterInformasjon,
                    AnnenInntektType.MILITÆRTJENESTE,
                ),
            });
        }

        return navigator.goToNextDefaultStep();
    };

    return (
        <InntektsinformasjonFormComponents.FormikWrapper
            initialValues={getInitialInntektsinformasjonFormValues(søker)}
            onSubmit={onSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = inntektsinforMasjonQuestionsConfig.getVisbility(
                    formValues as InntektsinformasjonFormData,
                );

                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        onCancel={avbrytSøknad}
                        onContinueLater={navigator.fortsettSøknadSenere}
                        steps={stepConfig}
                    >
                        <InntektsinformasjonFormComponents.Form includeButtons={false} includeValidationSummary={true}>
                            <Block padBottom="l">
                                <BodyShort>
                                    Hvis du får utbetalinger fra NAV, trenger du ikke å opplyse om det i søknaden
                                </BodyShort>
                            </Block>

                            <ArbeidsforholdInformasjon
                                arbeidsforhold={getAktiveArbeidsforhold(
                                    arbeidsforhold,
                                    erAdopsjon,
                                    erFarEllerMedmor,
                                    ISOStringToDate(familiehendelsesdato),
                                )}
                            />

                            <Block padBottom="l">
                                <Frilans
                                    visibility={visibility}
                                    formValues={formValues as InntektsinformasjonFormData}
                                />
                            </Block>

                            <Block padBottom="l">
                                <EgenNæring
                                    egenNæringInformasjon={egenNæringInformasjon}
                                    setEgenNæringsInformasjon={setEgenNæringsInformasjon}
                                    visibility={visibility}
                                    formValues={formValues as InntektsinformasjonFormData}
                                />
                            </Block>

                            <Block padBottom="l">
                                <AndreInntekter
                                    andreInntekterInformasjon={andreInntekterInformasjon}
                                    setAndreInntekterInformasjon={setAndreInntekterInformasjon}
                                    setEtterlønnVedlegg={setEtterlønnVedlegg}
                                    setMilitærVedlegg={setMilitærVedlegg}
                                    etterlønnVedlegg={etterlønnVedlegg || []}
                                    militærVedlegg={militærVedlegg || []}
                                    visibility={visibility}
                                    formValues={formValues as InntektsinformasjonFormData}
                                />
                            </Block>

                            <Block padBottom="l">
                                <InfoTilFiskere />
                            </Block>

                            <Block margin="xl">
                                <StepButtons
                                    isNexButtonVisible={visibility.areAllQuestionsAnswered()}
                                    goToPreviousStep={navigator.goToPreviousDefaultStep}
                                    isDisabledAndLoading={isSubmitting}
                                />
                            </Block>
                        </InntektsinformasjonFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default Inntektsinformasjon;
