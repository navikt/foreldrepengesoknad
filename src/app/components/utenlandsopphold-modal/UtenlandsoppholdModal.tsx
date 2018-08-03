import * as React from 'react';
import Modal, { ModalProps } from 'nav-frontend-modal';
import Landvelger from '../landvelger/Landvelger';
import './utenlandsoppholdModal.less';
import Knapp, { Hovedknapp } from 'nav-frontend-knapper';
import { Undertittel } from 'nav-frontend-typografi';
import {
    UtenlandsoppholdType,
    Utenlandsopphold,
    UtenlandsoppholdSkjemadataPartial
} from '../../types/søknad/InformasjonOmUtenlandsopphold';
import Labeltekst from 'common/components/labeltekst/Labeltekst';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import Knapperad from 'common/components/knapperad/Knapperad';
import BEMHelper from 'common/util/bem';
import { Tidsperiode, TidsperiodeMedValgfriSluttdato } from 'common/types';
import TidsperiodeBolk, {
    DatoAvgrensninger,
    DatoValidatorer
} from '../../bolker/TidsperiodeBolk';
import Bolk from '../../../common/components/bolk/Bolk';
import { Avgrensninger } from 'nav-datovelger';
import { Validator } from 'common/lib/validation/types';
import {
    InjectedIntl,
    InjectedIntlProps,
    injectIntl,
    FormattedMessage
} from 'react-intl';
import ValidForm from 'common/lib/validation/ValidForm';

export interface AvgrensningGetters {
    getFraAvgrensning?: (date?: Date) => Avgrensninger;
    getTilAvgrensning?: (date?: Date) => Avgrensninger;
}

export interface ValidatorGetters {
    getFraRegler?: (
        d1: Date | undefined,
        d2: Date | undefined,
        list: Tidsperiode[],
        intl: InjectedIntl
    ) => Validator[];
    getTilRegler?: (
        d1: Date | undefined,
        d2: Date | undefined,
        list: Tidsperiode[],
        intl: InjectedIntl
    ) => Validator[];
}

interface Props extends ModalProps {
    type: UtenlandsoppholdType;
    oppholdToEdit?: Utenlandsopphold;
    oppholdList: Utenlandsopphold[];
    onAdd: (opphold: Utenlandsopphold) => void;
    onEdit: (opphold: Utenlandsopphold) => void;
    avgrensningGetters?: AvgrensningGetters;
    tidsperiodeValidators?: ValidatorGetters;
}

export type UtenlandsoppholdModalProps = Props & InjectedIntlProps;

export type UtenlandsoppholdModalPropsPartial = Partial<
    UtenlandsoppholdModalProps
>;

interface State {
    oppholdToEdit: UtenlandsoppholdSkjemadataPartial | undefined;
    editMode: boolean;
}

class UtenlandsoppholdModal extends React.Component<
    UtenlandsoppholdModalProps,
    State
