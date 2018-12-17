import * as React from 'react';
import classnames from 'classnames';
import { Periode } from '../../types/uttaksplan/periodetyper';
import { periodelisteBem, getPeriodelisteElementId } from './Periodeliste';
import PeriodeHeader from './PeriodeHeader';
import { NavnPåForeldre } from 'common/types';
import { ValidertPeriode } from '../../redux/reducers/uttaksplanValideringReducer';
import { getPeriodeFarge } from '../../util/uttaksplan/styleUtils';
import ToggleItemControlled from '../toggle-item/ToggleItemControlled';
import { onToggleItemProp } from '../toggle-list/ToggleList';
import { getPeriodeTittel } from '../../util/uttaksplan';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import EndrePeriodeForm from '../endre-periode-form/EndrePeriodeForm';

export interface Props {
    periode: Periode;
    isExpanded: boolean;
    antallFeriedager: number;
    navnPåForeldre: NavnPåForeldre;
    validertPeriode: ValidertPeriode;
    onToggle: onToggleItemProp;
}

const PeriodelisteItem: React.StatelessComponent<Props & InjectedIntlProps> = ({
    periode,
    navnPåForeldre,
    antallFeriedager,
    validertPeriode,
    isExpanded,
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
                        <EndrePeriodeForm
                            periode={periode}
                            antallFeriedager={antallFeriedager}
                            validertPeriode={validertPeriode}
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
