import { Block, bemUtils, date4WeeksAgo, intlUtils, validateTextInputField } from '@navikt/fp-common';
import { FormattedMessage, useIntl } from 'react-intl';
import './egen-næring-input.css';
import { FunctionComponent, useEffect, useState } from 'react';
import { Alert, BodyShort, Button, ReadMore } from '@navikt/ds-react';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { Næring, Næringstype } from 'app/types/Næring';
import {
    validateEgenNæringFom,
    validateEgenNæringTom,
    validateEgenNæringYrkesAktivDatoDato,
    validateNumber,
} from '../validation/egenNæringValidation';
import dayjs from 'dayjs';
import OrgnummerEllerLand from '../OrgnummerEllerLand';
import { FormikErrors, getIn } from 'formik';
import { getInputFeltFeil } from '../../input-feilmelding/InputFeilmelding';
import { mapEgenNæringFormValuesToState } from './egenNæringSubformUtils';
import { EgenNæringSubformComponents, EgenNæringSubformData, EgenNæringSubformField } from './egenNæringSubformConfig';
import { getMinInputTilOgMedValue } from 'app/utils/validationUtils';

interface Props {
    formValues: Partial<EgenNæringSubformData>;
    erFørsteInput: boolean;
    errors: FormikErrors<Partial<EgenNæringSubformData>>;
    selectedNæring: Næring | undefined;
    visibility: QuestionVisibility<EgenNæringSubformField>;
    allNæring: Næring[];
    validateForm: any;
    setSelectedNæring: React.Dispatch<React.SetStateAction<Næring | undefined>>;
    addNæring: (inntekt: Næring) => void;
    editNæring: (inntektSomEditeres: Næring, oppdatertInntekt: Næring) => void;
    setLeggTilNyNæring: React.Dispatch<React.SetStateAction<boolean>>;
}

