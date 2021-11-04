import { bemUtils, Tidsperiode } from '@navikt/fp-common';
import { Forelder } from 'app/types/Forelder';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';
import { måned, måned3bokstaver, år } from 'app/utils/dateUtils';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { isUtsettelseAnnenPart, Periode, Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import StønadskontoIkon from '../stønadskonto-ikon/StønadskontoIkon';
import UtsettelseIkon from '../utsettelse-ikon/UtsettelseIkon';
import { OppChevron } from 'nav-frontend-chevron';

import './periodelisteItemHeader.less';

interface Props {
    egenPeriode: boolean;
    tidsperiode: Tidsperiode;
}

const bem = bemUtils('periodelisteItemHeader');

export const getPeriodeIkon = (
    periode: Periode,
    navnPåForeldre: NavnPåForeldre,
    harMidlertidigOmsorg?: boolean
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
    }
    return undefined;
};

const renderDagMnd = (dato: string, visÅr = true): JSX.Element => {
    const d = dayjs.utc(dato);

    return (
        <div className={bem.element('dagmnd')}>
            <span className={bem.element('dagmnd__dato')}>
                <Normaltekst>
                    {d.get('date')}. {måned3bokstaver(d)}.
                </Normaltekst>
            </span>
            {visÅr && (
                <Normaltekst tag="span" className={bem.element('dagmnd__mnd')}>
                    <abbr title={`${måned(d)} ${år(d)}`}>{år(d)}</abbr>
                </Normaltekst>
            )}
        </div>
    );
};

const getSidebarColor = (egenPeriode: boolean): string | undefined => {
    if (!egenPeriode) {
        return undefined;
    }

    return 'lilla';
};

const PeriodelisteItemHeader: FunctionComponent<Props> = ({ egenPeriode, tidsperiode }) => {
    const sidebarClassname = bem.element('sidebar');

    return (
        <div className={classNames(bem.block, egenPeriode ? undefined : bem.modifier('transparent'))}>
            <div className={classNames(sidebarClassname, bem.modifier(getSidebarColor(egenPeriode)))} />
            <div
                className={classNames(
                    bem.element('content'),
                    egenPeriode ? bem.modifier('egenPeriode') : bem.modifier('annenPart')
                )}
            >
                <div className={bem.element('ikon')}>
                    {getPeriodeIkon(
                        {
                            forelder: Forelder.mor,
                            id: '123',
                            konto: StønadskontoType.Mødrekvote,
                            erArbeidstaker: true,
                            overskrives: false,
                            type: Periodetype.Uttak,
                            tidsperiode: {
                                fom: new Date('12-10-2021'),
                                tom: new Date('12-10-2022'),
                            },
                            gradert: false,
                        } as Periode,
                        { farMedmor: 'Truls', mor: 'Kari' }
                    )}
                </div>
                <div className={bem.element('tittel')}>
                    <Element tag="h2">KARI sin periode</Element>
                    <Normaltekst>3 uker</Normaltekst>
                </div>
                <div className={bem.element('dato-container')}>
                    {renderDagMnd(tidsperiode.fom)}
                    {renderDagMnd(tidsperiode.tom)}
                </div>
                <div className={bem.element('chevron')}>
                    <OppChevron />
                </div>
            </div>
        </div>
    );
};

export default PeriodelisteItemHeader;
