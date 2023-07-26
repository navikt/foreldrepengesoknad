import { Block, bemUtils, intlUtils, validateTextInputField } from '@navikt/fp-common';
import { FormattedMessage, useIntl } from 'react-intl';
import './egen-næring-input.css';
import { FunctionComponent, useEffect, useState } from 'react';
import { Alert, BodyShort, Button, Heading, ReadMore } from '@navikt/ds-react';
import {
    InntektsinformasjonFormComponents,
    InntektsinformasjonFormData,
    InntektsinformasjonFormField,
} from '../../inntektsinformasjonFormConfig';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { Næring, Næringstype } from 'app/types/Næring';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import {
    validateEgenNæringFom,
    validateEgenNæringTom,
    validateEgenNæringYrkesAktivDatoDato,
    validateNumber,
} from './modal/validation/egenNæringValidation';
import dayjs from 'dayjs';
import OrgnummerEllerLand from './modal/components/OrgnummerEllerLand';
import { getIn } from 'formik';
import { getInputFeltFeil } from '../input-feilmelding/InputFeilmelding';
import { mapEgenNæringFormValuesToState } from '../../inntektsinformasjonFormUtils';
import { hasValue } from 'app/utils/validationUtils';

interface Props {
    visibility: QuestionVisibility<InntektsinformasjonFormField, undefined>;
    formValues: InntektsinformasjonFormData;
    setNæring: React.Dispatch<React.SetStateAction<Næring | undefined>>;
    setRedigererNæring: React.Dispatch<React.SetStateAction<boolean>>;
    errors: any;
    setFieldValue: any;
}

const cleanValues = (formValues: InntektsinformasjonFormData, setFieldValue: any) => {
    if (formValues.egenNæringPågående === YesOrNo.YES) {
        setFieldValue(InntektsinformasjonFormField.egenNæringTom, '');
    }
    if (formValues.egenNæringBlittYrkesaktivDe3SisteÅrene === YesOrNo.NO) {
        setFieldValue(InntektsinformasjonFormField.egenNæringYrkesAktivDato, '');
    }
    if (formValues.egenNæringRegistrertINorge === YesOrNo.NO) {
        setFieldValue(InntektsinformasjonFormField.egenNæringOrgnr, '');
    }
    if (formValues.egenNæringRegistrertINorge === YesOrNo.YES) {
        setFieldValue(InntektsinformasjonFormField.egenNæringLand, '');
    }
};

const areAllEgenNæringQuestionsAnswered = (formValues: InntektsinformasjonFormData) => {
    return (
        hasValue(formValues.egenNæringType) &&
        hasValue(formValues.egenNæringNavn) &&
        hasValue(formValues.egenNæringRegistrertINorge) &&
        (formValues.egenNæringRegistrertINorge === YesOrNo.NO || hasValue(formValues.egenNæringOrgnr)) &&
        (formValues.egenNæringRegistrertINorge === YesOrNo.YES || hasValue(formValues.egenNæringLand)) &&
        hasValue(formValues.egenNæringFom) &&
        (formValues.egenNæringPågående === YesOrNo.YES || hasValue(formValues.egenNæringTom)) &&
        hasValue(formValues.egenNæringResultat) &&
        hasValue(formValues.egenNæringBlittYrkesaktivDe3SisteÅrene) &&
        (formValues.egenNæringBlittYrkesaktivDe3SisteÅrene === YesOrNo.NO ||
            hasValue(formValues.egenNæringYrkesAktivDato))
    );
};

