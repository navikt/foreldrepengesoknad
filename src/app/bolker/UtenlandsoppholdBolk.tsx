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
    onChange: (perioder: UtenlandsoppholdPeriode[]) => void;
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
        this.onDelete = this.onDelete.bind(this);
        this.onPeriodeLinkClick = this.onPeriodeLinkClick.bind(this);

        this.state = {
            modalIsOpen: false
        };
    }

    onAdd(periode: UtenlandsoppholdPeriode) {
        const { perioder, onChange } = this.props;
        onChange([...perioder, periode]);
        this.closeModal();
    }

    onEdit(periode: UtenlandsoppholdPeriode) {
        const { perioder, onChange } = this.props;
        const { periodeIndex } = this.state;
        const editedPerioder = perioder.slice();
        if (periodeIndex !== undefined && periodeIndex >= 0) {
            editedPerioder[periodeIndex] = periode;
            onChange(editedPerioder);
        }
        this.closeModal({
            periodeToEdit: undefined,
            periodeIndex: undefined
        });
    }

    onDelete(periode: UtenlandsoppholdPeriode) {
        const { perioder, onChange } = this.props;
        const editedPerioder = perioder.slice();
        editedPerioder.splice(editedPerioder.indexOf(periode), 1);
        onChange(editedPerioder);
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
                                onPeriodeTrashClick={this.onDelete}
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
