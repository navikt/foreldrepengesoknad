import * as React from 'react';
import { AnnenInntekt } from '../types/søknad/AnnenInntekt';
import InteractiveList from '../components/interactive-list/InteractiveList';
import { Knapp } from 'nav-frontend-knapper';
import { FormattedMessage } from 'react-intl';
import { default as AnnenInntektPeriodeModal } from '../components/annen-inntekt-periode-modal/AnnenInntektPeriodeModal';
import { ISODateToMaskedInput } from '../util/dates';

interface AndreInntekterBolkProps {
    renderSpørsmål: () => JSX.Element;
    oppfølgingsspørsmål: string;
    showAndreInntekterPeriodeContent: boolean;
    andreInntekterSiste10Mnd: AnnenInntekt[];
    onChange: (andreInntekterSiste10Mnd: AnnenInntekt[]) => void;
}

interface AndreInntekterBolkState {
    modalIsOpen: boolean;
    annenInntektToEdit?: AnnenInntekt;
    annenInntektIndex?: number;
}

type AndreInntekterBolkStatePartial = Partial<AndreInntekterBolkState>;

class AndreInntekterBolk extends React.Component<
    AndreInntekterBolkProps,
    AndreInntekterBolkState
> {
    constructor(props: AndreInntekterBolkProps) {
        super(props);

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onElementClick = this.onElementClick.bind(this);

        this.state = {
            modalIsOpen: false
        };
    }

    onAdd(annenInntekt: AnnenInntekt) {
        const { andreInntekterSiste10Mnd, onChange } = this.props;
        onChange([...andreInntekterSiste10Mnd, annenInntekt]);
        this.closeModal();
    }

    onEdit(annenInntekt: AnnenInntekt) {
        const { andreInntekterSiste10Mnd, onChange } = this.props;
        const { annenInntektIndex } = this.state;
        const editedInntekter = andreInntekterSiste10Mnd.slice();
        if (annenInntektIndex !== undefined && annenInntektIndex >= 0) {
            editedInntekter[annenInntektIndex] = annenInntekt;
            onChange(editedInntekter);
        }
        this.closeModal({
            annenInntektIndex: undefined,
            annenInntektToEdit: undefined
        });
    }

    onDelete(annenInntekt: AnnenInntekt) {
        const { andreInntekterSiste10Mnd, onChange } = this.props;
        const editedInntekter = andreInntekterSiste10Mnd.slice();
        editedInntekter.splice(editedInntekter.indexOf(annenInntekt), 1);
        onChange(editedInntekter);
    }

    onElementClick(
        annenInntektToEdit: AnnenInntekt,
        annenInntektIndex: number
    ) {
        this.openModal({
            annenInntektToEdit,
            annenInntektIndex
        });
    }

    openModal(otherState: AndreInntekterBolkStatePartial = {}) {
        this.setState({
            ...otherState,
            modalIsOpen: true
        });
    }

    closeModal(otherState: AndreInntekterBolkStatePartial = {}) {
        this.setState({
            ...otherState,
            modalIsOpen: false
        });
    }

    render() {
        const {
            oppfølgingsspørsmål,
            renderSpørsmål,
            showAndreInntekterPeriodeContent,
            andreInntekterSiste10Mnd
        } = this.props;

        const { annenInntektToEdit } = this.state;

        return (
            <React.Fragment>
                {renderSpørsmål()}
                {showAndreInntekterPeriodeContent && (
                    <React.Fragment>
                        <div className="blokk-xs">
                            <h4>{oppfølgingsspørsmål}</h4>
                        </div>

                        <div className="blokk-xs">
                            <InteractiveList
                                data={andreInntekterSiste10Mnd}
                                onSelect={this.onElementClick}
                                onDelete={this.onDelete}
                                renderElement={(annenInntekt: AnnenInntekt) => (
                                    <AndreInntekterListeElement
                                        annenInntekt={annenInntekt}
                                    />
                                )}
                                deleteAriaLabel="Slett annen inntektsperiode"
                            />
                        </div>

                        <div className="blokk-s">
                            <Knapp onClick={() => this.openModal()}>
                                <FormattedMessage id="andreInntekter.leggTilInntekt" />
                            </Knapp>
                        </div>
                    </React.Fragment>
                )}

                <AnnenInntektPeriodeModal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={() =>
                        this.closeModal({
                            annenInntektIndex: undefined,
                            annenInntektToEdit: undefined
                        })
                    }
                    contentLabel={`Ny periode med annen inntekt`}
                    children={null}
                    annenInntekt={annenInntektToEdit}
                    onAdd={this.onAdd}
                    onEdit={this.onEdit}
                />
            </React.Fragment>
        );
    }
}

interface AndreInntekterListeElementProps {
    annenInntekt: AnnenInntekt;
}

const AndreInntekterListeElement: React.StatelessComponent<
    AndreInntekterListeElementProps
> = ({ annenInntekt }) => (
    <React.Fragment>
        <div className="interactiveList__element__land">
            {annenInntekt.type}
        </div>
        <div className="interactiveList__element__dato">
            <FormattedMessage
                id="tidsintervall"
                values={{
                    fom: ISODateToMaskedInput(annenInntekt.fom),
                    tom: ISODateToMaskedInput(annenInntekt.tom)
                }}
            />
        </div>
    </React.Fragment>
);

export default AndreInntekterBolk;
