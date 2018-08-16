import * as React from 'react';
import {
    AnnenInntekt,
    AnnenInntektType,
    JobbIUtlandetInntekt
} from '../types/søknad/AnnenInntekt';
import { Knapp } from 'nav-frontend-knapper';
import AnnenInntektModal from '../components/annen-inntekt-modal/AnnenInntektModal';
import { prettifyTidsperiode } from '../util/dates/dates';
import List from '../components/list/List';
import ListElement from '../components/list-element/ListElement';
import Block from 'common/components/block/Block';
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';
import getMessage from 'common/util/i18nUtils';

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
        this.onSelect = this.onSelect.bind(this);

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

    onSelect(annenInntektToEdit: AnnenInntekt, annenInntektIndex: number) {
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
        const InntektListElement = injectIntl(AndreInntekterListeElement);

        return (
            <React.Fragment>
                {renderSpørsmål()}
                {showAndreInntekterPeriodeContent && (
                    <React.Fragment>
                        <Block margin="xs">
                            <h4>{oppfølgingsspørsmål}</h4>
                        </Block>

                        <Block margin="xs">
                            <List
                                data={andreInntekterSiste10Mnd}
                                renderElement={(
                                    annenInntekt: AnnenInntekt,
                                    index: number
                                ) => (
                                    <InntektListElement
                                        annenInntekt={annenInntekt}
                                        key={`annenInntekt-${index}`}
                                    />
                                )}
                            />
                        </Block>

                        <Block margin="s">
                            <Knapp
                                onClick={() => this.openModal()}
                                htmlType="button">
                                <FormattedMessage id="annenInntekt.leggTilInntekt" />
                            </Knapp>
                        </Block>
                    </React.Fragment>
                )}

                <AnnenInntektModal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={() =>
                        this.closeModal({
                            annenInntektIndex: undefined,
                            annenInntektToEdit: undefined
                        })
                    }
                    contentLabel="Ny periode med annen inntekt"
                    children={null}
                    annenInntekt={annenInntektToEdit}
                    onAdd={this.onAdd}
                    onEdit={this.onEdit}
                    editMode={annenInntektToEdit !== undefined}
                />
            </React.Fragment>
        );
    }
}

interface AndreInntekterListeElementProps {
    annenInntekt: AnnenInntekt;
}

const AndreInntekterListeElement: React.StatelessComponent<
    AndreInntekterListeElementProps & InjectedIntlProps
> = ({ annenInntekt, intl }) => {
    const { type, tidsperiode } = annenInntekt;
    const intlKey = 'inntektstype.';
    let title = `${type}`;

    if (type === AnnenInntektType.JOBB_I_UTLANDET) {
        const arbeidsgiver = (annenInntekt as JobbIUtlandetInntekt)
            .arbeidsgiverNavn;
        title = `${getMessage(
            intl,
            `${intlKey}${type.toLowerCase()}`
        )} (${arbeidsgiver})`;
    } else {
        title = getMessage(intl, `${intlKey}${type.toLowerCase()}`);
    }

    return (
        <ListElement
            title={title}
            text={prettifyTidsperiode(tidsperiode)}
            deleteLinkText={'Slett periode'}
        />
    );
};

export default AndreInntekterBolk;
