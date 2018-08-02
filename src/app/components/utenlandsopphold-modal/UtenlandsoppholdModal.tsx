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
import { TidsperiodeMedValgfriSluttdato } from 'common/types';
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
        intl: InjectedIntl
    ) => Validator[];
    getTilRegler?: (
        d1: Date | undefined,
        d2: Date | undefined,
        intl: InjectedIntl
    ) => Validator[];
}

interface Props extends ModalProps {
    type: UtenlandsoppholdType;
    opphold?: Utenlandsopphold;
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
    opphold: UtenlandsoppholdSkjemadataPartial;
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
        const opphold = props.opphold ? props.opphold : state && state.opphold;
        return {
            opphold: opphold ? { ...opphold } : { tidsperiode: {} },
            editMode: props.opphold !== undefined
        };
    }

    constructor(props: UtenlandsoppholdModalProps) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onRequestClose = this.onRequestClose.bind(this);
    }

    updateOpphold(oppholdProperties: UtenlandsoppholdSkjemadataPartial) {
        this.setState({
            opphold: {
                ...this.state.opphold,
                ...oppholdProperties
            }
        });
    }

    onSubmit() {
        const { onAdd, onEdit } = this.props;
        const { opphold, editMode } = this.state;

        if (editMode) {
            onEdit(opphold as Utenlandsopphold);
        } else {
            onAdd(opphold as Utenlandsopphold);
        }
    }

    getTidsperiodeAvgrensninger(): DatoAvgrensninger {
        const { avgrensningGetters } = this.props;
        const { opphold } = this.state;
        const tidsperiode = opphold && opphold.tidsperiode;

        if (avgrensningGetters) {
            const { getFraAvgrensning, getTilAvgrensning } = avgrensningGetters;
            return {
                fra:
                    getFraAvgrensning &&
                    getFraAvgrensning(tidsperiode && tidsperiode.sluttdato),
                til:
                    getTilAvgrensning &&
                    getTilAvgrensning(tidsperiode && tidsperiode.startdato)
            };
        }

        return {};
    }

    getTidsperiodeValidatorer(): DatoValidatorer {
        const { tidsperiodeValidators, intl } = this.props;
        const { opphold } = this.state;

        const tidsperiode = opphold && opphold.tidsperiode;
        const startdato = tidsperiode && tidsperiode.startdato;
        const sluttdato = tidsperiode && tidsperiode.sluttdato;

        if (tidsperiodeValidators) {
            const { getFraRegler, getTilRegler } = tidsperiodeValidators;
            return {
                fra: getFraRegler && getFraRegler(startdato, sluttdato, intl),
                til: getTilRegler && getTilRegler(sluttdato, startdato, intl)
            };
        }

        return {};
    }

    onRequestClose() {
        const { onRequestClose } = this.props;
        this.setState({
            opphold: {}
        });
        onRequestClose();
    }

    render() {
        const { type, ...modalProps } = this.props;
        const { opphold } = this.state;

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
                                defaultValue={opphold.land}
                            />
                        )}
                    />

                    <Bolk
                        render={() => (
                            <TidsperiodeBolk
                                datoAvgrensninger={this.getTidsperiodeAvgrensninger()}
                                datoValidatorer={this.getTidsperiodeValidatorer()}
                                tidsperiode={opphold.tidsperiode || {}}
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
