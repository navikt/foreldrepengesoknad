import * as React from 'react';
import classnames from 'classnames';
import { Periode } from '../../types/uttaksplan/periodetyper';
import { periodelisteBem, getPeriodelisteElementId } from './Periodeliste';
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
import { getPeriodeTittel } from '../../util/uttaksplan';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Søknadsinfo } from '../../selectors/s\u00F8knadsinfoSelector';

export interface Props {
    søknadsinfo: Søknadsinfo;
    periode: Periode;
    isExpanded: boolean;
    antallFeriedager: number;
    navnPåForeldre: NavnPåForeldre;
    validertPeriode: ValidertPeriode;
    onChange: EndrePeriodeChangeEvent;
    onRequestDelete: EndrePeriodeRequestDeleteEvent;
    onToggle: onToggleItemProp;
}

const PeriodelisteItem: React.StatelessComponent<Props & InjectedIntlProps> = ({
    søknadsinfo,
    periode,
    navnPåForeldre,
    antallFeriedager,
    validertPeriode,
    isExpanded,
    onRequestDelete,
    onChange,
    onToggle,
    intl
}) => {
    const id = getPeriodelisteElementId(periode.id);
    const ariaLabel = getPeriodeTittel(intl, periode, navnPåForeldre);
    return (
        <article arial-label={ariaLabel}>
            <ToggleItemControlled
                id={id}
                isExpanded={isExpanded}
                onToggle={() => onToggle(periode.id)}
                expandedHeaderClassName="periodeheader--isOpen"
                renderHeader={() => (
                    <PeriodeHeader
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
                            søknadsinfo={søknadsinfo}
                            periode={periode}
                            antallFeriedager={antallFeriedager}
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
        </article>
    );
};

export default injectIntl(PeriodelisteItem);
