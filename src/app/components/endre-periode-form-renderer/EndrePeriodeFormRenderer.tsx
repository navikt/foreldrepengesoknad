import * as React from 'react';
import {
    Oppholdsperiode,
    Overføringsperiode,
    Periode,
    Periodetype,
    Utsettelsesperiode,
    Uttaksperiode
} from '../../types/uttaksplan/periodetyper';
import BEMHelper from 'common/util/bem';
import { RecursivePartial } from '../../types/Partial';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { DispatchProps } from 'common/redux/types';
import søknadActionCreators from '../../redux/actions/søknad/søknadActionCreators';
import BekreftDialog from 'common/components/dialog/BekreftDialog';
import getMessage from 'common/util/i18nUtils';
import ValiderbarForm from 'common/lib/validation/elements/ValiderbarForm';
import PeriodeCleanup from '../../util/cleanup/periodeCleanup';
import Søknad from '../../types/søknad/Søknad';
import { AppState } from '../../redux/reducers';

export interface OwnProps {
    periode: Periode;
    render: (onChange: EndrePeriodeChangeEvent, onRequestDelete: () => void) => {};
}
interface StateProps {
    søknad: Søknad;
}

export type EndrePeriodeChangeEvent = (periode: RecursivePartial<Periode>) => void;
export type EndrePeriodeRequestDeleteEvent = () => void;

interface State {
    visBekreftSlettDialog: boolean;
}
const bem = BEMHelper('endrePeriodeForm');

type Props = StateProps & OwnProps & DispatchProps & InjectedIntlProps;

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
        const { søker, annenForelder } = this.props.søknad;
        const { periode, dispatch } = this.props;
        if (periode.type === Periodetype.Utsettelse) {
            updatedPeriode = {
                ...periode,
                ...(p as Utsettelsesperiode)
            };
            updatedPeriode = PeriodeCleanup.cleanupUtsettelse(updatedPeriode, søker, annenForelder);
        } else if (periode.type === Periodetype.Uttak) {
            updatedPeriode = {
                ...periode,
                ...(p as Uttaksperiode)
            };
            updatedPeriode = PeriodeCleanup.cleanupUttak(updatedPeriode, søker);
        } else if (periode.type === Periodetype.Overføring) {
            updatedPeriode = {
                ...periode,
                ...(p as Overføringsperiode)
            };
            updatedPeriode = PeriodeCleanup.cleanupOverføring(periode);
        } else if (periode.type === Periodetype.Opphold) {
            updatedPeriode = { ...periode, ...(p as Oppholdsperiode) };
            updatedPeriode = PeriodeCleanup.cleanupOpphold(periode);
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

const mapStateToProps = (state: AppState): StateProps => ({
    søknad: state.søknad
});

export default connect(mapStateToProps)(injectIntl(EndrePeriodeFormRenderer));
