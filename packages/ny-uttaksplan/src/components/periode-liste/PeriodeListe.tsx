import dayjs from 'dayjs';
import { FunctionComponent } from 'react';

import { BodyShort } from '@navikt/ds-react';

import { Periode, isValidTidsperiode } from '@navikt/fp-common';

import Permisjonsperiode from '../../types/Permisjonsperiode';
import { mapPerioderToPermisjonsperiode } from '../../utils/permisjonsperiodeUtils';
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

const PeriodeListe: FunctionComponent<Props> = ({ perioder, familiehendelsedato, erFarEllerMedmor }) => {
    const permisjonsperioder = mapPerioderToPermisjonsperiode(perioder, erFarEllerMedmor, familiehendelsedato);
    const indexOfFørstePeriodeEtterFødsel = getIndexOfFørstePeriodeEtterFødsel(permisjonsperioder, familiehendelsedato);

    return (
        <div>
            {permisjonsperioder.map((p, index) => {
                return (
                    <>
                        {indexOfFørstePeriodeEtterFødsel === index ? (
                            <BodyShort>{familiehendelsedato}</BodyShort>
                        ) : null}
                        <PeriodeListeItem permisjonsperiode={p} familiehendelsedato={familiehendelsedato} />
                    </>
                );
            })}
        </div>
    );
};

export default PeriodeListe;
