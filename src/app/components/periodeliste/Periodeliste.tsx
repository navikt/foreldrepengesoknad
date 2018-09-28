import * as React from 'react';
import classnames from 'classnames';
import { Periode } from '../../types/uttaksplan/periodetyper';
import BEMHelper from 'common/util/bem';
import ToggleItem from '../toggle-item/ToggleItem';
import PeriodeHeader, { Advarsel } from './PeriodeHeader';
import { NavnPåForeldre } from 'common/types';
import EndrePeriodeFormRenderer from '../endre-periode-form-renderer/EndrePeriodeFormRenderer';
import EndrePeriodeFormContent from '../endre-periode-form-content/EndrePeriodeFormContent';
import { getPeriodeFarge } from '../../util/uttaksplan/styleUtils';

import './periodeliste.less';
import { PeriodeValidering, UttaksplanValideringState } from '../../redux/reducers/uttaksplanValideringReducer';

export interface Props {
    perioder: Periode[];
    uttaksplanValidering: UttaksplanValideringState;
    navnPåForeldre: NavnPåForeldre;
}

const bem = BEMHelper('periodeliste');

const getAdvarselForPeriode = (periode: Periode, validering: PeriodeValidering): Advarsel | undefined => {
    const v = validering[periode.id!];
    if (v && v.feil !== undefined) {
        return {
            type: 'feil',
            beskrivelse: v.feil[0].feilmelding
        };
    }
    return undefined;
};

const Periodeliste: React.StatelessComponent<Props> = ({ perioder, uttaksplanValidering, navnPåForeldre }) => (
    <div className={bem.className}>
        {perioder.map((p) => (
            <div className={bem.element('item')} key={p.id}>
                <EndrePeriodeFormRenderer
                    periode={p}
                    render={(onChange, onRequestDelete) => (
                        <ToggleItem
                            expandedHeaderClassName="periodeheader--isOpen"
                            renderHeader={() => (
                                <PeriodeHeader
                                    periode={p}
                                    navnPåForeldre={navnPåForeldre}
                                    advarsel={getAdvarselForPeriode(p, uttaksplanValidering.perioder)}
                                />
                            )}
                            renderContent={() => (
                                <div
                                    className={classnames(
                                        bem.element('content'),
                                        bem.element('content', p.type),
                                        bem.element('content', getPeriodeFarge(p))
                                    )}>
                                    <EndrePeriodeFormContent
                                        periode={p}
                                        onChange={onChange}
                                        onRequestDelete={onRequestDelete}
                                    />
                                </div>
                            )}
                        />
                    )}
                />
            </div>
        ))}
    </div>
);

export default Periodeliste;
