import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import InteractiveList from '../components/interactive-list/InteractiveList';
import { ISODateToPrettyDateFormat } from '../util/dates/dates';
import Knapp from 'nav-frontend-knapper/lib/knapp';
import { Næring } from '../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import SelvstendigNæringsdrivendeModal from '../components/selvstendig-næringsdrivende-modal/SelvstendigNæringsdrivendeModal';

interface SelvstendigNæringsdrivendeBolkProps {
    renderSpørsmål: () => JSX.Element;
    oppfølgingsspørsmål: string;
    showNæringsPerioderContent: boolean;
    næringListe: Næring[];
    onChange: (næring: Næring[]) => void;
}

interface SelvstendigNæringsdrivendeBolkState {
    modalIsOpen: boolean;
    næringToEdit?: Næring;
    næringIndex?: number;
}

type SelvstendigNæringsdrivendeBolkStatePartial = Partial<
    SelvstendigNæringsdrivendeBolkState
>;

export default class SelvstendigNæringsdrivendeBolk extends React.Component<
    SelvstendigNæringsdrivendeBolkProps,
    SelvstendigNæringsdrivendeBolkState
> {
    constructor(props: SelvstendigNæringsdrivendeBolkProps) {
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

    onAdd(næring: Næring) {
        const { næringListe, onChange } = this.props;
        onChange([...næringListe, næring]);
        this.closeModal();
    }

    onEdit(næring: Næring) {
        const { næringListe, onChange } = this.props;
        const { næringIndex } = this.state;
        const editedNæringListe = næringListe.slice();
        if (næringIndex !== undefined && næringIndex >= 0) {
            editedNæringListe[næringIndex] = næring;
            onChange(editedNæringListe);
        }
        this.closeModal({
            næringIndex: undefined,
            næringToEdit: undefined
        });
    }

    onSelect(næringToEdit: Næring, næringIndex: number) {
        this.openModal({
            næringToEdit,
            næringIndex
        });
    }

    onDelete(næring: Næring) {
        const { næringListe, onChange } = this.props;
        const editedNæringListe = næringListe.slice();
        editedNæringListe.splice(editedNæringListe.indexOf(næring), 1);
        onChange(editedNæringListe);
    }

    openModal(otherState: SelvstendigNæringsdrivendeBolkStatePartial = {}) {
        this.setState({
            ...otherState,
            modalIsOpen: true
        });
    }

    closeModal(otherState: SelvstendigNæringsdrivendeBolkStatePartial = {}) {
        this.setState({
            ...otherState,
            modalIsOpen: false
        });
    }

    render() {
        const {
            næringListe,
            oppfølgingsspørsmål,
            renderSpørsmål,
            showNæringsPerioderContent
        } = this.props;

        const { næringToEdit } = this.state;

        return (
            <React.Fragment>
                {renderSpørsmål()}
                {showNæringsPerioderContent && (
                    <React.Fragment>
                        <div className="blokk-xs">
                            <h4>{oppfølgingsspørsmål}</h4>
                        </div>

                        <div className="blokk-xs">
                            <InteractiveList
                                data={næringListe}
                                onSelect={this.onSelect}
                                onDelete={this.onDelete}
                                renderElement={(updatedNæring: Næring) => (
                                    <NæringListeElement
                                        næring={updatedNæring}
                                    />
                                )}
                                deleteAriaLabel="Slett selvstendig næringsdrivende-periode"
                            />
                        </div>

                        <div className="blokk-s">
                            <Knapp
                                onClick={() => this.openModal()}
                                htmlType="button">
                                <FormattedMessage id="frilansOppdrag.leggTilOppdrag" />
                            </Knapp>
                        </div>

                        <SelvstendigNæringsdrivendeModal
                            isOpen={this.state.modalIsOpen}
                            onRequestClose={() =>
                                this.closeModal({
                                    næringIndex: undefined,
                                    næringToEdit: undefined
                                })
                            }
                            contentLabel="Periode som selvstendig næringsdrivende"
                            children={null}
                            næring={næringToEdit}
                            onAdd={this.onAdd}
                            onEdit={this.onEdit}
                            editMode={næringToEdit !== undefined}
                        />
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

interface NæringListeElementProps {
    næring: Næring;
}

const NæringListeElement: React.StatelessComponent<NæringListeElementProps> = ({
    næring
}) => (
    <React.Fragment>
        <div className="interactiveList__element__land">
            {næring.navnPåNæringen}
        </div>
        <div className="interactiveList__element__dato">
            <FormattedMessage
                id="tidsintervall"
                values={{
                    fom: ISODateToPrettyDateFormat(
                        næring.tidsperiode.startdato
                    ),
                    tom: næring.pågående
                        ? 'pågående'
                        : ISODateToPrettyDateFormat(
                              næring.tidsperiode.sluttdato
                          )
                }}
            />
        </div>
    </React.Fragment>
);
