import * as React from 'react';
import moment from 'moment';
import { onToggleItemProp } from '../../../../toggle-list/ToggleList';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { Periode, GruppertInfoPeriode } from '../../../../../types/uttaksplan/periodetyper';
import { NavnPåForeldre } from 'common/types';
import PeriodelisteInfo from './PeriodelisteInfo';
import { getPeriodeForelderNavn } from 'app/util/uttaksplan';
import { getNavnGenitivEierform } from 'app/util/tekstUtils';
import EnkelPeriodeliste from 'app/components/enkelPeriodeliste/EnkelPeriodeliste';
import { Periodene } from 'app/util/uttaksplan/Periodene';
import { getPeriodeIkon } from '../elements/PeriodeHeader';

export interface Props {
    itemId: string;
    isExpanded: boolean;
    onToggle: onToggleItemProp;
    periode: GruppertInfoPeriode;
    navnPåForeldre: NavnPåForeldre;
    stil?: undefined | 'medRammeOgStrek';
}

const PeriodelisteGruppertInfoPart: React.StatelessComponent<Props & InjectedIntlProps> = ({
    itemId,
    isExpanded,
    onToggle,
    periode,
    navnPåForeldre,
    stil = 'medRammeOgStrek',
    intl
}) => {
    const perioderITidsperiode: Periode[] = Periodene(periode.perioder)
        .finnOverlappendePerioder(periode)
        .map((p) => ({
            ...p,
            tidsperiode: {
                fom: moment.max([moment(periode.tidsperiode.fom), moment(p.tidsperiode.fom)]).toDate(),
                tom: moment.min([moment(periode.tidsperiode.tom), moment(p.tidsperiode.tom)]).toDate()
            }
        }));

    const tittel = getMessage(intl, 'periodeliste.gruppertInfo.tittel', {
        navn: getNavnGenitivEierform(getPeriodeForelderNavn(periode, navnPåForeldre), intl.locale),
        antallPerioder: perioderITidsperiode.length
    });

    return (
        <PeriodelisteInfo
            id={itemId}
            tittel={tittel}
            isExpanded={isExpanded}
            onToggle={onToggle}
            ikon={getPeriodeIkon(periode, navnPåForeldre)}
            farge="transparent"
            border={stil === 'medRammeOgStrek'}
            renderContent={() => (
                <div>
                    <EnkelPeriodeliste perioder={perioderITidsperiode} navnPåForeldre={navnPåForeldre} />
                </div>
            )}
        />
    );
};

export default injectIntl(PeriodelisteGruppertInfoPart);
