import * as React from 'react';
import { AnnenInntekt, AnnenInntektType, JobbIUtlandetInntekt } from '../types/søknad/AnnenInntekt';
import { Knapp } from 'nav-frontend-knapper';
import AnnenInntektModal from '../components/annen-inntekt-modal/AnnenInntektModal';
import { prettifyTidsperiode } from '../util/dates/dates';
import List from '../components/list/List';
import {
    InteractiveListElementProps,
    default as InteractiveListElement
} from '../components/interactive-list-element/InteractiveListElement';
import Block from 'common/components/block/Block';
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';
import getMessage from 'common/util/i18nUtils';

interface AndreInntekterBolkProps {
    renderSpørsmål: () => JSX.Element;
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
        const { renderSpørsmål, showAndreInntekterPeriodeContent, andreInntekterSiste10Mnd } = this.props;

        const { annenInntektToEdit } = this.state;
        const ListElement = injectIntl(AndreInntekterListeElement);

        return (
            <React.Fragment>
                {renderSpørsmål()}
                {showAndreInntekterPeriodeContent && (
                    <React.Fragment>
                        <Block margin="xs">
                            <List
                                data={andreInntekterSiste10Mnd}
                                renderElement={(annenInntekt: AnnenInntekt, index: number) => (
                                    <ListElement
                                        annenInntekt={annenInntekt}
                                        key={`annenInntekt-${index}`}
                                        onEdit={() => this.onEdit(annenInntekt, index)}
                                        onDelete={() => this.onDelete(annenInntekt)}
                                    />
                                )}
                            />
                        </Block>

                        <Block margin="s">
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

interface AndreInntekterListeElementProps extends InteractiveListElementProps {
    annenInntekt: AnnenInntekt;
}

const AndreInntekterListeElement: React.StatelessComponent<AndreInntekterListeElementProps & InjectedIntlProps> = ({
    annenInntekt,
    intl,
    ...rest
}) => {
    const { type, tidsperiode, vedlegg } = annenInntekt;
    const inntektstypeSkalHaVedlegg = type !== AnnenInntektType.LØNN_VED_VIDEREUTDANNING;
    const harVedlegg = vedlegg !== undefined && vedlegg.length > 0;
    const intlKey = 'inntektstype.';
    let title = `${type}`;

    if (type === AnnenInntektType.JOBB_I_UTLANDET) {
        const arbeidsgiver = (annenInntekt as JobbIUtlandetInntekt).arbeidsgiverNavn;
        title = `${getMessage(intl, `${intlKey}${type.toLowerCase()}`)} (${arbeidsgiver})`;
    } else {
        title = getMessage(intl, `${intlKey}${type.toLowerCase()}`);
    }

    const deleteLinkText = getMessage(intl, 'slett.periode');
    const dokVedlagt = getMessage(intl, 'dokumentasjon.vedlagt');
    const dokMangler = getMessage(intl, 'dokumentasjon.mangler');

    return (
        <InteractiveListElement
            title={title}
            text={prettifyTidsperiode(tidsperiode)}
            deleteLinkText={deleteLinkText}
            etikettProps={
                inntektstypeSkalHaVedlegg
                    ? {
                          type: harVedlegg ? 'suksess' : 'fokus',
                          children: harVedlegg ? dokVedlagt : dokMangler
                      }
                    : undefined
            }
            {...rest}
        />
    );
};

export default AndreInntekterBolk;
