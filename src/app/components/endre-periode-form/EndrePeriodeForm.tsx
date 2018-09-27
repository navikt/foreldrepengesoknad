import * as React from 'react';
import { Periode, Periodetype, Uttaksperiode, StønadskontoType } from '../../types/uttaksplan/periodetyper';
import UtsettelsesperiodeForm from '../utsettelse-form/UtsettelseForm';
import BEMHelper from 'common/util/bem';
import LinkButton from '../link-button/LinkButton';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import UttaksperiodeForm from '../uttaksperiode-form/UttaksperiodeForm';
import Block from 'common/components/block/Block';
import EndrePeriodeFormRenderer from '../endre-periode-form-renderer/EndrePeriodeFormRenderer';

import './endrePeriodeForm.less';

export interface OwnProps {
    periode: Periode;
}

const bem = BEMHelper('endrePeriodeForm');

type Props = OwnProps & InjectedIntlProps;

class EndrePeriodeForm extends React.Component<Props> {
    render() {
        const { periode } = this.props;
        const erForeldrepengerFørFødselPeriode =
            periode.type === Periodetype.Uttak && periode.konto === StønadskontoType.ForeldrepengerFørFødsel;
        return (
            <EndrePeriodeFormRenderer
                periode={periode}
                render={(onChange, onRequestDelete) => (
                    <>
                        {periode.type === Periodetype.Utsettelse || periode.type === Periodetype.Opphold ? (
                            <UtsettelsesperiodeForm periode={periode} onChange={onChange} />
                        ) : (
                            <UttaksperiodeForm
                                periode={periode as Uttaksperiode}
                                onChange={onChange}
                                kanEndreStønadskonto={!erForeldrepengerFørFødselPeriode}
                            />
                        )}
                        <Block visible={!erForeldrepengerFørFødselPeriode} margin="xs">
                            <div className={bem.element('footer')}>
                                <LinkButton onClick={onRequestDelete} className={bem.element('slettPeriode')}>
                                    <FormattedMessage id={`endrePeriodeForm.slett.${periode.type}`} />
                                </LinkButton>
                            </div>
                        </Block>
                    </>
                )}
            />
        );
    }
}

export default injectIntl(EndrePeriodeForm);
