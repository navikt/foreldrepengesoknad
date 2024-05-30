import dayjs from 'dayjs';
import { FunctionComponent } from 'react';

import { Periode, isValidTidsperiode } from '@navikt/fp-common';

import Permisjonsperiode from '../../types/Permisjonsperiode';
import { mapPerioderToPermisjonsperiode } from '../../utils/permisjonsperiodeUtils';
import PeriodeListeItemFamiliehendelse from '../periode-liste-item/PeriodeListeItemFamiliehendelse';
import PeriodeListeItem from './../periode-liste-item/PeriodeListeItem';

interface Props {
    perioder: Periode[];
    familiehendelsedato: string;
    erFarEllerMedmor: boolean;
}

const getIndexOfFørstePeriodeEtterFødsel = (permisjonsperioder: Permisjonsperiode[], familiehendelsesdato: string) => {
    return permisjonsperioder.findIndex(
        (p) => isValidTidsperiode(p.tidsperiode) && dayjs(p.tidsperiode.fom).isSameOrAfter(familiehendelsesdato, 'd'),
    );
};

const PeriodeListe: FunctionComponent<Props> = ({ perioder, familiehendelsedato }) => {
    const permisjonsperioder = mapPerioderToPermisjonsperiode(perioder, familiehendelsedato);
    const indexOfFørstePeriodeEtterFødsel = getIndexOfFørstePeriodeEtterFødsel(permisjonsperioder, familiehendelsedato);

    return (
        <div>
            {permisjonsperioder.map((p, index) => {
                return (
                    <>
                        {indexOfFørstePeriodeEtterFødsel === index ? (
                            <PeriodeListeItemFamiliehendelse
                                permisjonsperiode={p}
                                familiehendelsedato={familiehendelsedato}
                                erFamiliehendelse={true}
                            />
                        ) : null}
                        <PeriodeListeItem permisjonsperiode={p} familiehendelsedato={familiehendelsedato} />
                    </>
                );
            })}
        </div>
    );
};

export default PeriodeListe;
