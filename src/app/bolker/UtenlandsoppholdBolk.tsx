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
    onUtenlandsoppholdPeriodeSubmit: (periode: UtenlandsoppholdPeriode) => void;
}

interface UtenlandsoppholdBolkState {
    modalIsOpen: boolean;
    periodeToEdit?: UtenlandsoppholdPeriode;
}

class UtenlandsoppholdBolk extends React.Component<
    UtenlandsoppholdBolkProps,
    UtenlandsoppholdBolkState
> {
    constructor(props: UtenlandsoppholdBolkProps) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.state = {
            modalIsOpen: false
        };
    }

    toggleModal() {
        this.setState({
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
            språk,
            onUtenlandsoppholdPeriodeSubmit
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
                            onPeriodeLinkClick={this.toggleModal}
                            onPeriodeTrashClick={this.toggleModal}
                        />
                        <Knapp onClick={this.toggleModal}>Legg til land</Knapp>
                    </React.Fragment>
                )}

                <UtenlandsoppholdPeriodeModal
                    type={periodeType}
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.toggleModal}
                    contentLabel={`Landvelger for ${periodeType}`}
                    children={null}
                    språk={språk}
                    periode={periodeToEdit}
                    onSubmit={(periode: UtenlandsoppholdPeriode) => {
                        onUtenlandsoppholdPeriodeSubmit(periode);
                        this.toggleModal();
                    }}
                />
            </React.Fragment>
        );
    }
}

export default UtenlandsoppholdBolk;
