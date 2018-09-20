import * as React from 'react';
import {
    Periode,
    Periodetype,
    Utsettelsesperiode,
    Uttaksperiode,
    Oppholdsperiode,
    StønadskontoType,
    Overføringsperiode
} from '../../types/uttaksplan/periodetyper';
import UtsettelsesperiodeForm from '../utsettelsesperiode-form/UtsettelsesperiodeForm';
import BEMHelper from 'common/util/bem';
import { preventFormSubmit } from 'common/util/eventUtils';
import LinkButton from '../link-button/LinkButton';

import './endrePeriodeForm.less';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { connect } from 'react-redux';
import { DispatchProps } from 'common/redux/types';
import søknadActionCreators from '../../redux/actions/søknad/søknadActionCreators';
import UttaksperiodeForm from '../uttaksperiode-form/UttaksperiodeForm';
import Block from 'common/components/block/Block';
import BekreftDialog from 'common/components/dialog/BekreftDialog';
import getMessage from 'common/util/i18nUtils';
import { cleanupPeriode } from '../../util/cleanup/periodeCleanup';

export interface OwnProps {
    periode: Periode;
}

interface State {
    visBekreftSlettDialog: boolean;
}
const bem = BEMHelper('endrePeriodeForm');

type Props = OwnProps & DispatchProps & InjectedIntlProps;

class EndrePeriodeForm extends React.Component<Props, State> {
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
    onChange(p: Periode) {
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
            dispatch(søknadActionCreators.uttaksplanUpdatePeriode(cleanupPeriode(updatedPeriode)));
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
        const { periode, intl } = this.props;
        const erForeldrepengerFørFødselPeriode =
            periode.type === Periodetype.Uttak && periode.konto === StønadskontoType.ForeldrepengerFørFødsel;
        return (
            <form className={bem.className} onSubmit={preventFormSubmit}>
                {periode.type === Periodetype.Utsettelse ? (
                    <UtsettelsesperiodeForm periode={periode} onChange={this.onChange} />
                ) : (
                    <UttaksperiodeForm
                        periode={periode as Uttaksperiode}
                        onChange={this.onChange}
                        kanEndreStønadskonto={!erForeldrepengerFørFødselPeriode}
                    />
                )}
                <Block visible={!erForeldrepengerFørFødselPeriode} margin="xs">
                    <div className={bem.element('footer')}>
                        <LinkButton onClick={this.onRequestDelete} className={bem.element('slettPeriode')}>
                            <FormattedMessage id={`endrePeriodeForm.slett.${periode.type}`} />
                        </LinkButton>
                    </div>
                </Block>
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
            </form>
        );
    }
}

export default connect()(injectIntl(EndrePeriodeForm));
