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
import { UttaksplanValideringState, Periodevalidering } from '../../redux/reducers/uttaksplanValideringReducer';

import './periodeliste.less';
import { ValidertPeriode } from '../../redux/actions/uttaksplanValidering/uttaksplanValideringActionDefinitions';

export interface Props {
    perioder: Periode[];
    uttaksplanValidering: UttaksplanValideringState;
    navnPåForeldre: NavnPåForeldre;
}

const bem = BEMHelper('periodeliste');

const getSkjemaFeil = (validertPeriode: ValidertPeriode): string | undefined => {
    if (validertPeriode.valideringsfeil.length > 0) {
        return `uttaksplan.validering.feil.${validertPeriode.valideringsfeil[0].feilKey}`;
    }
    return undefined;
};

const getAdvarselForPeriode = (periode: Periode, periodevalidering: Periodevalidering): Advarsel | undefined => {
    const validertPeriode = periodevalidering[periode.id];
    if (!validertPeriode) {
        return;
    }
    const skjemafeil = getSkjemaFeil(validertPeriode);
    if (skjemafeil !== undefined) {
        return {
            type: 'feil',
            beskrivelse: 'Skjemaet inneholder feil'
        };
    }
    if (validertPeriode.overlappendePerioder.length > 0) {
        return {
            type: 'feil',
            beskrivelse: 'Periode overlapper'
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
                                    advarsel={getAdvarselForPeriode(p, uttaksplanValidering.periodevalidering)}
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
                                        periodevalidering={uttaksplanValidering.periodevalidering[p.id]}
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
