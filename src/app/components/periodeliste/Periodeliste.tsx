import * as React from 'react';
import classnames from 'classnames';
import moment from 'moment';
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
import { Tidsperioden } from '../../util/uttaksplan/Tidsperioden';
import { Uttaksdagen } from '../../util/uttaksplan/Uttaksdagen';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { getVarighetString } from 'common/util/intlUtils';

export interface OwnProps {
    perioder: Periode[];
    uttaksplanValidering: UttaksplanValideringState;
    navnPåForeldre: NavnPåForeldre;
}

type Props = OwnProps & InjectedIntlProps;

const bem = BEMHelper('periodeliste');

export const getPeriodelisteItemId = (periodeId: string): string => `periode-${periodeId}`;

const getAntallUttaksdagerTilNestePeriode = (periode: Periode, idx: number, perioder: Periode[]): number => {
    if (idx < perioder.length - 1) {
        const fom = periode.tidsperiode.tom && Uttaksdagen(periode.tidsperiode.tom).neste();
        const tom = perioder[idx + 1].tidsperiode.fom && Uttaksdagen(perioder[idx + 1].tidsperiode.fom).forrige();
        if (fom && tom && moment(fom).isSameOrBefore(tom)) {
            return Tidsperioden({
                fom,
                tom
            }).getAntallUttaksdager();
        }
    }
    return 0;
};

const Periodeliste: React.StatelessComponent<Props> = ({ perioder, uttaksplanValidering, navnPåForeldre, intl }) => (
    <div className={bem.className}>
        {perioder.map((p, idx) => {
            const uttaksdagerTilNestePeriode = getAntallUttaksdagerTilNestePeriode(p, idx, perioder);
            return (
                <React.Fragment key={p.id}>
                    <div className={bem.element('item')}>
                        <EndrePeriodeFormRenderer
                            periode={p}
                            render={(onChange, onRequestDelete) => (
                                <ToggleItem
                                    id={getPeriodelisteItemId(p.id)}
                                    expandedHeaderClassName="periodeheader--isOpen"
                                    expandedContentClassName="blokk-s"
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
                    {uttaksdagerTilNestePeriode > 0 && (
                        <div className={bem.element('hull')}>
                            <FormattedMessage
                                id="periodeliste.hullMellomPerioder"
                                values={{ dager: getVarighetString(uttaksdagerTilNestePeriode, intl) }}
                            />
                        </div>
                    )}
                </React.Fragment>
            );
        })}
    </div>
);

export default injectIntl(Periodeliste);
