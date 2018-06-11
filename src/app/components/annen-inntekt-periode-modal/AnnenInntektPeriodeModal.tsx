import * as React from 'react';
import Modal, { ModalProps } from 'nav-frontend-modal';
import './annenInntektPeriodeModal.less';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import Knapp, { Hovedknapp } from 'nav-frontend-knapper';
import { Undertittel } from 'nav-frontend-typografi';
import Labeltekst from 'common/components/labeltekst/Labeltekst';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import DatoInput from 'common/components/dato-input/DatoInput';
import getMessage from 'common/util/i18nUtils';
import {
    AnnenInntekt,
    AnnenInntektPartial,
    AnnenInntektType
} from '../../types/søknad/AnnenInntekt';
import InntektstypeVelger from '../inntektstype-velger/InntektstypeVelger';
import Knapperad from 'common/components/knapperad/Knapperad';

export interface AnnenInntektPeriodeModalProps extends ModalProps {
    annenInntekt?: AnnenInntekt;
    onAdd: (annenInntekt: AnnenInntekt) => void;
    onEdit: (annenInntekt: AnnenInntekt) => void;
}

type Props = AnnenInntektPeriodeModalProps & InjectedIntlProps;

interface State {
    annenInntekt: AnnenInntektPartial;
    editMode: boolean;
}

class AnnenInntektPeriodeModal extends React.Component<Props, State> {
    static getDerivedStateFromProps(props: Props) {
        return AnnenInntektPeriodeModal.buildStateFromProps(props);
    }

    static buildStateFromProps(props: Props) {
        const { annenInntekt } = props;
        return {
            annenInntekt: annenInntekt ? { ...annenInntekt } : {},
            editMode: annenInntekt !== undefined
        };
    }

    constructor(props: Props) {
        super(props);

        this.state = AnnenInntektPeriodeModal.buildStateFromProps(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    updateAnnenInntekt(annenInntektProperties: AnnenInntektPartial) {
        this.setState({
            annenInntekt: {
                ...this.state.annenInntekt,
                ...annenInntektProperties
            }
        });
    }

    onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        event.stopPropagation();

        const { onAdd, onEdit } = this.props;
        const { annenInntekt, editMode } = this.state;

        if (editMode) {
            onEdit(annenInntekt as AnnenInntekt);
        } else {
            onAdd(annenInntekt as AnnenInntekt);
        }
    }

    render() {
        const { intl, onRequestClose, ...modalProps } = this.props;
        const { annenInntekt } = this.state;

        return (
            <Modal
                className="annenInntektPeriodeModal"
                onRequestClose={onRequestClose}
                {...modalProps}>
                <form onSubmit={this.onSubmit}>
                    <Undertittel className="annenInntektPeriodeModal__title">
                        <FormattedMessage id="annenInntekt.modal.tittel" />
                    </Undertittel>

                    <Spørsmål
                        render={() => (
                            <InntektstypeVelger
                                label={
                                    <Labeltekst intlId="annenInntekt.modal.select.spørsmål" />
                                }
                                onChange={(type: AnnenInntektType) =>
                                    this.updateAnnenInntekt({ type })
                                }
                                defaultValue={annenInntekt.type}
                            />
                        )}
                    />

                    <Spørsmål
                        render={() => (
                            <DatoInput
                                id="fraDatoInput"
                                label={getMessage(
                                    intl,
                                    'annenInntekt.modal.fra.spørsmål'
                                )}
                                onChange={(fom: Date) => {
                                    this.updateAnnenInntekt({
                                        fom
                                    });
                                }}
                                dato={annenInntekt.fom}
                            />
                        )}
                    />

                    <Spørsmål
                        render={() => (
                            <DatoInput
                                id="tilDatoInput"
                                label={getMessage(
                                    intl,
                                    'annenInntekt.modal.til.spørsmål'
                                )}
                                onChange={(tom: Date) => {
                                    this.updateAnnenInntekt({
                                        tom
                                    });
                                }}
                                dato={annenInntekt.tom}
                            />
                        )}
                    />

                    <Knapperad>
                        <Knapp
                            type="standard"
                            onClick={onRequestClose}
                            htmlType="button">
                            <FormattedMessage id="avbryt" />
                        </Knapp>
                        <Hovedknapp>
                            <FormattedMessage id="leggtil" />
                        </Hovedknapp>
                    </Knapperad>
                </form>
            </Modal>
        );
    }
}

export default injectIntl(AnnenInntektPeriodeModal);
