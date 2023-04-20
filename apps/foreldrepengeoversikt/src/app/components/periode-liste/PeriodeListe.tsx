import { Periode } from 'app/types/Periode';
import * as React from 'react';
import PeriodeListeItem from '../periode-liste-item/PeriodeListeItem';
import { Heading } from '@navikt/ds-react';
import './periode-liste.css';
import { bemUtils, guid } from '@navikt/fp-common';
import { NavnPåForeldre } from 'app/utils/personUtils';
import { getTidsperiode, Tidsperioden } from 'app/utils/tidsperiodeUtils';
import { isUttaksperiode } from 'app/utils/periodeUtils';

interface Props {
    erAleneOmOmsorg: boolean;
    erFarEllerMedmor: boolean;
    navnPåForeldre: NavnPåForeldre;
    overlappendePerioderAnnenPart: Periode[] | undefined;
    periodeListe: Periode[];
    tittel: string;
}

const PeriodeListe: React.FunctionComponent<Props> = ({
    erAleneOmOmsorg,
    erFarEllerMedmor,
    navnPåForeldre,
    periodeListe = [],
    tittel,
    overlappendePerioderAnnenPart: annenPartsOverlappendePerioder,
}) => {
    const bem = bemUtils('periode-liste');
    return (
        <>
            <Heading size="xsmall" level="3" className={bem.element('title')}>
                {tittel}
            </Heading>
            <div className={bem.element('block')}>
                {periodeListe &&
                    periodeListe.length > 0 &&
                    periodeListe.map((periode) => {
                        const overlappendePeriodeAnnenPartForVisning =
                            !periode.gjelderAnnenPart &&
                            periode.resultat &&
                            periode.resultat.innvilget &&
                            isUttaksperiode(periode) &&
                            annenPartsOverlappendePerioder
                                ? annenPartsOverlappendePerioder.find((p) =>
                                      Tidsperioden(getTidsperiode(p)).overlapper(getTidsperiode(periode))
                                  )
                                : undefined;
                        return (
                            <PeriodeListeItem
                                key={guid()}
                                periode={periode}
                                erFarEllerMedmor={erFarEllerMedmor}
                                erAleneOmOmsorg={erAleneOmOmsorg}
                                navnPåForeldre={navnPåForeldre}
                                overlappendePeriodeAnnenPart={overlappendePeriodeAnnenPartForVisning}
                            />
                        );
                    })}
            </div>
        </>
    );
};

export default PeriodeListe;
