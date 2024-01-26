import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Alert, BodyLong, BodyShort, Link, Radio, ReadMore, VStack } from '@navikt/ds-react';

import {
    Barn,
    SivilstandType,
    Step,
    getKjønnFromFnrString,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
    isUfødtBarn,
    links,
} from '@navikt/fp-common';
import { Datepicker, ErrorSummaryHookForm, Form, RadioGroup, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Søker, Søkerrolle } from '@navikt/fp-types';
import { isBefore, isRequired, isValidDate, notEmpty } from '@navikt/fp-validation';

import useFpNavigator from 'app/appData/useFpNavigator';
import useStepConfig from 'app/appData/useStepConfig';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import { getFamiliehendelsedato, getRegistrerteBarnOmDeFinnes } from 'app/utils/barnUtils';

import RegistrertePersonalia from '../../components/registrerte-personalia/RegistrertePersonalia';
import { AnnenForelderFormData } from './AnnenForelderFormData';
import OppgiPersonalia from './OppgiPersonalia';
import { mapAnnenForelderFormToState } from './annenForelderFormUtils';

const getRegistrertAnnenForelder = (barn: NonNullable<Barn | undefined>, søker: Søker) => {
    const registrerteBarn = getRegistrerteBarnOmDeFinnes(barn, søker.barn);
    const registrertBarnMedAnnenForelder =
        registrerteBarn === undefined || registrerteBarn.length === 0
            ? undefined
            : registrerteBarn.find((barn) => barn.annenForelder !== undefined);
    return registrertBarnMedAnnenForelder !== undefined ? registrertBarnMedAnnenForelder.annenForelder : undefined;
};

const getTekstOmFarskapsportal = (rolle: Søkerrolle, barnetErIkkeFødt: boolean) => {
    if (rolle === 'far' && barnetErIkkeFødt) {
        return 'annenForelder.tekstOmFarskapsportal.far.del1';
    }
    if (rolle === 'mor' && barnetErIkkeFødt) {
        return 'annenForelder.tekstOmFarskapsportal.mor.del1';
    }
    return '';
};

type Props = {
    søker: Søker;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
};

