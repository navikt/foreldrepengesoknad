import * as React from 'react';
import Modal, { ModalProps } from 'nav-frontend-modal';
import Landvelger from '../landvelger/Landvelger';
import Labeltekst from '../labeltekst/Labeltekst';
import { Språkkode } from '../../intl/types';
import './utenlandsoppholdPeriodeModal.less';

export type PeriodeType = 'neste12mnd' | 'siste12mnd';

export interface UtenlandsoppholdPeriodeModalProps extends ModalProps {
    type: PeriodeType;
    språk: Språkkode;
}

const UtenlandsoppholdPeriodeModal = (
    props: UtenlandsoppholdPeriodeModalProps
) => {
    const { type, språk, ...modalProps } = props;

    return (
        <Modal {...modalProps} className="utenlandsoppholdPeriodeModal">
            <form>
                <Landvelger
                    label={
                        <Labeltekst
                            intlId={`utenlandsopphold.select.spørsmål.${type}`}
                        />
                    }
                    onChange={() => {}}
                    språk={språk}
                />
            </form>
        </Modal>
    );
};

export default UtenlandsoppholdPeriodeModal;
