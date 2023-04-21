import React, { FunctionComponent } from 'react';
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
import { useIntl, FormattedMessage } from 'react-intl';
import frilansoppdragModalQuestionsConfig from './frilansoppdragModalQuestionsConfig';
import { FrilansOppdrag } from 'app/context/types/Frilans';
import {
    validateNavnPåOppdragsgiver,
    validateOppdragFom,
    validateOppdragTom,
    validatePågåendeOppdrag,
} from '../validation/frilansValidation';
import dayjs from 'dayjs';

import './frilansoppdragModal.less';
import { Heading, Modal } from '@navikt/ds-react';

interface Props {
    isOpen: boolean;
    title: string;
    onRequestClose: () => void;
    selectedFrilansoppdrag?: FrilansOppdrag;
    addFrilansoppdrag: (oppdrag: FrilansOppdrag) => void;
    editFrilansoppdrag: (oppdrag: FrilansOppdrag) => void;
    oppstartsdato: string;
}

const startetSomFrilansIForrigeKalenderårEllerTidligere = (oppstartsdato: string) => {
    return dayjs(oppstartsdato).year() < dayjs().year();
};

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

    const oppdragsgiverNavnLabel = intlUtils(intl, 'inntektsinformasjon.frilansOppdrag.oppdragsgiver');

    return (
        <Modal
            open={isOpen}
            aria-label={title}
            onClose={onRequestClose}
            closeButton={true}
            shouldCloseOnOverlayClick={false}
            className={bem.block}
        >
            <FrilansoppdragModalFormComponents.FormikWrapper
                initialValues={getInitialFrilansoppdragModalValues(selectedFrilansoppdrag)}
                onSubmit={(values: Partial<FrilansoppdragModalFormData>) => onValidSubmit(values)}
                renderForm={({ values: formValues }) => {
                    const visibility = frilansoppdragModalQuestionsConfig.getVisbility(
                        formValues as FrilansoppdragModalFormData
                    );

                    return (
                        <FrilansoppdragModalFormComponents.Form
                            cleanup={(values) => cleanupFrilansoppdragForm(values, visibility)}
                        >
                            <Heading size="small" className={bem.element('tittel')}>
                                <FormattedMessage id="inntektsinformasjon.frilansOppdrag.tittel" />
                            </Heading>
                            <Block padBottom="l">
                                <FrilansoppdragModalFormComponents.TextField
                                    name={FrilansoppdragModalFormField.navnOppdragsgiver}
                                    label={oppdragsgiverNavnLabel}
                                    validate={validateNavnPåOppdragsgiver(intl, oppdragsgiverNavnLabel)}
                                />
                            </Block>
                            <Block padBottom="l" visible={visibility.isVisible(FrilansoppdragModalFormField.fom)}>
                                <FrilansoppdragModalFormComponents.DatePicker
                                    name={FrilansoppdragModalFormField.fom}
                                    label={intlUtils(intl, 'fom')}
                                    placeholder={'dd.mm.åååå'}
                                    fullscreenOverlay={true}
                                    validate={validateOppdragFom(intl, formValues.tom!, oppstartsdato)}
                                    minDate={dayjs(oppstartsdato).toDate()}
                                    maxDate={dayjs().toDate()}
                                    showYearSelector={startetSomFrilansIForrigeKalenderårEllerTidligere(oppstartsdato)}
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
                                        formValues.pågående!,
                                        formValues.fom!,
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
