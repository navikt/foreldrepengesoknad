import dayjs from 'dayjs';
import { FunctionComponent } from 'react';

import { Accordion } from '@navikt/ds-react';

import { Barn, FamiliehendelseType, Periode, isAdoptertBarn, isUfødtBarn, isValidTidsperiode } from '@navikt/fp-common';

import Permisjonsperiode from '../../types/Permisjonsperiode';
import { mapPerioderToPermisjonsperiode } from '../../utils/permisjonsperiodeUtils';
import PeriodeListeItem from './../periode-liste-item/PeriodeListeItem';

interface Props {
    perioder: Periode[];
    familiehendelsedato: string;
    barn: Barn;
}

const getIndexOfFørstePeriodeEtterFødsel = (permisjonsperioder: Permisjonsperiode[], familiehendelsesdato: string) => {
    return permisjonsperioder.findIndex(
        (p) => isValidTidsperiode(p.tidsperiode) && dayjs(p.tidsperiode.fom).isSameOrAfter(familiehendelsesdato, 'd'),
    );
};

const getFamiliehendelseType = (barn: Barn) => {
    if (isUfødtBarn(barn)) {
        return FamiliehendelseType.TERM;
    }

    if (isAdoptertBarn(barn)) {
        return FamiliehendelseType.ADOPSJON;
    }

    return FamiliehendelseType.FØDSEL;
};

const PeriodeListe: FunctionComponent<Props> = ({ perioder, familiehendelsedato, barn }) => {
    const permisjonsperioder = mapPerioderToPermisjonsperiode(perioder, familiehendelsedato);
    const indexOfFørstePeriodeEtterFødsel = getIndexOfFørstePeriodeEtterFødsel(permisjonsperioder, familiehendelsedato);
    const familiehendelseType = getFamiliehendelseType(barn);

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
                                    familiehendelseType={familiehendelseType}
                                />
                            ) : null}
                            <PeriodeListeItem permisjonsperiode={p} familiehendelsedato={familiehendelsedato} />
                        </>
                    );
                })}
            </Accordion>
        </div>
    );
};

export default PeriodeListe;
