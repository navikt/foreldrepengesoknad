import React, { FunctionComponent } from 'react';
import Modal from 'nav-frontend-modal';
import { bemUtils, Block, intlUtils } from '@navikt/fp-common';
import { Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    EgenNæringModalFormComponents,
    EgenNæringModalFormData,
    EgenNæringModalFormField,
} from './egenNæringModalFormConfig';
import { getInitialEgenNæringModalValues } from './egenNæringModalFormUtils';
import { Næring, Næringstype } from 'app/context/types/Næring';
import egenNæringModalQuestionsConfig from './egenNæringModalQuestionsConfig';

import './egenNæringModal.less';
import OrgnummerEllerLand from './components/OrgnummerEllerLand';

interface Props {
    isOpen: boolean;
    title: string;
    onRequestClose: () => void;
    selectedEgenNæring?: Næring;
    // addFrilansoppdrag: (oppdrag: Næring) => void;
    // editFrilansoppdrag: (oppdrag: Næring) => void;
}

const EgenNæringModal: FunctionComponent<Props> = ({ isOpen, title, onRequestClose, selectedEgenNæring }) => {
    const intl = useIntl();
    const bem = bemUtils('egenNæringModal');

    const onValidSubmit = (values: Partial<EgenNæringModalFormData>) => {};

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
                initialValues={getInitialEgenNæringModalValues(selectedEgenNæring)}
                onSubmit={(values: Partial<EgenNæringModalFormData>) => onValidSubmit(values)}
                renderForm={({ values: formValues }) => {
                    const visibility = egenNæringModalQuestionsConfig.getVisbility(formValues);

                    return (
                        <EgenNæringModalFormComponents.Form includeButtons={false}>
                            <Block padBottom="l">
                                <Undertittel className={bem.element('tittel')}>
                                    <FormattedMessage id="inntektsinformasjon.egenNæringModal.tittel" />
                                </Undertittel>
                            </Block>
                            <Block padBottom="l" visible={visibility.isVisible(EgenNæringModalFormField.type)}>
                                <EgenNæringModalFormComponents.RadioPanelGroup
                                    name={EgenNæringModalFormField.type}
                                    legend={intlUtils(intl, 'inntektsinformasjon.egenNæringModal.næringstype')}
                                    radios={[
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
                                />
                            </Block>
                        </EgenNæringModalFormComponents.Form>
                    );
                }}
            />
        </Modal>
    );
};

export default EgenNæringModal;
