import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { Knapp } from 'nav-frontend-knapper';
import { AppState } from '../../redux/reducers';
import { DispatchProps } from 'common/redux/types';
import { Periode, Periodetype, StønadskontoType, Uttaksperiode } from '../../types/uttaksplan/periodetyper';
import { RecursivePartial } from '../../types/Partial';
import { UtsettelseSpørsmålVisibility } from '../utsettelse-form/utsettelseFormConfig';
import { UttakSpørsmålVisibility } from '../uttak-form/uttakFormConfig';
import BekreftDialog from 'common/components/dialog/BekreftDialog';
import BEMHelper from 'common/util/bem';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import LinkButton from '../link-button/LinkButton';
import PeriodeCleanup from '../../util/cleanup/periodeCleanup';
import søknadActionCreators from '../../redux/actions/søknad/søknadActionCreators';
import UtsettelseForm from '../utsettelse-form/UtsettelseForm';
import UttakForm from '../uttak-form/UttakForm';
import ValiderbarForm from 'common/lib/validation/elements/ValiderbarForm';
import { Søknadsinfo } from 'app/selectors/types';
import { selectSøknadsinfo } from 'app/selectors/søknadsinfoSelector';
import { VeilederMessage } from '../veileder-info/types';
import VeilederMeldinger from '../veileder-info/VeilederMeldinger';

import './endrePeriodeForm.less';

export type EndrePeriodeChangeEvent = (
    periode: RecursivePartial<Periode>,
    replace: boolean,
    visibility: UtsettelseSpørsmålVisibility | UttakSpørsmålVisibility
) => void;

const bem = BEMHelper('endrePeriodeForm');

interface OwnProps {
    periode: Periode;
    antallFeriedager: number;
    meldinger: VeilederMessage[];
    onRequestClose: () => void;
}

interface StateProps {
    søknadsinfo: Søknadsinfo;
}

interface State {
    visBekreftSlettDialog: boolean;
}

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
    onChange(
        periodeChanges: RecursivePartial<Periode>,
        replace: boolean = false,
        visibility: UtsettelseSpørsmålVisibility | UttakSpørsmålVisibility
    ) {
        const { periode, dispatch, søknadsinfo } = this.props;
        const updatedPeriode = PeriodeCleanup.applyChangesAndCleanPeriode(
            periode,
            periodeChanges,
            søknadsinfo,
            visibility
        );
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

    onRequestClose() {
        this.props.onRequestClose();
    }

    render() {
        const { periode, meldinger, intl } = this.props;
        const { antallFeriedager, onRequestClose } = this.props;
        const erForeldrepengerFørFødselPeriode =
            periode.type === Periodetype.Uttak && periode.konto === StønadskontoType.ForeldrepengerFørFødsel;
        return (
            <ValiderbarForm className={bem.block} validateBeforeSubmit={true}>
                <>
                    <Block visible={meldinger.length > 0}>
                        <VeilederMeldinger meldinger={meldinger} />
                    </Block>
                    {periode.type === Periodetype.Utsettelse ? (
                        <UtsettelseForm
                            periode={periode}
                            onChange={this.onChange}
                            antallFeriedager={antallFeriedager}
                        />
                    ) : (
                        <UttakForm
                            periode={periode as Uttaksperiode}
                            onChange={this.onChange}
                            kanEndreStønadskonto={!erForeldrepengerFørFødselPeriode}
                        />
                    )}
                    <Block visible={!erForeldrepengerFørFødselPeriode} margin="xs">
                        <div className={bem.element('footer')}>
                            <div className={bem.element('lukkPeriodeWrapper')}>
                                <Knapp
                                    onClick={onRequestClose}
                                    className={bem.element('lukkPeriode')}
                                    htmlType="button">
                                    <FormattedMessage id={`periodeliste.lukk`} />
                                </Knapp>
                            </div>
                            <div className={bem.element('slettPeriodeWrapper')}>
                                <LinkButton onClick={this.onRequestDelete} className={bem.element('slettPeriode')}>
                                    <FormattedMessage id={`endrePeriodeForm.slett.${periode.type}`} />
                                </LinkButton>
                            </div>
                        </div>
                    </Block>
                </>
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
    søknadsinfo: selectSøknadsinfo(state)!
});

export default connect(mapStateToProps)(injectIntl(EndrePeriodeFormRenderer));
