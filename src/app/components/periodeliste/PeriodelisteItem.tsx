import * as React from 'react';
import classnames from 'classnames';
import { Periode } from '../../types/uttaksplan/periodetyper';
import { periodelisteBem, getPeriodelisteItemId } from './Periodeliste';
import PeriodeHeader from './PeriodeHeader';
import { NavnPåForeldre } from 'common/types';
import { ValidertPeriode } from '../../redux/reducers/uttaksplanValideringReducer';
import EndrePeriodeFormContent from '../endre-periode-form-content/EndrePeriodeFormContent';
import { getPeriodeFarge } from '../../util/uttaksplan/styleUtils';
import ToggleItemControlled from '../toggle-item/ToggleItemControlled';
import {
    EndrePeriodeRequestDeleteEvent,
    EndrePeriodeChangeEvent
} from '../endre-periode-form-renderer/EndrePeriodeFormRenderer';
import { onToggleItemProp } from '../toggle-list/ToggleList';

export interface Props {
    periode: Periode;
    periodenummer: number;
    isExpanded: boolean;
    navnPåForeldre: NavnPåForeldre;
    validertPeriode: ValidertPeriode;
    onChange: EndrePeriodeChangeEvent;
    onRequestDelete: EndrePeriodeRequestDeleteEvent;
    onToggle: onToggleItemProp;
}

const PeriodelisteItem: React.StatelessComponent<Props> = ({
    periode,
    periodenummer,
    navnPåForeldre,
    validertPeriode,
    isExpanded,
    onRequestDelete,
    onChange,
    onToggle
}) => {
    const id = getPeriodelisteItemId(periode.id);
    return (
        <ToggleItemControlled
            id={id}
            isExpanded={isExpanded}
            onToggle={() => onToggle(periode.id)}
            expandedHeaderClassName="periodeheader--isOpen"
            renderHeader={() => (
                <PeriodeHeader
                    periodenummer={periodenummer}
                    periode={periode}
                    navnPåForeldre={navnPåForeldre}
                    validertPeriode={validertPeriode}
                />
            )}
            renderContent={() => (
                <div
                    className={classnames(
                        periodelisteBem.element('content'),
                        periodelisteBem.element('content', periode.type),
                        periodelisteBem.element('content', getPeriodeFarge(periode))
                    )}>
                    <EndrePeriodeFormContent
                        periode={periode}
                        validertPeriode={validertPeriode}
                        onChange={onChange}
                        onRequestDelete={onRequestDelete}
                        onRequestClose={() => {
                            onToggle(periode.id);
                            if (isExpanded) {
                                const el = document.getElementById(id);
                                if (el) {
                                    el.focus();
                                }
                            }
                        }}
                    />
                </div>
            )}
        />
    );
};

export default PeriodelisteItem;
