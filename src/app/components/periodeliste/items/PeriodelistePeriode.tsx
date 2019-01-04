import * as React from 'react';
import { Periode } from '../../../types/uttaksplan/periodetyper';
import PeriodeHeader from '../elements/PeriodeHeader';
import { NavnPåForeldre } from 'common/types';
import { ValidertPeriode } from '../../../redux/reducers/uttaksplanValideringReducer';
import { onToggleItemProp } from '../../toggle-list/ToggleList';
import { getPeriodeTittel } from '../../../util/uttaksplan';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import EndrePeriodeForm from '../../endre-periode-form/EndrePeriodeForm';
import PeriodelisteToggleItem from '../elements/PeriodelisteToggleItem';
import PeriodelisteItemWrapper from '../elements/PeriodelisteItemWrapper';
import { getPeriodeFarge } from '../../../util/uttaksplan/styleUtils';

export interface Props {
    id: string;
    periode: Periode;
    isExpanded: boolean;
    antallFeriedager: number;
    navnPåForeldre: NavnPåForeldre;
    validertPeriode: ValidertPeriode;
    onToggle: onToggleItemProp;
}

const PeriodelistePeriode: React.StatelessComponent<Props & InjectedIntlProps> = ({
    id,
    periode,
    navnPåForeldre,
    antallFeriedager,
    validertPeriode,
    isExpanded,
    onToggle,
    intl
}) => {
    const ariaLabel = getPeriodeTittel(intl, periode, navnPåForeldre);
    return (
        <PeriodelisteItemWrapper key={id} farge={getPeriodeFarge(periode)} isExpanded={isExpanded}>
            <PeriodelisteToggleItem
                id={id}
                ariaLabel={ariaLabel}
                isExpanded={isExpanded}
                onToggle={onToggle}
                renderHeader={() => (
                    <PeriodeHeader
                        periode={periode}
                        navnPåForeldre={navnPåForeldre}
                        validertPeriode={validertPeriode}
                    />
                )}
                renderContent={() => (
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
                )}
            />
        </PeriodelisteItemWrapper>
    );
};

export default injectIntl(PeriodelistePeriode);
