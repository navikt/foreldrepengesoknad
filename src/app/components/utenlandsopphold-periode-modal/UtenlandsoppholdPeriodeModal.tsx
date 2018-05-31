import * as React from 'react';
import Modal, { ModalProps } from 'nav-frontend-modal';
import Landvelger from '../landvelger/Landvelger';
import Labeltekst from '../labeltekst/Labeltekst';
import { Språkkode } from '../../intl/types';
import './utenlandsoppholdPeriodeModal.less';
import Spørsmål from '../spørsmål/Spørsmål';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import getMessage from '../../util/i18nUtils';
import DatoInput from '../dato-input/DatoInput';
import Knapp, { Hovedknapp } from 'nav-frontend-knapper';
import { Undertittel } from 'nav-frontend-typografi';
import {
    UtenlandsoppholdPeriode,
    UtenlandsoppholdPeriodePartial
} from '../../types/søknad/Utenlandsopphold';

export type PeriodeType = 'neste12mnd' | 'siste12mnd';

export interface UtenlandsoppholdPeriodeModalProps extends ModalProps {
    type: PeriodeType;
    periode?: UtenlandsoppholdPeriode;
    språk: Språkkode;
    onSubmit: (periode: UtenlandsoppholdPeriode) => void;
}

type Props = UtenlandsoppholdPeriodeModalProps & InjectedIntlProps;

interface State {
    periode: UtenlandsoppholdPeriodePartial;
    editMode: boolean;
}

class UtenlandsoppholdPeriodeModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        const { periode } = props;
        this.state = periode
            ? { periode: { ...periode }, editMode: true }
            : { periode: { varighet: {} }, editMode: false };

        this.submitPeriode = this.submitPeriode.bind(this);
    }

    updatePeriode(periodeProperties: UtenlandsoppholdPeriodePartial) {
        this.setState({
            periode: {
                ...this.state.periode,
                ...periodeProperties
            }
        });
    }

    submitPeriode(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        event.stopPropagation();

        const { onSubmit } = this.props;
        const { periode } = this.state;

        onSubmit(periode as UtenlandsoppholdPeriode);
    }

    varighet() {
        const { periode } = this.state;
        if (periode.varighet) {
            return periode.varighet;
        }
        return {};
    }

    varighetDate(property: 'fom' | 'tom') {
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
                <form onSubmit={this.submitPeriode}>
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
                                            ...this.varighet(),
                                            fom: fom.toISOString()
                                        }
                                    });
                                }}
                                dato={this.varighetDate('fom')}
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
                                            ...this.varighet(),
                                            tom: tom.toISOString()
                                        }
                                    });
                                }}
                                dato={this.varighetDate('tom')}
                            />
                        )}
                    />

                    <div className="utenlandsoppholdPeriodeModal__buttonBar">
                        <Knapp
                            type="standard"
                            onClick={onRequestClose}
                            htmlType="button">
                            <FormattedMessage id="avbryt" />
                        </Knapp>
                        <Hovedknapp>
                            <FormattedMessage id="leggtil" />
                        </Hovedknapp>
                    </div>
                </form>
            </Modal>
        );
    }
}

export default injectIntl(UtenlandsoppholdPeriodeModal);
