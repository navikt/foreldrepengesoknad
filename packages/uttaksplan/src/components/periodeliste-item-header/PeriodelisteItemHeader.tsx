import classNames from 'classnames';
import dayjs from 'dayjs';
import { FunctionComponent, JSX } from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { BodyShort, Label } from '@navikt/ds-react';

import {
    Forelder,
    NavnPåForeldre,
    OpprinneligSøkt,
    Periode,
    PeriodeInfoType,
    Periodetype,
    Situasjon,
    StønadskontoType,
    isSkalIkkeHaForeldrepengerFørFødselPeriode,
    isUtsettelseAnnenPart,
    isUttakAnnenPart,
} from '@navikt/fp-common';
import { Tidsperioden, getValidTidsperiode } from '@navikt/fp-utils';

import UttaksplanAdvarselIkon from '../../assets/UttaksplanAdvarselIkon';
import { måned, måned3bokstaver, år } from '../../utils/dateUtils';
import { getForelderNavn, getPeriodeTittel } from '../../utils/periodeUtils';
import planBemUtils from '../../utils/planBemUtils';
import { getIkonForVeilederMelding } from '../../validering/veilederInfo/components/VeilederMelding';
import { VeilederMessage } from '../../validering/veilederInfo/types';
import StønadskontoIkon from '../stønadskonto-ikon/StønadskontoIkon';
import UtsettelseIkon from '../utsettelse-ikon/UtsettelseIkon';
import UttaksplanIkon from '../uttaksplan-ikon/UttaksplanIkon';
import './periodelisteItemHeader.less';

interface Props {
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

const bem = planBemUtils('periodelisteItemHeader');

export const getPeriodeIkon = (
    periode: Periode,
    navnPåForeldre: NavnPåForeldre,
    erFarEllerMedmor: boolean,
    harMidlertidigOmsorg?: boolean,
    situasjon?: Situasjon,
    erAleneOmOmsorg?: boolean,
): React.ReactNode | undefined => {
    switch (periode.type) {
        case Periodetype.Uttak:
            if (periode.opprinneligSøkt === OpprinneligSøkt.Gradering) {
                return <UttaksplanAdvarselIkon />;
            }

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
                <StønadskontoIkon
                    konto={periode.konto}
                    forelder={periode.forelder}
                    navnPåForeldre={navnPåForeldre}
                    erFarEllerMedmor={erFarEllerMedmor}
                />
            );
        case Periodetype.Utsettelse:
            return <UtsettelseIkon årsak={periode.årsak} forelder={periode.forelder} />;
        case Periodetype.Opphold:
            return (
                <StønadskontoIkon
                    konto={StønadskontoType.Foreldrepenger}
                    forelder={periode.forelder}
                    navnPåForeldre={navnPåForeldre}
                    erFarEllerMedmor={erFarEllerMedmor}
                />
            );
        case Periodetype.Info:
            if (isUtsettelseAnnenPart(periode)) {
                return <UtsettelseIkon årsak={periode.årsak} forelder={periode.forelder} />;
            } else {
                if (
                    periode.infotype === PeriodeInfoType.avslåttPeriode &&
                    (periode.opprinneligSøkt === OpprinneligSøkt.Arbeid ||
                        periode.opprinneligSøkt === OpprinneligSøkt.Ferie)
                ) {
                    return <UttaksplanAdvarselIkon />;
                }

                return (
                    <StønadskontoIkon
                        konto={StønadskontoType.Foreldrepenger}
                        forelder={periode.forelder}
                        navnPåForeldre={navnPåForeldre}
                        erFarEllerMedmor={erFarEllerMedmor}
                    />
                );
            }
        case Periodetype.Hull:
            return <UttaksplanAdvarselIkon />;
    }
    return undefined;
};

type VarighetFormat = 'full' | 'normal';

export const getUkerOgDagerFromDager = (dager: number): { uker: number; dager: number } => {
    const uker = Math.floor(dager / 5);
    return {
        dager: dager - uker * 5,
        uker,
    };
};

export const getVarighetString = (antallDager: number, intl: IntlShape, format: VarighetFormat = 'full'): string => {
    const { uker, dager } = getUkerOgDagerFromDager(Math.abs(antallDager));
    const dagerStr = intl.formatMessage(
        { id: 'varighet.dager' },
        {
            dager,
        },
    );
    if (uker === 0) {
        return dagerStr;
    }
    const ukerStr = intl.formatMessage({ id: 'varighet.uker' }, { uker });
    if (dager > 0 && format === 'full') {
        return `${ukerStr}${intl.formatMessage({
            id: `varighet.separator--full`,
        })}${dagerStr}`;
    }
    if (dager > 0 && format === 'normal') {
        return `${ukerStr}${intl.formatMessage({
            id: `varighet.separator--normal`,
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

// eslint-disable-next-line @typescript-eslint/no-restricted-types
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
    const erFpFørTerminUtenUttak = isSkalIkkeHaForeldrepengerFørFødselPeriode(periode);
    if (erFpFørTerminUtenUttak) {
        varighetString = intl.formatMessage({ id: 'uttaksplan.periodeliste.header.skalIkkeHaUttakFørTermin' });
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
                    <div className={bem.element('ikon')}>
                        {getPeriodeIkon(periode, navnPåForeldre, erFarEllerMedmor)}
                    </div>
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
// eslint-disable-next-line import/no-default-export
export default PeriodelisteItemHeader;
