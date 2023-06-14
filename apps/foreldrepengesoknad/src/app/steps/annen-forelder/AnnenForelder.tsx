import { Block, hasValue, intlUtils, Step, StepButtonWrapper } from '@navikt/fp-common';
import dayjs from 'dayjs';
import FormikFileUploader from 'app/components/formik-file-uploader/FormikFileUploader';
import actionCreator from 'app/context/action/actionCreator';
import Barn, { isAdoptertStebarn, isUfødtBarn } from 'app/context/types/Barn';
import Søker from 'app/context/types/Søker';
import SøknadRoutes from 'app/routes/routes';
import { AttachmentType } from 'app/types/AttachmentType';
import { Skjemanummer } from 'app/types/Skjemanummer';
import { convertYesOrNoOrUndefinedToBoolean } from 'app/utils/formUtils';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import { getFamiliehendelsedato, getRegistrerteBarnOmDeFinnes } from 'app/utils/barnUtils';
import { useCallback } from 'react';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import useSøknad from 'app/utils/hooks/useSøknad';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import { FormattedMessage, useIntl } from 'react-intl';
import stepConfig, { getPreviousStepHref } from '../stepsConfig';
import { AnnenForelderFormComponents, AnnenForelderFormData, AnnenForelderFormField } from './annenforelderFormConfig';
import {
    cleanAnnenForelderFormData,
    getAnnenForelderFormInitialValues,
    mapAnnenForelderFormToState,
} from './annenForelderFormUtils';
import { annenForelderQuestionsConfig, AnnenForelderQuestionsPayload } from './annenForelderQuestionsConfig';
import AvtaleAtFarTarUtForeldrepengerVeileder from './components/AvtaleAtFarTarUtForeldrepengerVeileder';
import FarDokumentasjonAleneomsorgVeileder from './components/FarDokumentasjonAleneomsorgVeileder';
import MåOrientereAnnenForelderVeileder from './components/MåOrientereAnnenForelderVeileder';
import OppgiPersonalia from './components/OppgiPersonalia';
import { validateDatoForAleneomsorg } from './validation/annenForelderValidering';
import RegistrertePersonalia from '../../components/registrerte-personalia/RegistrertePersonalia';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import { storeAppState } from 'app/utils/submitUtils';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import { ISOStringToDate } from 'app/utils/dateUtils';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import useSaveLoadedRoute from 'app/utils/hooks/useSaveLoadedRoute';
import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import { Alert, BodyLong, BodyShort, Button, ReadMore } from '@navikt/ds-react';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import links from 'app/links/links';
import { getKjønnFromFnrString } from 'app/utils/personUtils';
import { SivilstandType } from 'app/types/SivilstandType';
import { Link } from 'react-router-dom';

