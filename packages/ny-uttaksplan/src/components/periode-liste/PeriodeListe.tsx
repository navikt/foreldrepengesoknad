import dayjs from 'dayjs';
import { Fragment } from 'react';

import { Accordion } from '@navikt/ds-react';

import { isValidTidsperiodeString } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { UttaksplanContextDataType, useContextGetData } from '../../context/UttaksplanDataContext';
import { Permisjonsperiode } from '../../types/Permisjonsperiode';
import { Planperiode } from '../../types/Planperiode';
import { mapPerioderToPermisjonsperiode } from '../../utils/permisjonsperiodeUtils';
import { PeriodeListeItem } from './../periode-liste-item/PeriodeListeItem';

interface Props {
    perioder: Planperiode[];
    handleUpdatePeriode: (oppdatertPeriode: Planperiode) => void;
    handleDeletePeriode: (slettetPeriode: Planperiode) => void;
    handleDeletePerioder: (slettedePerioder: Planperiode[]) => void;
}

const getIndexOfFørstePeriodeEtterFødsel = (permisjonsperioder: Permisjonsperiode[], familiehendelsesdato: string) => {
    return permisjonsperioder.findIndex(
        (p) =>
            isValidTidsperiodeString(p.tidsperiode) &&
            dayjs(p.tidsperiode.fom).isSameOrAfter(familiehendelsesdato, 'd'),
    );
};

export const PeriodeListe = ({ perioder, handleUpdatePeriode, handleDeletePeriode, handleDeletePerioder }: Props) => {
    const familiehendelsedato = notEmpty(useContextGetData(UttaksplanContextDataType.FAMILIEHENDELSEDATO));

    const permisjonsperioder = mapPerioderToPermisjonsperiode(perioder, familiehendelsedato);
    const indexOfFørstePeriodeEtterFødsel = getIndexOfFørstePeriodeEtterFødsel(permisjonsperioder, familiehendelsedato);

    return (
        <div>
            <Accordion>
                {permisjonsperioder.map((p, index) => {
                    return (
                        <Fragment key={`${p.tidsperiode.fom}-${p.tidsperiode.tom}`}>
                            {indexOfFørstePeriodeEtterFødsel === index ? (
                                <PeriodeListeItem
                                    handleUpdatePeriode={handleUpdatePeriode}
                                    handleDeletePeriode={handleDeletePeriode}
                                    handleDeletePerioder={handleDeletePerioder}
                                    permisjonsperiode={p}
                                    erFamiliehendelse={true}
                                />
                            ) : null}
                            <PeriodeListeItem
                                handleUpdatePeriode={handleUpdatePeriode}
                                handleDeletePeriode={handleDeletePeriode}
                                handleDeletePerioder={handleDeletePerioder}
                                permisjonsperiode={p}
                            />
                        </Fragment>
                    );
                })}
            </Accordion>
        </div>
    );
};
