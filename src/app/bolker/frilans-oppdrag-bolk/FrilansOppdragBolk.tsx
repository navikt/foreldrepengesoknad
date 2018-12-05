import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { FrilansOppdrag } from '../../types/søknad/FrilansInformasjon';
import Knapp from 'nav-frontend-knapper/lib/knapp';
import FrilansOppdragModal from '../../components/frilans-oppdrag-modal/FrilansOppdragModal';
import List from '../../components/list/List';
import Block from 'common/components/block/Block';
import FrilansOppdragListElement from './FrilansOppdragListElement';

interface FrilansOppdragBolkProps {
    renderSpørsmål: () => JSX.Element;
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

class FrilansOppdragBolk extends React.Component<FrilansOppdragBolkProps, FrilansOppdragBolkState> {
    constructor(props: FrilansOppdragBolkProps) {
        super(props);

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
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

    onEditSubmit(oppdrag: FrilansOppdrag) {
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
        const { oppdragListe, renderSpørsmål, showOppdragsPerioderContent } = this.props;

        const { oppdragToEdit } = this.state;

        return (
            <React.Fragment>
                {renderSpørsmål()}
                {showOppdragsPerioderContent && (
                    <React.Fragment>
                        <Block margin="xs" visible={oppdragListe.length > 0}>
                            <List
                                data={oppdragListe}
                                renderElement={(updatedOppdrag: FrilansOppdrag, index: number) => (
                                    <FrilansOppdragListElement
                                        oppdrag={updatedOppdrag}
                                        onDelete={() => this.onDelete(updatedOppdrag)}
                                        onEdit={() => this.onSelect(updatedOppdrag, index)}
                                        key={JSON.stringify(updatedOppdrag)}
                                    />
                                )}
                            />
                        </Block>
                        <Block>
                            <Knapp onClick={() => this.openModal()} htmlType="button">
                                <FormattedMessage id="frilansOppdrag.leggTilOppdrag" />
                            </Knapp>
                        </Block>
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
                    onEdit={this.onEditSubmit}
                    editMode={oppdragToEdit !== undefined}
                />
            </React.Fragment>
        );
    }
}

export default FrilansOppdragBolk;
