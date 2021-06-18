import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Element } from 'nav-frontend-typografi';
import { getNavnGenitivEierform } from 'app/utils/personUtils';
import { bemUtils, intlUtils } from '@navikt/fp-common';
import { UttaksplanHexFarge } from 'uttaksplan/types/UttaksplanHexFarge';
import { getVarighetString } from 'app/utils/dateUtils';
import Multibar from './multibar/Multibar';
import { TilgjengeligeDager } from 'app/types/TilgjengeligeDager';
import Personkort from 'app/components/personkort/Personkort';

import './tilgjengeligeDagerGraf.less';

interface Props {
    tilgjengeligeDager: TilgjengeligeDager;
    navnMor: string;
    navnFarMedmor: string;
    erFarEllerMedmor: boolean;
    erDeltUttak: boolean;
}

export const getProsentFordelingPerDel = (
    tilgjengeligeDager: TilgjengeligeDager,
    inkluderForeldrepengerFørTermin: boolean
): {
    pstMor: number;
    pstFelles: number;
    pstFarMedmor: number;
} => {
    const pstMultiplikator =
        100 / (inkluderForeldrepengerFørTermin ? tilgjengeligeDager.dagerTotalt : tilgjengeligeDager.dagerEtterTermin);

    const pstMor =
        pstMultiplikator * tilgjengeligeDager.dagerMor +
        (inkluderForeldrepengerFørTermin ? tilgjengeligeDager.dagerForeldrepengerFørFødsel : 0);
    const pstFarMedmor = pstMultiplikator * tilgjengeligeDager.dagerFarMedmor;
    const pstFelles = 100 - pstMor - pstFarMedmor;

    return {
        pstMor,
        pstFarMedmor,
        pstFelles,
    };
};

const DeltOmsorgGraf: React.FunctionComponent<Props> = ({
    tilgjengeligeDager,
    navnFarMedmor,
    navnMor,
    erFarEllerMedmor,
}) => {
    const intl = useIntl();
    const bem = bemUtils('tilgjengeligeDagerGraf');
    const fordeling = getProsentFordelingPerDel(tilgjengeligeDager, true);
    const txtMor =
        tilgjengeligeDager.dagerForeldrepengerFørFødsel > 0
            ? `${tilgjengeligeDager.dagerForeldrepengerFørFødsel / 5} + ${tilgjengeligeDager.dagerMor / 5} ${intlUtils(
                  intl,
                  'uker',
                  { uker: 15 }
              )}`
            : getVarighetString(tilgjengeligeDager.dagerMor, intl);
    return (
        <div className={bem.classNames(bem.block, bem.modifier('flereForeldre'))}>
            <div className={bem.element('bars')}>
                <div className={bem.element('forelder1')} style={{ width: `${fordeling.pstMor}%` }}>
                    <div className={bem.element('barTitle')}>
                        <Personkort textValign="bottom">
                            <FormattedMessage
                                id="tilgjengeligeDagerGraf.person.del"
                                values={{ navnEierform: getNavnGenitivEierform(navnMor, intl.locale) }}
                            />
                        </Personkort>
                    </div>
                    <Multibar
                        borderColor={UttaksplanHexFarge.graa}
                        leftBar={{
                            color: UttaksplanHexFarge.lilla,
                            width: 100,
                            text: <div className={bem.element('barTekst')}>{txtMor}</div>,
                        }}
                    />
                </div>
                <div className={bem.element('felles')} style={{ width: `${fordeling.pstFelles}%` }}>
                    <div className={bem.element('barTitle')}>
                        <FormattedMessage id="tilgjengeligeDagerGraf.fellesperiode" />
                    </div>
                    <Multibar
                        borderColor={UttaksplanHexFarge.graa}
                        leftBar={{
                            color: UttaksplanHexFarge.lilla,
                            color2: UttaksplanHexFarge.blaa,
                            width: 100,
                            text: (
                                <div className={bem.element('barTekst')}>
                                    {getVarighetString(tilgjengeligeDager.dagerFelles, intl)}
                                </div>
                            ),
                        }}
                    />
                </div>
                {navnFarMedmor && (
                    <div className={bem.element('forelder2')} style={{ width: `${fordeling.pstFarMedmor}%` }}>
                        <div className={bem.element('barTitle')}>
                            <Personkort invertert={true} textValign="bottom">
                                <FormattedMessage
                                    id="tilgjengeligeDagerGraf.person.del"
                                    values={{
                                        navnEierform: getNavnGenitivEierform(navnFarMedmor, intl.locale),
                                    }}
                                />
                            </Personkort>
                        </div>
                        <Multibar
                            borderColor={UttaksplanHexFarge.graa}
                            leftBar={{
                                color: UttaksplanHexFarge.blaa,
                                width: 100,
                                text: (
                                    <div className={bem.element('barTekst')}>
                                        {getVarighetString(tilgjengeligeDager.dagerFarMedmor, intl)}
                                    </div>
                                ),
                            }}
                        />
                    </div>
                )}
            </div>
            {!erFarEllerMedmor && tilgjengeligeDager.dagerForeldrepengerFørFødsel > 0 && (
                <div style={{ paddingTop: '0.625rem' }}>
                    <Element>
                        <FormattedMessage id="tilgjengeligeDagerGraf.uttakFørFødselInfo" values={{ navn: navnMor }} />
                    </Element>
                </div>
            )}
            {erFarEllerMedmor && tilgjengeligeDager.dagerForeldrepengerFørFødsel > 0 && (
                <div style={{ paddingTop: '0.625rem' }}>
                    <Element>
                        <FormattedMessage
                            id="tilgjengeligeDagerGraf.uttakFørFødselInfoFarMedmor"
                            values={{ navn: navnMor }}
                        />
                    </Element>
                </div>
            )}
        </div>
    );
};

const AleneomsorgGraf: React.FunctionComponent<Props> = ({ tilgjengeligeDager, erFarEllerMedmor }) => {
    const intl = useIntl();
    const bem = bemUtils('tilgjengeligeDagerGraf');
    const txt =
        tilgjengeligeDager.dagerForeldrepengerFørFødsel > 0
            ? `${tilgjengeligeDager.dagerForeldrepengerFørFødsel / 5} + ${
                  tilgjengeligeDager.dagerForeldrepenger / 5
              } uker`
            : getVarighetString(tilgjengeligeDager.dagerEtterTermin, intl);
    return (
        <div className={bem.block}>
            <div style={{ position: 'relative' }}>
                <div className={bem.element('barTitle')}>
                    <Element>
                        <FormattedMessage id="tilgjengeligeDagerGraf.periodeMedForeldrepenger" />
                    </Element>
                </div>
            </div>
            <Multibar
                borderColor={UttaksplanHexFarge.graa}
                leftBar={{
                    color: erFarEllerMedmor ? UttaksplanHexFarge.blaa : UttaksplanHexFarge.lilla,
                    width: 100,
                    text: <div className={bem.element('barTekst')}>{txt}</div>,
                }}
            />
            {!erFarEllerMedmor && tilgjengeligeDager.dagerForeldrepengerFørFødsel > 0 && (
                <div style={{ paddingTop: '0.625rem' }}>
                    <Element>
                        <FormattedMessage id="tilgjengeligeDagerGraf.uttakFørFødselInfoIkkeDeltUttak" />
                    </Element>
                </div>
            )}
        </div>
    );
};

const TilgjengeligeDagerGraf: React.FunctionComponent<Props> = (props) => {
    return props.erDeltUttak ? <DeltOmsorgGraf {...props} /> : <AleneomsorgGraf {...props} />;
};

export default TilgjengeligeDagerGraf;
