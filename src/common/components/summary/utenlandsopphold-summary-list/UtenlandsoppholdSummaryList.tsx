import * as React from 'react';
import * as countries from 'i18n-iso-countries';
import { Element } from 'nav-frontend-typografi';

import { Utenlandsopphold } from '../../../../app/types/søknad/InformasjonOmUtenlandsopphold';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import { guid } from 'nav-frontend-js-utils';
import getMessage from 'common/util/i18nUtils';

import { formatDate } from '../../../../app/util/dates/dates';

import './utenlandsoppholdSummaryList.less';

interface UtenlandsoppholdSummaryProps {
    informasjonOmUtenlandsopphold: Utenlandsopphold[];
}

type Props = UtenlandsoppholdSummaryProps & InjectedIntlProps;
const UtenlandsoppholdSummaryList: React.StatelessComponent<Props> = (props: Props) => {
    return (
        <ul className="utenlansoppholdSummaryList">
            {props.informasjonOmUtenlandsopphold.map((utenlandsopphold: Utenlandsopphold) => (
                <li key={guid()} className="utenlansoppholdSummaryList__element">
                    <Element>{countries.getName(utenlandsopphold.land, 'nb')}</Element>
                    <Element>
                        {getMessage(props.intl, 'tidsintervall', {
                            fom: formatDate(utenlandsopphold.tidsperiode.fom),
                            tom: formatDate(utenlandsopphold.tidsperiode.tom)
                        })}
                    </Element>
                </li>
            ))}
        </ul>
    );
};
export default injectIntl(UtenlandsoppholdSummaryList);
