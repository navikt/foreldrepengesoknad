import * as React from 'react';
import {
    Periode,
    Periodetype,
    isUttaksperiode,
    StønadskontoType,
    PeriodeInfoType,
    isUttakAnnenPart,
} from '../../../../types/uttaksplan/periodetyper';
import BEMHelper from 'common/util/bem';
import { Tidsperiode } from 'common/types';
import ToggleList from '../../../elementer/toggleList/ToggleList';
import PeriodelisteHull from './items/PeriodelisteHull';
import { focusElement } from '../../../../util/focusUtils';
import PeriodelistePeriode from './items/PeriodelistePeriode';
import PeriodelisteInfo, { PeriodelisteInformasjon } from './items/PeriodelisteInfo';
import PeriodelisteAvslåttPeriode from './items/PeriodelisteAvslåttPeriode';
import PeriodelisteOppholdAnnenPart from './items/PeriodelisteOppholdAnnenPart';
import { VeiledermeldingerPerPeriode } from '../../../veilederInfo/types';
import { NavnISøknaden } from 'app/selectors/types';

import './periodeliste.less';
import moment from 'moment';

interface OwnProps {
    erDeltUttak: boolean;
    perioder: Periode[];
    informasjon?: PeriodelisteInformasjon[];
    antallFeriedager: number;
    meldingerPerPeriode: VeiledermeldingerPerPeriode;
    navn: NavnISøknaden;
    lastAddedPeriodeId: string | undefined;
    harMidlertidigOmsorg: boolean;
    onPeriodeLukk?: (id: string) => void;
    onReplaceHullWithOpphold?: (tidsperiode: Tidsperiode) => void;
    onReplaceHullWithPeriode?: (tidsperiode: Tidsperiode) => void;
    updatePeriode: (periode: Periode) => void;
    deletePeriode: (periode: Periode) => void;
}

type Props = OwnProps;

export const periodelisteBem = BEMHelper('periodeliste');

export const getPeriodelisteElementId = (periodeId: string): string => `periode-${periodeId}`;

class Periodeliste extends React.Component<Props> {
    toggleList: ToggleList<any> | null;
    periodeWhichHaveReceivedFocus: string | undefined;
    periodeToBeFocused: string | undefined;

    constructor(props: Props) {
        super(props);

        this.checkPeriodeFocus = this.checkPeriodeFocus.bind(this);
        this.handleOnItemToggle = this.handleOnItemToggle.bind(this);
        this.shouldRenderHull = this.shouldRenderHull.bind(this);
        this.annenForelderSamtidigUttak = this.annenForelderSamtidigUttak.bind(this);

        const { perioder } = props;
        if (perioder.length === 1 && perioder[0].id === props.lastAddedPeriodeId) {
            this.periodeToBeFocused = props.lastAddedPeriodeId;
        }
    }

