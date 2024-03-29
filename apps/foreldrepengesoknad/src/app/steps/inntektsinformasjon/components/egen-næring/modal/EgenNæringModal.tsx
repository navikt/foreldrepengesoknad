import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Button, Heading, Modal, ReadMore } from '@navikt/ds-react';

import { Block, intlUtils } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/fp-formik';

import { Næring, Næringstype } from 'app/context/types/Næring';
import { validateRequiredTextInputField } from 'app/utils/validationUtil';

import OrgnummerEllerLand from './components/OrgnummerEllerLand';
import {
    EgenNæringModalFormComponents,
    EgenNæringModalFormData,
    EgenNæringModalFormField,
} from './egenNæringModalFormConfig';
import {
    cleanupEgenNæringForm,
    getInitialEgenNæringModalValues,
    mapEgenNæringModalFormValuesToState,
} from './egenNæringModalFormUtils';
import egenNæringModalQuestionsConfig from './egenNæringModalQuestionsConfig';
import {
    validateEgenNæringEndringAvInntektsDato,
    validateEgenNæringFom,
    validateEgenNæringForklaringTilEndring,
    validateEgenNæringTom,
    validateEgenNæringYrkesAktivDatoDato,
    validateNumber,
} from './validation/egenNæringValidation';

interface Props {
    isOpen: boolean;
    title: string;
    onRequestClose: () => void;
    selectedNæring?: Næring;
    addNæring: (næring: Næring) => void;
    editNæring: (næring: Næring) => void;
}

