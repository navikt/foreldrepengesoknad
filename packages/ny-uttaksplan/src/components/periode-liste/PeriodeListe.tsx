import dayjs from 'dayjs';
import { Fragment } from 'react';

import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { Uttaksplanperiode, erVanligUttakPeriode } from '../../types/UttaksplanPeriode';
import { mapUttaksplanperioderTilRaderIListe } from '../../utils/permisjonsperiodeUtils';
import { getFørsteUttaksplanperiodeFom, getSisteUttaksplanperiodeTom } from '../uttaksplanperiodeUtils';
import { PeriodeListeItem } from './../periode-liste-item/PeriodeListeItem';

interface Props {
    saksperioderInkludertHull: Uttaksplanperiode[];
    isReadOnly: boolean;
    handleAddPeriode: (nyPeriode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => void;
    handleUpdatePeriode: (
        oppdatertPeriode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
        gammelPeriode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
    ) => void;
    handleDeletePerioder: (slettedePerioder: Array<{ fom: string; tom: string }>) => void;
    isAllAccordionsOpen?: boolean;
}

export const PeriodeListe = ({
    saksperioderInkludertHull,
    isReadOnly,
    handleUpdatePeriode,
    handleDeletePerioder,
    handleAddPeriode,
    isAllAccordionsOpen,
}: Props) => {
    const { familiehendelsedato } = useUttaksplanData();

    const uttaksplanperioderPerRadIListe = mapUttaksplanperioderTilRaderIListe(
        saksperioderInkludertHull,
        familiehendelsedato,
    );

    const indexOfFørstePeriodeEtterFødsel = uttaksplanperioderPerRadIListe.findIndex((p) =>
        dayjs(p.at(0)!.fom).isSameOrAfter(familiehendelsedato, 'd'),
    );

    const perioderEtterFamdato = saksperioderInkludertHull.filter(
        (periode) =>
            dayjs(periode.fom).isSameOrAfter(familiehendelsedato, 'day') &&
            !(
                erVanligUttakPeriode(periode) &&
                periode.kontoType !== undefined &&
                periode.kontoType === 'FORELDREPENGER_FØR_FØDSEL'
            ),
    );

    return (
        <div>
            {uttaksplanperioderPerRadIListe.map((uttaksplanperioderForRad, index) => {
                if (perioderEtterFamdato.length === 0) {
                    return (
                        <Fragment
                            key={`${getFørsteUttaksplanperiodeFom(uttaksplanperioderForRad)}-${getSisteUttaksplanperiodeTom(uttaksplanperioderForRad)}`}
                        >
                            <PeriodeListeItem
                                isReadOnly={isReadOnly}
                                handleAddPeriode={handleAddPeriode}
                                handleUpdatePeriode={handleUpdatePeriode}
                                handleDeletePerioder={handleDeletePerioder}
                                uttaksplanperioder={uttaksplanperioderForRad}
                                isAllAccordionsOpen={isAllAccordionsOpen}
                            />
                            {uttaksplanperioderPerRadIListe.length - 1 === index && (
                                <PeriodeListeItem
                                    isReadOnly={isReadOnly}
                                    handleAddPeriode={handleAddPeriode}
                                    handleUpdatePeriode={handleUpdatePeriode}
                                    handleDeletePerioder={handleDeletePerioder}
                                    uttaksplanperioder={uttaksplanperioderForRad}
                                    erFamiliehendelse
                                    isAllAccordionsOpen={isAllAccordionsOpen}
                                />
                            )}
                        </Fragment>
                    );
                } else {
                    return (
                        <Fragment
                            key={`${getFørsteUttaksplanperiodeFom(uttaksplanperioderForRad)}-${getSisteUttaksplanperiodeTom(uttaksplanperioderForRad)}`}
                        >
                            {indexOfFørstePeriodeEtterFødsel === index && (
                                <PeriodeListeItem
                                    isReadOnly={isReadOnly}
                                    handleAddPeriode={handleAddPeriode}
                                    handleUpdatePeriode={handleUpdatePeriode}
                                    handleDeletePerioder={handleDeletePerioder}
                                    uttaksplanperioder={uttaksplanperioderForRad}
                                    erFamiliehendelse
                                    isAllAccordionsOpen={isAllAccordionsOpen}
                                />
                            )}
                            <PeriodeListeItem
                                isReadOnly={isReadOnly}
                                handleAddPeriode={handleAddPeriode}
                                handleUpdatePeriode={handleUpdatePeriode}
                                handleDeletePerioder={handleDeletePerioder}
                                uttaksplanperioder={uttaksplanperioderForRad}
                                isAllAccordionsOpen={isAllAccordionsOpen}
                            />
                        </Fragment>
                    );
                }
            })}
        </div>
    );
};
