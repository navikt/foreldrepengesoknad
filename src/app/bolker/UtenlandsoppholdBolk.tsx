import * as React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import UtenlandsoppholdPeriodeListe from '../components/utenlandsopphold-periode-liste/UtenlandsoppholdPeriodeListe';
import {
    PeriodeType,
    UtenlandsoppholdPeriode
} from '../types/søknad/Utenlandsopphold';
import UtenlandsoppholdPeriodeModal from '../components/utenlandsopphold-periode-modal/UtenlandsoppholdPeriodeModal';
import { Språkkode } from 'common/intl/types';

interface UtenlandsoppholdBolkProps {
    renderSpørsmål: () => JSX.Element;
    showUtenlandsoppholdPeriodeContent: boolean;
    oppfølgingsspørsmål: string;
    perioder: UtenlandsoppholdPeriode[];
    periodeType: PeriodeType;
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

        this.toggleModal = this.toggleModal.bind(this);
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
        this.toggleModal();
    }

    onEdit(periode: UtenlandsoppholdPeriode) {
        const { onEditUtenlandsoppholdPeriode } = this.props;
        const { periodeIndex } = this.state;
        onEditUtenlandsoppholdPeriode(
            periode,
            periodeIndex === undefined ? -1 : periodeIndex
        );
        this.toggleModal({
            periodeToEdit: undefined,
            periodeIndex: undefined
        });
    }

    onPeriodeLinkClick(
        periodeToEdit: UtenlandsoppholdPeriode,
        periodeIndex: number
    ) {
        this.toggleModal({
            periodeToEdit,
            periodeIndex
        });
    }

    toggleModal(otherState: UtenlandsoppholdBolkStatePartial = {}) {
        this.setState({
            ...otherState,
            modalIsOpen: !this.state.modalIsOpen
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
                            <label>{oppfølgingsspørsmål}</label>
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
                            <Knapp onClick={() => this.toggleModal()}>
                                Legg til land
                            </Knapp>
                        </div>
                    </React.Fragment>
                )}

                <UtenlandsoppholdPeriodeModal
                    type={periodeType}
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={() =>
                        this.toggleModal({
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