const EgenNæringModal: FunctionComponent<Props> = ({
    isOpen,
    title,
    onRequestClose,
    selectedNæring,
    addNæring,
    editNæring,
}) => {
    const intl = useIntl();

    const onValidSubmit = (values: Partial<EgenNæringModalFormData>) => {
        if (!selectedNæring) {
            addNæring(mapEgenNæringModalFormValuesToState(values));
        } else {
            editNæring(mapEgenNæringModalFormValuesToState(values));
        }
        onRequestClose();
    };

    const navnPåNæringLabel = intlUtils(intl, 'inntektsinformasjon.egenNæringModal.navnPåNæring');
    const varigEndringForklaringLabel = intlUtils(
        intl,
        'inntektsinformasjon.egenNæringModal.varigEndringAvNæringsinntektForklaring',
    );

    return (
        <Modal portal width="medium" open={isOpen} aria-label={title} onClose={onRequestClose}>
            <Modal.Header>
                <Heading size="small">
                    <FormattedMessage id="inntektsinformasjon.egenNæringModal.tittel" />
                </Heading>
            </Modal.Header>
            <Modal.Body>
                <EgenNæringModalFormComponents.FormikWrapper
                    initialValues={getInitialEgenNæringModalValues(selectedNæring)}
                    onSubmit={(values: Partial<EgenNæringModalFormData>) => onValidSubmit(values)}
                    renderForm={({ values: formValues }) => {
                        const visibility = egenNæringModalQuestionsConfig.getVisbility(
                            formValues as EgenNæringModalFormData,
                        );

                        return (
                            <EgenNæringModalFormComponents.Form
                                includeButtons={false}
                                cleanup={(values) => cleanupEgenNæringForm(values, visibility)}
                                includeValidationSummary={true}
                            >
                                <Block padBottom="l" visible={visibility.isVisible(EgenNæringModalFormField.type)}>
                                    <EgenNæringModalFormComponents.RadioGroup
                                        name={EgenNæringModalFormField.type}
                                        legend={intlUtils(intl, 'inntektsinformasjon.egenNæringModal.næringstype')}
                                        radios={[
                                            {
                                                label: intlUtils(
                                                    intl,
                                                    'inntektsinformasjon.egenNæringModal.næringstype.dagmamma',
                                                ),
                                                value: Næringstype.DAGMAMMA,
                                            },
                                            {
                                                label: intlUtils(
                                                    intl,
                                                    'inntektsinformasjon.egenNæringModal.næringstype.fiske',
                                                ),
                                                value: Næringstype.FISKER,
                                            },
                                            {
                                                label: intlUtils(
                                                    intl,
                                                    'inntektsinformasjon.egenNæringModal.næringstype.jordbrukSkogbruk',
                                                ),
                                                value: Næringstype.JORDBRUK,
                                            },
                                            {
                                                label: intlUtils(
                                                    intl,
                                                    'inntektsinformasjon.egenNæringModal.næringstype.annen',
                                                ),
                                                value: Næringstype.ANNET,
                                            },
                                        ]}
                                    />
                                </Block>
                                <Block
                                    padBottom="l"
                                    visible={visibility.isVisible(EgenNæringModalFormField.navnPåNæringen)}
                                >
                                    <EgenNæringModalFormComponents.TextField
                                        name={EgenNæringModalFormField.navnPåNæringen}
                                        label={navnPåNæringLabel}
                                        maxLength={100}
                                        validate={validateRequiredTextInputField(navnPåNæringLabel, intl)}
                                    />
                                </Block>
                                <Block
                                    padBottom="l"
                                    visible={visibility.isVisible(EgenNæringModalFormField.registrertINorge)}
                                >
                                    <EgenNæringModalFormComponents.YesOrNoQuestion
                                        name={EgenNæringModalFormField.registrertINorge}
                                        legend={intlUtils(
                                            intl,
                                            'inntektsinformasjon.egenNæringModal.erNæringenRegistrertINorge',
                                            {
                                                navnPåNæringen: formValues.navnPåNæringen,
                                            },
                                        )}
                                        validate={(value: YesOrNo) => {
                                            if (value === YesOrNo.UNANSWERED) {
                                                return intlUtils(
                                                    intl,
                                                    'valideringsfeil.inntektsinformasjon.egenNæring.registrertINorge',
                                                );
                                            }

                                            return undefined;
                                        }}
                                    />
                                </Block>
                                <OrgnummerEllerLand visibility={visibility} />
                                <Block padBottom="l" visible={visibility.isVisible(EgenNæringModalFormField.fom)}>
                                    <EgenNæringModalFormComponents.DatePicker
                                        name={EgenNæringModalFormField.fom}
                                        label={intlUtils(
                                            intl,
                                            'inntektsinformasjon.egenNæringModal.startetNæring.fom',
                                            {
                                                navnPåNæringen: formValues.navnPåNæringen,
                                            },
                                        )}
                                        validate={validateEgenNæringFom(intl, formValues.tom!)}
                                        maxDate={dayjs().toDate()}
                                    />
                                </Block>
                                <Block padBottom="l" visible={visibility.isVisible(EgenNæringModalFormField.pågående)}>
                                    <EgenNæringModalFormComponents.YesOrNoQuestion
                                        name={EgenNæringModalFormField.pågående}
                                        legend={intlUtils(
                                            intl,
                                            'inntektsinformasjon.egenNæringModal.startetNæring.pågående',
                                            {
                                                navnPåNæringen: formValues.navnPåNæringen,
                                            },
                                        )}
                                    />
                                </Block>
                                <Block padBottom="l" visible={visibility.isVisible(EgenNæringModalFormField.tom)}>
                                    <EgenNæringModalFormComponents.DatePicker
                                        name={EgenNæringModalFormField.tom}
                                        label={intlUtils(
                                            intl,
                                            'inntektsinformasjon.egenNæringModal.startetNæring.tom',
                                            {
                                                navnPåNæringen: formValues.navnPåNæringen,
                                            },
                                        )}
                                        validate={validateEgenNæringTom(intl, formValues.fom!)}
                                        maxDate={dayjs().toDate()}
                                        minDate={dayjs(formValues.fom).toDate()}
                                    />
                                </Block>
                                <Block
                                    padBottom="l"
                                    visible={visibility.isVisible(EgenNæringModalFormField.næringsresultat)}
                                >
                                    <EgenNæringModalFormComponents.NumberInput
                                        name={EgenNæringModalFormField.næringsresultat}
                                        label={intlUtils(intl, 'inntektsinformasjon.egenNæringModal.næringsinntekt')}
                                        validate={validateNumber(
                                            intl,
                                            'valideringsfeil.inntektsinformasjon.næringsinntekt.ugyldigFormat',
                                        )}
                                    />
                                    <ReadMore
                                        header={intlUtils(
                                            intl,
                                            'inntektsinformasjon.egenNæringModal.næringsinntekt.info.apneLabel',
                                        )}
                                    >
                                        <BodyShort>
                                            <FormattedMessage id="inntektsinformasjon.egenNæringModal.næringsinntekt.info" />
                                        </BodyShort>
                                    </ReadMore>
                                </Block>
                                <Block
                                    padBottom="l"
                                    visible={visibility.isVisible(
                                        EgenNæringModalFormField.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,
                                    )}
                                >
                                    <EgenNæringModalFormComponents.YesOrNoQuestion
                                        name={
                                            EgenNæringModalFormField.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene
                                        }
                                        legend={intlUtils(
                                            intl,
                                            'inntektsinformasjon.egenNæringModal.blittYrkesaktivSiste3År',
                                        )}
                                    />
                                    <ReadMore
                                        header={intlUtils(
                                            intl,
                                            'inntektsinformasjon.egenNæringModal.blittYrkesaktivSiste3År.info.apneLabel',
                                        )}
                                    >
                                        <BodyShort>
                                            <FormattedMessage id="inntektsinformasjon.egenNæringModal.blittYrkesaktivSiste3År.info" />
                                        </BodyShort>
                                    </ReadMore>
                                </Block>
                                <Block
                                    padBottom="l"
                                    visible={visibility.isVisible(EgenNæringModalFormField.yrkesAktivDato)}
                                >
                                    <EgenNæringModalFormComponents.DatePicker
                                        name={EgenNæringModalFormField.yrkesAktivDato}
                                        label={intlUtils(intl, 'inntektsinformasjon.egenNæringModal.yrkesaktivDato')}
                                        validate={validateEgenNæringYrkesAktivDatoDato(intl)}
                                        maxDate={dayjs().toDate()}
                                    />
                                </Block>
                                <Block
                                    padBottom="l"
                                    visible={visibility.isVisible(
                                        EgenNæringModalFormField.hattVarigEndringAvNæringsinntektSiste4Kalenderår,
                                    )}
                                >
                                    <EgenNæringModalFormComponents.YesOrNoQuestion
                                        name={EgenNæringModalFormField.hattVarigEndringAvNæringsinntektSiste4Kalenderår}
                                        legend={intlUtils(
                                            intl,
                                            'inntektsinformasjon.egenNæringModal.varigEndringAvNæringsinntekt',
                                        )}
                                    />
                                    <ReadMore
                                        header={intlUtils(
                                            intl,
                                            'inntektsinformasjon.egenNæringModal.varigEndringAvNæringsinntekt.readmoreTittel',
                                        )}
                                    >
                                        <BodyShort>
                                            <FormattedMessage id="inntektsinformasjon.egenNæringModal.varigEndringAvNæringsinntekt.readmoreTekst" />
                                        </BodyShort>
                                    </ReadMore>
                                </Block>
                                <Block
                                    padBottom="l"
                                    visible={visibility.isVisible(EgenNæringModalFormField.datoForEndring)}
                                >
                                    <EgenNæringModalFormComponents.DatePicker
                                        name={EgenNæringModalFormField.datoForEndring}
                                        label={intlUtils(
                                            intl,
                                            'inntektsinformasjon.egenNæringModal.varigEndringAvNæringsinntektDato',
                                        )}
                                        validate={validateEgenNæringEndringAvInntektsDato(intl)}
                                        maxDate={dayjs().toDate()}
                                    />
                                </Block>
                                <Block
                                    padBottom="l"
                                    visible={visibility.isVisible(EgenNæringModalFormField.inntektEtterEndring)}
                                >
                                    <EgenNæringModalFormComponents.NumberInput
                                        name={EgenNæringModalFormField.inntektEtterEndring}
                                        label={intlUtils(
                                            intl,
                                            'inntektsinformasjon.egenNæringModal.inntektEtterEndring',
                                        )}
                                        validate={validateNumber(
                                            intl,
                                            'valideringsfeil.inntektsinformasjon.varigEndringAvInntekt.ugyldigFormat',
                                        )}
                                    />
                                </Block>
                                <Block
                                    padBottom="l"
                                    visible={visibility.isVisible(EgenNæringModalFormField.forklaringEndring)}
                                >
                                    <EgenNæringModalFormComponents.Textarea
                                        name={EgenNæringModalFormField.forklaringEndring}
                                        label={varigEndringForklaringLabel}
                                        maxLength={1000}
                                        validate={validateEgenNæringForklaringTilEndring(
                                            intl,
                                            varigEndringForklaringLabel,
                                        )}
                                    />
                                </Block>
                                <Block visible={visibility.areAllQuestionsAnswered()} textAlignCenter={true}>
                                    <Button>{intlUtils(intl, 'søknad.gåVidere')}</Button>
                                </Block>
                            </EgenNæringModalFormComponents.Form>
                        );
                    }}
                />
            </Modal.Body>
        </Modal>
    );
};

export default EgenNæringModal;
