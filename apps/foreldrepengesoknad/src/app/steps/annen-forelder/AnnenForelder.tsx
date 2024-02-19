import { Alert, BodyLong, BodyShort, ReadMore } from '@navikt/ds-react';
import {
    Barn,
    Block,
    ISOStringToDate,
    SivilstandType,
    Step,
    convertYesOrNoOrUndefinedToBoolean,
    getKjønnFromFnrString,
    hasValue,
    intlUtils,
    isAdoptertStebarn,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
    isUfødtBarn,
    lagSendSenereDokumentNårIngenAndreFinnes,
    links,
} from '@navikt/fp-common';
import { Søker } from '@navikt/fp-types';
import { StepButtons } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import useFpNavigator from 'app/appData/useFpNavigator';
import useStepConfig from 'app/appData/useStepConfig';
import FormikFileUploader from 'app/components/formik-file-uploader/FormikFileUploader';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import { getFamiliehendelsedato, getRegistrerteBarnOmDeFinnes } from 'app/utils/barnUtils';
import dayjs from 'dayjs';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import RegistrertePersonalia from '../../components/registrerte-personalia/RegistrertePersonalia';
import {
    cleanAnnenForelderFormData,
    getAnnenForelderFormInitialValues,
    mapAnnenForelderFormToState,
} from './annenForelderFormUtils';
import { AnnenForelderQuestionsPayload, annenForelderQuestionsConfig } from './annenForelderQuestionsConfig';
import { AnnenForelderFormComponents, AnnenForelderFormData, AnnenForelderFormField } from './annenforelderFormConfig';
import AvtaleAtFarTarUtForeldrepengerVeileder from './components/AvtaleAtFarTarUtForeldrepengerVeileder';
import FarDokumentasjonAleneomsorgVeileder from './components/FarDokumentasjonAleneomsorgVeileder';
import MåOrientereAnnenForelderVeileder from './components/MåOrientereAnnenForelderVeileder';
import OppgiPersonalia from './components/OppgiPersonalia';
import { validateDatoForAleneomsorg } from './validation/annenForelderValidering';
import { VedleggDataType } from 'app/types/VedleggDataType';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';

type Props = {
    søker: Søker;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
};

