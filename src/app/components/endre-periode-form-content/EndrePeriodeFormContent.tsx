import * as React from 'react';
import { Periode, Periodetype, Uttaksperiode, StønadskontoType } from '../../types/uttaksplan/periodetyper';
import UtsettelseForm from '../utsettelse-form/UtsettelseForm';
import BEMHelper from 'common/util/bem';
import LinkButton from '../link-button/LinkButton';
import { FormattedMessage } from 'react-intl';
import Block from 'common/components/block/Block';
import {
    EndrePeriodeChangeEvent,
    EndrePeriodeRequestDeleteEvent
} from '../endre-periode-form-renderer/EndrePeriodeFormRenderer';
import UttakForm from '../uttak-form/UttakForm';

import { ValidertPeriode } from '../../redux/reducers/uttaksplanValideringReducer';
import { Knapp } from 'nav-frontend-knapper';

import './endrePeriodeFormContent.less';

export interface Props {
    periode: Periode;
    validertPeriode: ValidertPeriode | undefined;
    onChange: EndrePeriodeChangeEvent;
    onRequestDelete: EndrePeriodeRequestDeleteEvent;
    onRequestClose: () => void;
}

const bem = BEMHelper('endrePeriodeForm');

class EndrePeriodeFormContent extends React.Component<Props> {
    render() {
        const { periode, validertPeriode, onChange, onRequestDelete, onRequestClose } = this.props;
        const erForeldrepengerFørFødselPeriode =
            periode.type === Periodetype.Uttak && periode.konto === StønadskontoType.ForeldrepengerFørFødsel;
        const harOverlappendePerioder = validertPeriode && validertPeriode.overlappendePerioder.length > 0;
        return (
            <>
                {periode.type === Periodetype.Utsettelse || periode.type === Periodetype.Opphold ? (
                    <UtsettelseForm
                        periode={periode}
                        onChange={onChange}
                        harOverlappendePerioder={harOverlappendePerioder}
                    />
                ) : (
                    <UttakForm
                        periode={periode as Uttaksperiode}
                        onChange={onChange}
                        kanEndreStønadskonto={!erForeldrepengerFørFødselPeriode}
                        harOverlappendePerioder={harOverlappendePerioder}
                    />
                )}
                <Block visible={!erForeldrepengerFørFødselPeriode} margin="xs">
                    <div className={bem.element('footer')}>
                        <div className={bem.element('lukkPeriodeWrapper')}>
                            <Knapp onClick={onRequestClose} className={bem.element('lukkPeriode')}>
                                <FormattedMessage id={`periodeliste.lukk`} />
                            </Knapp>
                        </div>
                        <div className={bem.element('slettPeriodeWrapper')}>
                            <LinkButton onClick={onRequestDelete} className={bem.element('slettPeriode')}>
                                <FormattedMessage id={`endrePeriodeForm.slett.${periode.type}`} />
                            </LinkButton>
                        </div>
                    </div>
                </Block>
            </>
        );
    }
}

export default EndrePeriodeFormContent;
