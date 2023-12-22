import {
    Forelder,
    NavnPåForeldre,
    Periode,
    Periodetype,
    Situasjon,
    StønadskontoType,
    Tidsperioden,
    bemUtils,
    getUkerOgDagerFromDager,
    getValidTidsperiode,
    intlUtils,
    isForeldrepengerFørFødselUttaksperiode,
    isUtsettelseAnnenPart,
    isUttakAnnenPart,
    måned,
    måned3bokstaver,
    år,
} from '@navikt/fp-common';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import StønadskontoIkon from '../stønadskonto-ikon/StønadskontoIkon';
import UtsettelseIkon from '../utsettelse-ikon/UtsettelseIkon';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import UttaksplanIkon from '../uttaksplan-ikon/UttaksplanIkon';
import { BodyShort, Label } from '@navikt/ds-react';

import './periodelisteItemHeader.less';
import { getForelderNavn, getPeriodeTittel } from '@navikt/fp-common/src/common/utils/periodeUtils';
import { VeilederMessage } from '../../validering/veilederInfo/types';
import UttaksplanAdvarselIkon from '../../assets/UttaksplanAdvarselIkon';
import { getIkonForVeilederMelding } from '../../validering/veilederInfo/components/VeilederMelding';

interface Props {
    egenPeriode: boolean;
    periode: Periode;
    navnPåForeldre: NavnPåForeldre;
    melding: VeilederMessage | undefined;
    annenForelderSamtidigUttakPeriode?: Periode;
    familiehendelsesdato: Date;
    termindato: Date | undefined;
    situasjon: Situasjon;
    erFarEllerMedmor: boolean;
    erAleneOmOmsorg: boolean;
}

const bem = bemUtils('periodelisteItemHeader');

export const getPeriodeIkon = (
    periode: Periode,
    navnPåForeldre: NavnPåForeldre,
    harMidlertidigOmsorg?: boolean,
    erFarEllerMedmor?: boolean,
    situasjon?: Situasjon,
    erAleneOmOmsorg?: boolean,
): React.ReactNode | undefined => {
    switch (periode.type) {
        case Periodetype.Uttak:
            return (
                <StønadskontoIkon
                    konto={periode.konto}
                    forelder={periode.forelder}
                    gradert={periode.gradert}
                    navnPåForeldre={navnPåForeldre}
                    harMidlertidigOmsorg={harMidlertidigOmsorg}
                    erFarEllerMedmor={erFarEllerMedmor}
                    situasjon={situasjon}
                    erAleneOmOmsorg={erAleneOmOmsorg}
                />
            );
        case Periodetype.Overføring:
            return (
                <StønadskontoIkon konto={periode.konto} forelder={periode.forelder} navnPåForeldre={navnPåForeldre} />
            );
        case Periodetype.Utsettelse:
            return <UtsettelseIkon årsak={periode.årsak} />;
        case Periodetype.Opphold:
            return (
                <StønadskontoIkon
                    konto={StønadskontoType.Foreldrepenger}
                    forelder={periode.forelder}
                    navnPåForeldre={navnPåForeldre}
                />
            );
        case Periodetype.Info:
            if (isUtsettelseAnnenPart(periode)) {
                return <UtsettelseIkon årsak={periode.årsak} />;
            } else {
                return (
                    <StønadskontoIkon
                        konto={StønadskontoType.Foreldrepenger}
                        forelder={periode.forelder}
                        navnPåForeldre={navnPåForeldre}
                    />
                );
            }
        case Periodetype.Hull:
            return <UttaksplanAdvarselIkon />;
    }
    return undefined;
};

type VarighetFormat = 'full' | 'normal';

export const getVarighetString = (antallDager: number, intl: IntlShape, format: VarighetFormat = 'full'): string => {
    const { uker, dager } = getUkerOgDagerFromDager(Math.abs(antallDager));
    const dagerStr = intl.formatMessage(
        { id: 'common.varighet.dager' },
        {
            dager,
        },
    );
    if (uker === 0) {
        return dagerStr;
    }
    const ukerStr = intl.formatMessage({ id: 'common.varighet.uker' }, { uker });
    if (dager > 0) {
        return `${ukerStr}${intl.formatMessage({
            id: `common.varighet.separator--${format}`,
        })}${dagerStr}`;
    }
    return ukerStr;
};