const AnnenForelder: React.FunctionComponent<Props> = ({ søker, mellomlagreSøknadOgNaviger, avbrytSøknad }) => {
    const intl = useIntl();

    const stepConfig = useStepConfig();
    const navigator = useFpNavigator(mellomlagreSøknadOgNaviger);

    const { rolle } = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const annenForelder = useContextGetData(ContextDataType.ANNEN_FORELDER);

    const oppdaterAnnenForeldre = useContextSaveData(ContextDataType.ANNEN_FORELDER);

    const familiehendelsedato = getFamiliehendelsedato(barn);
    const annenForelderFraRegistrertBarn = getRegistrertAnnenForelder(barn, søker);

    const skalOppgiPersonalia =
        annenForelderFraRegistrertBarn === undefined ||
        annenForelder === undefined ||
        (isAnnenForelderOppgitt(annenForelder) && annenForelder.fnr !== annenForelderFraRegistrertBarn.fnr);
    const søkerErIkkeGift = søker.sivilstand === undefined || søker.sivilstand.type !== SivilstandType.GIFT;
    const barnetErIkkeFødt = isUfødtBarn(barn);
    const tekstOmFarskapsportalId = getTekstOmFarskapsportal(rolle, barnetErIkkeFødt);

    const onSubmit = (values: AnnenForelderFormData) => {
        oppdaterAnnenForeldre(mapAnnenForelderFormToState(values, skalOppgiPersonalia, annenForelderFraRegistrertBarn));
        return navigator.goToNextDefaultStep();
    };

    const formMethods = useForm<AnnenForelderFormData>({
        shouldUnregister: true,
        defaultValues: annenForelder,
    });

    const harRettPåForeldrepengerINorge = formMethods.watch('harRettPåForeldrepengerINorge');
    const fnr = formMethods.watch('fnr');
    const utenlandskFnr = formMethods.watch('utenlandskFnr');
    const aleneOmOmsorg = formMethods.watch('erAleneOmOmsorg');

    const erInformertOmSøknaden = formMethods.watch('erInformertOmSøknaden');
    const fornavn = formMethods.watch('fornavn');
    const kanIkkeOppgis = formMethods.watch('kanIkkeOppgis');
    const harOppholdtSegIEØS = formMethods.watch('harOppholdtSegIEØS');
    const harRettPåForeldrepengerIEØS = formMethods.watch('harRettPåForeldrepengerIEØS');

    const annenForelderHarRett = harRettPåForeldrepengerINorge === true;
    const fnrFraAnnenForelder = annenForelder && isAnnenForelderOppgitt(annenForelder) ? annenForelder.fnr : undefined;
    const annenForelderFnr = fnrFraAnnenForelder || fnr;
    const annenForelderErFarEllerUtenlandsk =
        (annenForelderFnr !== undefined && getKjønnFromFnrString(annenForelderFnr) === 'M') || utenlandskFnr;
    const annenForelderHarRettErBesvart = harRettPåForeldrepengerINorge !== undefined;
    /*const farErInformert =
        convertYesOrNoOrUndefinedToBoolean(aleneOmOmsorg) ||
        !convertYesOrNoOrUndefinedToBoolean(harRettPåForeldrepengerINorge) ||
        (convertYesOrNoOrUndefinedToBoolean(harRettPåForeldrepengerINorge) &&
            convertYesOrNoOrUndefinedToBoolean(erInformertOmSøknaden));

    const kanGåVidereMedSøknaden = visibility.areAllQuestionsAnswered() && farErInformert;*/
    const visInfoboksOmFarskapsportal =
        ((rolle === 'far' && annenForelderHarRettErBesvart) ||
            (rolle === 'mor' && annenForelderErFarEllerUtenlandsk && annenForelderHarRett)) &&
        barnetErIkkeFødt &&
        søkerErIkkeGift;

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            onCancel={avbrytSøknad}
            onContinueLater={navigator.fortsettSøknadSenere}
            steps={stepConfig}
        >
            <Form formMethods={formMethods} onSubmit={onSubmit}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    {skalOppgiPersonalia && (
                        <OppgiPersonalia rolle={rolle} barn={barn} søkersFødselsnummer={søker.fnr} />
                    )}
                    {!skalOppgiPersonalia && (
                        <RegistrertePersonalia
                            person={annenForelderFraRegistrertBarn}
                            fødselsnummerForVisning={annenForelderFraRegistrertBarn.fnr}
                            visEtternavn={true}
                        />
                    )}
                    <div>
                        <RadioGroup
                            name="erAleneOmOmsorg"
                            label={intl.formatMessage({ id: 'annenForelder.aleneOmOmsorg' })}
                            validate={[
                                isRequired(
                                    intl.formatMessage({ id: 'valideringsfeil.annenForelder.harAleneOmsorgPåkrevd' }),
                                ),
                            ]}
                        >
                            <Radio value={false}>Ja</Radio>
                            <Radio value={true}>Nei, jeg har aleneomsorg</Radio>
                        </RadioGroup>
                        <ReadMore header={intl.formatMessage({ id: 'annenForelder.aleneOmOmsorg.apneLabel' })}>
                            <BodyLong>{intl.formatMessage({ id: 'annenForelder.aleneOmOmsorg.del1' })}</BodyLong>
                            <BodyShort>{intl.formatMessage({ id: 'annenForelder.aleneOmOmsorg.del2' })}</BodyShort>
                        </ReadMore>
                    </div>
                    {!isFarEllerMedmor(rolle) && aleneOmOmsorg === true && (
                        <Alert variant="info">
                            <FormattedMessage id="annenForelder.veileder.aleneOmsorg.forBarnet" />
                        </Alert>
                    )}
                    {!kanIkkeOppgis && aleneOmOmsorg === true && isFarEllerMedmor(rolle) && (
                        <div>
                            <Datepicker
                                name="datoForAleneomsorg"
                                label={intl.formatMessage({ id: 'annenForelder.datoForAleneomsorg' })}
                                minDate={dayjs(familiehendelsedato).toDate()}
                                validate={[
                                    isRequired(
                                        intl.formatMessage({
                                            id: 'valideringsfeil.annenForelder.datoForAleneomsorg.duMåOppgi',
                                        }),
                                    ),
                                    isValidDate(
                                        intl.formatMessage({
                                            id: 'valideringsfeil.annenForelder.datoForAleneomsorg.ugyldigDatoFormat',
                                        }),
                                    ),
                                    isBefore(
                                        intl.formatMessage({
                                            id: 'valideringsfeil.annenForelder.datoForAleneomsorg.ugyldigDatoFormat',
                                        }),
                                        familiehendelsedato,
                                    ),
                                ]}
                            />

                            <BodyShort>
                                <FormattedMessage id="annenForelder.farMedmor.dokumentasjonAvAleneomsorg.veileder" />
                            </BodyShort>
                            {/* <Block padBottom="xl">
                            <FormikFileUploader
                                legend="Dokumentasjon for aleneomsorg"
                                label={intl.formatMessage({id: 'annenForelder.farMedmor.dokumentasjonAvAleneomsorg.lastOpp')}
                                name={AnnenForelderFormField.dokumentasjonAvAleneomsorg}
                                attachments={dokumentasjonAvAleneomsorg || []}
                                attachmentType={AttachmentType.ALENEOMSORG}
                                skjemanummer={Skjemanummer.DOK_AV_ALENEOMSORG}
                            />{' '}
                        </Block> */}
                        </div>
                    )}
                    {aleneOmOmsorg !== true && (
                        <div>
                            <RadioGroup
                                name="harRettPåForeldrepengerINorge"
                                label={intl.formatMessage({ id: 'annenForelder.harRettPåForeldrepengerINorge' })}
                                validate={[
                                    isRequired(
                                        intl.formatMessage({
                                            id: 'valideringsfeil.annenForelder.harRettTilForeldrepengerPåkrevd',
                                        }),
                                    ),
                                ]}
                            >
                                <Radio value={true}>Ja</Radio>
                                <Radio value={false}>Nei</Radio>
                            </RadioGroup>
                            <ReadMore
                                header={intl.formatMessage({
                                    id: 'annenForelder.harRettPåForeldrepengerINorge.veileder.apneLabel',
                                })}
                            >
                                <FormattedMessage id="annenForelder.harRettPåForeldrepengerINorge.veileder"></FormattedMessage>
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
                        </div>
                    )}
                    {aleneOmOmsorg === false && visInfoboksOmFarskapsportal && (
                        <Alert variant="info">
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
                            <FormattedMessage id="annenForelder.tekstOmFarskapsportal.mor.far.del2" />
                        </Alert>
                    )}
                    {aleneOmOmsorg === false && harRettPåForeldrepengerINorge === false && (
                        <div>
                            <RadioGroup
                                name="harOppholdtSegIEØS"
                                label={intl.formatMessage(
                                    { id: 'annenForelder.harOppholdtSegIEØS' },
                                    {
                                        navn: fornavn,
                                    },
                                )}
                            >
                                <Radio value={true}>Ja</Radio>
                                <Radio value={false}>Nei</Radio>
                            </RadioGroup>
                            <ReadMore
                                header={intl.formatMessage({
                                    id: 'annenForelder.harOppholdtSegIEØS.veileder.apneLabel',
                                })}
                            >
                                <FormattedMessage
                                    id="annenForelder.harOppholdtSegIEØS.veileder"
                                    values={{ navn: fornavn }}
                                ></FormattedMessage>
                            </ReadMore>
                        </div>
                    )}
                    {aleneOmOmsorg === false && harOppholdtSegIEØS === true && (
                        <div>
                            <RadioGroup
                                name="harRettPåForeldrepengerIEØS"
                                label={intl.formatMessage(
                                    { id: 'annenForelder.harRettPåForeldrepengerIEØS' },
                                    {
                                        navn: fornavn,
                                    },
                                )}
                            >
                                <Radio value={true}>Ja</Radio>
                                <Radio value={false}>Nei</Radio>
                            </RadioGroup>

                            <ReadMore
                                header={intl.formatMessage({
                                    id: 'annenForelder.harRettPåForeldrepengerIEØS.veileder.apneLabel',
                                })}
                            >
                                <VStack gap="2">
                                    <FormattedMessage
                                        id="annenForelder.harRettPåForeldrepengerIEØS.veileder.del1"
                                        values={{ navn: fornavn }}
                                    ></FormattedMessage>

                                    <FormattedMessage
                                        id="annenForelder.harRettPåForeldrepengerIEØS.veileder.del2"
                                        values={{ navn: fornavn }}
                                    ></FormattedMessage>

                                    <Link to="https://www.nav.no/foreldrepenger#utland" target="_blank">
                                        <FormattedMessage
                                            id="annenForelder.harRettPåForeldrepengerIEØS.veileder.link"
                                            values={{ navn: fornavn }}
                                        />
                                    </Link>
                                </VStack>
                            </ReadMore>
                        </div>
                    )}
                    {aleneOmOmsorg !== true && harRettPåForeldrepengerINorge !== false && (
                        <>
                            <RadioGroup
                                name="erInformertOmSøknaden"
                                label={intl.formatMessage({ id: 'annenForelder.spørsmål.erAnnenForelderInformert' })}
                                validate={[
                                    isRequired(
                                        intl.formatMessage({
                                            id: 'valideringsfeil.annenForelder.informertAnnenForelderPåkrevd',
                                        }),
                                    ),
                                ]}
                            >
                                <Radio value={true}>Ja</Radio>
                                <Radio value={false}>Nei</Radio>
                            </RadioGroup>
                            {erInformertOmSøknaden === false && (
                                <Alert variant="warning">
                                    <FormattedMessage id="annenForelder.erAnnenForelderInformert.veileder" />
                                </Alert>
                            )}
                        </>
                    )}

                    {aleneOmOmsorg === false &&
                        harRettPåForeldrepengerINorge === false &&
                        (harOppholdtSegIEØS === false || harRettPåForeldrepengerIEØS === false) &&
                        isFarEllerMedmor(rolle) && (
                            <div>
                                <RadioGroup
                                    name="erMorUfør"
                                    label={intl.formatMessage(
                                        { id: 'annenForelder.erMorUfør' },
                                        {
                                            navn: fornavn,
                                        },
                                    )}
                                >
                                    <Radio value={true}>Ja</Radio>
                                    <Radio value={false}>Nei</Radio>
                                </RadioGroup>
                                <ReadMore
                                    header={intl.formatMessage({ id: 'annenForelder.erMorUfør.veileder.apneLabel' })}
                                >
                                    <FormattedMessage
                                        id="annenForelder.erMorUfør.veileder"
                                        values={{ navnAnnenForelder: fornavn }}
                                    />
                                </ReadMore>
                            </div>
                        )}
                    <StepButtonsHookForm goToPreviousStep={navigator.goToPreviousDefaultStep} />
                </VStack>
            </Form>
        </Step>
    );
};

export default AnnenForelder;
