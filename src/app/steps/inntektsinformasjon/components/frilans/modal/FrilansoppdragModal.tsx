import React, { FunctionComponent } from 'react';
import Modal from 'nav-frontend-modal';
import {
    FrilansoppdragModalFormComponents,
    FrilansoppdragModalFormData,
    FrilansoppdragModalFormField,
} from './frilansoppdragModalFormConfig';
import {
    cleanupFrilansoppdragForm,
    getInitialFrilansoppdragModalValues,
    mapFrilansoppdragModalValuesToState,
} from './frilansoppdragModalFormUtils';
import { bemUtils, Block, intlUtils } from '@navikt/fp-common';
import { useIntl } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';
import frilansoppdragModalQuestionsConfig from './frilansoppdragModalQuestionsConfig';
import { FormattedMessage } from 'react-intl';
import { FrilansOppdrag } from 'app/context/types/Frilans';
import {
    validateNavnPåOppdragsgiver,
    validateOppdragFom,
    validateOppdragTom,
    validatePågåendeOppdrag,
} from '../validation/frilansValidation';
import dayjs from 'dayjs';

import './frilansoppdragModal.less';

interface Props {
    isOpen: boolean;
    title: string;
    onRequestClose: () => void;
    selectedFrilansoppdrag?: FrilansOppdrag;
    addFrilansoppdrag: (oppdrag: FrilansOppdrag) => void;
    editFrilansoppdrag: (oppdrag: FrilansOppdrag) => void;
    oppstartsdato: string;
}

const FrilansoppdragModal: FunctionComponent<Props> = ({
    isOpen,
    title,
    onRequestClose,
    selectedFrilansoppdrag,
    addFrilansoppdrag,
    editFrilansoppdrag,
    oppstartsdato,
}) => {
    const bem = bemUtils('frilansoppdragModal');
    const intl = useIntl();

    const onValidSubmit = (values: Partial<FrilansoppdragModalFormData>) => {
        if (!selectedFrilansoppdrag) {
            addFrilansoppdrag(mapFrilansoppdragModalValuesToState(values));
        } else {
            editFrilansoppdrag(mapFrilansoppdragModalValuesToState(values));
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
            <FrilansoppdragModalFormComponents.FormikWrapper
                initialValues={getInitialFrilansoppdragModalValues(selectedFrilansoppdrag)}
                onSubmit={(values: Partial<FrilansoppdragModalFormData>) => onValidSubmit(values)}
                renderForm={({ values: formValues }) => {
                    const visibility = frilansoppdragModalQuestionsConfig.getVisbility(formValues);

                    return (
                        <FrilansoppdragModalFormComponents.Form
                            cleanup={(values) => cleanupFrilansoppdragForm(values, visibility)}
                        >
                            <Undertittel className={bem.element('tittel')}>
                                <FormattedMessage id="inntektsinformasjon.frilansOppdrag.tittel" />
                            </Undertittel>
                            <Block padBottom="l">
                                <FrilansoppdragModalFormComponents.Input
                                    name={FrilansoppdragModalFormField.navnOppdragsgiver}
                                    label={intlUtils(intl, 'inntektsinformasjon.frilansOppdrag.oppdragsgiver')}
                                    validate={validateNavnPåOppdragsgiver(intl)}
                                />
                            </Block>
                            <Block padBottom="l" visible={visibility.isVisible(FrilansoppdragModalFormField.fom)}>
                                <FrilansoppdragModalFormComponents.DatePicker
                                    name={FrilansoppdragModalFormField.fom}
                                    label={intlUtils(intl, 'fom')}
                                    placeholder={'dd.mm.åååå'}
                                    fullscreenOverlay={true}
                                    validate={validateOppdragFom(intl, formValues.tom, oppstartsdato)}
                                    minDate={dayjs(oppstartsdato).toDate()}
                                    maxDate={dayjs().toDate()}
                                />
                            </Block>
                            <Block padBottom="l" visible={visibility.isVisible(FrilansoppdragModalFormField.pågående)}>
                                <FrilansoppdragModalFormComponents.YesOrNoQuestion
                                    name={FrilansoppdragModalFormField.pågående}
                                    legend={intlUtils(intl, 'inntektsinformasjon.frilansOppdrag.pågående')}
                                    validate={validatePågåendeOppdrag(intl)}
                                />
                            </Block>
                            <Block padBottom="l" visible={visibility.isVisible(FrilansoppdragModalFormField.tom)}>
                                <FrilansoppdragModalFormComponents.DatePicker
                                    name={FrilansoppdragModalFormField.tom}
                                    label={intlUtils(intl, 'tom')}
                                    placeholder={'dd.mm.åååå'}
                                    fullscreenOverlay={true}
                                    validate={validateOppdragTom(
                                        intl,
                                        formValues.pågående,
                                        formValues.fom,
                                        oppstartsdato
                                    )}
                                    minDate={dayjs(formValues.fom).toDate()}
                                    maxDate={dayjs().toDate()}
                                    showYearSelector={true}
                                />
                            </Block>
                        </FrilansoppdragModalFormComponents.Form>
                    );
                }}
            />
        </Modal>
    );
};

export default FrilansoppdragModal;
