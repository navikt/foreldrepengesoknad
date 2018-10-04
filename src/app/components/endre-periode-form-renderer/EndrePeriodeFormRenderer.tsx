import * as React from 'react';
import {
    Periode,
    Periodetype,
    Utsettelsesperiode,
    Uttaksperiode,
    Oppholdsperiode,
    Overføringsperiode
} from '../../types/uttaksplan/periodetyper';
import BEMHelper from 'common/util/bem';
import { RecursivePartial } from '../../types/Partial';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { connect } from 'react-redux';
import { DispatchProps } from 'common/redux/types';
import søknadActionCreators from '../../redux/actions/søknad/søknadActionCreators';
import BekreftDialog from 'common/components/dialog/BekreftDialog';
import getMessage from 'common/util/i18nUtils';
import ValiderbarForm from 'common/lib/validation/elements/ValiderbarForm';

export interface OwnProps {
    periode: Periode;
    render: (onChange: EndrePeriodeChangeEvent, onRequestDelete: () => void) => {};
}

export type EndrePeriodeChangeEvent = (periode: RecursivePartial<Periode>) => void;
export type EndrePeriodeRequestDeleteEvent = () => void;

interface State {
    visBekreftSlettDialog: boolean;
}
const bem = BEMHelper('endrePeriodeForm');

type Props = OwnProps & DispatchProps & InjectedIntlProps;

class EndrePeriodeFormRenderer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onRequestDelete = this.onRequestDelete.bind(this);
        this.onCancelDelete = this.onCancelDelete.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.state = {
            visBekreftSlettDialog: false
        };
    }
    onChange(p: RecursivePartial<Periode>) {
        let updatedPeriode: Periode | undefined;
        const { periode, dispatch } = this.props;
        if (periode.type === Periodetype.Utsettelse) {
            updatedPeriode = { ...periode, ...(p as Utsettelsesperiode) };
        } else if (periode.type === Periodetype.Uttak) {
            updatedPeriode = { ...periode, ...(p as Uttaksperiode) };
        } else if (periode.type === Periodetype.Overføring) {
            updatedPeriode = {
                ...periode,
                ...(p as Overføringsperiode)
            };
        } else if (periode.type === Periodetype.Opphold) {
            updatedPeriode = { ...periode, ...(p as Oppholdsperiode) };
        }
        if (updatedPeriode !== undefined) {
            if (updatedPeriode.type !== this.props.periode.type) {
                updatedPeriode.vedlegg = [];
            }
            dispatch(søknadActionCreators.uttaksplanUpdatePeriode(updatedPeriode));
        }
    }
    onDelete() {
        this.props.dispatch(søknadActionCreators.uttaksplanDeletePeriode(this.props.periode));
    }
    onRequestDelete() {
        this.setState({ visBekreftSlettDialog: true });
    }
    onCancelDelete() {
        this.setState({ visBekreftSlettDialog: false });
    }
    render() {
        const { periode, render, intl } = this.props;
        return (
            <ValiderbarForm className={bem.className} validateBeforeSubmit={true}>
                {render(this.onChange, this.onRequestDelete)}
                <BekreftDialog
                    tittel={getMessage(intl, `endrePeriodeForm.bekreftSlettDialog.${periode.type}.tittel`)}
                    contentLabel={getMessage(intl, `endrePeriodeForm.bekreftSlettDialog.${periode.type}.tittel`)}
                    isOpen={this.state.visBekreftSlettDialog}
                    onBekreft={this.onDelete}
                    onRequestClose={this.onCancelDelete}
                    bekreftLabel={getMessage(intl, 'ja')}
                    avbrytLabel={getMessage(intl, 'nei')}>
                    <FormattedMessage id="endrePeriodeForm.bekreftSlettDialog.uttak.melding" />
                </BekreftDialog>
            </ValiderbarForm>
        );
    }
}

export default connect()(injectIntl(EndrePeriodeFormRenderer));
