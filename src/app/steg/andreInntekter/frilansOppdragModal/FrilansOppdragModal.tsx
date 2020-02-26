import * as React from 'react';
import { ModalProps } from 'nav-frontend-modal';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import TidsperiodeBolk from '../../../components/skjema/tidsperiodeBolk/TidsperiodeBolk';
import { TidsperiodeMedValgfriSluttdato } from 'common/types';
import { FrilansOppdrag, FrilansOppdragPartial } from '../../../types/søknad/FrilansInformasjon';
import { getAndreInntekterTidsperiodeAvgrensninger } from '../../../util/validation/andreInntekter';
import Input from 'common/components/skjema/wrappers/Input';
import { getFritekstfeltRules } from '../../../util/validation/fritekstfelt';
import { hasValueRule } from '../../../util/validation/common';
import ModalForm from 'common/components/modalForm/ModalForm';
import Block from 'common/components/block/Block';

export interface FrilansOppdragModalProps extends ModalProps {
    oppdrag?: FrilansOppdrag;
    editMode: boolean;
    onAdd: (oppdrag: FrilansOppdrag) => void;
    onEdit: (oppdrag: FrilansOppdrag) => void;
}

type Props = FrilansOppdragModalProps & InjectedIntlProps;

interface State {
    oppdrag: FrilansOppdragPartial;
}

class FrilansOppdragModal extends React.Component<Props, State> {
    static getDerivedStateFromProps(props: Props, state: State) {
        return FrilansOppdragModal.buildStateFromProps(props, state);
    }

    static buildStateFromProps(props: Props, state?: State) {
        const { isOpen } = props;

        if (!isOpen) {
            return { oppdrag: props.oppdrag || {} };
        } else {
            return {
                oppdrag:
                    state && state.oppdrag && Object.keys(state.oppdrag).length > 0
                        ? state.oppdrag
                        : props.oppdrag || {}
            };
        }
    }

    constructor(props: Props) {
        super(props);

        this.state = FrilansOppdragModal.buildStateFromProps(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    updateOppdrag(oppdragProperties: FrilansOppdragPartial) {
        this.setState({
            oppdrag: {
                ...this.state.oppdrag,
                ...oppdragProperties
            }
        });
    }

    onSubmit(): void {
        const { onAdd, onEdit, editMode } = this.props;
        const { oppdrag } = this.state;

        if (editMode) {
            onEdit(oppdrag as FrilansOppdrag);
        } else {
            onAdd(oppdrag as FrilansOppdrag);
        }
    }

    render() {
        const { intl, onRequestClose, ...modalProps } = this.props;
        const { oppdrag } = this.state;
        const tidsperiode = oppdrag.tidsperiode !== undefined ? oppdrag.tidsperiode : {};

        return (
            <ModalForm
                title={getMessage(intl, 'frilansOppdrag.modal.tittel')}
                renderFormButtons={true}
                onSubmit={this.onSubmit}
                noSummary={true}
                onRequestClose={onRequestClose}
                submitLabel={getMessage(intl, 'leggtil')}
                cancelLabel={getMessage(intl, 'avbryt')}
                {...modalProps}
            >
                <Block margin="xs">
                    <Input
                        label={getMessage(intl, 'frilansOppdrag.modal.oppdragsgiver')}
                        value={oppdrag.navnPåArbeidsgiver || ''}
                        onChange={(value: string) =>
                            this.updateOppdrag({
                                navnPåArbeidsgiver: value
                            })
                        }
                        name="oppdragsgiverNavn"
                        validators={[
                            hasValueRule(oppdrag.navnPåArbeidsgiver, getMessage(intl, 'påkrevd')),
                            ...getFritekstfeltRules({ maxLength: 100 }, intl, oppdrag.navnPåArbeidsgiver)
                        ]}
                    />
                </Block>

                <Block margin="xxs">
                    <TidsperiodeBolk
                        tidsperiode={tidsperiode || {}}
                        pågående={tidsperiode.pågående}
                        visPågåendePeriodeCheckbox={true}
                        onChange={(changedTidsperiode: TidsperiodeMedValgfriSluttdato) =>
                            this.updateOppdrag({ tidsperiode: changedTidsperiode })
                        }
                        kalenderplassering="fullskjerm"
                        datoAvgrensninger={getAndreInntekterTidsperiodeAvgrensninger(oppdrag.tidsperiode)}
                    />
                </Block>
            </ModalForm>
        );
    }
}

export default injectIntl(FrilansOppdragModal);