const EgenNæringInput: FunctionComponent<Props> = ({
    formValues,
    errors,
    selectedNæring,
    erFørsteInput,
    visibility,
    allNæring,
    validateForm,
    setSelectedNæring,
    addNæring,
    editNæring,
    setLeggTilNyNæring,
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
    const submitButtonId = selectedNæring ? 'oppdater' : 'leggTil';
    const handleOnLeggTil = () => {
        setSubmitClicked(true);
        const formIsAnswered = visibility.areAllQuestionsAnswered();
        const formIsValid = !navnFeil && !orgNrFeil && !fomFeil && !tomFeil && !resultatFeil && !yrkesAktivDatoFeil;

        if (formIsAnswered && formIsValid) {
            if (selectedNæring) {
                const arbeidIUtlandet = mapEgenNæringFormValuesToState(formValues, selectedNæring.id);
                editNæring(selectedNæring, arbeidIUtlandet);
            } else {
                const arbeidIUtlandet = mapEgenNæringFormValuesToState(formValues, allNæring.length);
                addNæring(arbeidIUtlandet);
            }
            setSelectedNæring(undefined);
        }
    };

    const handleOnAvbryt = () => {
        setSelectedNæring(undefined);
        setLeggTilNyNæring(false);
    };

    const navnError = getIn(errors, EgenNæringSubformField.egenNæringNavn);
    const orgNrError = getIn(errors, EgenNæringSubformField.egenNæringOrgnr);
    const fomError = getIn(errors, EgenNæringSubformField.egenNæringFom);
    const tomError = getIn(errors, EgenNæringSubformField.egenNæringTom);
    const resultatError = getIn(errors, EgenNæringSubformField.egenNæringResultat);
    const yrkesaktivDatoError = getIn(errors, EgenNæringSubformField.egenNæringYrkesAktivDato);

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
            validateForm();
            setFomFeil(undefined);
        }
        if (tomError !== undefined) {
            setTomFeil(tomError);
        } else {
            validateForm();
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
            <div className={bem.block}>
                <Block padBottom="l" visible={visibility.isVisible(EgenNæringSubformField.egenNæringType)}>
                    <EgenNæringSubformComponents.RadioGroup
                        name={EgenNæringSubformField.egenNæringType}
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
                        EgenNæringSubformField.egenNæringType,
                        formValues.egenNæringType,
                        intl
                    )}
                </Block>
                <Block padBottom="l" visible={visibility.isVisible(EgenNæringSubformField.egenNæringNavn)}>
                    <EgenNæringSubformComponents.TextField
                        name={EgenNæringSubformField.egenNæringNavn}
                        label={navnPåNæringLabel}
                        maxLength={100}
                        validate={(value) => validateTextInputField(value, navnPåNæringLabel, intl)}
                    />
                    {getInputFeltFeil(
                        submitClicked,
                        EgenNæringSubformField.egenNæringNavn,
                        formValues.egenNæringNavn,
                        intl,
                        navnFeil
                    )}
                </Block>
                <Block padBottom="l" visible={visibility.isVisible(EgenNæringSubformField.egenNæringRegistrertINorge)}>
                    <EgenNæringSubformComponents.YesOrNoQuestion
                        name={EgenNæringSubformField.egenNæringRegistrertINorge}
                        legend={intlUtils(intl, 'inntektsinformasjon.egenNæring.erNæringenRegistrertINorge', {
                            navnPåNæringen: formValues.egenNæringNavn,
                        })}
                    />
                    {getInputFeltFeil(
                        submitClicked,
                        EgenNæringSubformField.egenNæringRegistrertINorge,
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
                <Block padBottom="l" visible={visibility.isVisible(EgenNæringSubformField.egenNæringFom)}>
                    <EgenNæringSubformComponents.DatePicker
                        name={EgenNæringSubformField.egenNæringFom}
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
                        EgenNæringSubformField.egenNæringFom,
                        formValues.egenNæringFom,
                        intl,
                        fomFeil
                    )}
                </Block>
                <Block padBottom="l" visible={visibility.isVisible(EgenNæringSubformField.egenNæringPågående)}>
                    <EgenNæringSubformComponents.YesOrNoQuestion
                        name={EgenNæringSubformField.egenNæringPågående}
                        legend={intlUtils(intl, 'inntektsinformasjon.egenNæring.startetNæring.pågående', {
                            navnPåNæringen: formValues.egenNæringNavn,
                        })}
                    />
                    {getInputFeltFeil(
                        submitClicked,
                        EgenNæringSubformField.egenNæringPågående,
                        formValues.egenNæringPågående,
                        intl
                    )}
                </Block>
                <Block padBottom="l" visible={visibility.isVisible(EgenNæringSubformField.egenNæringTom)}>
                    <EgenNæringSubformComponents.DatePicker
                        name={EgenNæringSubformField.egenNæringTom}
                        label={intlUtils(intl, 'inntektsinformasjon.egenNæring.startetNæring.tom', {
                            navnPåNæringen: formValues.egenNæringNavn,
                        })}
                        placeholder="dd.mm.åååå"
                        fullscreenOverlay={true}
                        showYearSelector={true}
                        validate={validateEgenNæringTom(intl, formValues.egenNæringFom!)}
                        maxDate={dayjs().toDate()}
                        minDate={getMinInputTilOgMedValue(formValues.egenNæringFom, date4WeeksAgo)}
                    />
                    {getInputFeltFeil(
                        submitClicked,
                        EgenNæringSubformField.egenNæringTom,
                        formValues.egenNæringTom,
                        intl,
                        tomFeil
                    )}
                </Block>
                <Block padBottom="l" visible={visibility.isVisible(EgenNæringSubformField.egenNæringResultat)}>
                    <EgenNæringSubformComponents.NumberInput
                        name={EgenNæringSubformField.egenNæringResultat}
                        label={intlUtils(intl, 'inntektsinformasjon.egenNæring.næringsinntekt')}
                        validate={validateNumber(intl, 'valideringsfeil.næringsinntekt.ugyldigFormat')}
                    />
                    {getInputFeltFeil(
                        submitClicked,
                        EgenNæringSubformField.egenNæringResultat,
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
                    visible={visibility.isVisible(EgenNæringSubformField.egenNæringBlittYrkesaktivDe3SisteÅrene)}
                >
                    <EgenNæringSubformComponents.YesOrNoQuestion
                        name={EgenNæringSubformField.egenNæringBlittYrkesaktivDe3SisteÅrene}
                        legend={intlUtils(intl, 'inntektsinformasjon.egenNæring.blittYrkesaktivSiste3År')}
                    />
                    {getInputFeltFeil(
                        submitClicked,
                        EgenNæringSubformField.egenNæringBlittYrkesaktivDe3SisteÅrene,
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
                <Block padBottom="l" visible={visibility.isVisible(EgenNæringSubformField.egenNæringYrkesAktivDato)}>
                    <EgenNæringSubformComponents.DatePicker
                        name={EgenNæringSubformField.egenNæringYrkesAktivDato}
                        label={intlUtils(intl, 'inntektsinformasjon.egenNæring.yrkesaktivDato')}
                        placeholder="dd.mm.åååå"
                        fullscreenOverlay={true}
                        showYearSelector={true}
                        validate={validateEgenNæringYrkesAktivDatoDato(intl)}
                        maxDate={dayjs().toDate()}
                    />
                    {getInputFeltFeil(
                        submitClicked,
                        EgenNæringSubformField.egenNæringYrkesAktivDato,
                        formValues.egenNæringYrkesAktivDato,
                        intl,
                        yrkesAktivDatoFeil
                    )}
                </Block>
                <Block padBottom="l">
                    <Alert variant="info">{intlUtils(intl, 'inntektsinformasjon.egenNæring.veileder')}</Alert>
                </Block>
                <Button type="button" variant="primary" onClick={handleOnLeggTil}>
                    <FormattedMessage id={submitButtonId} />
                </Button>
                {!erFørsteInput && (
                    <Button
                        className={bem.element('avbryt')}
                        type="button"
                        variant="secondary"
                        onClick={handleOnAvbryt}
                    >
                        <FormattedMessage id="avbryt" />
                    </Button>
                )}
            </div>
        </>
    );
};

export default EgenNæringInput;