const EgenNæringInput: FunctionComponent<Props> = ({
    visibility,
    formValues,
    setFieldValue,
    setNæring,
    setRedigererNæring,
    errors,
}) => {
    const intl = useIntl();
    const bem = bemUtils('egenNæringInput');
    const [submitClicked, setSubmitClicked] = useState(false);
    const [navnFeil, setNavnFeil] = useState<string | undefined>(undefined);
    const [orgNrFeil, setOrgNrFeil] = useState<string | undefined>(undefined);
    const [fomFeil, setFomFeil] = useState<string | undefined>(undefined);
    const [tomFeil, setTomFeil] = useState<string | undefined>(undefined);
    const [resultatFeil, setResultatFeil] = useState<string | undefined>(undefined);
    const [yrkesAktivDatoFeil, setYrkesAktivDatoFeil] = useState<string | undefined>(undefined);

    const navnPåNæringLabel = intlUtils(intl, 'inntektsinformasjon.egenNæring.navnPåNæring');

    const handleOnLeggTil = () => {
        setSubmitClicked(true);
        const formIsAnswered = areAllEgenNæringQuestionsAnswered(formValues);
        const formIsValid = !navnFeil && !orgNrFeil && !fomFeil && !tomFeil && !resultatFeil && !yrkesAktivDatoFeil;

        if (formIsAnswered && formIsValid) {
            const næringsInformasjon = mapEgenNæringFormValuesToState(formValues);
            cleanValues(formValues, setFieldValue);
            setNæring(næringsInformasjon);
            setRedigererNæring(false);
        }
    };

    const navnError = getIn(errors, InntektsinformasjonFormField.egenNæringNavn);
    const orgNrError = getIn(errors, InntektsinformasjonFormField.egenNæringOrgnr);
    const fomError = getIn(errors, InntektsinformasjonFormField.egenNæringFom);
    const tomError = getIn(errors, InntektsinformasjonFormField.egenNæringTom);
    const resultatError = getIn(errors, InntektsinformasjonFormField.egenNæringResultat);
    const yrkesaktivDatoError = getIn(errors, InntektsinformasjonFormField.egenNæringYrkesAktivDato);

    useEffect(() => {
        if (navnError !== undefined) {
            setNavnFeil(navnError);
        } else {
            setNavnFeil(undefined);
        }

        if (orgNrError !== undefined) {
            setOrgNrFeil(orgNrError);
        } else {
            setOrgNrFeil(undefined);
        }

        if (fomError !== undefined) {
            setFomFeil(fomError);
        } else {
            setFomFeil(undefined);
        }
        if (tomError !== undefined) {
            setTomFeil(tomError);
        } else {
            setTomFeil(undefined);
        }

        if (resultatError !== undefined) {
            setResultatFeil(resultatError);
        } else {
            setResultatFeil(undefined);
        }

        if (yrkesaktivDatoError !== undefined) {
            setYrkesAktivDatoFeil(yrkesaktivDatoError);
        } else {
            setYrkesAktivDatoFeil(undefined);
        }
    }, [navnError, orgNrError, fomError, tomError, resultatError, yrkesaktivDatoError]);

    return (
        <>
            <Block padBottom="l">
                <Heading level="3" size="small">
                    {intlUtils(intl, 'inntektsinformasjon.egenNæring.tittel')}
                </Heading>
            </Block>
            <div className={bem.block}>
                <Block padBottom="l" visible={visibility.isVisible(InntektsinformasjonFormField.egenNæringType)}>
                    <InntektsinformasjonFormComponents.RadioGroup
                        name={InntektsinformasjonFormField.egenNæringType}
                        legend={intlUtils(intl, 'inntektsinformasjon.egenNæring.næringstype')}
                        radios={[
                            {
                                label: intlUtils(intl, 'inntektsinformasjon.egenNæring.næringstype.dagmamma'),
                                value: Næringstype.DAGMAMMA,
                            },
                            {
                                label: intlUtils(intl, 'inntektsinformasjon.egenNæring.næringstype.fiske'),
                                value: Næringstype.FISKER,
                            },
                            {
                                label: intlUtils(intl, 'inntektsinformasjon.egenNæring.næringstype.jordbrukSkogbruk'),
                                value: Næringstype.JORDBRUK,
                            },
                            {
                                label: intlUtils(intl, 'inntektsinformasjon.egenNæring.næringstype.annen'),
                                value: Næringstype.ANNET,
                            },
                        ]}
                    />
                    {getInputFeltFeil(
                        submitClicked,
                        InntektsinformasjonFormField.egenNæringType,
                        formValues.egenNæringType,
                        intl
                    )}
                </Block>
                <Block padBottom="l" visible={visibility.isVisible(InntektsinformasjonFormField.egenNæringNavn)}>
                    <InntektsinformasjonFormComponents.TextField
                        name={InntektsinformasjonFormField.egenNæringNavn}
                        label={navnPåNæringLabel}
                        maxLength={100}
                        validate={(value) => validateTextInputField(value, navnPåNæringLabel, intl)}
                    />
                    {getInputFeltFeil(
                        submitClicked,
                        InntektsinformasjonFormField.egenNæringNavn,
                        formValues.egenNæringNavn,
                        intl,
                        navnFeil
                    )}
                </Block>
                <Block
                    padBottom="l"
                    visible={visibility.isVisible(InntektsinformasjonFormField.egenNæringRegistrertINorge)}
                >
                    <InntektsinformasjonFormComponents.YesOrNoQuestion
                        name={InntektsinformasjonFormField.egenNæringRegistrertINorge}
                        legend={intlUtils(intl, 'inntektsinformasjon.egenNæring.erNæringenRegistrertINorge', {
                            navnPåNæringen: formValues.egenNæringNavn,
                        })}
                    />
                    {getInputFeltFeil(
                        submitClicked,
                        InntektsinformasjonFormField.egenNæringRegistrertINorge,
                        formValues.egenNæringRegistrertINorge,
                        intl
                    )}
                </Block>
                <OrgnummerEllerLand
                    visibility={visibility}
                    orgNrFeil={orgNrFeil}
                    submitClicked={submitClicked}
                    formValues={formValues}
                />
                <Block padBottom="l" visible={visibility.isVisible(InntektsinformasjonFormField.egenNæringFom)}>
                    <InntektsinformasjonFormComponents.DatePicker
                        name={InntektsinformasjonFormField.egenNæringFom}
                        label={intlUtils(intl, 'inntektsinformasjon.egenNæring.startetNæring.fom', {
                            navnPåNæringen: formValues.egenNæringNavn,
                        })}
                        placeholder="dd.mm.åååå"
                        fullscreenOverlay={true}
                        showYearSelector={true}
                        validate={validateEgenNæringFom(intl, formValues.egenNæringTom!)}
                        maxDate={dayjs().toDate()}
                    />
                    {getInputFeltFeil(
                        submitClicked,
                        InntektsinformasjonFormField.egenNæringFom,
                        formValues.egenNæringFom,
                        intl,
                        fomFeil
                    )}
                </Block>
                <Block padBottom="l" visible={visibility.isVisible(InntektsinformasjonFormField.egenNæringPågående)}>
                    <InntektsinformasjonFormComponents.YesOrNoQuestion
                        name={InntektsinformasjonFormField.egenNæringPågående}
                        legend={intlUtils(intl, 'inntektsinformasjon.egenNæring.startetNæring.pågående', {
                            navnPåNæringen: formValues.egenNæringNavn,
                        })}
                    />
                    {getInputFeltFeil(
                        submitClicked,
                        InntektsinformasjonFormField.egenNæringPågående,
                        formValues.egenNæringPågående,
                        intl
                    )}
                </Block>
                <Block padBottom="l" visible={visibility.isVisible(InntektsinformasjonFormField.egenNæringTom)}>
                    <InntektsinformasjonFormComponents.DatePicker
                        name={InntektsinformasjonFormField.egenNæringTom}
                        label={intlUtils(intl, 'inntektsinformasjon.egenNæring.startetNæring.tom', {
                            navnPåNæringen: formValues.egenNæringNavn,
                        })}
                        placeholder="dd.mm.åååå"
                        fullscreenOverlay={true}
                        showYearSelector={true}
                        validate={validateEgenNæringTom(intl, formValues.egenNæringFom!)}
                        maxDate={dayjs().toDate()}
                        minDate={dayjs(formValues.egenNæringFom).toDate()}
                    />
                    {getInputFeltFeil(
                        submitClicked,
                        InntektsinformasjonFormField.egenNæringTom,
                        formValues.egenNæringTom,
                        intl,
                        tomFeil
                    )}
                </Block>
                <Block padBottom="l" visible={visibility.isVisible(InntektsinformasjonFormField.egenNæringResultat)}>
                    <InntektsinformasjonFormComponents.NumberInput
                        name={InntektsinformasjonFormField.egenNæringResultat}
                        label={intlUtils(intl, 'inntektsinformasjon.egenNæring.næringsinntekt')}
                        validate={validateNumber(intl, 'valideringsfeil.næringsinntekt.ugyldigFormat')}
                    />
                    {getInputFeltFeil(
                        submitClicked,
                        InntektsinformasjonFormField.egenNæringResultat,
                        formValues.egenNæringResultat,
                        intl,
                        resultatFeil
                    )}
                    <ReadMore header={intlUtils(intl, 'inntektsinformasjon.egenNæring.næringsinntekt.info.apneLabel')}>
                        <BodyShort>
                            <FormattedMessage id="inntektsinformasjon.egenNæring.næringsinntekt.info" />
                        </BodyShort>
                    </ReadMore>
                </Block>
                <Block
                    padBottom="l"
                    visible={visibility.isVisible(InntektsinformasjonFormField.egenNæringBlittYrkesaktivDe3SisteÅrene)}
                >
                    <InntektsinformasjonFormComponents.YesOrNoQuestion
                        name={InntektsinformasjonFormField.egenNæringBlittYrkesaktivDe3SisteÅrene}
                        legend={intlUtils(intl, 'inntektsinformasjon.egenNæring.blittYrkesaktivSiste3År')}
                    />
                    {getInputFeltFeil(
                        submitClicked,
                        InntektsinformasjonFormField.egenNæringBlittYrkesaktivDe3SisteÅrene,
                        formValues.egenNæringBlittYrkesaktivDe3SisteÅrene,
                        intl
                    )}
                    <ReadMore
                        header={intlUtils(
                            intl,
                            'inntektsinformasjon.egenNæring.blittYrkesaktivSiste3År.info.apneLabel'
                        )}
                    >
                        <BodyShort>
                            <FormattedMessage id="inntektsinformasjon.egenNæring.blittYrkesaktivSiste3År.info" />
                        </BodyShort>
                    </ReadMore>
                </Block>
                <Block
                    padBottom="l"
                    visible={visibility.isVisible(InntektsinformasjonFormField.egenNæringYrkesAktivDato)}
                >
                    <InntektsinformasjonFormComponents.DatePicker
                        name={InntektsinformasjonFormField.egenNæringYrkesAktivDato}
                        label={intlUtils(intl, 'inntektsinformasjon.egenNæring.yrkesaktivDato')}
                        placeholder="dd.mm.åååå"
                        fullscreenOverlay={true}
                        showYearSelector={true}
                        validate={validateEgenNæringYrkesAktivDatoDato(intl)}
                        maxDate={dayjs().toDate()}
                    />
                    {getInputFeltFeil(
                        submitClicked,
                        InntektsinformasjonFormField.egenNæringYrkesAktivDato,
                        formValues.egenNæringYrkesAktivDato,
                        intl,
                        yrkesAktivDatoFeil
                    )}
                </Block>
                <Block padBottom="l">
                    <Alert variant="info">{intlUtils(intl, 'inntektsinformasjon.egenNæring.veileder')}</Alert>
                </Block>
                <Button
                    type="button"
                    variant="primary"
                    onClick={(event) => {
                        event.preventDefault();
                        handleOnLeggTil();
                    }}
                >
                    <FormattedMessage id="leggTil" />
                </Button>
            </div>
        </>
    );
};

export default EgenNæringInput;
