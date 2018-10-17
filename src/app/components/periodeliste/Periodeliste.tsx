import * as React from 'react';
import moment from 'moment';
import classnames from 'classnames';
import { Periode } from '../../types/uttaksplan/periodetyper';
import BEMHelper from 'common/util/bem';
import { NavnPåForeldre } from 'common/types';
import EndrePeriodeFormRenderer from '../endre-periode-form-renderer/EndrePeriodeFormRenderer';
import { UttaksplanValideringState } from '../../redux/reducers/uttaksplanValideringReducer';

import './periodeliste.less';
import { Tidsperioden } from '../../util/uttaksplan/Tidsperioden';
import { Uttaksdagen } from '../../util/uttaksplan/Uttaksdagen';
import ToggleList from '../toggle-list/ToggleList';
import PeriodelisteItem from './PeriodelisteItem';
import PeriodelisteHull from './PeriodelisteHull';
import { focusElement } from '../../util/focusUtils';

export interface OwnProps {
    perioder: Periode[];
    uttaksplanValidering: UttaksplanValideringState;
    navnPåForeldre: NavnPåForeldre;
}

interface State {
    toggleState: {};
}

type Props = OwnProps;

export const periodelisteBem = BEMHelper('periodeliste');

export const getPeriodelisteItemId = (periodeId: string): string => `periode-${periodeId}`;

const getAntallUttaksdagerTilNestePeriode = (periode: Periode, idx: number, perioder: Periode[]): number => {
    if (idx < perioder.length - 1) {
        const fom = periode.tidsperiode.tom && Uttaksdagen(periode.tidsperiode.tom).neste();
        const tom = perioder[idx + 1].tidsperiode.fom && Uttaksdagen(perioder[idx + 1].tidsperiode.fom).forrige();
        if (fom && tom && moment(fom).isSameOrBefore(tom, 'day')) {
            return Tidsperioden({
                fom,
                tom
            }).getAntallUttaksdager();
        }
    }
    return 0;
};

class Periodeliste extends React.Component<Props, State> {
    focusOnPeriodeId: string | undefined;
    constructor(props: Props) {
        super(props);
        this.state = {
            toggleState: []
        };
    }
    componentWillReceiveProps(nextProps: Props) {
        const { perioder } = this.props;
        const nyePerioder = nextProps.perioder;
        if (perioder.length === nyePerioder.length - 1) {
            const nyPeriode = nyePerioder.find((p) => perioder.find((p2) => p2.id === p.id) === undefined);
            if (nyPeriode) {
                this.focusOnPeriodeId = nyPeriode.id;
            }
        }
    }
    componentDidUpdate() {
        if (this.focusOnPeriodeId) {
            focusElement(getPeriodelisteItemId(this.focusOnPeriodeId));
            this.focusOnPeriodeId = undefined;
        }
    }
    render() {
        const { perioder, uttaksplanValidering, navnPåForeldre } = this.props;
        return (
            <ToggleList
                render={(onToggle, isOpen) => (
                    <div className={periodelisteBem.className}>
                        {perioder.map((periode, idx) => {
                            const uttaksdagerTilNestePeriode = getAntallUttaksdagerTilNestePeriode(
                                periode,
                                idx,
                                perioder
                            );
                            const isExpanded = isOpen(periode.id);
                            return (
                                <div
                                    key={periode.id}
                                    className={classnames(
                                        periodelisteBem.element('item', isExpanded ? 'expanded' : undefined),
                                        uttaksdagerTilNestePeriode > 0
                                            ? periodelisteBem.element('item', 'with-gap')
                                            : undefined
                                    )}>
                                    <EndrePeriodeFormRenderer
                                        periode={periode}
                                        render={(onChange, onRequestDelete) => (
                                            <PeriodelisteItem
                                                key={periode.id}
                                                periodenummer={idx + 1}
                                                periode={periode}
                                                navnPåForeldre={navnPåForeldre}
                                                validertPeriode={uttaksplanValidering.periodevalidering[periode.id]}
                                                isExpanded={isExpanded}
                                                onToggle={onToggle}
                                                onChange={onChange}
                                                onRequestDelete={onRequestDelete}
                                            />
                                        )}
                                    />
                                    {uttaksdagerTilNestePeriode > 0 && (
                                        <PeriodelisteHull antallDager={uttaksdagerTilNestePeriode} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            />
        );
    }
}
export default Periodeliste;
