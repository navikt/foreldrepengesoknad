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
import Block from 'common/components/block/Block';
import Knapperad from 'common/components/knapperad/Knapperad';
import BEMHelper from 'common/util/bem';
import { PeriodeAvgrensninger, Tidsperiode, TidsperiodeMedValgfriSluttdato } from 'common/types';
import TidsperiodeBolk, { DatoAvgrensninger, DatoValidatorer } from '../../bolker/tidsperiode-bolk/TidsperiodeBolk';
import { Validator } from 'common/lib/validation/types/index';
import { InjectedIntl, InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';
import ValiderbarForm from 'common/lib/validation/elements/ValiderbarForm';
import { DateValue } from '../../types/common';
import { hasValueRule } from '../../util/validation/common';

export interface AvgrensningGetters {
    getFraAvgrensning?: (date?: Date) => PeriodeAvgrensninger;
    getTilAvgrensning?: (date?: Date) => PeriodeAvgrensninger;
}

export interface ValidatorGetters {
    getFraRegler?: (d1: DateValue, d2: DateValue, list: Tidsperiode[], intl: InjectedIntl) => Validator[];
    getTilRegler?: (d1: DateValue, d2: DateValue, list: Tidsperiode[], intl: InjectedIntl) => Validator[];
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

export type UtenlandsoppholdModalPropsPartial = Partial<UtenlandsoppholdModalProps>;

interface State {
    oppholdToEdit: UtenlandsoppholdSkjemadataPartial | undefined;
    editMode: boolean;
}

class UtenlandsoppholdModal extends React.Component<UtenlandsoppholdModalProps, State> {
    static getDerivedStateFromProps(props: UtenlandsoppholdModalProps, state: State) {
        const { isOpen } = props;
        const oppholdToEdit = state.oppholdToEdit !== undefined && isOpen ? state.oppholdToEdit : props.oppholdToEdit;
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
        const { avgrensningGetters } = this.props;
        const { oppholdToEdit } = this.state;
        const tidsperiode = oppholdToEdit && oppholdToEdit.tidsperiode;

        if (avgrensningGetters) {
            const { getFraAvgrensning, getTilAvgrensning } = avgrensningGetters;
            return {
                fra: getFraAvgrensning && {
                    ...getFraAvgrensning(tidsperiode && tidsperiode.tom),
                    ugyldigeTidsperioder: this.getTidsperioder()
                },
                til: getTilAvgrensning && {
                    ...getTilAvgrensning(tidsperiode && tidsperiode.fom),
                    ugyldigeTidsperioder: this.getTidsperioder()
                }
            };
        }

        return {};
    }

    getTidsperiodeValidatorer(): DatoValidatorer {
        const { tidsperiodeValidators, intl } = this.props;
        const { oppholdToEdit } = this.state;

        const tidsperiode = oppholdToEdit && oppholdToEdit.tidsperiode;
        const ugyldigeTidsperioder = this.getTidsperioder();
        const startdato = tidsperiode && tidsperiode.fom;
        const sluttdato = tidsperiode && tidsperiode.tom;

        if (tidsperiodeValidators) {
            const { getFraRegler, getTilRegler } = tidsperiodeValidators;
            return {
                fra: getFraRegler && getFraRegler(startdato, sluttdato, ugyldigeTidsperioder, intl),
                til: getTilRegler && getTilRegler(sluttdato, startdato, ugyldigeTidsperioder, intl)
            };
        }

        return {};
    }

    getTidsperioder(): Tidsperiode[] {
        const { oppholdToEdit, oppholdList } = this.props;
        return oppholdList.filter((opphold) => opphold !== oppholdToEdit).map((opphold) => opphold.tidsperiode);
    }

    onRequestClose() {
        const { onRequestClose } = this.props;
        this.initializeEmptyState();
        onRequestClose();
    }

    render() {
        const { type, ...modalProps } = this.props;
        const { oppholdToEdit, editMode } = this.state;

        const cls = BEMHelper('utenlandsoppholdModal');

        return (
            <Modal className={cls.className} onRequestClose={this.onRequestClose} {...modalProps}>
                <ValiderbarForm onSubmit={this.onSubmit} noSummary={true}>
                    <Undertittel className={cls.element('title')}>
                        <FormattedMessage id={editMode ? 'utenlandsopphold.tittel.endre' : 'utenlandsopphold.tittel'} />
                    </Undertittel>
                    <Block margin="xs">
                        <Landvelger
                            label={<Labeltekst intlId={`utenlandsopphold.select.spørsmål.${type}`} />}
                            onChange={(land: string) => this.updateOpphold({ land })}
                            defaultValue={oppholdToEdit && oppholdToEdit.land}
                            validators={[hasValueRule(oppholdToEdit && oppholdToEdit.land, 'påkrevd')]}
                        />
                    </Block>
                    <Block margin="xs">
                        <TidsperiodeBolk
                            kalenderplassering="fullskjerm"
                            datoAvgrensninger={this.getTidsperiodeAvgrensninger()}
                            datoValidatorer={this.getTidsperiodeValidatorer()}
                            tidsperiode={(oppholdToEdit && oppholdToEdit.tidsperiode) || {}}
                            onChange={(tidsperiode: TidsperiodeMedValgfriSluttdato) =>
                                this.updateOpphold({ tidsperiode })
                            }
                        />
                    </Block>
                    <Knapperad style="mobile-50-50">
                        <Knapp type="standard" onClick={this.onRequestClose} htmlType="button" data-name="cancel">
                            <FormattedMessage id="avbryt" />
                        </Knapp>
                        <Hovedknapp data-name="leggTil">
                            <FormattedMessage id={editMode ? 'oppdater' : 'leggtil'} />
                        </Hovedknapp>
                    </Knapperad>
                </ValiderbarForm>
            </Modal>
        );
    }
}

export default injectIntl(UtenlandsoppholdModal);
