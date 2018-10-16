import { Næring } from '../../../../app/types/søknad/SelvstendigNæringsdrivendeInformasjon';
import * as React from 'react';
import Modal, { ModalProps } from 'nav-frontend-modal';

interface NæringOppsummeringsmodalProps {
    næring?: Næring;
}

type Props = NæringOppsummeringsmodalProps & ModalProps;

const NæringOppsummeringsmodal: React.StatelessComponent<Props> = ({ næring, ...modalProps }: Props) => (
    <Modal {...modalProps}>Testing</Modal>
);

export default NæringOppsummeringsmodal;
