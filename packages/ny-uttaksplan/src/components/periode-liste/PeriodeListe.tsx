import dayjs from 'dayjs';
import { Fragment } from 'react';

import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { Uttaksplanperiode, erVanligUttakPeriode } from '../../types/UttaksplanPeriode';
import { mapUttaksplanperioderTilPeriodemap } from '../../utils/permisjonsperiodeUtils';
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

    const permisjonsperioder = mapUttaksplanperioderTilPeriodemap(saksperioderInkludertHull, familiehendelsedato);
    const indexOfFørstePeriodeEtterFødsel = getIndexOfFørstePeriodeEtterFødsel(permisjonsperioder, familiehendelsedato);
    const perioderEtterFamdato = saksperioderInkludertHull.filter(
        (periode) =>
            dayjs(periode.fom).isSameOrAfter(familiehendelsedato, 'day') &&
            !(
                erVanligUttakPeriode(periode) &&
                periode.kontoType !== undefined &&
                periode.kontoType === 'FORELDREPENGER_FØR_FØDSEL'
            ),
    );

    const uttaksplanperioder = Array.from(permisjonsperioder.values());

    return (
        <div>
            {uttaksplanperioder.map((permisjonsperiode, index) => {
                if (perioderEtterFamdato.length === 0) {
                    return (
                        <Fragment
                            key={`${getFørsteUttaksplanperiodeFom(permisjonsperiode)}-${getSisteUttaksplanperiodeTom(permisjonsperiode)}`}
                        >
                            <PeriodeListeItem
                                isReadOnly={isReadOnly}
                                handleAddPeriode={handleAddPeriode}
                                handleUpdatePeriode={handleUpdatePeriode}
                                handleDeletePerioder={handleDeletePerioder}
                                uttaksplanperioder={permisjonsperiode}
                                isAllAccordionsOpen={isAllAccordionsOpen}
                            />
                            {uttaksplanperioder.length - 1 === index && (
                                <PeriodeListeItem
                                    isReadOnly={isReadOnly}
                                    handleAddPeriode={handleAddPeriode}
                                    handleUpdatePeriode={handleUpdatePeriode}
                                    handleDeletePerioder={handleDeletePerioder}
                                    uttaksplanperioder={permisjonsperiode}
                                    erFamiliehendelse
                                    isAllAccordionsOpen={isAllAccordionsOpen}
                                />
                            )}
                        </Fragment>
                    );
                } else {
                    return (
                        <Fragment
                            key={`${getFørsteUttaksplanperiodeFom(permisjonsperiode)}-${getSisteUttaksplanperiodeTom(permisjonsperiode)}`}
                        >
                            {indexOfFørstePeriodeEtterFødsel === index && (
                                <PeriodeListeItem
                                    isReadOnly={isReadOnly}
                                    handleAddPeriode={handleAddPeriode}
                                    handleUpdatePeriode={handleUpdatePeriode}
                                    handleDeletePerioder={handleDeletePerioder}
                                    uttaksplanperioder={permisjonsperiode}
                                    erFamiliehendelse
                                    isAllAccordionsOpen={isAllAccordionsOpen}
                                />
                            )}
                            <PeriodeListeItem
                                isReadOnly={isReadOnly}
                                handleAddPeriode={handleAddPeriode}
                                handleUpdatePeriode={handleUpdatePeriode}
                                handleDeletePerioder={handleDeletePerioder}
                                uttaksplanperioder={permisjonsperiode}
                                isAllAccordionsOpen={isAllAccordionsOpen}
                            />
                        </Fragment>
                    );
                }
            })}
        </div>
    );
};

const getIndexOfFørstePeriodeEtterFødsel = (
    permisjonsperioder: Map<string, Uttaksplanperiode[]>,
    familiehendelsesdato: string,
) => {
    return Array.from(permisjonsperioder.values()).findIndex((p) =>
        dayjs(p.at(0)!.fom).isSameOrAfter(familiehendelsesdato, 'd'),
    );
};
