import { Periode } from 'app/types/Periode';
import * as React from 'react';
import PeriodeListeItem from '../periode-liste-item/PeriodeListeItem';
import { BodyShort } from '@navikt/ds-react';
import './periode-liste.css';
import { bemUtils } from '@navikt/fp-common';
import { NavnPåForeldre } from 'app/utils/personUtils';

interface Props {
    erAleneOmOmsorg: boolean;
    erFarEllerMedmor: boolean;
    navnPåForeldre: NavnPåForeldre;
    periodeListe: Periode[];
    tittel: string;
}

const PeriodeListe: React.FunctionComponent<Props> = ({
    erAleneOmOmsorg,
    erFarEllerMedmor,
    navnPåForeldre,
    periodeListe = [],
    tittel,
}) => {
    const bem = bemUtils('periode-liste');
    return (
        <>
            <BodyShort className={bem.element('title')}>{tittel}</BodyShort>
            <div className={bem.element('block')}>
                {periodeListe &&
                    periodeListe.length > 0 &&
                    periodeListe.map((periode, index) => {
                        return (
                            <PeriodeListeItem
                                key={index}
                                periode={periode}
                                erFarEllerMedmor={erFarEllerMedmor}
                                erAleneOmOmsorg={erAleneOmOmsorg}
                                navnPåForeldre={navnPåForeldre}
                            />
                        );
                    })}
            </div>
        </>
    );
};

export default PeriodeListe;
