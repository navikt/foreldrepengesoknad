import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Knapp from 'nav-frontend-knapper/lib/knapp';
import { Næring } from '../../../../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import SelvstendigNæringsdrivendeModal from '../SelvstendigNæringsdrivendeModal';
import Block from 'common/components/block/Block';
import List from 'app/components/elementer/list/List';
import SelvstendigNæringsdrivendeListElement from './SelvstendigNæringsdrivendeListElement';
import HarDuJobbetSomSelvstendigNæringsdrivendeSiste10MndSpørsmål from '../../../../spørsmål/HarDuJobbetSomSelvstendigNæringsdrivendeSiste10MndSpørsmål';
import { Søker } from '../../../../types/søknad/Søker';
import BEMHelper from 'common/util/bem';

import './selvstendigNæringsdrivendeBolk.less';

interface SelvstendigNæringsdrivendeBolkProps {
    næringListe: Næring[];
    harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: boolean | undefined;
    onChangeSøker: (v: Partial<Søker>) => void;
    onChange: (næring: Næring[]) => void;
    planInneholderSelvstendignæringaktivitet: boolean;
}

interface SelvstendigNæringsdrivendeBolkState {
    modalIsOpen: boolean;
    næringToEdit?: Næring;
    næringIndex?: number;
}

type SelvstendigNæringsdrivendeBolkStatePartial = Partial<SelvstendigNæringsdrivendeBolkState>;

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
            modalIsOpen: false,
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
            næringToEdit: undefined,
        });
    }

    onSelect(næringToEdit: Næring, næringIndex: number) {
        this.openModal({
            næringToEdit,
            næringIndex,
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
            modalIsOpen: true,
        });
    }

    closeModal(otherState: SelvstendigNæringsdrivendeBolkStatePartial = {}) {
        this.setState({
            ...otherState,
            modalIsOpen: false,
        });
    }

    render() {
        const {
            næringListe,
            harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd,
            planInneholderSelvstendignæringaktivitet,
            onChangeSøker,
        } = this.props;

        const { næringToEdit } = this.state;
        const bem = BEMHelper('selvstendigNæringsdrivendeBolk');

        return (
            <React.Fragment>
                <Block margin="none">
                    <HarDuJobbetSomSelvstendigNæringsdrivendeSiste10MndSpørsmål
                        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd={
                            harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd
                        }
                        onChange={(harJobbet) =>
                            onChangeSøker({ harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: harJobbet })
                        }
                        planInneholderSelvstendignæringaktivitet={planInneholderSelvstendignæringaktivitet}
                    />
                </Block>
                {harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd === true && (
                    <div className={bem.element('innhold')}>
                        <Block margin="xs" visible={næringListe.length > 0}>
                            <List
                                data={næringListe}
                                renderElement={(updatedNæring: Næring, index: number) => (
                                    <SelvstendigNæringsdrivendeListElement
                                        næring={updatedNæring}
                                        onEdit={() => this.onSelect(updatedNæring, index)}
                                        onDelete={() => this.onDelete(updatedNæring)}
                                        key={`${updatedNæring.navnPåNæringen}${JSON.stringify(
                                            updatedNæring.tidsperiode
                                        )}`}
                                    />
                                )}
                            />
                        </Block>
                        <Block margin="none">
                            <Knapp
                                className={bem.element('leggTilKnapp')}
                                onClick={() => this.openModal()}
                                htmlType="button"
                                data-name="leggTilNæring"
                            >
                                <FormattedMessage id="selvstendigNæringsdrivende.leggTilNæring" />
                            </Knapp>
                        </Block>

                        <SelvstendigNæringsdrivendeModal
                            næring={næringToEdit}
                            isOpen={this.state.modalIsOpen}
                            onCancel={() =>
                                this.closeModal({
                                    næringIndex: undefined,
                                    næringToEdit: undefined,
                                })
                            }
                            onSubmit={næringToEdit !== undefined ? this.onEdit : this.onAdd}
                        />
                    </div>
                )}
            </React.Fragment>
        );
    }
}
