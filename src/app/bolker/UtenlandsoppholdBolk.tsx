import * as React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { FormattedMessage } from 'react-intl';
import UtenlandsoppholdPeriodeListe from '../components/utenlandsopphold-periode-liste/UtenlandsoppholdPeriodeListe';
import {
    UtenlandsoppholdPeriodeType,
    UtenlandsoppholdPeriode
} from '../types/søknad/Utenlandsopphold';
import UtenlandsoppholdPeriodeModal from '../components/utenlandsopphold-periode-modal/UtenlandsoppholdPeriodeModal';
import { Språkkode } from 'common/intl/types';

interface UtenlandsoppholdBolkProps {
    renderSpørsmål: () => JSX.Element;
    showUtenlandsoppholdPeriodeContent: boolean;
    oppfølgingsspørsmål: string;
    perioder: UtenlandsoppholdPeriode[];
    periodeType: UtenlandsoppholdPeriodeType;
    språk: Språkkode;
    onAddUtenlandsoppholdPeriode: (periode: UtenlandsoppholdPeriode) => void;
    onEditUtenlandsoppholdPeriode: (
        periode: UtenlandsoppholdPeriode,
        index: number
    ) => void;
    onDeleteUtenlandsoppholdPeriode: (periode: UtenlandsoppholdPeriode) => void;
}

interface UtenlandsoppholdBolkState {
    modalIsOpen: boolean;
    periodeToEdit?: UtenlandsoppholdPeriode;
    periodeIndex?: number;
}

type UtenlandsoppholdBolkStatePartial = Partial<UtenlandsoppholdBolkState>;

class UtenlandsoppholdBolk extends React.Component<
    UtenlandsoppholdBolkProps,
    UtenlandsoppholdBolkState
> {
    constructor(props: UtenlandsoppholdBolkProps) {
        super(props);

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onPeriodeLinkClick = this.onPeriodeLinkClick.bind(this);

        this.state = {
            modalIsOpen: false
        };
    }

    onAdd(periode: UtenlandsoppholdPeriode) {
        const { onAddUtenlandsoppholdPeriode } = this.props;
        onAddUtenlandsoppholdPeriode(periode);
        this.closeModal();
    }

    onEdit(periode: UtenlandsoppholdPeriode) {
        const { onEditUtenlandsoppholdPeriode } = this.props;
        const { periodeIndex } = this.state;
        onEditUtenlandsoppholdPeriode(
            periode,
            periodeIndex === undefined ? -1 : periodeIndex
        );
        this.closeModal({
            periodeToEdit: undefined,
            periodeIndex: undefined
        });
    }

    onPeriodeLinkClick(
        periodeToEdit: UtenlandsoppholdPeriode,
        periodeIndex: number
    ) {
        this.openModal({
            periodeToEdit,
            periodeIndex
        });
    }

    openModal(otherState: UtenlandsoppholdBolkStatePartial = {}) {
        this.setState({
            ...otherState,
            modalIsOpen: true
        });
    }

    closeModal(otherState: UtenlandsoppholdBolkStatePartial = {}) {
        this.setState({
            ...otherState,
            modalIsOpen: false
        });
    }

    render() {
        const {
            renderSpørsmål,
            showUtenlandsoppholdPeriodeContent,
            onDeleteUtenlandsoppholdPeriode,
            oppfølgingsspørsmål,
            perioder,
            periodeType,
            språk
        } = this.props;
        const { periodeToEdit } = this.state;

        return (
            <React.Fragment>
                {renderSpørsmål()}
                {showUtenlandsoppholdPeriodeContent && (
                    <React.Fragment>
                        <div className="blokk-xs">
                            <h4>{oppfølgingsspørsmål}</h4>
                        </div>

                        <div className="blokk-xs">
                            <UtenlandsoppholdPeriodeListe
                                perioder={perioder}
                                onPeriodeLinkClick={this.onPeriodeLinkClick}
                                onPeriodeTrashClick={
                                    onDeleteUtenlandsoppholdPeriode
                                }
                            />
                        </div>

                        <div className="blokk-s">
                            <Knapp onClick={() => this.openModal()}>
                                <FormattedMessage id="utenlandsopphold.leggTilLand" />
                            </Knapp>
                        </div>
                    </React.Fragment>
                )}

                <UtenlandsoppholdPeriodeModal
                    type={periodeType}
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={() =>
                        this.closeModal({
                            periodeIndex: undefined,
                            periodeToEdit: undefined
                        })
                    }
                    contentLabel={`Landvelger for ${periodeType}`}
                    children={null}
                    språk={språk}
                    periode={periodeToEdit}
                    onAdd={this.onAdd}
                    onEdit={this.onEdit}
                />
            </React.Fragment>
        );
    }
}

export default UtenlandsoppholdBolk;
