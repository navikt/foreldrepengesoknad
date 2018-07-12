import * as React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { FormattedMessage } from 'react-intl';
import InteractiveList from '../components/interactive-list/InteractiveList';
import {
    UtenlandsoppholdType,
    Utenlandsopphold
} from '../types/søknad/InformasjonOmUtenlandsopphold';
import UtenlandsoppholdModal, {
    UtenlandsoppholdModalPropsPartial
} from '../components/utenlandsopphold-modal/UtenlandsoppholdModal';
import { ISODateToPrettyDateFormat } from '../util/dates/dates';
import * as countries from 'i18n-iso-countries';

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
        this.closeModal({
            oppholdToEdit: undefined,
            oppholdIndex: undefined
        });
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

    closeModal(otherState: UtenlandsoppholdBolkStatePartial = {}) {
        this.setState({
            ...otherState,
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

        return (
            <React.Fragment>
                {renderSpørsmål()}
                {showUtenlandsoppholdContent && (
                    <React.Fragment>
                        <div className="blokk-xs">
                            <h4>{oppfølgingsspørsmål}</h4>
                        </div>

                        <div className="blokk-xs">
                            <InteractiveList
                                data={opphold}
                                onSelect={this.onOppholdSelect}
                                onDelete={this.onOppholdDelete}
                                renderElement={(
                                    oppholdToRender: Utenlandsopphold
                                ) => (
                                    <OppholdListeElement
                                        opphold={oppholdToRender}
                                    />
                                )}
                                deleteAriaLabel="Slett utenlandsopphold"
                            />
                        </div>

                        <div className="blokk-s">
                            <Knapp
                                onClick={() => this.openModal()}
                                htmlType="button">
                                <FormattedMessage id="utenlandsopphold.leggTilLand" />
                            </Knapp>
                        </div>
                    </React.Fragment>
                )}

                <UtenlandsoppholdModal
                    type={oppholdType}
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={() =>
                        this.closeModal({
                            oppholdIndex: undefined,
                            oppholdToEdit: undefined
                        })
                    }
                    contentLabel={`Landvelger for ${oppholdType}`}
                    children={null}
                    opphold={oppholdToEdit}
                    onAdd={this.onAdd}
                    onEdit={this.onEdit}
                    {...utenlandsoppholdModalProps || {}}
                />
            </React.Fragment>
        );
    }
}

interface OppholdListeElementProps {
    opphold: Utenlandsopphold;
}

const OppholdListeElement: React.StatelessComponent<
    OppholdListeElementProps
> = ({ opphold }) => (
    <React.Fragment>
        <div className="interactiveList__element__land">
            {countries.getName(opphold.land, 'nb')}
        </div>
        <div className="interactiveList__element__dato">
            <FormattedMessage
                id="tidsintervall"
                values={{
                    fom: ISODateToPrettyDateFormat(
                        opphold.tidsperiode.startdato
                    ),
                    tom: ISODateToPrettyDateFormat(
                        opphold.tidsperiode.sluttdato
                    )
                }}
            />
        </div>
    </React.Fragment>
);

export default UtenlandsoppholdBolk;
