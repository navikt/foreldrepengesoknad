import * as React from 'react';
import {
    Periode,
    Periodetype,
    Utsettelsesperiode,
    Uttaksperiode,
    Oppholdsperiode,
    StønadskontoType
} from '../../types/uttaksplan/periodetyper';
import UtsettelsesperiodeForm from '../utsettelsesperiode-form/UtsettelsesperiodeForm';
import BEMHelper from 'common/util/bem';
import { preventFormSubmit } from 'common/util/eventUtils';
import LinkButton from '../link-button/LinkButton';

import './endrePeriodeForm.less';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { DispatchProps } from 'common/redux/types';
import søknadActionCreators from '../../redux/actions/søknad/søknadActionCreators';
import UttaksperiodeForm from '../uttaksperiode-form/UttaksperiodeForm';
import Block from 'common/components/block/Block';

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
    onChange(p: Periode) {
        let updatedPeriode: Periode | undefined;
        const { periode, dispatch } = this.props;
        if (periode.type === Periodetype.Utsettelse) {
            updatedPeriode = { ...periode, ...(p as Utsettelsesperiode) };
        } else if (periode.type === Periodetype.Uttak) {
            updatedPeriode = { ...periode, ...(p as Uttaksperiode) };
        } else if (periode.type === Periodetype.Opphold) {
            updatedPeriode = { ...periode, ...(p as Oppholdsperiode) };
        }
        if (updatedPeriode !== undefined) {
            dispatch(søknadActionCreators.uttaksplanUpdatePeriode(updatedPeriode));
        }
    }
    onDelete() {
        this.props.dispatch(søknadActionCreators.uttaksplanDeletePeriode(this.props.periode));
    }
    render() {
        const { periode } = this.props;
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
                        <LinkButton onClick={this.onDelete} className={bem.element('slettPeriode')}>
                            <FormattedMessage id={`endrePeriodeForm.slett.${periode.type}`} />
                        </LinkButton>
                    </div>
                </Block>
            </form>
        );
    }
}

export default connect()(EndrePeriodeForm);
