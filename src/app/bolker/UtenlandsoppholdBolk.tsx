import * as React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import {
    UtenlandsoppholdType,
    Utenlandsopphold
} from '../types/søknad/InformasjonOmUtenlandsopphold';
import UtenlandsoppholdModal, {
    UtenlandsoppholdModalPropsPartial
} from '../components/utenlandsopphold-modal/UtenlandsoppholdModal';
import { prettifyTidsperiode } from '../util/dates/dates';
import * as countries from 'i18n-iso-countries';
import Block from 'common/components/block/Block';
import List from '../components/list/List';
import InteractiveListElement, {
    InteractiveListElementProps
} from '../components/interactive-list-element/InteractiveListElement';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';

interface UtenlandsoppholdBolkProps {
    renderSpørsmål: () => JSX.Element;
    showUtenlandsoppholdContent: boolean;
    oppfølgingsspørsmål: string;
    opphold: Utenlandsopphold[];
    oppholdType: UtenlandsoppholdType;
    onChange: (perioder: Utenlandsopphold[]) => void;
    utenlandsoppholdModalProps?: UtenlandsoppholdModalPropsPartial;
}

interface UtenlandsoppholdBolkState {
    modalIsOpen: boolean;
    oppholdToEdit?: Utenlandsopphold;
    oppholdIndex?: number;
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
        this.onOppholdDelete = this.onOppholdDelete.bind(this);
        this.onOppholdSelect = this.onOppholdSelect.bind(this);

        this.state = {
            modalIsOpen: false
        };
    }

    onAdd(oppholdToAdd: Utenlandsopphold) {
        const { opphold, onChange } = this.props;
        onChange([...opphold, oppholdToAdd]);
        this.closeModal();
    }

    onEdit(oppholdToEdit: Utenlandsopphold) {
        const { opphold, onChange } = this.props;
        const { oppholdIndex } = this.state;
        const editedOppholdList = opphold.slice();
        if (oppholdIndex !== undefined && oppholdIndex >= 0) {
            editedOppholdList[oppholdIndex] = oppholdToEdit;
            onChange(editedOppholdList);
        }
        this.closeModal();
    }

    onOppholdDelete(oppholdToDelete: Utenlandsopphold) {
        const { opphold, onChange } = this.props;
        const editedPerioder = opphold.slice();
        editedPerioder.splice(editedPerioder.indexOf(oppholdToDelete), 1);
        onChange(editedPerioder);
    }

    onOppholdSelect(oppholdToEdit: Utenlandsopphold, oppholdIndex: number) {
        this.openModal({
            oppholdToEdit,
            oppholdIndex
        });
    }

    openModal(otherState: UtenlandsoppholdBolkStatePartial = {}) {
        this.setState({
            ...otherState,
            modalIsOpen: true
        });
    }

    closeModal() {
        this.setState({
            oppholdToEdit: undefined,
            oppholdIndex: undefined,
            modalIsOpen: false
        });
    }

    render() {
        const {
            renderSpørsmål,
            showUtenlandsoppholdContent,
            oppfølgingsspørsmål,
            opphold,
            oppholdType,
            utenlandsoppholdModalProps
        } = this.props;
        const { oppholdToEdit } = this.state;

        const ListElement = injectIntl(OppholdListeElement);
        return (
            <React.Fragment>
                {renderSpørsmål()}
                {showUtenlandsoppholdContent && (
                    <React.Fragment>
                        <Block margin="xs">
                            <h4>{oppfølgingsspørsmål}</h4>
                            <List
                                data={opphold}
                                renderElement={(
                                    oppholdToRender: Utenlandsopphold,
                                    index: number
                                ) => (
                                    <ListElement
                                        opphold={oppholdToRender}
                                        onEdit={() =>
                                            this.onOppholdSelect(
                                                oppholdToRender,
                                                index
                                            )
                                        }
                                        onDelete={() =>
                                            this.onOppholdDelete(
                                                oppholdToRender
                                            )
                                        }
                                        key={JSON.stringify(oppholdToRender)}
                                    />
                                )}
                            />
                        </Block>

                        <Knapp
                            onClick={() => this.openModal()}
                            htmlType="button">
                            <FormattedMessage id="utenlandsopphold.leggTilLand" />
                        </Knapp>
                    </React.Fragment>
                )}

                <UtenlandsoppholdModal
                    type={oppholdType}
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={() => this.closeModal()}
                    contentLabel={`Landvelger for ${oppholdType}`}
                    children={null}
                    oppholdToEdit={oppholdToEdit}
                    oppholdList={opphold}
                    onAdd={this.onAdd}
                    onEdit={this.onEdit}
                    {...utenlandsoppholdModalProps || {}}
                />
            </React.Fragment>
        );
    }
}

interface OppholdListeElementProps extends InteractiveListElementProps {
    opphold: Utenlandsopphold;
}

const OppholdListeElement: React.StatelessComponent<
    OppholdListeElementProps & InjectedIntlProps
> = ({ opphold, intl, ...rest }) => {
    const deleteLinKText = getMessage(intl, 'slett.utenlandsopphold');
    return (
        <InteractiveListElement
            title={countries.getName(opphold.land, 'nb')}
            text={prettifyTidsperiode(opphold.tidsperiode)}
            deleteLinkText={deleteLinKText}
            {...rest}
        />
    );
};

export default UtenlandsoppholdBolk;
