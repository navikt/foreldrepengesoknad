import * as React from 'react';
import { Periode, Periodetype, Uttaksperiode, StønadskontoType } from '../../types/uttaksplan/periodetyper';
import UtsettelseForm, { UtsettelseperiodeFormPeriodeType } from '../utsettelse-form/UtsettelseForm';
import BEMHelper from 'common/util/bem';
import LinkButton from '../link-button/LinkButton';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import UttaksperiodeForm from '../uttaksperiode-form/UttaksperiodeForm';
import Block from 'common/components/block/Block';
import {
    EndrePeriodeChangeEvent,
    EndrePeriodeRequestDeleteEvent
} from '../endre-periode-form-renderer/EndrePeriodeFormRenderer';

import './endrePeriodeFormContent.less';
import ValiderbarFormControl from 'common/lib/validation/elements/ValiderbarFormControl';

export interface OwnProps {
    periode: Periode;
    onChange: EndrePeriodeChangeEvent;
    onRequestDelete: EndrePeriodeRequestDeleteEvent;
}

const bem = BEMHelper('endrePeriodeForm');

type Props = OwnProps & InjectedIntlProps;

class EndrePeriodeFormContent extends React.Component<Props> {
    render() {
        const { periode, onChange, onRequestDelete } = this.props;
        const erForeldrepengerFørFødselPeriode =
            periode.type === Periodetype.Uttak && periode.konto === StønadskontoType.ForeldrepengerFørFødsel;
        return (
            <>
                {periode.type === Periodetype.Utsettelse || periode.type === Periodetype.Opphold ? (
                    <ValiderbarFormControl
                        render={(validateAll) => (
                            <UtsettelseForm
                                periode={periode}
                                onChange={(p: UtsettelseperiodeFormPeriodeType) => {
                                    onChange(p);
                                    validateAll();
                                }}
                            />
                        )}
                    />
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
        );
    }
}

export default injectIntl(EndrePeriodeFormContent);
