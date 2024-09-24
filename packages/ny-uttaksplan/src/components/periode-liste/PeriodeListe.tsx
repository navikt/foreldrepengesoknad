import dayjs from 'dayjs';
import { FunctionComponent } from 'react';

import { Accordion } from '@navikt/ds-react';

import { isValidTidsperiodeString } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { UttaksplanContextDataType, useContextGetData } from '../../context/UttaksplanDataContext';
import Permisjonsperiode from '../../types/Permisjonsperiode';
import { Planperiode } from '../../types/Planperiode';
import { mapPerioderToPermisjonsperiode } from '../../utils/permisjonsperiodeUtils';
import PeriodeListeItem from './../periode-liste-item/PeriodeListeItem';

interface Props {
    perioder: Planperiode[];
}

const getIndexOfFørstePeriodeEtterFødsel = (permisjonsperioder: Permisjonsperiode[], familiehendelsesdato: string) => {
    return permisjonsperioder.findIndex(
        (p) =>
            isValidTidsperiodeString(p.tidsperiode) &&
            dayjs(p.tidsperiode.fom).isSameOrAfter(familiehendelsesdato, 'd'),
    );
};

const PeriodeListe: FunctionComponent<Props> = ({ perioder }) => {
    const familiehendelsedato = notEmpty(useContextGetData(UttaksplanContextDataType.FAMILIEHENDELSEDATO));

    const permisjonsperioder = mapPerioderToPermisjonsperiode(perioder, familiehendelsedato);
    const indexOfFørstePeriodeEtterFødsel = getIndexOfFørstePeriodeEtterFødsel(permisjonsperioder, familiehendelsedato);

    return (
        <div>
            <Accordion>
                {permisjonsperioder.map((p, index) => {
                    return (
                        <div key={`${p.tidsperiode.tom} ${p.tidsperiode.fom}`}>
                            {indexOfFørstePeriodeEtterFødsel === index ? (
                                <PeriodeListeItem permisjonsperiode={p} erFamiliehendelse={true} />
                            ) : null}
                            <PeriodeListeItem permisjonsperiode={p} />
                        </div>
                    );
                })}
            </Accordion>
        </div>
    );
};

export default PeriodeListe;