    collapseAll() {
        if (this.toggleList) {
            this.toggleList.collapseAll();
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps: Props) {
        if (
            nextProps.lastAddedPeriodeId !== undefined &&
            nextProps.lastAddedPeriodeId !== this.periodeWhichHaveReceivedFocus
        ) {
            this.periodeToBeFocused = nextProps.lastAddedPeriodeId;
        }
    }

    componentDidUpdate() {
        this.checkPeriodeFocus();
    }

    componentDidMount() {
        this.checkPeriodeFocus();
    }

    shouldRenderHull(perioder: Periode[]) {
        return perioder
            .filter((p: Periode) => p.type !== Periodetype.Hull)
            .some(
                (p: Periode) =>
                    (isUttaksperiode(p) && p.konto !== StønadskontoType.AktivitetsfriKvote) || !isUttaksperiode(p)
            );
    }

    checkPeriodeFocus() {
        if (this.periodeToBeFocused) {
            focusElement(getPeriodelisteElementId(this.periodeToBeFocused));
            this.periodeWhichHaveReceivedFocus = this.periodeToBeFocused;
            this.periodeToBeFocused = undefined;
        }
    }

    annenForelderSamtidigUttak(periode: Periode): Periode | undefined {
        if (isUttaksperiode(periode)) {
            const { perioder } = this.props;
            const samtidigUttak = perioder
                .filter((p) => isUttakAnnenPart(p))
                .find(
                    (p) =>
                        isUttakAnnenPart(p) &&
                        moment(periode.tidsperiode.fom).isSame(p.tidsperiode.fom) &&
                        p.ønskerSamtidigUttak === true &&
                        p.id !== periode.id
                );

            return samtidigUttak !== undefined ? samtidigUttak : undefined;
        }

        return undefined;
    }

    handleOnItemToggle(id: string, open: boolean) {
        if (this.props.onPeriodeLukk && open === false) {
            this.props.onPeriodeLukk(id);
        }
    }
    render() {
        const {
            perioder,
            informasjon,
            navn,
            antallFeriedager,
            meldingerPerPeriode,
            onReplaceHullWithOpphold,
            onReplaceHullWithPeriode,
            updatePeriode,
            deletePeriode,
            erDeltUttak,
            harMidlertidigOmsorg,
        } = this.props;

        const filteredPerioder = this.shouldRenderHull(perioder)
            ? perioder
            : perioder.filter((p) => p.type !== Periodetype.Hull);

        return (
            <ToggleList
                ref={(c) => (this.toggleList = c)}
                onItemToggle={this.handleOnItemToggle}
                render={(onToggle, isOpen) => (
                    <div className={periodelisteBem.block}>
                        {informasjon &&
                            informasjon.map((item) => (
                                <PeriodelisteInfo
                                    key={item.id}
                                    id={item.id}
                                    isExpanded={isOpen(item.id)}
                                    renderContent={item.renderContent}
                                    ikon={item.ikon}
                                    tittel={item.tittel}
                                    beskrivelse={item.beskrivelse}
                                    onToggle={onToggle}
                                    annenForelderSamtidigUttakPeriode={undefined}
                                />
                            ))}
                        {filteredPerioder.map((periode) => {
                            const itemId = getPeriodelisteElementId(periode.id);
                            const isExpanded = isOpen(itemId);
                            switch (periode.type) {
                                case Periodetype.Hull:
                                    return (
                                        <PeriodelisteHull
                                            key={itemId}
                                            itemId={itemId}
                                            isExpanded={isExpanded}
                                            onToggle={onToggle}
                                            periode={periode}
                                            onReplaceHullWithOpphold={onReplaceHullWithOpphold}
                                            onReplaceHullWithPeriode={onReplaceHullWithPeriode}
                                            navn={navn}
                                            erDeltUttak={erDeltUttak}
                                        />
                                    );
                                case Periodetype.Info:
                                    switch (periode.infotype) {
                                        case PeriodeInfoType.avslåttPeriode:
                                            return (
                                                <PeriodelisteAvslåttPeriode
                                                    key={itemId}
                                                    itemId={itemId}
                                                    isExpanded={isExpanded}
                                                    onToggle={onToggle}
                                                    periode={periode}
                                                    onReplaceHullWithOpphold={onReplaceHullWithOpphold}
                                                    onReplaceHullWithPeriode={onReplaceHullWithPeriode}
                                                    navnPåForeldre={navn.navnPåForeldre}
                                                />
                                            );
                                        case PeriodeInfoType.uttakAnnenPart:
                                        case PeriodeInfoType.utsettelseAnnenPart:
                                            return (
                                                periode.visPeriodeIPlan && (
                                                    <PeriodelisteOppholdAnnenPart
                                                        key={itemId}
                                                        itemId={itemId}
                                                        isExpanded={isExpanded}
                                                        onToggle={onToggle}
                                                        periode={periode}
                                                        navnPåForeldre={navn.navnPåForeldre}
                                                        tidsperiode={periode.tidsperiode}
                                                    />
                                                )
                                            );
                                    }
                                    return;
                                default:
                                    return (
                                        <PeriodelistePeriode
                                            key={itemId}
                                            id={itemId}
                                            periode={periode}
                                            antallFeriedager={antallFeriedager}
                                            navnPåForeldre={navn.navnPåForeldre}
                                            meldinger={meldingerPerPeriode[periode.id]}
                                            isExpanded={isExpanded}
                                            onToggle={onToggle}
                                            updatePeriode={updatePeriode}
                                            deletePeriode={deletePeriode}
                                            annenForelderSamtidigUttakPeriode={this.annenForelderSamtidigUttak(periode)}
                                            harMidlertidigOmsorg={harMidlertidigOmsorg}
                                        />
                                    );
                            }
                        })}
                    </div>
                )}
            />
        );
    }
}
export default Periodeliste;
