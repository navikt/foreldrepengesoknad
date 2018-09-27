import * as React from 'react';
import { Periode } from '../../types/uttaksplan/periodetyper';
import BEMHelper from 'common/util/bem';
import ToggleItem from '../toggle-item/ToggleItem';
import PeriodeHeader from './PeriodeHeader';
import PeriodeContent from './PeriodeContent';
import { NavnPåForeldre } from 'common/types';
import EndrePeriodeFormRenderer from '../endre-periode-form-renderer/EndrePeriodeFormRenderer';
import EndrePeriodeForm from '../endre-periode-form/EndrePeriodeForm';

import './periodeliste.less';

export interface Props {
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
}

const BEM = BEMHelper('periodeliste');

const Periodeliste: React.StatelessComponent<Props> = ({ perioder, navnPåForeldre }) => (
    <div className={BEM.className}>
        {perioder.map((p) => (
            <div className={BEM.element('item')} key={p.id}>
                <EndrePeriodeFormRenderer
                    periode={p}
                    render={(onChange, onRequestDelete) => (
                        <ToggleItem
                            expandedHeaderClassName="periodeheader--isOpen"
                            renderHeader={() => <PeriodeHeader periode={p} navnPåForeldre={navnPåForeldre} />}
                            renderContent={() => (
                                <PeriodeContent periode={p}>
                                    <EndrePeriodeForm
                                        periode={p}
                                        onChange={onChange}
                                        onRequestDelete={onRequestDelete}
                                    />
                                </PeriodeContent>
                            )}
                        />
                    )}
                />
            </div>
        ))}
    </div>
);

export default Periodeliste;
