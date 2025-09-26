import dayjs from 'dayjs';
import { Fragment } from 'react';

import { isValidTidsperiodeString } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { UttaksplanContextDataType, useContextGetData } from '../../context/UttaksplanDataContext';
import { Permisjonsperiode } from '../../types/Permisjonsperiode';
import { Planperiode } from '../../types/Planperiode';
import { Periodene } from '../../utils/Periodene';
import { mapPerioderToPermisjonsperiode } from '../../utils/permisjonsperiodeUtils';
import { PeriodeListeItem } from './../periode-liste-item/PeriodeListeItem';

interface Props {
    perioder: Planperiode[];
    handleAddPeriode: (nyPeriode: Planperiode) => void;
    handleUpdatePeriode: (oppdatertPeriode: Planperiode) => void;
    handleDeletePeriode: (slettetPeriode: Planperiode) => void;
    handleDeletePerioder: (slettedePerioder: Planperiode[]) => void;
    isAllAccordionsOpen?: boolean;
    erMedmorDelAvSøknaden: boolean;
}

export const PeriodeListe = ({
    perioder,
    handleUpdatePeriode,
    handleDeletePeriode,
    handleDeletePerioder,
    handleAddPeriode,
    isAllAccordionsOpen,
    erMedmorDelAvSøknaden,
}: Props) => {
    const familiehendelsedato = notEmpty(useContextGetData(UttaksplanContextDataType.FAMILIEHENDELSEDATO));

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
                                handleAddPeriode={handleAddPeriode}
                                handleUpdatePeriode={handleUpdatePeriode}
                                handleDeletePeriode={handleDeletePeriode}
                                handleDeletePerioder={handleDeletePerioder}
                                permisjonsperiode={permisjonsperiode}
                                isAllAccordionsOpen={isAllAccordionsOpen}
                                erMedmorDelAvSøknaden={erMedmorDelAvSøknaden}
                            />
                            {permisjonsperioder.length - 1 === index && (
                                <PeriodeListeItem
                                    handleAddPeriode={handleAddPeriode}
                                    handleUpdatePeriode={handleUpdatePeriode}
                                    handleDeletePeriode={handleDeletePeriode}
                                    handleDeletePerioder={handleDeletePerioder}
                                    permisjonsperiode={permisjonsperiode}
                                    erFamiliehendelse
                                    isAllAccordionsOpen={isAllAccordionsOpen}
                                    erMedmorDelAvSøknaden={erMedmorDelAvSøknaden}
                                />
                            )}
                        </Fragment>
                    );
                } else {
                    return (
                        <Fragment key={`${permisjonsperiode.tidsperiode.fom}-${permisjonsperiode.tidsperiode.tom}`}>
                            {indexOfFørstePeriodeEtterFødsel === index && (
                                <PeriodeListeItem
                                    handleAddPeriode={handleAddPeriode}
                                    handleUpdatePeriode={handleUpdatePeriode}
                                    handleDeletePeriode={handleDeletePeriode}
                                    handleDeletePerioder={handleDeletePerioder}
                                    permisjonsperiode={permisjonsperiode}
                                    erFamiliehendelse
                                    isAllAccordionsOpen={isAllAccordionsOpen}
                                    erMedmorDelAvSøknaden={erMedmorDelAvSøknaden}
                                />
                            )}
                            <PeriodeListeItem
                                handleAddPeriode={handleAddPeriode}
                                handleUpdatePeriode={handleUpdatePeriode}
                                handleDeletePeriode={handleDeletePeriode}
                                handleDeletePerioder={handleDeletePerioder}
                                permisjonsperiode={permisjonsperiode}
                                isAllAccordionsOpen={isAllAccordionsOpen}
                                erMedmorDelAvSøknaden={erMedmorDelAvSøknaden}
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
