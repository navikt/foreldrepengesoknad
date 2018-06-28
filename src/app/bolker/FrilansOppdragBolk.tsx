import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { FrilansOppdrag } from '../types/søknad/FrilansInformasjon';
import InteractiveList from '../components/interactive-list/InteractiveList';
import { ISODateToMaskedInput } from '../util/dates/dates';
import Knapp from 'nav-frontend-knapper/lib/knapp';
import FrilansOppdragModal from '../components/frilans-oppdrag-modal/FrilansOppdragModal';

interface FrilansOppdragBolkProps {
    renderSpørsmål: () => JSX.Element;
    oppfølgingsspørsmål: string;
    showOppdragsPerioderContent: boolean;
    oppdragListe: FrilansOppdrag[];
    onChange: (oppdrag: FrilansOppdrag[]) => void;
}

interface FrilansOppdragBolkState {
    modalIsOpen: boolean;
    oppdragToEdit?: FrilansOppdrag;
    oppdragIndex?: number;
}

type FrilansOppdragBolkStatePartial = Partial<FrilansOppdragBolkState>;

export default class FrilansOppdragBolk extends React.Component<
    FrilansOppdragBolkProps,
    FrilansOppdragBolkState
> {
    constructor(props: FrilansOppdragBolkProps) {
        super(props);

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onSelect = this.onSelect.bind(this);

        this.state = {
            modalIsOpen: false
        };
    }

    onAdd(oppdrag: FrilansOppdrag) {
        const { oppdragListe, onChange } = this.props;
        onChange([...oppdragListe, oppdrag]);
        this.closeModal();
    }

    onEdit(oppdrag: FrilansOppdrag) {
        const { oppdragListe, onChange } = this.props;
        const { oppdragIndex } = this.state;
        const editedOppdragListe = oppdragListe.slice();
        if (oppdragIndex !== undefined && oppdragIndex >= 0) {
            editedOppdragListe[oppdragIndex] = oppdrag;
            onChange(editedOppdragListe);
        }
        this.closeModal({
            oppdragIndex: undefined,
            oppdragToEdit: undefined
        });
    }

    onSelect(oppdragToEdit: FrilansOppdrag, oppdragIndex: number) {
        this.openModal({
            oppdragToEdit,
            oppdragIndex
        });
    }

    onDelete(oppdrag: FrilansOppdrag) {
        const { oppdragListe, onChange } = this.props;
        const editedOppdragListe = oppdragListe.slice();
        editedOppdragListe.splice(editedOppdragListe.indexOf(oppdrag), 1);
        onChange(editedOppdragListe);
    }

    openModal(otherState: FrilansOppdragBolkStatePartial = {}) {
        this.setState({
            ...otherState,
            modalIsOpen: true
        });
    }

    closeModal(otherState: FrilansOppdragBolkStatePartial = {}) {
        this.setState({
            ...otherState,
            modalIsOpen: false
        });
    }

    render() {
        const {
            oppdragListe,
            oppfølgingsspørsmål,
            renderSpørsmål,
            showOppdragsPerioderContent
        } = this.props;

        const { oppdragToEdit } = this.state;

        return (
            <React.Fragment>
                {renderSpørsmål()}
                {showOppdragsPerioderContent && (
                    <React.Fragment>
                        <div className="blokk-xs">
                            <h4>{oppfølgingsspørsmål}</h4>
                        </div>

                        <div className="blokk-xs">
                            <InteractiveList
                                data={oppdragListe}
                                onSelect={this.onSelect}
                                onDelete={this.onDelete}
                                renderElement={(
                                    updatedOppdrag: FrilansOppdrag
                                ) => (
                                    <FrilansOppdragListeElement
                                        oppdrag={updatedOppdrag}
                                    />
                                )}
                                deleteAriaLabel="Slett frilansoppdrag"
                            />
                        </div>

                        <div className="blokk-s">
                            <Knapp onClick={() => this.openModal()}>
                                <FormattedMessage id="frilansOppdrag.leggTilOppdrag" />
                            </Knapp>
                        </div>
                    </React.Fragment>
                )}

                <FrilansOppdragModal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={() =>
                        this.closeModal({
                            oppdragIndex: undefined,
                            oppdragToEdit: undefined
                        })
                    }
                    contentLabel="Periode med frilansoppdrag for nær venn eller familie siste 10 måneder"
                    children={null}
                    oppdrag={oppdragToEdit}
                    onAdd={this.onAdd}
                    onEdit={this.onEdit}
                    editMode={oppdragToEdit !== undefined}
                />
            </React.Fragment>
        );
    }
}

interface FrilansOppdragListeElementProps {
    oppdrag: FrilansOppdrag;
}

const FrilansOppdragListeElement: React.StatelessComponent<
    FrilansOppdragListeElementProps
> = ({ oppdrag }) => (
    <React.Fragment>
        <div className="interactiveList__element__land">
            {oppdrag.navnPåArbeidsgiver}
        </div>
        <div className="interactiveList__element__dato">
            <FormattedMessage
                id="tidsintervall"
                values={{
                    fom: ISODateToMaskedInput(oppdrag.tidsperiode.startdato),
                    tom: oppdrag.pågående
                        ? 'pågående'
                        : ISODateToMaskedInput(oppdrag.tidsperiode.sluttdato)
                }}
            />
        </div>
    </React.Fragment>
);
