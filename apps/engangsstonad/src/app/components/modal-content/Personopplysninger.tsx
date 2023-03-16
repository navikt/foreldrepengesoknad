import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
const { Undertittel, Normaltekst, Element } = require('nav-frontend-typografi');
import Lenke from 'nav-frontend-lenker';
import { lenker } from 'util/lenker';
import getMessage from 'common/util/i18nUtils';

const Personopplysninger = () => {
    const intl = useIntl();
    return (
        <div className="modalContent">
            <Undertittel className="modalContent__header">
                {getMessage(intl, 'personopplysninger.sectionheading')}
            </Undertittel>
            <Normaltekst className="blokk-xs">{getMessage(intl, 'personopplysninger.ingress.1')}</Normaltekst>
            <Normaltekst className="blokk-xs">{getMessage(intl, 'personopplysninger.ingress.2')}</Normaltekst>

            <div className="blokk-xs">
                <Element className="blokk-xs">
                    {getMessage(intl, 'personopplysninger.text.opplysningerViInnhenter')}
                </Element>
                <Normaltekst className="blokk-xs">
                    {getMessage(intl, 'personopplysninger.text.opplysningerViInnhenter.ingress')}
                </Normaltekst>
                <ul>
                    <li>
                        <Normaltekst>{getMessage(intl, 'personopplysninger.opplysningerViInnhenter.1')}</Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>{getMessage(intl, 'personopplysninger.opplysningerViInnhenter.2')}</Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>{getMessage(intl, 'personopplysninger.opplysningerViInnhenter.3')}</Normaltekst>
                    </li>
                </ul>
                <Normaltekst>{getMessage(intl, 'personopplysninger.opplysningerViInnhenter.utro')}</Normaltekst>
            </div>

            <div>
                <Element className="blokk-xs">
                    {getMessage(intl, 'personopplysninger.text.lagringAvOpplysninger')}
                </Element>
                <Normaltekst className="blokk-xs">
                    {getMessage(intl, 'personopplysninger.text.lagringAvOpplysninger.1')}
                </Normaltekst>
                <Normaltekst className="blokk-xs">
                    {getMessage(intl, 'personopplysninger.text.lagringAvOpplysninger.2')}
                </Normaltekst>
            </div>

            <div className="blokk-xs">
                <Element className="blokk-xs">{getMessage(intl, 'personopplysninger.text.automatiskLagring')}</Element>
                <Normaltekst className="blokk-xs">
                    {getMessage(intl, 'personopplysninger.text.automatiskLagring.ingress')}
                </Normaltekst>
                <ul>
                    <li>
                        <Normaltekst>{getMessage(intl, 'personopplysninger.text.automatiskLagring.1')}</Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>{getMessage(intl, 'personopplysninger.text.automatiskLagring.2')}</Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>{getMessage(intl, 'personopplysninger.text.automatiskLagring.3')}</Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>{getMessage(intl, 'personopplysninger.text.automatiskLagring.4')}</Normaltekst>
                    </li>
                </ul>
            </div>

            <div className="blokk-xs">
                <Element className="blokk-xs">{getMessage(intl, 'personopplysninger.text.svarPåSøknaden')}</Element>
                <Normaltekst className="blokk-xs">
                    {getMessage(intl, 'personopplysninger.text.svarPåSøknaden.ingress')}
                </Normaltekst>
                <ul>
                    <li>
                        <Normaltekst>{getMessage(intl, 'personopplysninger.text.svarPåSøknaden.1')}</Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>{getMessage(intl, 'personopplysninger.text.svarPåSøknaden.2')}</Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>{getMessage(intl, 'personopplysninger.text.svarPåSøknaden.3')}</Normaltekst>
                    </li>
                </ul>
            </div>

            <div>
                <Element className="blokk-xs">
                    {getMessage(intl, 'personopplysninger.text.personvernerklæringeniNAV')}
                </Element>
                <Normaltekst>
                    <FormattedMessage
                        id="personopplysninger.text.personvernerklering"
                        values={{
                            link: (
                                <Lenke href={lenker.personvernerklæring} target="_blank">
                                    <FormattedMessage id="personopplysninger.text.personvernerklering.link" />
                                </Lenke>
                            ),
                        }}
                    />
                </Normaltekst>
            </div>
        </div>
    );
};
export default Personopplysninger;
