import dayjs from 'dayjs';
import { Fragment } from 'react';

import { isValidTidsperiodeString } from '@navikt/fp-utils';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { Permisjonsperiode } from '../../types/Permisjonsperiode';
import { Planperiode } from '../../types/Planperiode';
import { Periodene } from '../../utils/Periodene';
import { mapPerioderToPermisjonsperiode } from '../../utils/permisjonsperiodeUtils';
import { PeriodeListeItem } from './../periode-liste-item/PeriodeListeItem';

interface Props {
    isReadOnly: boolean;
    perioder: Planperiode[];
    handleAddPeriode: (nyPeriode: Planperiode) => void;
    handleUpdatePeriode: (oppdatertPeriode: Planperiode) => void;
    handleDeletePeriode: (slettetPeriode: Planperiode) => void;
    handleDeletePerioder: (slettedePerioder: Planperiode[]) => void;
    isAllAccordionsOpen?: boolean;
}

export const PeriodeListe = ({
    isReadOnly,
    perioder,
    handleUpdatePeriode,
    handleDeletePeriode,
    handleDeletePerioder,
    handleAddPeriode,
    isAllAccordionsOpen,
}: Props) => {
    const { familiehendelsedato } = useUttaksplanData();

    const permisjonsperioder = mapPerioderToPermisjonsperiode(perioder, familiehendelsedato);
    const indexOfFørstePeriodeEtterFødsel = getIndexOfFørstePeriodeEtterFødsel(permisjonsperioder, familiehendelsedato);
    const perioderEtterFamdato = Periodene(perioder).getPerioderEtterFamiliehendelsesdato(familiehendelsedato);

    return (
        <div>
            {permisjonsperioder.map((permisjonsperiode, index) => {
                if (perioderEtterFamdato.length === 0) {
                    return (
                        <Fragment key={`${permisjonsperiode.tidsperiode.fom}-${permisjonsperiode.tidsperiode.tom}`}>
                            <PeriodeListeItem
                                isReadOnly={isReadOnly}
                                handleAddPeriode={handleAddPeriode}
                                handleUpdatePeriode={handleUpdatePeriode}
                                handleDeletePeriode={handleDeletePeriode}
                                handleDeletePerioder={handleDeletePerioder}
                                permisjonsperiode={permisjonsperiode}
                                isAllAccordionsOpen={isAllAccordionsOpen}
                            />
                            {permisjonsperioder.length - 1 === index && (
                                <PeriodeListeItem
                                    isReadOnly={isReadOnly}
                                    handleAddPeriode={handleAddPeriode}
                                    handleUpdatePeriode={handleUpdatePeriode}
                                    handleDeletePeriode={handleDeletePeriode}
                                    handleDeletePerioder={handleDeletePerioder}
                                    permisjonsperiode={permisjonsperiode}
                                    erFamiliehendelse
                                    isAllAccordionsOpen={isAllAccordionsOpen}
                                />
                            )}
                        </Fragment>
                    );
                } else {
                    return (
                        <Fragment key={`${permisjonsperiode.tidsperiode.fom}-${permisjonsperiode.tidsperiode.tom}`}>
                            {indexOfFørstePeriodeEtterFødsel === index && (
                                <PeriodeListeItem
                                    isReadOnly={isReadOnly}
                                    handleAddPeriode={handleAddPeriode}
                                    handleUpdatePeriode={handleUpdatePeriode}
                                    handleDeletePeriode={handleDeletePeriode}
                                    handleDeletePerioder={handleDeletePerioder}
                                    permisjonsperiode={permisjonsperiode}
                                    erFamiliehendelse
                                    isAllAccordionsOpen={isAllAccordionsOpen}
                                />
                            )}
                            <PeriodeListeItem
                                isReadOnly={isReadOnly}
                                handleAddPeriode={handleAddPeriode}
                                handleUpdatePeriode={handleUpdatePeriode}
                                handleDeletePeriode={handleDeletePeriode}
                                handleDeletePerioder={handleDeletePerioder}
                                permisjonsperiode={permisjonsperiode}
                                isAllAccordionsOpen={isAllAccordionsOpen}
                            />
                        </Fragment>
                    );
                }
            })}
        </div>
    );
};

const getIndexOfFørstePeriodeEtterFødsel = (permisjonsperioder: Permisjonsperiode[], familiehendelsesdato: string) => {
    return permisjonsperioder.findIndex(
        (p) =>
            isValidTidsperiodeString(p.tidsperiode) &&
            dayjs(p.tidsperiode.fom).isSameOrAfter(familiehendelsesdato, 'd'),
    );
};
