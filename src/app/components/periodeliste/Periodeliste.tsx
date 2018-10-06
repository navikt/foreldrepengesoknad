import * as React from 'react';
import classnames from 'classnames';
import { Periode } from '../../types/uttaksplan/periodetyper';
import BEMHelper from 'common/util/bem';
import ToggleItem from '../toggle-item/ToggleItem';
import PeriodeHeader from './PeriodeHeader';
import { NavnPåForeldre } from 'common/types';
import EndrePeriodeFormRenderer from '../endre-periode-form-renderer/EndrePeriodeFormRenderer';
import EndrePeriodeFormContent from '../endre-periode-form-content/EndrePeriodeFormContent';
import { getPeriodeFarge } from '../../util/uttaksplan/styleUtils';
import { UttaksplanValideringState } from '../../redux/reducers/uttaksplanValideringReducer';

import './periodeliste.less';

export interface Props {
    perioder: Periode[];
    uttaksplanValidering: UttaksplanValideringState;
    navnPåForeldre: NavnPåForeldre;
}

const bem = BEMHelper('periodeliste');

export const getPeriodelisteItemId = (periodeId: string): string => `periode-${periodeId}`;

const Periodeliste: React.StatelessComponent<Props> = ({ perioder, uttaksplanValidering, navnPåForeldre }) => (
    <div className={bem.className}>
        {perioder.map((p) => (
            <div className={bem.element('item')} key={p.id}>
                <EndrePeriodeFormRenderer
                    periode={p}
                    render={(onChange, onRequestDelete) => (
                        <ToggleItem
                            id={getPeriodelisteItemId(p.id)}
                            expandedHeaderClassName="periodeheader--isOpen"
                            renderHeader={() => (
                                <PeriodeHeader
                                    periode={p}
                                    navnPåForeldre={navnPåForeldre}
                                    validertPeriode={uttaksplanValidering.periodevalidering[p.id]}
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
                                        validertPeriode={uttaksplanValidering.periodevalidering[p.id]}
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
