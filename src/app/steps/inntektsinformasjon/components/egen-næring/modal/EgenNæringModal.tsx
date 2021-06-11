import React, { FunctionComponent } from 'react';
import Modal from 'nav-frontend-modal';
import { bemUtils, Block, intlUtils, UtvidetInformasjon } from '@navikt/fp-common';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
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
import { Hovedknapp } from 'nav-frontend-knapper';

import './egenNæringModal.less';
import {
    validateEgenNæringFom,
    validateEgenNæringTom,
    validateEgenNæringForklaringTilEndring,
    validateEgenNæringEndringAvInntektsDato,
    validateEgenNæringYrkesAktivDatoDato,
    validateNumber,
} from './validation/egenNæringValidation';
import dayjs from 'dayjs';

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

    return (
        <Modal
            isOpen={isOpen}
            contentLabel={title}
            onRequestClose={onRequestClose}
            closeButton={true}
            shouldCloseOnOverlayClick={false}
            className={bem.block}
        >
            <EgenNæringModalFormComponents.FormikWrapper
                initialValues={getInitialEgenNæringModalValues(selectedNæring)}
                onSubmit={(values: Partial<EgenNæringModalFormData>) => onValidSubmit(values)}
                renderForm={({ values: formValues }) => {
                    const visibility = egenNæringModalQuestionsConfig.getVisbility(formValues);

                    return (
                        <EgenNæringModalFormComponents.Form
                            includeButtons={false}
                            cleanup={(values) => cleanupEgenNæringForm(values, visibility)}
                            includeValidationSummary={true}
                        >
                            <Block padBottom="l">
                                <Undertittel className={bem.element('tittel')}>
                                    <FormattedMessage id="inntektsinformasjon.egenNæringModal.tittel" />
                                </Undertittel>
                            </Block>
                            <Block padBottom="l" visible={visibility.isVisible(EgenNæringModalFormField.typer)}>
                                <EgenNæringModalFormComponents.CheckboxPanelGroup
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
                                <EgenNæringModalFormComponents.Input
                                    name={EgenNæringModalFormField.navnPåNæringen}
                                    label={intlUtils(intl, 'inntektsinformasjon.egenNæringModal.navnPåNæring')}
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
                                    validate={validateEgenNæringFom(intl, formValues.tom)}
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
                                    validate={validateEgenNæringTom(intl, formValues.fom)}
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
                                            <Normaltekst>
                                                <FormattedMessage id="inntektsinformasjon.egenNæringModal.næringsinntekt.info" />
                                            </Normaltekst>
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
                                            <Normaltekst>
                                                <FormattedMessage id="inntektsinformasjon.egenNæringModal.blittYrkesaktivSiste3År.info" />
                                            </Normaltekst>
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
                                    label={intlUtils(
                                        intl,
                                        'inntektsinformasjon.egenNæringModal.varigEndringAvNæringsinntektForklaring'
                                    )}
                                    maxLength={1000}
                                    validate={validateEgenNæringForklaringTilEndring(intl)}
                                />
                            </Block>
                            <Regnskapsfører visibility={visibility} />
                            <Block visible={visibility.areAllQuestionsAnswered()} textAlignCenter={true}>
                                <Hovedknapp>{intlUtils(intl, 'søknad.gåVidere')}</Hovedknapp>
                            </Block>
                        </EgenNæringModalFormComponents.Form>
                    );
                }}
            />
        </Modal>
    );
};

export default EgenNæringModal;
