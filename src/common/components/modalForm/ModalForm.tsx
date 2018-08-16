import * as React from 'react';
import * as classnames from 'classnames';
import Modal from 'nav-frontend-modal';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import BEMHelper from 'common/util/bem';
import ValiderbarForm from 'common/lib/validation/elements/ValiderbarForm';

import './modalForm.less';
import { Undertittel } from 'nav-frontend-typografi';

export interface ModalFormProps {
    isOpen: boolean;
    title: string;
    summary?: {
        title: string;
    };
    renderFormButtons?: boolean;
    className?: string;
    submitLabel?: string;
    cancelLabel?: string;
    onRequestClose?: () => void;
    onSubmit: () => void;
    onCancel?: () => void;
}

const cls = BEMHelper('modalForm');

type Props = ModalFormProps & InjectedIntlProps;

class ModalForm extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.handleOnRequestClose = this.handleOnRequestClose.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }
    handleOnRequestClose() {
        if (this.props.onRequestClose) {
            this.props.onRequestClose();
        }
    }
    handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        event.stopPropagation();
        this.props.onSubmit();
    }
    render() {
        const {
            isOpen,
            title,
            onCancel,
            cancelLabel,
            submitLabel,
            intl,
            className,
            children,
            summary,
            renderFormButtons
        } = this.props;

        return (
            <Modal
                isOpen={isOpen}
                contentLabel={title}
                onRequestClose={this.handleOnRequestClose}
                closeButton={true}
                shouldCloseOnOverlayClick={false}
                className={classnames(cls.className, className)}>
                <div className={cls.element('content')}>
                    <ValiderbarForm
                        onSubmit={this.handleOnSubmit}
                        noSummary={false}
                        summaryTitle={summary ? summary.title : undefined}>
                        <Undertittel className={cls.element('title')}>
                            <FormattedMessage id="selvstendigNæringsdrivende.modal.tittel" />
                        </Undertittel>
                        <div className="blokk-m">{children}</div>
                        {renderFormButtons && (
                            <div className={cls.element('buttonrow')}>
                                <Hovedknapp
                                    className={cls.element('submitButton')}>
                                    {submitLabel ||
                                        intl.formatMessage({
                                            id:
                                                'komponent.formDialog.submitLabel'
                                        })}
                                </Hovedknapp>
                                <Knapp
                                    htmlType="button"
                                    className={cls.element('cancelButton')}
                                    onClick={() =>
                                        onCancel
                                            ? onCancel()
                                            : this.handleOnRequestClose()
                                    }>
                                    {cancelLabel ||
                                        intl.formatMessage({
                                            id:
                                                'komponent.formDialog.cancelLabel'
                                        })}
                                </Knapp>
                            </div>
                        )}
                    </ValiderbarForm>
                </div>
            </Modal>
        );
    }
}
export default injectIntl(ModalForm);
