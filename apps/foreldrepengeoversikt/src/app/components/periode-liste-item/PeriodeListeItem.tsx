import { BodyShort, Heading } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import StønadskontoIkon from 'app/components/stønadskonto-ikon/StønadskontoIkon';
import UtsettelseIkon from 'app/components/utsettelse-ikon/UtsettelseIkon';
import { Periode } from 'app/types/Periode';
import {
    getAntallUttaksdagerITidsperiode,
    getVarighetString,
    ISOStringToDate,
    måned3bokstaver,
} from 'app/utils/dateUtils';
import {
    getOverlappendePeriodeTittel,
    getPeriodeTittel,
    isAvslåttPeriode,
    isOppholdsperiode,
    isOverføringsperiode,
    isUtsettelsesperiode,
    isUttaksperiode,
} from 'app/utils/periodeUtils';
import { NavnPåForeldre } from 'app/utils/personUtils';
import classNames from 'classnames';
import dayjs from 'dayjs';
import React from 'react';
import { useIntl } from 'react-intl';

import './periodeListeItem.css';

interface Props {
    erAleneOmOmsorg: boolean;
    erFarEllerMedmor: boolean;
    navnPåForeldre: NavnPåForeldre;
    overlappendePeriodeAnnenPart?: Periode;
    periode: Periode;
}

const PeriodeListeItem: React.FunctionComponent<Props> = ({
    periode,
    erFarEllerMedmor,
    erAleneOmOmsorg,
    navnPåForeldre,
    overlappendePeriodeAnnenPart,
}) => {
    const bem = bemUtils('periode');
    const intl = useIntl();
    const { fom, tom } = periode;
    const fomDate = ISOStringToDate(fom);
    const tomDate = ISOStringToDate(tom);
    const tittel = getPeriodeTittel(intl, periode, navnPåForeldre, erFarEllerMedmor, erAleneOmOmsorg);
    const antallDagerIPeriode = getAntallUttaksdagerITidsperiode({
        fom: dayjs(periode.fom).toDate(),
        tom: dayjs(periode.tom).toDate(),
    });
    const navnSøker = erFarEllerMedmor ? navnPåForeldre.farMedmor : navnPåForeldre.mor;
    const navnAnnenForelder = erFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;
    const navnPeriodeEier = periode.gjelderAnnenPart ? navnAnnenForelder : navnSøker;
    const varighetString = getVarighetString(antallDagerIPeriode, intl);
    const visStønadskontoIkon =
        isUttaksperiode(periode) ||
        isOverføringsperiode(periode) ||
        isOppholdsperiode(periode) ||
        isAvslåttPeriode(periode);
    const visUtsettelsesIkon = !visStønadskontoIkon && isUtsettelsesperiode(periode);
    return (
        <div
            className={classNames(
                `${bem.block} ${bem.element('box')} ${
                    isAvslåttPeriode(periode) || periode.gjelderAnnenPart ? bem.modifier('grå') : bem.modifier('hvit')
                }`
            )}
        >
            <div>
                <div className={bem.element('innhold')}>
                    {visStønadskontoIkon && (
                        <StønadskontoIkon
                            konto={periode.kontoType!}
                            gradert={!!periode.gradering}
                            navnPåForeldre={navnPåForeldre}
                            erFarEllerMedmor={erFarEllerMedmor}
                            erAleneOmOmsorg={erAleneOmOmsorg}
                            periodeResultat={periode.resultat}
                            morsAktivitet={periode.morsAktivitet}
                        />
                    )}
                    {visUtsettelsesIkon && <UtsettelseIkon årsak={periode.utsettelseÅrsak!} />}
                    <div className={bem.element('innhold-tekst-periodetittel')}>
                        <Heading size="small" level="4">
                            {tittel}
                        </Heading>
                        <div className={bem.element('beskrivelse')}>
                            <BodyShort size="small">{`${varighetString} -`}</BodyShort>
                            <BodyShort className={bem.modifier('eierNavn')} size="small">
                                {`${navnPeriodeEier}`}
                            </BodyShort>
                        </div>
                    </div>
                    <div className={bem.element('innhold-tekst-date')}>
                        <BodyShort size="small">
                            {dayjs(fomDate).get('date')}. {måned3bokstaver(dayjs(fomDate))}.
                        </BodyShort>
                        <BodyShort size="small" className={bem.modifier('year')}>
                            {dayjs(fomDate).get('year')}
                        </BodyShort>
                    </div>
                    <div className={bem.element('innhold-tekst-date')}>
                        <BodyShort size="small">
                            {dayjs(tomDate).get('date')}. {måned3bokstaver(dayjs(tomDate))}.
                        </BodyShort>
                        <BodyShort size="small" className={bem.modifier('year')}>
                            {dayjs(tomDate).get('year')}
                        </BodyShort>
                    </div>
                </div>
                {overlappendePeriodeAnnenPart && (
                    <div
                        className={classNames(
                            bem.element('samtidig-uttak'),
                            bem.modifier(`bg-${erFarEllerMedmor ? 'mor' : 'farMedmor'}`)
                        )}
                    >
                        <div className={bem.element('annen_part_innhold')}>
                            <BodyShort size="small" className={bem.modifier('samtidigUttakAnnenPart')}>
                                {getOverlappendePeriodeTittel(
                                    periode,
                                    overlappendePeriodeAnnenPart,
                                    intl,
                                    navnPåForeldre
                                )}
                            </BodyShort>
                            <div className={bem.element('beskrivelse')}>
                                <BodyShort size="small">{`${varighetString} -`}</BodyShort>
                                <BodyShort className={bem.modifier('eierNavn')} size="small">
                                    {`${navnAnnenForelder}`}
                                </BodyShort>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
//color={getStønadskontoFarge(konto)}
export default PeriodeListeItem;
