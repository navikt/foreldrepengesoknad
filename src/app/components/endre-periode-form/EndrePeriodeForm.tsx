import * as React from 'react';
import {
    Periode,
    Periodetype,
    Utsettelsesperiode,
    Uttaksperiode,
    Oppholdsperiode
} from '../../types/uttaksplan/periodetyper';
import UtsettelsesperiodeForm from '../utsettelsesperiode-form/UtsettelsesperiodeForm';
import BEMHelper from 'common/util/bem';
import { preventFormSubmit } from 'common/util/eventUtils';
import LinkButton from '../link-button/LinkButton';

import './endrePeriodeForm.less';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { DispatchProps } from 'common/redux/types';
import søknadActionCreators from '../../redux/actions/s\u00F8knad/s\u00F8knadActionCreators';

export interface OwnProps {
    periode: Periode;
}

const bem = BEMHelper('endrePeriodeForm');

type Props = OwnProps & DispatchProps;

class EndrePeriodeForm extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }
    onChange(periode: Periode) {
        let updatedPeriode: Periode | undefined;
        if (this.props.periode.type === Periodetype.Utsettelse) {
            updatedPeriode = { ...this.props.periode, ...(periode as Utsettelsesperiode) };
        } else if (this.props.periode.type === Periodetype.Uttak) {
            updatedPeriode = { ...this.props.periode, ...(periode as Uttaksperiode) };
        } else if (this.props.periode.type === Periodetype.Opphold) {
            updatedPeriode = { ...this.props.periode, ...(periode as Oppholdsperiode) };
        }
        if (updatedPeriode !== undefined) {
            this.props.dispatch(søknadActionCreators.uttaksplanUpdatePeriode(updatedPeriode));
        }
    }
    onDelete() {
        this.props.dispatch(søknadActionCreators.uttaksplanDeletePeriode(this.props.periode));
    }
    render() {
        const { periode } = this.props;
        return (
            <form className={bem.className} onSubmit={preventFormSubmit}>
                {periode.type === Periodetype.Utsettelse ? (
                    <UtsettelsesperiodeForm periode={periode} onChange={this.onChange} />
                ) : (
                    <div>Uttaksperiode</div>
                )}
                <div className={bem.element('footer')}>
                    <LinkButton onClick={this.onDelete}>
                        <FormattedMessage id={`endrePeriodeForm.slett.${periode.type}`} />
                    </LinkButton>
                </div>
            </form>
        );
    }
}

export default connect()(EndrePeriodeForm);
