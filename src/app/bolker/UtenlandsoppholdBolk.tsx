import * as React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import UtenlandsoppholdPeriodeListe from '../components/utenlandsopphold-periode-liste/UtenlandsoppholdPeriodeListe';
import { UtenlandsoppholdPeriode } from '../types/søknad/Utenlandsopphold';
import UtenlandsoppholdPeriodeModal, {
    PeriodeType
} from '../components/utenlandsopphold-periode-modal/UtenlandsoppholdPeriodeModal';
import { Språkkode } from '../intl/types';

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
}

interface UtenlandsoppholdBolkState {
    modalIsOpen: boolean;
    periodeToEdit?: UtenlandsoppholdPeriode;
    periodeToEditIndex?: number;
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
        const { periodeToEditIndex } = this.state;
        onEditUtenlandsoppholdPeriode(
            periode,
            periodeToEditIndex === undefined ? -1 : periodeToEditIndex
        );
        this.toggleModal({
            periodeToEdit: undefined,
            periodeToEditIndex: undefined
        });
    }

    onPeriodeLinkClick(
        periodeToEdit: UtenlandsoppholdPeriode,
        periodeToEditIndex: number
    ) {
        this.toggleModal({
            periodeToEdit,
            periodeToEditIndex
        });
    }

    onPeriodeTrashClick() {}

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
                        <label htmlFor="">{oppfølgingsspørsmål}</label>
                        <UtenlandsoppholdPeriodeListe
                            perioder={perioder}
                            onPeriodeLinkClick={this.onPeriodeLinkClick}
                            onPeriodeTrashClick={this.onPeriodeTrashClick}
                        />
                        <Knapp onClick={() => this.toggleModal()}>
                            Legg til land
                        </Knapp>
                    </React.Fragment>
                )}

                <UtenlandsoppholdPeriodeModal
                    type={periodeType}
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={() =>
                        this.toggleModal({
                            periodeToEditIndex: undefined,
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
