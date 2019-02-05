import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import AlertStripe from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';

import { Periode, Periodetype, StønadskontoType, Uttaksperiode } from '../../types/uttaksplan/periodetyper';
import BEMHelper from 'common/util/bem';
import { RecursivePartial } from '../../types/Partial';
import { DispatchProps } from 'common/redux/types';
import søknadActionCreators from '../../redux/actions/søknad/søknadActionCreators';
import BekreftDialog from 'common/components/dialog/BekreftDialog';
import getMessage from 'common/util/i18nUtils';
import ValiderbarForm from 'common/lib/validation/elements/ValiderbarForm';
import PeriodeCleanup from '../../util/cleanup/periodeCleanup';
import Søknad from '../../types/søknad/Søknad';
import { AppState } from '../../redux/reducers';
import { UtsettelseSpørsmålVisibility } from '../utsettelse-form/utsettelseFormConfig';
import { UttakSpørsmålVisibility } from '../uttak-form/uttakFormConfig';
import UtsettelseForm from '../utsettelse-form/UtsettelseForm';
import UttakForm from '../uttak-form/UttakForm';
import Block from 'common/components/block/Block';
import LinkButton from '../link-button/LinkButton';
import { ValidertPeriode } from '../../redux/reducers/uttaksplanValideringReducer';

import { shouldPeriodeHaveAttachment } from '../../util/attachments/missingAttachmentUtil';
import { getErSøkerFarEllerMedmor } from '../../util/domain/personUtil';

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
    validertPeriode: ValidertPeriode | undefined;
    onRequestClose: () => void;
}

interface StateProps {
    søknad: Søknad;
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
        const { periode, dispatch } = this.props;
        const updatedPeriode = PeriodeCleanup.applyChangesAndCleanPeriode(
            periode,
            periodeChanges,
            this.props.søknad,
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
        const { periode, intl, søknad } = this.props;
        const { validertPeriode, antallFeriedager, onRequestClose } = this.props;
        const erForeldrepengerFørFødselPeriode =
            periode.type === Periodetype.Uttak && periode.konto === StønadskontoType.ForeldrepengerFørFødsel;
        const harOverlappendePerioder = validertPeriode && validertPeriode.overlappendePerioder.length > 0;
        return (
            <ValiderbarForm className={bem.className} validateBeforeSubmit={true}>
                <>
                    <Block
                        visible={
                            shouldPeriodeHaveAttachment(
                                periode,
                                getErSøkerFarEllerMedmor(søknad.søker.rolle),
                                søknad.annenForelder
                            ) &&
                            (periode.vedlegg === undefined || (periode.vedlegg && periode.vedlegg.length === 0))
                        }>
                        <AlertStripe type="advarsel">
                            <FormattedMessage id="uttaksplanSkjema.info.manglerVedlegg" />
                        </AlertStripe>
                    </Block>

                    {periode.type === Periodetype.Utsettelse ? (
                        <UtsettelseForm
                            periode={periode}
                            onChange={this.onChange}
                            antallFeriedager={antallFeriedager}
                            harOverlappendePerioder={harOverlappendePerioder}
                        />
                    ) : (
                        <UttakForm
                            periode={periode as Uttaksperiode}
                            onChange={this.onChange}
                            kanEndreStønadskonto={!erForeldrepengerFørFødselPeriode}
                            harOverlappendePerioder={harOverlappendePerioder}
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
    søknad: state.søknad
});

export default connect(mapStateToProps)(injectIntl(EndrePeriodeFormRenderer));
