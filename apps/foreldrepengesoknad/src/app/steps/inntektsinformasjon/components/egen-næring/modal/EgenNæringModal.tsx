import React, { FunctionComponent } from 'react';
import { bemUtils, Block, intlUtils, UtvidetInformasjon } from '@navikt/fp-common';
import { FormattedMessage, useIntl } from 'react-intl';
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
import { Næring, Næringstype } from 'app/context/types/Næring';
import egenNæringModalQuestionsConfig from './egenNæringModalQuestionsConfig';
import OrgnummerEllerLand from './components/OrgnummerEllerLand';
import Regnskapsfører from './components/Regnskapsfører';
import {
    validateEgenNæringFom,
    validateEgenNæringTom,
    validateEgenNæringForklaringTilEndring,
    validateEgenNæringEndringAvInntektsDato,
    validateEgenNæringYrkesAktivDatoDato,
    validateNumber,
} from './validation/egenNæringValidation';
import dayjs from 'dayjs';
import { validateRequiredTextInputField } from 'app/utils/validationUtil';
import { BodyShort, Button, Heading, Modal } from '@navikt/ds-react';

import './egenNæringModal.less';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';

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
    const bem = bemUtils('egenNæringModal');

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
        'inntektsinformasjon.egenNæringModal.varigEndringAvNæringsinntektForklaring'
    );

    return (
        <Modal
            open={isOpen}
            aria-label={title}
            onClose={onRequestClose}
            closeButton={true}
            shouldCloseOnOverlayClick={false}
            className={bem.block}
        >
            <EgenNæringModalFormComponents.FormikWrapper
                initialValues={getInitialEgenNæringModalValues(selectedNæring)}
                onSubmit={(values: Partial<EgenNæringModalFormData>) => onValidSubmit(values)}
                renderForm={({ values: formValues }) => {
                    const visibility = egenNæringModalQuestionsConfig.getVisbility(
                        formValues as EgenNæringModalFormData
                    );

                    return (
                        <EgenNæringModalFormComponents.Form
                            includeButtons={false}
                            cleanup={(values) => cleanupEgenNæringForm(values, visibility)}
                            includeValidationSummary={true}
                        >
                            <Block padBottom="l">
                                <Heading size="small" className={bem.element('tittel')}>
                                    <FormattedMessage id="inntektsinformasjon.egenNæringModal.tittel" />
                                </Heading>
                            </Block>
                            <Block padBottom="l" visible={visibility.isVisible(EgenNæringModalFormField.typer)}>
                                <EgenNæringModalFormComponents.CheckboxGroup
                                    name={EgenNæringModalFormField.typer}
                                    legend={intlUtils(intl, 'inntektsinformasjon.egenNæringModal.næringstype')}
                                    checkboxes={[
                                        {
                                            label: intlUtils(
                                                intl,
                                                'inntektsinformasjon.egenNæringModal.næringstype.dagmamma'
                                            ),
                                            value: Næringstype.DAGMAMMA,
                                        },
                                        {
                                            label: intlUtils(
                                                intl,
                                                'inntektsinformasjon.egenNæringModal.næringstype.fiske'
                                            ),
                                            value: Næringstype.FISKER,
                                        },
                                        {
                                            label: intlUtils(
                                                intl,
                                                'inntektsinformasjon.egenNæringModal.næringstype.jordbrukSkogbruk'
                                            ),
                                            value: Næringstype.JORDBRUK,
                                        },
                                        {
                                            label: intlUtils(
                                                intl,
                                                'inntektsinformasjon.egenNæringModal.næringstype.annen'
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
                                        }
                                    )}
                                    validate={(value: YesOrNo) => {
                                        if (value === YesOrNo.UNANSWERED) {
                                            return intlUtils(
                                                intl,
                                                'valideringsfeil.inntektsinformasjon.egenNæring.registrertINorge'
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
                                    label={intlUtils(intl, 'inntektsinformasjon.egenNæringModal.startetNæring.fom', {
                                        navnPåNæringen: formValues.navnPåNæringen,
                                    })}
                                    placeholder="dd.mm.åååå"
                                    fullscreenOverlay={true}
                                    showYearSelector={true}
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
                                        }
                                    )}
                                />
                            </Block>
                            <Block padBottom="l" visible={visibility.isVisible(EgenNæringModalFormField.tom)}>
                                <EgenNæringModalFormComponents.DatePicker
                                    name={EgenNæringModalFormField.tom}
                                    label={intlUtils(intl, 'inntektsinformasjon.egenNæringModal.startetNæring.tom', {
                                        navnPåNæringen: formValues.navnPåNæringen,
                                    })}
                                    placeholder="dd.mm.åååå"
                                    fullscreenOverlay={true}
                                    showYearSelector={true}
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
                                    description={
                                        <UtvidetInformasjon
                                            apneLabel={intlUtils(
                                                intl,
                                                'inntektsinformasjon.egenNæringModal.næringsinntekt.info.apneLabel'
                                            )}
                                        >
                                            <BodyShort>
                                                <FormattedMessage id="inntektsinformasjon.egenNæringModal.næringsinntekt.info" />
                                            </BodyShort>
                                        </UtvidetInformasjon>
                                    }
                                    validate={validateNumber(
                                        intl,
                                        'valideringsfeil.inntektsinformasjon.næringsinntekt.ugyldigFormat'
                                    )}
                                />
                            </Block>
                            <Block
                                padBottom="l"
                                visible={visibility.isVisible(
                                    EgenNæringModalFormField.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene
                                )}
                            >
                                <EgenNæringModalFormComponents.YesOrNoQuestion
                                    name={
                                        EgenNæringModalFormField.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene
                                    }
                                    legend={intlUtils(
                                        intl,
                                        'inntektsinformasjon.egenNæringModal.blittYrkesaktivSiste3År'
                                    )}
                                    description={
                                        <UtvidetInformasjon
                                            apneLabel={intlUtils(
                                                intl,
                                                'inntektsinformasjon.egenNæringModal.blittYrkesaktivSiste3År.info.apneLabel'
                                            )}
                                        >
                                            <BodyShort>
                                                <FormattedMessage id="inntektsinformasjon.egenNæringModal.blittYrkesaktivSiste3År.info" />
                                            </BodyShort>
                                        </UtvidetInformasjon>
                                    }
                                />
                            </Block>
                            <Block
                                padBottom="l"
                                visible={visibility.isVisible(EgenNæringModalFormField.yrkesAktivDato)}
                            >
                                <EgenNæringModalFormComponents.DatePicker
                                    name={EgenNæringModalFormField.yrkesAktivDato}
                                    label={intlUtils(intl, 'inntektsinformasjon.egenNæringModal.yrkesaktivDato')}
                                    placeholder="dd.mm.åååå"
                                    fullscreenOverlay={true}
                                    showYearSelector={true}
                                    validate={validateEgenNæringYrkesAktivDatoDato(intl)}
                                    maxDate={dayjs().toDate()}
                                />
                            </Block>
                            <Block
                                padBottom="l"
                                visible={visibility.isVisible(
                                    EgenNæringModalFormField.hattVarigEndringAvNæringsinntektSiste4Kalenderår
                                )}
                            >
                                <EgenNæringModalFormComponents.YesOrNoQuestion
                                    name={EgenNæringModalFormField.hattVarigEndringAvNæringsinntektSiste4Kalenderår}
                                    legend={intlUtils(
                                        intl,
                                        'inntektsinformasjon.egenNæringModal.varigEndringAvNæringsinntekt'
                                    )}
                                />
                            </Block>
                            <Block
                                padBottom="l"
                                visible={visibility.isVisible(EgenNæringModalFormField.datoForEndring)}
                            >
                                <EgenNæringModalFormComponents.DatePicker
                                    name={EgenNæringModalFormField.datoForEndring}
                                    label={intlUtils(
                                        intl,
                                        'inntektsinformasjon.egenNæringModal.varigEndringAvNæringsinntektDato'
                                    )}
                                    placeholder="dd.mm.åååå"
                                    fullscreenOverlay={true}
                                    showYearSelector={true}
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
                                    label={intlUtils(intl, 'inntektsinformasjon.egenNæringModal.inntektEtterEndring')}
                                    validate={validateNumber(
                                        intl,
                                        'valideringsfeil.inntektsinformasjon.varigEndringAvInntekt.ugyldigFormat'
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
                                    validate={validateEgenNæringForklaringTilEndring(intl, varigEndringForklaringLabel)}
                                />
                            </Block>
                            <Regnskapsfører visibility={visibility} />
                            <Block visible={visibility.areAllQuestionsAnswered()} textAlignCenter={true}>
                                <Button>{intlUtils(intl, 'søknad.gåVidere')}</Button>
                            </Block>
                        </EgenNæringModalFormComponents.Form>
                    );
                }}
            />
        </Modal>
    );
};

export default EgenNæringModal;
