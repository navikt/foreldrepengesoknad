import * as React from 'react';
import { AnnenInntekt } from '../../types/søknad/AnnenInntekt';
import { Knapp } from 'nav-frontend-knapper';
import AnnenInntektModal from '../../components/annen-inntekt-modal/AnnenInntektModal';
import List from '../../components/list/List';
import Block from 'common/components/block/Block';
import { FormattedMessage } from 'react-intl';
import AndreInntekterListElement from './AndreInntekterListElement';
import AnnenInntektSiste10MndSpørsmål from '../../spørsm\u00E5l/AnnenInntektSiste10MndSpørsm\u00E5l';
import { Søker } from '../../types/søknad/Søker';

interface AndreInntekterBolkProps {
    harHattAnnenInntektSiste10Mnd: boolean | undefined;
    andreInntekterSiste10Mnd: AnnenInntekt[];
    onChange: (andreInntekterSiste10Mnd: AnnenInntekt[]) => void;
    onChangeSøker: (v: Partial<Søker>) => void;
}

interface AndreInntekterBolkState {
    modalIsOpen: boolean;
    annenInntektToEdit?: AnnenInntekt;
    annenInntektIndex?: number;
}

type AndreInntekterBolkStatePartial = Partial<AndreInntekterBolkState>;

class AndreInntekterBolk extends React.Component<AndreInntekterBolkProps, AndreInntekterBolkState> {
    constructor(props: AndreInntekterBolkProps) {
        super(props);

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onEdit = this.onEdit.bind(this);

        this.state = {
            modalIsOpen: false
        };
    }

    onAdd(annenInntekt: AnnenInntekt) {
        const { andreInntekterSiste10Mnd, onChange } = this.props;
        onChange([...andreInntekterSiste10Mnd, annenInntekt]);
        this.closeModal();
    }

    onEditSubmit(annenInntekt: AnnenInntekt) {
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

    onEdit(annenInntektToEdit: AnnenInntekt, annenInntektIndex: number) {
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
        const { onChangeSøker, harHattAnnenInntektSiste10Mnd, andreInntekterSiste10Mnd } = this.props;

        const { annenInntektToEdit } = this.state;

        return (
            <React.Fragment>
                <Block margin={harHattAnnenInntektSiste10Mnd ? 'xs' : 'm'}>
                    <AnnenInntektSiste10MndSpørsmål
                        harHattAnnenInntekt={harHattAnnenInntektSiste10Mnd}
                        onChange={(value) =>
                            onChangeSøker({
                                harHattAnnenInntektSiste10Mnd: value
                            })
                        }
                    />
                </Block>
                {harHattAnnenInntektSiste10Mnd === true && (
                    <React.Fragment>
                        <Block margin="xs" visible={andreInntekterSiste10Mnd.length > 0}>
                            <List
                                data={andreInntekterSiste10Mnd}
                                renderElement={(annenInntekt: AnnenInntekt, index: number) => (
                                    <AndreInntekterListElement
                                        annenInntekt={annenInntekt}
                                        key={`annenInntekt-${index}`}
                                        onEdit={() => this.onEdit(annenInntekt, index)}
                                        onDelete={() => this.onDelete(annenInntekt)}
                                    />
                                )}
                            />
                        </Block>

                        <Block>
                            <Knapp onClick={() => this.openModal()} htmlType="button">
                                <FormattedMessage id="annenInntekt.leggTilInntekt" />
                            </Knapp>
                        </Block>
                    </React.Fragment>
                )}

                <AnnenInntektModal
                    isOpen={this.state.modalIsOpen}
                    onCancel={() =>
                        this.closeModal({
                            annenInntektIndex: undefined,
                            annenInntektToEdit: undefined
                        })
                    }
                    annenInntekt={annenInntektToEdit}
                    onSubmit={annenInntektToEdit ? this.onEditSubmit : this.onAdd}
                />
            </React.Fragment>
        );
    }
}
export default AndreInntekterBolk;
