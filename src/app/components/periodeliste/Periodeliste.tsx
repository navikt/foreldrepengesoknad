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
import { UttaksplanValideringState, Periodevalidering } from '../../redux/reducers/uttaksplanValideringReducer';
import { InjectedIntl, injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';

export interface Props {
    perioder: Periode[];
    uttaksplanValidering: UttaksplanValideringState;
    navnPåForeldre: NavnPåForeldre;
}

const bem = BEMHelper('periodeliste');

const getAdvarselForPeriode = (
    periode: Periode,
    periodevalidering: Periodevalidering,
    intl: InjectedIntl
): Advarsel | undefined => {
    if (periodevalidering !== undefined) {
        const v = periodevalidering[periode.id!];
        if (v && v !== undefined && v.length > 0) {
            return {
                type: 'feil',
                beskrivelse: getMessage(intl, `uttaksplan.validering.feil.${v[0].feilKey}`)
            };
        }
    }
    return undefined;
};

const Periodeliste: React.StatelessComponent<Props & InjectedIntlProps> = ({
    perioder,
    uttaksplanValidering,
    navnPåForeldre,
    intl
}) => (
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
                                    advarsel={getAdvarselForPeriode(p, uttaksplanValidering.periodevalidering, intl)}
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

export default injectIntl(Periodeliste);
