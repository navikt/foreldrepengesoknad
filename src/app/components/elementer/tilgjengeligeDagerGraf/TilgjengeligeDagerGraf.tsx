import * as React from 'react';
import BEMHelper from 'common/util/bem';
import { UttaksplanHexFarge } from 'common/util/colors';
import { getVarighetString } from 'common/util/intlUtils';
import { FormattedMessage, useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { TilgjengeligeDager } from 'shared/types';
import Personkort from 'shared/components/personkort/Personkort';
import Multibar from 'shared/elements/multibar/Multibar';
import { getProsentFordelingPerDel } from 'app/components/uttaksplanlegger/components/uttakFordeling/uttakFordelingUtils';
import { getNavnGenitivEierform } from 'app/util/tekstUtils';

import './tilgjengeligeDagerGraf.less';
import { NavnPåForeldre } from 'common/types';

interface OwnProps {
    tilgjengeligeDager: TilgjengeligeDager;
    navnPåForeldre: NavnPåForeldre;
    erKunFarMedmor: boolean;
    erDeltUttak: boolean;
}

type Props = OwnProps;

const bem = BEMHelper('tilgjengeligeDagerGraf');

const DeltOmsorgGraf: React.StatelessComponent<Props> = ({ tilgjengeligeDager, navnPåForeldre }) => {
    const intl = useIntl();
    const fordeling = getProsentFordelingPerDel(tilgjengeligeDager, true);
    const txtMor =
        tilgjengeligeDager.dagerForeldrepengerFørFødsel > 0
            ? `${tilgjengeligeDager.dagerForeldrepengerFørFødsel / 5} + ${tilgjengeligeDager.dagerMor / 5} ${getMessage(
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
                                values={{ navnEierform: getNavnGenitivEierform(navnPåForeldre.mor, intl.locale) }}
                            />
                        </Personkort>
                    </div>
                    <Multibar
                        borderColor={UttaksplanHexFarge.graa}
                        leftBar={{
                            color: UttaksplanHexFarge.lilla,
                            width: 100,
                            text: <div className={bem.element('barTekst')}>{txtMor}</div>
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
                            )
                        }}
                    />
                </div>
                {navnPåForeldre.farMedmor && (
                    <div className={bem.element('forelder2')} style={{ width: `${fordeling.pstFarMedmor}%` }}>
                        <div className={bem.element('barTitle')}>
                            <Personkort invertert={true} textValign="bottom">
                                <FormattedMessage
                                    id="tilgjengeligeDagerGraf.person.del"
                                    values={{
                                        navnEierform: getNavnGenitivEierform(navnPåForeldre.farMedmor, intl.locale)
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
                                )
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

const AleneomsorgGraf: React.StatelessComponent<Props> = ({ tilgjengeligeDager, erKunFarMedmor }) => {
    const intl = useIntl();
    const txt =
        tilgjengeligeDager.dagerForeldrepengerFørFødsel > 0
            ? `${tilgjengeligeDager.dagerForeldrepengerFørFødsel / 5} + ${tilgjengeligeDager.dagerForeldrepenger /
                  5} uker`
            : getVarighetString(tilgjengeligeDager.dagerEtterTermin, intl);
    return (
        <div className={bem.block}>
            <Multibar
                borderColor={UttaksplanHexFarge.graa}
                leftBar={{
                    color: erKunFarMedmor ? UttaksplanHexFarge.blaa : UttaksplanHexFarge.lilla,
                    width: 100,
                    text: <div className={bem.element('barTekst')}>{txt}</div>
                }}
            />
        </div>
    );
};
const TilgjengeligeDagerGraf: React.StatelessComponent<Props> = (props) => {
    return props.erDeltUttak ? <DeltOmsorgGraf {...props} /> : <AleneomsorgGraf {...props} />;
};

export default TilgjengeligeDagerGraf;
