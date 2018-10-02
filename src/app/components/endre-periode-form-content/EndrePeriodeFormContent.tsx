import * as React from 'react';
import { Periode, Periodetype, Uttaksperiode, StønadskontoType } from '../../types/uttaksplan/periodetyper';
import UtsettelseForm from '../utsettelse-form/UtsettelseForm';
import BEMHelper from 'common/util/bem';
import LinkButton from '../link-button/LinkButton';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import Block from 'common/components/block/Block';
import {
    EndrePeriodeChangeEvent,
    EndrePeriodeRequestDeleteEvent
} from '../endre-periode-form-renderer/EndrePeriodeFormRenderer';
import { ValidertPeriode } from '../../redux/actions/uttaksplanValidering/uttaksplanValideringActionDefinitions';
import AlertStripe from 'nav-frontend-alertstriper';
import UttakForm from '../uttak-form/UttakForm';

import './endrePeriodeFormContent.less';

export interface OwnProps {
    periode: Periode;
    validertPeriode: ValidertPeriode | undefined;
    onChange: EndrePeriodeChangeEvent;
    onRequestDelete: EndrePeriodeRequestDeleteEvent;
}

const bem = BEMHelper('endrePeriodeForm');

type Props = OwnProps & InjectedIntlProps;

class EndrePeriodeFormContent extends React.Component<Props> {
    render() {
        const { periode, validertPeriode, onChange, onRequestDelete } = this.props;
        const erForeldrepengerFørFødselPeriode =
            periode.type === Periodetype.Uttak && periode.konto === StønadskontoType.ForeldrepengerFørFødsel;
        return (
            <>
                {validertPeriode &&
                    validertPeriode.overlappendePerioder.length > 0 && (
                        <Block margin="s">
                            <AlertStripe type="info" solid={true}>
                                <FormattedMessage id="periodeliste.overlappendePeriode" />
                            </AlertStripe>
                        </Block>
                    )}

                {periode.type === Periodetype.Utsettelse || periode.type === Periodetype.Opphold ? (
                    <UtsettelseForm periode={periode} onChange={onChange} />
                ) : (
                    <UttakForm
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