const renderDagMnd = (dato: Date, visÅr = true): JSX.Element => {
    const d = dayjs(dato);

    return (
        <div className={bem.element('dagmnd')}>
            <span className={bem.element('dagmnd__dato')}>
                <BodyShort>
                    {d.get('date')}. {måned3bokstaver(d)}.
                </BodyShort>
            </span>
            {visÅr && (
                <BodyShort as="span" className={bem.element('dagmnd__mnd')}>
                    <abbr title={`${måned(d)} ${år(d)}`}>{år(d)}</abbr>
                </BodyShort>
            )}
        </div>
    );
};

const PeriodelisteItemHeader: FunctionComponent<Props> = ({
    periode,
    navnPåForeldre,
    melding,
    annenForelderSamtidigUttakPeriode,
    familiehendelsesdato,
    termindato,
    situasjon,
    erFarEllerMedmor,
    erAleneOmOmsorg,
}) => {
    const intl = useIntl();

    let varighetString;
    const erFpFørTerminUtenUttak =
        isForeldrepengerFørFødselUttaksperiode(periode) && periode.skalIkkeHaUttakFørTermin === true;
    if (erFpFørTerminUtenUttak) {
        varighetString = intlUtils(intl, 'uttaksplan.periodeliste.header.skalIkkeHaUttakFørTermin');
    } else {
        varighetString = getVarighetString(Tidsperioden(periode.tidsperiode).getAntallUttaksdager(), intl);
    }

    let annenForelderIsMor;
    let annenForelderNavn;
    let beskrivelseSamtidigUttak;
    if (annenForelderSamtidigUttakPeriode && isUttakAnnenPart(annenForelderSamtidigUttakPeriode)) {
        annenForelderIsMor = annenForelderSamtidigUttakPeriode.forelder === Forelder.mor;
        annenForelderNavn = getForelderNavn(annenForelderSamtidigUttakPeriode.forelder, navnPåForeldre);
        beskrivelseSamtidigUttak = getVarighetString(
            getValidTidsperiode(annenForelderSamtidigUttakPeriode.tidsperiode)
                ? Tidsperioden(annenForelderSamtidigUttakPeriode.tidsperiode).getAntallUttaksdager()
                : 0,
            intl,
        );
    }

    return (
        <div>
            <div className={bem.block}>
                <div className={bem.element('content')}>
                    <div className={bem.element('ikon')}>{getPeriodeIkon(periode, navnPåForeldre)}</div>
                    <div className={bem.element('tittel')}>
                        <Label as="h4">
                            {getPeriodeTittel(
                                intl,
                                periode,
                                navnPåForeldre,
                                familiehendelsesdato,
                                termindato,
                                situasjon,
                                erFarEllerMedmor,
                                erAleneOmOmsorg,
                            )}
                        </Label>
                        <BodyShort>{varighetString}</BodyShort>
                    </div>
                    <div className={bem.element('advarsel')}>
                        {melding && (
                            <span
                                role="presentation"
                                className={bem.modifier(`color-${getIkonForVeilederMelding(melding)}`)}
                            >
                                <UttaksplanIkon
                                    ikon={getIkonForVeilederMelding(melding)}
                                    title={melding.contentIntlKey}
                                />
                            </span>
                        )}
                    </div>
                    {!erFpFørTerminUtenUttak && (
                        <div className={bem.element('dato-container')}>
                            {renderDagMnd(periode.tidsperiode.fom)}
                            {renderDagMnd(periode.tidsperiode.tom)}
                        </div>
                    )}
                </div>
            </div>

            {annenForelderSamtidigUttakPeriode && (
                <div
                    className={classNames(bem.element('samtidig-uttak'), {
                        [bem.element('samtidig-uttak-mor')]: annenForelderIsMor,
                        [bem.element('samtidig-uttak-far')]: !annenForelderIsMor,
                    })}
                >
                    <div>
                        <Label>
                            <FormattedMessage id="oppsummering.morsAktivitet.SamtidigUttak" />
                        </Label>
                    </div>
                    <div className={bem.element('beskrivelse')}>
                        <em className={bem.element('beskrivelse__tekst')}>
                            {beskrivelseSamtidigUttak}
                            <em className={bem.element('hvem')}> - {annenForelderNavn}</em>
                        </em>
                    </div>
                    {annenForelderSamtidigUttakPeriode.tidsperiode && (
                        <div className={bem.element('tidsrom')}>
                            {renderDagMnd(annenForelderSamtidigUttakPeriode.tidsperiode.fom, false)}
                            {renderDagMnd(annenForelderSamtidigUttakPeriode.tidsperiode.tom, false)}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PeriodelisteItemHeader;
