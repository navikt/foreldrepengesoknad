import * as React from 'react';
import Modal, { ModalProps } from 'nav-frontend-modal';
import { FormattedMessage } from 'react-intl';
import Knapp, { Hovedknapp } from 'nav-frontend-knapper';
import { Undertittel } from 'nav-frontend-typografi';
import Labeltekst from 'common/components/labeltekst/Labeltekst';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import {
    AnnenInntekt,
    AnnenInntektPartial,
    AnnenInntektType
} from '../../types/søknad/AnnenInntekt';
import InntektstypeVelger from '../inntektstype-velger/InntektstypeVelger';
import Knapperad from 'common/components/knapperad/Knapperad';
import BEMHelper from 'common/util/bem';
import './annenInntektModal.less';
import Bolk from '../layout/Bolk';
import GenerellAnnenInntektBolk from '../../bolker/GenerellAnnenInntektBolk';

export interface AnnenInntektModalProps extends ModalProps {
    annenInntekt?: AnnenInntekt;
    editMode: boolean;
    onAdd: (annenInntekt: AnnenInntekt) => void;
    onEdit: (annenInntekt: AnnenInntekt) => void;
}

interface State {
    annenInntekt: AnnenInntektPartial;
}

class AnnenInntektModal extends React.Component<AnnenInntektModalProps, State> {
    static getDerivedStateFromProps(
        props: AnnenInntektModalProps,
        state: State
    ) {
        return AnnenInntektModal.buildStateFromProps(props, state);
    }

    static buildStateFromProps(props: AnnenInntektModalProps, state?: State) {
        const { isOpen } = props;

        if (!isOpen) {
            return { annenInntekt: props.annenInntekt || {} };
        } else {
            return {
                annenInntekt:
                    state &&
                    state.annenInntekt &&
                    Object.keys(state.annenInntekt).length > 0
                        ? state.annenInntekt
                        : props.annenInntekt || {}
            };
        }
    }

    constructor(props: AnnenInntektModalProps) {
        super(props);

        this.state = AnnenInntektModal.buildStateFromProps(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.updateAnnenInntekt = this.updateAnnenInntekt.bind(this);
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

        const { onAdd, onEdit, editMode } = this.props;
        const { annenInntekt } = this.state;

        if (editMode) {
            onEdit(annenInntekt as AnnenInntekt);
        } else {
            onAdd(annenInntekt as AnnenInntekt);
        }
    }

    render() {
        const { onRequestClose, ...modalProps } = this.props;
        const { annenInntekt } = this.state;
        const inntektstype = annenInntekt.type;

        const cls = BEMHelper('annenInntektModal');
        const renderGenerellBolk =
            inntektstype === AnnenInntektType.SLUTTPAKKE ||
            inntektstype === AnnenInntektType.VENTELØNN ||
            inntektstype === AnnenInntektType.MILITÆRTJENESTE ||
            inntektstype === AnnenInntektType.LØNN_VED_VIDEREUTDANNING ||
            inntektstype === AnnenInntektType.JOBB_I_UTLANDET;

        return (
            <Modal
                className={cls.className}
                onRequestClose={onRequestClose}
                {...modalProps}>
                <form onSubmit={this.onSubmit}>
                    <Undertittel className={cls.element('title')}>
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

                    <Bolk
                        synlig={renderGenerellBolk}
                        render={() => (
                            <GenerellAnnenInntektBolk
                                annenInntekt={annenInntekt || {}}
                                onChange={this.updateAnnenInntekt}
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

export default AnnenInntektModal;
