import dayjs from 'dayjs';
import { FunctionComponent } from 'react';

import { Accordion } from '@navikt/ds-react';

import { AnnenForelder, NavnPåForeldre, Periode, isValidTidsperiode } from '@navikt/fp-common';

import Permisjonsperiode from '../../types/Permisjonsperiode';
import { mapPerioderToPermisjonsperiode } from '../../utils/permisjonsperiodeUtils';
import PeriodeListeItem from './../periode-liste-item/PeriodeListeItem';

interface Props {
    perioder: Periode[];
    familiehendelsedato: string;
    erFarEllerMedmor: boolean;
    navnPåForeldre: NavnPåForeldre;
    annenForelder: AnnenForelder;
}

const getIndexOfFørstePeriodeEtterFødsel = (permisjonsperioder: Permisjonsperiode[], familiehendelsesdato: string) => {
    return permisjonsperioder.findIndex(
        (p) => isValidTidsperiode(p.tidsperiode) && dayjs(p.tidsperiode.fom).isSameOrAfter(familiehendelsesdato, 'd'),
    );
};

const PeriodeListe: FunctionComponent<Props> = ({
    perioder,
    familiehendelsedato,
    navnPåForeldre,
    erFarEllerMedmor,
    annenForelder,
}) => {
    const permisjonsperioder = mapPerioderToPermisjonsperiode(perioder, familiehendelsedato);
    const indexOfFørstePeriodeEtterFødsel = getIndexOfFørstePeriodeEtterFødsel(permisjonsperioder, familiehendelsedato);

    return (
        <div>
            <Accordion>
                {permisjonsperioder.map((p, index) => {
                    return (
                        <>
                            {indexOfFørstePeriodeEtterFødsel === index ? (
                                <PeriodeListeItem
                                    permisjonsperiode={p}
                                    familiehendelsedato={familiehendelsedato}
                                    erFamiliehendelse={true}
                                    navnPåForeldre={navnPåForeldre}
                                    erFarEllerMedmor={erFarEllerMedmor}
                                    annenForelder={annenForelder}
                                />
                            ) : null}
                            <PeriodeListeItem
                                permisjonsperiode={p}
                                familiehendelsedato={familiehendelsedato}
                                navnPåForeldre={navnPåForeldre}
                                erFarEllerMedmor={erFarEllerMedmor}
                                annenForelder={annenForelder}
                            />
                        </>
                    );
                })}
            </Accordion>
        </div>
    );
};

export default PeriodeListe;
