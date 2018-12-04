import * as React from 'react';
import Modal, { ModalProps } from 'nav-frontend-modal';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import Knapp, { Hovedknapp } from 'nav-frontend-knapper';
import { Undertittel } from 'nav-frontend-typografi';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import Knapperad from 'common/components/knapperad/Knapperad';
import { Checkbox } from 'nav-frontend-skjema';
import BEMHelper from 'common/util/bem';
import './frilansOppdragModal.less';
import TidsperiodeBolk from '../../bolker/tidsperiode-bolk/TidsperiodeBolk';
import { TidsperiodeMedValgfriSluttdato } from 'common/types';
import { FrilansOppdrag, FrilansOppdragPartial } from '../../types/søknad/FrilansInformasjon';
import { getAndreInntekterTidsperiodeAvgrensninger } from '../../util/validation/andreInntekter';
import Input from 'common/components/skjema/wrappers/Input';
import { getFritekstfeltRules } from '../../util/validation/fritekstfelt';

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

    onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        event.stopPropagation();

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
        const cls = BEMHelper('frilansOppdragModal');

        return (
            <Modal className={cls.className} onRequestClose={onRequestClose} {...modalProps}>
                <form onSubmit={this.onSubmit}>
                    <Undertittel className={cls.element('title')}>
                        <FormattedMessage id="frilansOppdrag.modal.tittel" />
                    </Undertittel>

                    <Block>
                        <Input
                            label={getMessage(intl, 'frilansOppdrag.modal.oppdragsgiver')}
                            value={oppdrag.navnPåArbeidsgiver || ''}
                            onChange={(value: string) =>
                                this.updateOppdrag({
                                    navnPåArbeidsgiver: value
                                })
                            }
                            name="oppdragsgiverNavn"
                            validators={getFritekstfeltRules({ maxLength: 100 }, intl, oppdrag.navnPåArbeidsgiver)}
                        />
                    </Block>

                    <Block>
                        <TidsperiodeBolk
                            tidsperiode={oppdrag.tidsperiode || {}}
                            onChange={(tidsperiode: TidsperiodeMedValgfriSluttdato) =>
                                this.updateOppdrag({ tidsperiode })
                            }
                            kalenderplassering="fullskjerm"
                            sluttdatoDisabled={oppdrag.pågående}
                            datoAvgrensninger={getAndreInntekterTidsperiodeAvgrensninger(oppdrag.tidsperiode)}
                        />
                    </Block>

                    <Block>
                        <Checkbox
                            checked={oppdrag.pågående || false}
                            label={getMessage(intl, 'pågående')}
                            onChange={() => {
                                this.updateOppdrag({
                                    pågående: !oppdrag.pågående,
                                    tidsperiode: {
                                        ...oppdrag.tidsperiode,
                                        tom: undefined
                                    }
                                });
                            }}
                        />
                    </Block>

                    <Knapperad>
                        <Knapp type="standard" onClick={onRequestClose} htmlType="button">
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

export default injectIntl(FrilansOppdragModal);
