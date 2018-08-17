import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { prettifyTidsperiode } from '../util/dates/dates';
import Knapp from 'nav-frontend-knapper/lib/knapp';
import { Næring } from '../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import SelvstendigNæringsdrivendeModal from '../components/selvstendig-næringsdrivende-modal/SelvstendigNæringsdrivendeModal';
import Block from 'common/components/block/Block';
import InteractiveListElement, {
    InteractiveListElementProps
} from '../components/interactive-list-element/InteractiveListElement';
import List from '../components/list/List';

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
                        <Block margin="xs">
                            <h4>{oppfølgingsspørsmål}</h4>
                            <List
                                data={næringListe}
                                renderElement={(
                                    updatedNæring: Næring,
                                    index: number
                                ) => (
                                    <NæringListeElement
                                        næring={updatedNæring}
                                        onEdit={() =>
                                            this.onSelect(updatedNæring, index)
                                        }
                                        onDelete={() =>
                                            this.onDelete(updatedNæring)
                                        }
                                        key={`${
                                            updatedNæring.navnPåNæringen
                                        }${JSON.stringify(
                                            updatedNæring.tidsperiode
                                        )}`}
                                    />
                                )}
                            />
                        </Block>

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

interface NæringListeElementProps extends InteractiveListElementProps {
    næring: Næring;
}

const NæringListeElement: React.StatelessComponent<NæringListeElementProps> = ({
    næring,
    ...rest
}) => (
    <InteractiveListElement
        title={næring.navnPåNæringen}
        text={prettifyTidsperiode(næring.tidsperiode)}
        deleteLinkText="Slett periode"
        {...rest}
    />
);
