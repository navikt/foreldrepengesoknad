import * as React from 'react';
import Modal, { ModalProps } from 'nav-frontend-modal';
import Landvelger from '../landvelger/Landvelger';
import './utenlandsoppholdModal.less';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import Knapp, { Hovedknapp } from 'nav-frontend-knapper';
import { Undertittel } from 'nav-frontend-typografi';
import {
    UtenlandsoppholdType,
    Utenlandsopphold,
    UtenlandsoppholdSkjemadataPartial
} from '../../types/søknad/InformasjonOmUtenlandsopphold';
import { Språkkode } from 'common/intl/types';
import Labeltekst from 'common/components/labeltekst/Labeltekst';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import Knapperad from 'common/components/knapperad/Knapperad';
import BEMHelper from 'common/util/bem';
import { TidsperiodeMedValgfriSluttdato } from 'common/types';
import TidsperiodeBolk from '../../bolker/TidsperiodeBolk';

export interface UtenlandsoppholdModalProps extends ModalProps {
    type: UtenlandsoppholdType;
    opphold?: Utenlandsopphold;
    språk: Språkkode;
    onAdd: (opphold: Utenlandsopphold) => void;
    onEdit: (opphold: Utenlandsopphold) => void;
}

type Props = UtenlandsoppholdModalProps & InjectedIntlProps;

interface State {
    opphold: UtenlandsoppholdSkjemadataPartial;
    editMode: boolean;
}

class UtenlandsoppholdModal extends React.Component<Props, State> {
    static getDerivedStateFromProps(props: Props) {
        return UtenlandsoppholdModal.buildStateFromProps(props);
    }

    static buildStateFromProps(props: Props) {
        const { opphold } = props;
        return {
            opphold: opphold ? { ...opphold } : { tidsperiode: {} },
            editMode: props.opphold !== undefined
        };
    }

    constructor(props: Props) {
        super(props);

        this.state = UtenlandsoppholdModal.buildStateFromProps(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    updateOpphold(oppholdProperties: UtenlandsoppholdSkjemadataPartial) {
        this.setState({
            opphold: {
                ...this.state.opphold,
                ...oppholdProperties
            }
        });
    }

    onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        event.stopPropagation();

        const { onAdd, onEdit } = this.props;
        const { opphold, editMode } = this.state;

        if (editMode) {
            onEdit(opphold as Utenlandsopphold);
        } else {
            onAdd(opphold as Utenlandsopphold);
        }
    }

    getTidsperiode() {
        const { opphold } = this.state;
        if (opphold.tidsperiode) {
            return opphold.tidsperiode;
        }
        return {};
    }

    getTidsperiodeDate(property: 'startdato' | 'sluttdato') {
        const { opphold } = this.state;
        const dateValue = opphold.tidsperiode && opphold.tidsperiode[property];
        if (dateValue) {
            return new Date(dateValue);
        }
        return undefined;
    }

    render() {
        const { type, språk, intl, onRequestClose, ...modalProps } = this.props;
        const { opphold } = this.state;

        const cls = BEMHelper('utenlandsoppholdModal');
        return (
            <Modal
                className={cls.className}
                onRequestClose={onRequestClose}
                {...modalProps}>
                <form onSubmit={this.onSubmit}>
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
                                språk={språk}
                                defaultValue={opphold.land}
                            />
                        )}
                    />

                    <TidsperiodeBolk
                        tidsperiode={opphold.tidsperiode || {}}
                        onChange={(
                            tidsperiode: TidsperiodeMedValgfriSluttdato
                        ) => this.updateOpphold({ tidsperiode })}
                    />

                    <Knapperad>
                        <Knapp
                            type="standard"
                            onClick={onRequestClose}
                            htmlType="button">
                            <FormattedMessage id="avbryt" />
                        </Knapp>
                        <Hovedknapp>
                            <FormattedMessage id="leggtil" />
                        </Hovedknapp>
                    </Knapperad>
                </form>
            </Modal>
        );
    }
}

export default injectIntl(UtenlandsoppholdModal);
