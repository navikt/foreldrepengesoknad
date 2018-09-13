import * as React from 'react';
import { Periode, Periodetype } from '../../types/uttaksplan/periodetyper';
import UtsettelsesperiodeForm from '../utsettelsesperiode-form/UtsettelsesperiodeForm';
import BEMHelper from 'common/util/bem';
import { preventFormSubmit } from 'common/util/eventUtils';
import LinkButton from '../link-button/LinkButton';

import './endrePeriodeForm.less';
import { FormattedMessage } from 'react-intl';

export interface Props {
    periode: Periode;
}

const bem = BEMHelper('endrePeriodeForm');

class EndrePeriodeForm extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }
    onChange(periode: Periode) {
        console.log(periode);
    }
    onDelete() {}
    render() {
        const { periode } = this.props;
        return (
            <form className={bem.className} action="#" onSubmit={preventFormSubmit}>
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
export default EndrePeriodeForm;
