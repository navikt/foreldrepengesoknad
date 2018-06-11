import * as React from 'react';
import Modal, { ModalProps } from 'nav-frontend-modal';
import Landvelger from '../landvelger/Landvelger';
import './utenlandsoppholdPeriodeModal.less';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import Knapp, { Hovedknapp } from 'nav-frontend-knapper';
import { Undertittel } from 'nav-frontend-typografi';
import {
    UtenlandsoppholdPeriodeType,
    UtenlandsoppholdPeriode,
    UtenlandsoppholdPeriodePartial
} from '../../types/søknad/Utenlandsopphold';
import { Språkkode } from 'common/intl/types';
import Labeltekst from 'common/components/labeltekst/Labeltekst';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import DatoInput from 'common/components/dato-input/DatoInput';
import getMessage from 'common/util/i18nUtils';
import Knapperad from 'common/components/knapperad/Knapperad';

export interface UtenlandsoppholdPeriodeModalProps extends ModalProps {
    type: UtenlandsoppholdPeriodeType;
    periode?: UtenlandsoppholdPeriode;
    språk: Språkkode;
    onAdd: (periode: UtenlandsoppholdPeriode) => void;
    onEdit: (periode: UtenlandsoppholdPeriode) => void;
}

type Props = UtenlandsoppholdPeriodeModalProps & InjectedIntlProps;

interface State {
    periode: UtenlandsoppholdPeriodePartial;
    editMode: boolean;
}

class UtenlandsoppholdPeriodeModal extends React.Component<Props, State> {
    static getDerivedStateFromProps(props: Props) {
        return UtenlandsoppholdPeriodeModal.buildStateFromProps(props);
    }

    static buildStateFromProps(props: Props) {
        const { periode } = props;
        return {
            periode: periode ? { ...periode } : { varighet: {} },
            editMode: props.periode !== undefined
        };
    }

    constructor(props: Props) {
        super(props);

        this.state = UtenlandsoppholdPeriodeModal.buildStateFromProps(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    updatePeriode(periodeProperties: UtenlandsoppholdPeriodePartial) {
        this.setState({
            periode: {
                ...this.state.periode,
                ...periodeProperties
            }
        });
    }

    onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        event.stopPropagation();

        const { onAdd, onEdit } = this.props;
        const { periode, editMode } = this.state;

        if (editMode) {
            onEdit(periode as UtenlandsoppholdPeriode);
        } else {
            onAdd(periode as UtenlandsoppholdPeriode);
        }
    }

    getVarighet() {
        const { periode } = this.state;
        if (periode.varighet) {
            return periode.varighet;
        }
        return {};
    }

    getVarighetDate(property: 'fom' | 'tom') {
        const { periode } = this.state;
        const dateValue = periode.varighet && periode.varighet[property];
        if (dateValue) {
            return new Date(dateValue);
        }
        return undefined;
    }

    render() {
        const { type, språk, intl, onRequestClose, ...modalProps } = this.props;
        const { periode } = this.state;

        return (
            <Modal
                className="utenlandsoppholdPeriodeModal"
                onRequestClose={onRequestClose}
                {...modalProps}>
                <form onSubmit={this.onSubmit}>
                    <Undertittel className="utenlandsoppholdPeriodeModal__title">
                        <FormattedMessage id="utenlandsopphold.tittel" />
                    </Undertittel>

                    <Spørsmål
                        render={() => (
                            <Landvelger
                                label={
                                    <Labeltekst
                                        intlId={`utenlandsopphold.select.spørsmål.${type}`}
                                    />
                                }
                                onChange={(land: string) =>
                                    this.updatePeriode({ land })
                                }
                                språk={språk}
                                defaultValue={periode.land}
                            />
                        )}
                    />

                    <Spørsmål
                        render={() => (
                            <DatoInput
                                id="fraDatoInput"
                                label={getMessage(
                                    intl,
                                    `utenlandsopphold.datoinput.fra`
                                )}
                                onChange={(fom: Date) => {
                                    this.updatePeriode({
                                        varighet: {
                                            ...this.getVarighet(),
                                            fom
                                        }
                                    });
                                }}
                                dato={this.getVarighetDate('fom')}
                            />
                        )}
                    />

                    <Spørsmål
                        render={() => (
                            <DatoInput
                                id="tilDatoInput"
                                label={getMessage(
                                    intl,
                                    `utenlandsopphold.datoinput.til`
                                )}
                                onChange={(tom: Date) => {
                                    this.updatePeriode({
                                        varighet: {
                                            ...this.getVarighet(),
                                            tom
                                        }
                                    });
                                }}
                                dato={this.getVarighetDate('tom')}
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

export default injectIntl(UtenlandsoppholdPeriodeModal);
