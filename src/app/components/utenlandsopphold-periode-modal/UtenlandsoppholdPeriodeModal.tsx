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
    periode: UtenlandsoppholdPeriode;
}

class UtenlandsoppholdPeriodeModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        const { periode } = props;
        this.state = periode
            ? { periode: Object.assign({}, periode as any) }
            : { periode: { varighet: {} } };
    }

    updatePeriode(periodeProperties: UtenlandsoppholdPeriodePartial) {
        this.setState({
            periode: {
                ...this.state.periode,
                ...periodeProperties
            }
        });
    }

    render() {
        const {
            type,
            språk,
            intl,
            onRequestClose,
            onSubmit,
            ...modalProps
        } = this.props;
        const { periode } = this.state;

        return (
            <Modal
                className="utenlandsoppholdPeriodeModal"
                onRequestClose={onRequestClose}
                {...modalProps}>
                <form onSubmit={() => onSubmit(periode)}>
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
                                            fom: fom.toISOString(),
                                            tom: periode.varighet.tom
                                        }
                                    });
                                }}
                                dato={
                                    periode.varighet.fom
                                        ? new Date(periode.varighet.fom)
                                        : undefined
                                }
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
                                            tom: tom.toISOString(),
                                            fom: periode.varighet.fom
                                        }
                                    });
                                }}
                                dato={
                                    periode.varighet.tom
                                        ? new Date(periode.varighet.tom)
                                        : undefined
                                }
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