> {
    static getDerivedStateFromProps(
        props: UtenlandsoppholdModalProps,
        state: State
    ) {
        const { isOpen } = props;
        const oppholdToEdit =
            state.oppholdToEdit !== undefined && isOpen
                ? state.oppholdToEdit
                : props.oppholdToEdit;
        return {
            oppholdToEdit,
            editMode: props.oppholdToEdit !== undefined
        };
    }

    constructor(props: UtenlandsoppholdModalProps) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onRequestClose = this.onRequestClose.bind(this);
        this.initializeEmptyState = this.initializeEmptyState.bind(this);

        this.state = {
            oppholdToEdit: {},
            editMode: false
        };
    }

    updateOpphold(oppholdProperties: UtenlandsoppholdSkjemadataPartial) {
        this.setState({
            oppholdToEdit: {
                ...this.state.oppholdToEdit,
                ...oppholdProperties
            }
        });
    }

    initializeEmptyState() {
        this.setState({
            oppholdToEdit: undefined
        });
    }

    onSubmit() {
        const { onAdd, onEdit } = this.props;
        const { oppholdToEdit, editMode } = this.state;

        if (editMode) {
            onEdit(oppholdToEdit as Utenlandsopphold);
        } else {
            onAdd(oppholdToEdit as Utenlandsopphold);
        }

        this.initializeEmptyState();
    }

    getTidsperiodeAvgrensninger(): DatoAvgrensninger {
        const { avgrensningGetters, oppholdList } = this.props;
        const { oppholdToEdit } = this.state;
        const tidsperiode = oppholdToEdit && oppholdToEdit.tidsperiode;

        if (avgrensningGetters) {
            const { getFraAvgrensning, getTilAvgrensning } = avgrensningGetters;
            return {
                fra: getFraAvgrensning && {
                    ...getFraAvgrensning(tidsperiode && tidsperiode.sluttdato),
                    ugyldigeTidsperioder: this.getTidsperioder(oppholdList)
                },
                til: getTilAvgrensning && {
                    ...getTilAvgrensning(tidsperiode && tidsperiode.startdato),
                    ugyldigeTidsperioder: this.getTidsperioder(oppholdList)
                }
            };
        }

        return {};
    }

    getTidsperiodeValidatorer(): DatoValidatorer {
        const { oppholdList, tidsperiodeValidators, intl } = this.props;
        const { oppholdToEdit } = this.state;

        const tidsperiode = oppholdToEdit && oppholdToEdit.tidsperiode;
        const ugyldigeTidsperioder = this.getTidsperioder(oppholdList);
        const startdato = tidsperiode && tidsperiode.startdato;
        const sluttdato = tidsperiode && tidsperiode.sluttdato;

        if (tidsperiodeValidators) {
            const { getFraRegler, getTilRegler } = tidsperiodeValidators;
            return {
                fra:
                    getFraRegler &&
                    getFraRegler(
                        startdato,
                        sluttdato,
                        ugyldigeTidsperioder,
                        intl
                    ),
                til:
                    getTilRegler &&
                    getTilRegler(
                        sluttdato,
                        startdato,
                        ugyldigeTidsperioder,
                        intl
                    )
            };
        }

        return {};
    }

    getTidsperioder(opphold: Utenlandsopphold[]): Tidsperiode[] {
        return opphold.map((currentOpphold) => currentOpphold.tidsperiode);
    }

    onRequestClose() {
        const { onRequestClose } = this.props;
        this.initializeEmptyState();
        onRequestClose();
    }

    render() {
        const { type, ...modalProps } = this.props;
        const { oppholdToEdit } = this.state;

        const cls = BEMHelper('utenlandsoppholdModal');

        return (
            <Modal
                className={cls.className}
                onRequestClose={this.onRequestClose}
                {...modalProps}>
                <ValidForm onSubmit={this.onSubmit} noSummary={true}>
                    <Undertittel className={cls.element('title')}>
                        <FormattedMessage id="utenlandsopphold.tittel" />
                    </Undertittel>

                    <Spørsmål
                        render={() => (
                            <Landvelger
                                label={
                                    <Labeltekst
                                        intlId={`utenlandsopphold.select.spørsmål.${type}`}
                                    />
                                }
                                onChange={(land: string) =>
                                    this.updateOpphold({ land })
                                }
                                defaultValue={
                                    oppholdToEdit && oppholdToEdit.land
                                }
                            />
                        )}
                    />

                    <Bolk
                        render={() => (
                            <TidsperiodeBolk
                                datoAvgrensninger={this.getTidsperiodeAvgrensninger()}
                                datoValidatorer={this.getTidsperiodeValidatorer()}
                                tidsperiode={
                                    (oppholdToEdit &&
                                        oppholdToEdit.tidsperiode) ||
                                    {}
                                }
                                onChange={(
                                    tidsperiode: TidsperiodeMedValgfriSluttdato
                                ) => this.updateOpphold({ tidsperiode })}
                            />
                        )}
                    />

                    <Knapperad>
                        <Knapp
                            type="standard"
                            onClick={this.onRequestClose}
                            htmlType="button">
                            <FormattedMessage id="avbryt" />
                        </Knapp>
                        <Hovedknapp>
                            <FormattedMessage id="leggtil" />
                        </Hovedknapp>
                    </Knapperad>
                </ValidForm>
            </Modal>
        );
    }
}

export default injectIntl(UtenlandsoppholdModal);