const AnnenForelder: React.FunctionComponent<Props> = ({ søker, mellomlagreSøknadOgNaviger, avbrytSøknad }) => {
    const intl = useIntl();

    const stepConfig = useStepConfig();
    const navigator = useFpNavigator(mellomlagreSøknadOgNaviger);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { rolle } = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const annenForelder = useContextGetData(ContextDataType.ANNEN_FORELDER) || {
        kanIkkeOppgis: false,
    };
    const vedlegg = useContextGetData(ContextDataType.VEDLEGG) || ({} as VedleggDataType);

    const oppdaterOmBarnet = useContextSaveData(ContextDataType.OM_BARNET);
    const oppdaterAnnenForeldre = useContextSaveData(ContextDataType.ANNEN_FORELDER);
    const oppdaterVedlegg = useContextSaveData(ContextDataType.VEDLEGG);
    const oppdaterSøker = useContextSaveData(ContextDataType.SØKER_DATA);
    const søkerData = useContextGetData(ContextDataType.SØKER_DATA);

    const familiehendelsedato = dayjs(getFamiliehendelsedato(barn));
    const funnetRegistrerteBarn = getRegistrerteBarnOmDeFinnes(barn, søker.barn);
    const registrertBarnMedAnnenForelder =
        funnetRegistrerteBarn === undefined || funnetRegistrerteBarn.length === 0
            ? undefined
            : funnetRegistrerteBarn.find((barn) => barn.annenForelder !== undefined);
    const annenForelderFraRegistrertBarn =
        registrertBarnMedAnnenForelder !== undefined ? registrertBarnMedAnnenForelder.annenForelder : undefined;

    const skalOppgiPersonalia =
        annenForelderFraRegistrertBarn === undefined ||
        (annenForelder !== undefined &&
            isAnnenForelderOppgitt(annenForelder) &&
            annenForelder.fnr !== annenForelderFraRegistrertBarn.fnr);
    const søkerErFar = rolle === 'far';
    const søkerErMor = rolle === 'mor';
    const søkerErIkkeGift = søker.sivilstand === undefined || søker.sivilstand.type !== SivilstandType.GIFT;
    const barnetErIkkeFødt = isUfødtBarn(barn);
    let tekstOmFarskapsportalId = '';
    if (søkerErFar && barnetErIkkeFødt) {
        tekstOmFarskapsportalId = 'annenForelder.tekstOmFarskapsportal.far.del1';
    }
    if (søkerErMor && barnetErIkkeFødt) {
        tekstOmFarskapsportalId = 'annenForelder.tekstOmFarskapsportal.mor.del1';
    }

    const onSubmit = (values: Partial<AnnenForelderFormData>) => {
        setIsSubmitting(true);

        // @ts-ignore TODO (TOR) Søker er dårleg typa. Her skal den kunne innehalda kun erAleneOmsorg, og så blir den utvida seinare
        const newSøker: SøkerData = {
            ...(søkerData || {}),
            erAleneOmOmsorg: values.kanIkkeOppgis ? true : !!convertYesOrNoOrUndefinedToBoolean(values.aleneOmOmsorg),
        };

        const newBarn: Barn = {
            ...barn,
            datoForAleneomsorg: hasValue(values.datoForAleneomsorg)
                ? ISOStringToDate(values.datoForAleneomsorg)
                : undefined,
        };
        const dokumentasjonAvAleneomsorg =
            values.dokumentasjonAvAleneomsorg && values.dokumentasjonAvAleneomsorg.length > 0
                ? lagSendSenereDokumentNårIngenAndreFinnes(
                      values.dokumentasjonAvAleneomsorg,
                      AttachmentType.ALENEOMSORG,
                      Skjemanummer.DOK_AV_ALENEOMSORG,
                  )
                : [];

        const nyeVedlegg = {
            ...vedlegg,
            [Skjemanummer.DOK_AV_ALENEOMSORG]: dokumentasjonAvAleneomsorg,
        };

        oppdaterOmBarnet(newBarn);
        oppdaterAnnenForeldre(mapAnnenForelderFormToState(values));
        oppdaterVedlegg(nyeVedlegg);
        oppdaterSøker(newSøker);

        return navigator.goToNextDefaultStep();
    };

    return (
        <AnnenForelderFormComponents.FormikWrapper
            initialValues={getAnnenForelderFormInitialValues(
                annenForelder,
                barn,
                annenForelderFraRegistrertBarn,
                intl,
                søkerData,
            )}
            onSubmit={onSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = annenForelderQuestionsConfig.getVisbility({
                    ...formValues,
                    skalOppgiPersonalia,
                    søkerRolle: rolle,
                    gjelderStebarnsadopsjon: isAdoptertStebarn(barn) ? true : false,
                } as AnnenForelderQuestionsPayload);

                const annenForelderHarRett = formValues.harRettPåForeldrepengerINorge === YesOrNo.YES;
                const fnrFraAnnenForelder = isAnnenForelderOppgitt(annenForelder) ? annenForelder.fnr : undefined;
                const oppgittFnr = formValues.fnr;
                const annenForelderFnr = fnrFraAnnenForelder || oppgittFnr;
                const annenForelderErFarEllerUtenlandsk =
                    (annenForelderFnr !== undefined && getKjønnFromFnrString(annenForelderFnr) === 'M') ||
                    formValues.utenlandskFnr;
                const annenForelderHarRettErBesvart = formValues.harRettPåForeldrepengerINorge !== YesOrNo.UNANSWERED;
                const farErInformert =
                    convertYesOrNoOrUndefinedToBoolean(formValues.aleneOmOmsorg) ||
                    !convertYesOrNoOrUndefinedToBoolean(formValues.harRettPåForeldrepengerINorge) ||
                    (convertYesOrNoOrUndefinedToBoolean(formValues.harRettPåForeldrepengerINorge) &&
                        convertYesOrNoOrUndefinedToBoolean(formValues.erInformertOmSøknaden));

                const kanGåVidereMedSøknaden = visibility.areAllQuestionsAnswered() && farErInformert;
                const visInfoboksOmFarskapsportal =
                    ((søkerErFar && annenForelderHarRettErBesvart) ||
                        (søkerErMor && annenForelderErFarEllerUtenlandsk && annenForelderHarRett)) &&
                    barnetErIkkeFødt &&
                    søkerErIkkeGift;
                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        onCancel={avbrytSøknad}
                        onContinueLater={navigator.fortsettSøknadSenere}
                        steps={stepConfig}
                    >
                        <AnnenForelderFormComponents.Form
                            includeButtons={false}
                            cleanup={(values) =>
                                cleanAnnenForelderFormData(values, visibility, annenForelderFraRegistrertBarn)
                            }
                            includeValidationSummary={true}
                        >
                            {skalOppgiPersonalia && (
                                <Block padBottom="xl">
                                    <OppgiPersonalia
                                        fornavn={formValues.fornavn}
                                        erUtenlandskFnr={formValues.utenlandskFnr}
                                        kanIkkeOppgis={formValues.kanIkkeOppgis}
                                        visibility={visibility}
                                        gjelderAdopsjon={false}
                                        søkersFødselsnummer={søker.fnr}
                                    />
                                </Block>
                            )}
                            {!skalOppgiPersonalia && (
                                <Block padBottom="xl">
                                    <RegistrertePersonalia
                                        person={annenForelderFraRegistrertBarn}
                                        fødselsnummerForVisning={annenForelderFraRegistrertBarn.fnr}
                                        visEtternavn={true}
                                    />
                                </Block>
                            )}
                            <Block
                                visible={
                                    visibility.isVisible(AnnenForelderFormField.aleneOmOmsorg) || !skalOppgiPersonalia
                                }
                                padBottom="xl"
                            >
                                <AnnenForelderFormComponents.RadioGroup
                                    name={AnnenForelderFormField.aleneOmOmsorg}
                                    legend={intlUtils(intl, 'annenForelder.aleneOmOmsorg')}
                                    radios={[
                                        { label: 'Ja', value: YesOrNo.NO },
                                        { label: 'Nei, jeg har aleneomsorg', value: YesOrNo.YES },
                                    ]}
                                />
                                <ReadMore header={intlUtils(intl, 'annenForelder.aleneOmOmsorg.apneLabel')}>
                                    <Block padBottom="xl">
                                        <BodyLong>{intlUtils(intl, 'annenForelder.aleneOmOmsorg.del1')}</BodyLong>
                                    </Block>
                                    <BodyShort>{intlUtils(intl, 'annenForelder.aleneOmOmsorg.del2')}</BodyShort>
                                </ReadMore>
                                <AvtaleAtFarTarUtForeldrepengerVeileder
                                    visible={!isFarEllerMedmor(rolle) && formValues.aleneOmOmsorg === YesOrNo.YES}
                                    annenForelderNavn={formValues.fornavn!}
                                />
                            </Block>

                            {!formValues.kanIkkeOppgis && (
                                <Block
                                    padBottom="xl"
                                    visible={visibility.isVisible(AnnenForelderFormField.datoForAleneomsorg)}
                                >
                                    <Block padBottom="xl">
                                        <AnnenForelderFormComponents.DatePicker
                                            name={AnnenForelderFormField.datoForAleneomsorg}
                                            label={intlUtils(intl, 'annenForelder.datoForAleneomsorg')}
                                            minDate={familiehendelsedato.toDate()}
                                            validate={validateDatoForAleneomsorg(intl, familiehendelsedato)}
                                            placeholder={'dd.mm.åååå'}
                                        />
                                    </Block>

                                    <FarDokumentasjonAleneomsorgVeileder />
                                    <Block padBottom="xl">
                                        <FormikFileUploader
                                            legend="Dokumentasjon for aleneomsorg"
                                            label={intlUtils(
                                                intl,
                                                'annenForelder.farMedmor.dokumentasjonAvAleneomsorg.lastOpp',
                                            )}
                                            name={AnnenForelderFormField.dokumentasjonAvAleneomsorg}
                                            attachments={formValues.dokumentasjonAvAleneomsorg || []}
                                            attachmentType={AttachmentType.ALENEOMSORG}
                                            skjemanummer={Skjemanummer.DOK_AV_ALENEOMSORG}
                                        />{' '}
                                    </Block>
                                </Block>
                            )}
                            <Block
                                padBottom="xl"
                                visible={visibility.isVisible(AnnenForelderFormField.harRettPåForeldrepengerINorge)}
                            >
                                <AnnenForelderFormComponents.YesOrNoQuestion
                                    name={AnnenForelderFormField.harRettPåForeldrepengerINorge}
                                    legend={intlUtils(intl, 'annenForelder.harRettPåForeldrepengerINorge', {
                                        navn: formValues.fornavn,
                                    })}
                                />
                                <ReadMore
                                    header={intlUtils(
                                        intl,
                                        'annenForelder.harRettPåForeldrepengerINorge.veileder.apneLabel',
                                    )}
                                >
                                    <Block padBottom="m">
                                        <FormattedMessage id="annenForelder.harRettPåForeldrepengerINorge.veileder"></FormattedMessage>
                                    </Block>
                                    <ul style={{ margin: '0', padding: '1rem 2rem 0' }}>
                                        <li>
                                            <FormattedMessage id="annenForelder.harRettPåForeldrepengerINorge.veileder.punkt1" />
                                        </li>
                                        <li>
                                            <FormattedMessage id="annenForelder.harRettPåForeldrepengerINorge.veileder.punkt2" />
                                        </li>
                                        <li>
                                            <FormattedMessage id="annenForelder.harRettPåForeldrepengerINorge.veileder.punkt3" />
                                        </li>
                                    </ul>
                                </ReadMore>
                            </Block>
                            <Block
                                padBottom="l"
                                visible={
                                    visibility.isVisible(AnnenForelderFormField.harRettPåForeldrepengerINorge) &&
                                    visInfoboksOmFarskapsportal
                                }
                            >
                                <Alert variant="info">
                                    <Block padBottom="l">
                                        <FormattedMessage
                                            id={tekstOmFarskapsportalId}
                                            values={{
                                                a: (msg: any) => (
                                                    <a
                                                        href={links.farskapsportal}
                                                        className="lenke"
                                                        rel="noreferrer"
                                                        target="_blank"
                                                    >
                                                        {msg}
                                                    </a>
                                                ),
                                            }}
                                        />
                                    </Block>
                                    <Block>
                                        <FormattedMessage id="annenForelder.tekstOmFarskapsportal.mor.far.del2" />
                                    </Block>
                                </Alert>
                            </Block>
                            <Block
                                padBottom="l"
                                visible={visibility.isVisible(AnnenForelderFormField.harOppholdtSegIEØS)}
                            >
                                <AnnenForelderFormComponents.YesOrNoQuestion
                                    name={AnnenForelderFormField.harOppholdtSegIEØS}
                                    legend={intlUtils(intl, 'annenForelder.harOppholdtSegIEØS', {
                                        navn: formValues.fornavn,
                                    })}
                                />
                                <ReadMore
                                    header={intlUtils(intl, 'annenForelder.harOppholdtSegIEØS.veileder.apneLabel')}
                                >
                                    <FormattedMessage
                                        id="annenForelder.harOppholdtSegIEØS.veileder"
                                        values={{ navn: formValues.fornavn }}
                                    ></FormattedMessage>
                                </ReadMore>
                            </Block>
                            <Block
                                padBottom="xl"
                                visible={visibility.isVisible(AnnenForelderFormField.harRettPåForeldrepengerIEØS)}
                            >
                                <AnnenForelderFormComponents.YesOrNoQuestion
                                    name={AnnenForelderFormField.harRettPåForeldrepengerIEØS}
                                    legend={intlUtils(intl, 'annenForelder.harRettPåForeldrepengerIEØS', {
                                        navn: formValues.fornavn,
                                    })}
                                />
                                <ReadMore
                                    header={intlUtils(
                                        intl,
                                        'annenForelder.harRettPåForeldrepengerIEØS.veileder.apneLabel',
                                    )}
                                >
                                    <Block padBottom="l">
                                        <FormattedMessage
                                            id="annenForelder.harRettPåForeldrepengerIEØS.veileder.del1"
                                            values={{ navn: formValues.fornavn }}
                                        ></FormattedMessage>
                                    </Block>

                                    <Block padBottom="l">
                                        <FormattedMessage
                                            id="annenForelder.harRettPåForeldrepengerIEØS.veileder.del2"
                                            values={{ navn: formValues.fornavn }}
                                        ></FormattedMessage>
                                    </Block>

                                    <Block>
                                        <Link to="https://www.nav.no/foreldrepenger#utland" target="_blank">
                                            <FormattedMessage
                                                id="annenForelder.harRettPåForeldrepengerIEØS.veileder.link"
                                                values={{ navn: formValues.fornavn }}
                                            />
                                        </Link>
                                    </Block>
                                </ReadMore>
                            </Block>
                            <Block
                                padBottom="xl"
                                visible={visibility.isVisible(AnnenForelderFormField.erInformertOmSøknaden)}
                            >
                                <AnnenForelderFormComponents.YesOrNoQuestion
                                    name={AnnenForelderFormField.erInformertOmSøknaden}
                                    legend={intlUtils(intl, 'annenForelder.spørsmål.erAnnenForelderInformert', {
                                        navn: formValues.fornavn,
                                    })}
                                />
                                <MåOrientereAnnenForelderVeileder
                                    visible={formValues.erInformertOmSøknaden === YesOrNo.NO}
                                    annenForelderNavn={formValues.fornavn!}
                                />
                            </Block>

                            <Block padBottom="xl" visible={visibility.isVisible(AnnenForelderFormField.erMorUfør)}>
                                <AnnenForelderFormComponents.YesOrNoQuestion
                                    name={AnnenForelderFormField.erMorUfør}
                                    legend={intlUtils(intl, 'annenForelder.erMorUfør', {
                                        navn: formValues.fornavn,
                                    })}
                                />
                                <ReadMore header={intlUtils(intl, 'annenForelder.erMorUfør.veileder.apneLabel')}>
                                    <Block>
                                        <FormattedMessage
                                            id="annenForelder.erMorUfør.veileder"
                                            values={{ navnAnnenForelder: formValues.fornavn }}
                                        />
                                    </Block>
                                </ReadMore>
                            </Block>
                            <Block margin="l">
                                <StepButtons
                                    isNexButtonVisible={kanGåVidereMedSøknaden}
                                    goToPreviousStep={navigator.goToPreviousDefaultStep}
                                    isDisabledAndLoading={isSubmitting}
                                />
                            </Block>
                        </AnnenForelderFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default AnnenForelder;
