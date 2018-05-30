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
export type PeriodeType = 'neste12mnd' | 'siste12mnd';

export interface UtenlandsoppholdPeriodeModalProps extends ModalProps {
    type: PeriodeType;
    språk: Språkkode;
}

const UtenlandsoppholdPeriodeModal = (
    props: UtenlandsoppholdPeriodeModalProps & InjectedIntlProps
) => {
    const { type, språk, intl, onRequestClose, ...modalProps } = props;

    return (
        <Modal
            className="utenlandsoppholdPeriodeModal"
            onRequestClose={onRequestClose}
            {...modalProps}>
            <form>
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
                            onChange={() => {}}
                            språk={språk}
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
                            onChange={(dato: Date) => {}}
                            dato={new Date()}
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
                            onChange={(dato: Date) => {}}
                            dato={new Date()}
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
};

export default injectIntl(UtenlandsoppholdPeriodeModal);