const AnnenForelder = () => {
    const intl = useIntl();
    const {
        annenForelder,
        barn,
        søker,
        søkersituasjon: { rolle },
    } = useSøknad();
    const familiehendelsedato = dayjs(getFamiliehendelsedato(barn));
    const søkerinfo = useSøkerinfo();
    const registrerteBarn = getRegistrerteBarnOmDeFinnes(barn, søkerinfo.registrerteBarn);
    const registrertBarnMedAnnenForelder =
        registrerteBarn === undefined || registrerteBarn.length === 0
            ? undefined
            : registrerteBarn.find((barn) => barn.annenForelder !== undefined);
    const annenForelderFraRegistrertBarn =
        registrertBarnMedAnnenForelder !== undefined ? registrertBarnMedAnnenForelder.annenForelder : undefined;

    const skalOppgiPersonalia =
        annenForelderFraRegistrertBarn === undefined ||
        (annenForelder !== undefined &&
            isAnnenForelderOppgitt(annenForelder) &&
            annenForelder.fnr !== annenForelderFraRegistrertBarn.fnr);
    const søkerErFar = rolle === 'far';
    const søkerErMor = rolle === 'mor';
    const søkerErIkkeGift =
        søkerinfo.person.sivilstand === undefined || søkerinfo.person.sivilstand.type !== SivilstandType.GIFT;
    const barnetErIkkeFødt = isUfødtBarn(barn);
    let tekstOmFarskapsportalId = '';
    if (søkerErFar && barnetErIkkeFødt) {
        tekstOmFarskapsportalId = 'annenForelder.tekstOmFarskapsportal.far.del1';
    }
    if (søkerErMor && barnetErIkkeFødt) {
        tekstOmFarskapsportalId = 'annenForelder.tekstOmFarskapsportal.mor.del1';
    }

    const onValidSubmitHandler = useCallback(
        (values: Partial<AnnenForelderFormData>) => {
            const newSøker: Søker = {
                ...søker,
                erAleneOmOmsorg: values.kanIkkeOppgis
                    ? true
                    : !!convertYesOrNoOrUndefinedToBoolean(values.aleneOmOmsorg),
            };
            const newBarn: Barn = {
                ...barn,
                datoForAleneomsorg: hasValue(values.datoForAleneomsorg)
                    ? ISOStringToDate(values.datoForAleneomsorg)
                    : undefined,
                dokumentasjonAvAleneomsorg:
                    values.dokumentasjonAvAleneomsorg && values.dokumentasjonAvAleneomsorg.length > 0
                        ? values.dokumentasjonAvAleneomsorg
                        : undefined,
            };

            return [
                actionCreator.setAnnenForelder(mapAnnenForelderFormToState(values)),
                actionCreator.setSøker(newSøker),
                actionCreator.setOmBarnet(newBarn),
            ];
        },
        [søker, barn]
    );

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        SøknadRoutes.UTTAKSPLAN_INFO,
        (state: ForeldrepengesøknadContextState) => storeAppState(state)
    );
    const onAvbrytSøknad = useAvbrytSøknad();
    const onForstettSøknadSenere = useFortsettSøknadSenere();
    useSaveLoadedRoute(SøknadRoutes.ANNEN_FORELDER);

    return (
        <AnnenForelderFormComponents.FormikWrapper
            initialValues={getAnnenForelderFormInitialValues(
                annenForelder,
                barn,
                søker,
                annenForelderFraRegistrertBarn,
                intl
            )}
            onSubmit={handleSubmit}
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
                        activeStepId="annenForelder"
                        pageTitle={intlUtils(intl, 'søknad.annenForelder')}
                        onCancel={onAvbrytSøknad}
                        onContinueLater={onForstettSøknadSenere}
                        steps={stepConfig(intl, false)}
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
                                        søkersFødselsnummer={søkerinfo.person.fnr}
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
                                    <Block>
                                        <AnnenForelderFormComponents.DatePicker
                                            name={AnnenForelderFormField.datoForAleneomsorg}
                                            label={intlUtils(intl, 'annenForelder.datoForAleneomsorg')}
                                            minDate={familiehendelsedato.toDate()}
                                            validate={validateDatoForAleneomsorg(intl, familiehendelsedato)}
                                            placeholder={'dd.mm.åååå'}
                                        />
                                    </Block>

                                    <FarDokumentasjonAleneomsorgVeileder />

                                    <FormikFileUploader
                                        legend="Dokumentasjon for aleneomsorg"
                                        label={intlUtils(
                                            intl,
                                            'annenForelder.farMedmor.dokumentasjonAvAleneomsorg.lastOpp'
                                        )}
                                        name={AnnenForelderFormField.dokumentasjonAvAleneomsorg}
                                        attachments={formValues.dokumentasjonAvAleneomsorg || []}
                                        attachmentType={AttachmentType.ALENEOMSORG}
                                        skjemanummer={Skjemanummer.DOK_AV_ALENEOMSORG}
                                    />
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
                                        'annenForelder.harRettPåForeldrepengerINorge.veileder.apneLabel'
                                    )}
                                >
                                    <FormattedMessage
                                        id="annenForelder.harRettPåForeldrepengerINorge.veileder.del1"
                                        values={{ navn: formValues.fornavn }}
                                    ></FormattedMessage>
                                    <br />
                                    <FormattedMessage
                                        id="annenForelder.harRettPåForeldrepengerINorge.veileder.del2"
                                        values={{ navn: formValues.fornavn }}
                                    ></FormattedMessage>
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
                                        'annenForelder.harRettPåForeldrepengerIEØS.veileder.apneLabel'
                                    )}
                                >
                                    <FormattedMessage
                                        id="annenForelder.harRettPåForeldrepengerIEØS.veileder"
                                        values={{ navn: formValues.fornavn }}
                                    ></FormattedMessage>
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
                                    {intlUtils(intl, 'annenForelder.erMorUfør.veileder', {
                                        navn: formValues.fornavn,
                                    })}
                                </ReadMore>
                            </Block>
                            <Block margin="l">
                                <StepButtonWrapper>
                                    <Button variant="secondary" as={Link} to={getPreviousStepHref('annenForelder')}>
                                        <FormattedMessage id="backlink.label" />
                                    </Button>
                                    {kanGåVidereMedSøknaden && (
                                        <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                                            {intlUtils(intl, 'søknad.gåVidere')}
                                        </Button>
                                    )}
                                </StepButtonWrapper>
                            </Block>
                        </AnnenForelderFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default AnnenForelder;
