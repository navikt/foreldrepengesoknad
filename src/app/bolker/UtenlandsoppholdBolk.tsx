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
    showLandContent: boolean;
    oppfølgingsspørsmål: string;
    perioder: UtenlandsoppholdPeriode[];
    periodeType: PeriodeType;
    språk: Språkkode;
}

interface UtenlandsoppholdBolkState {
    modalIsOpen: boolean;
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
            showLandContent,
            oppfølgingsspørsmål,
            perioder,
            periodeType,
            språk
        } = this.props;

        return (
            <React.Fragment>
                {renderSpørsmål()}
                {showLandContent && (
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
                />
            </React.Fragment>
        );
    }
}

export default UtenlandsoppholdBolk;
