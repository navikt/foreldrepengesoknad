import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { BodyShort, Heading, Link, Label } from '@navikt/ds-react';
import { lenker } from 'util/lenker';
import getMessage from 'common/util/i18nUtils';

const Personopplysninger = () => {
    const intl = useIntl();
    return (
        <div className="modalContent">
            <Heading size="small" className="modalContent__header">
                {getMessage(intl, 'personopplysninger.sectionheading')}
            </Heading>
            <BodyShort className="blokk-xs">{getMessage(intl, 'personopplysninger.ingress.1')}</BodyShort>
            <BodyShort className="blokk-xs">{getMessage(intl, 'personopplysninger.ingress.2')}</BodyShort>

            <div className="blokk-xs">
                <Label className="blokk-xs">
                    {getMessage(intl, 'personopplysninger.text.opplysningerViInnhenter')}
                </Label>
                <BodyShort className="blokk-xs">
                    {getMessage(intl, 'personopplysninger.text.opplysningerViInnhenter.ingress')}
                </BodyShort>
                <ul>
                    <li>
                        <BodyShort>{getMessage(intl, 'personopplysninger.opplysningerViInnhenter.1')}</BodyShort>
                    </li>
                    <li>
                        <BodyShort>{getMessage(intl, 'personopplysninger.opplysningerViInnhenter.2')}</BodyShort>
                    </li>
                    <li>
                        <BodyShort>{getMessage(intl, 'personopplysninger.opplysningerViInnhenter.3')}</BodyShort>
                    </li>
                </ul>
                <BodyShort>{getMessage(intl, 'personopplysninger.opplysningerViInnhenter.utro')}</BodyShort>
            </div>

            <div>
                <Label className="blokk-xs">
                    {getMessage(intl, 'personopplysninger.text.lagringAvOpplysninger')}
                </Label>
                <BodyShort className="blokk-xs">
                    {getMessage(intl, 'personopplysninger.text.lagringAvOpplysninger.1')}
                </BodyShort>
                <BodyShort className="blokk-xs">
                    {getMessage(intl, 'personopplysninger.text.lagringAvOpplysninger.2')}
                </BodyShort>
            </div>

            <div className="blokk-xs">
                <Label className="blokk-xs">{getMessage(intl, 'personopplysninger.text.automatiskLagring')}</Label>
                <BodyShort className="blokk-xs">
                    {getMessage(intl, 'personopplysninger.text.automatiskLagring.ingress')}
                </BodyShort>
                <ul>
                    <li>
                        <BodyShort>{getMessage(intl, 'personopplysninger.text.automatiskLagring.1')}</BodyShort>
                    </li>
                    <li>
                        <BodyShort>{getMessage(intl, 'personopplysninger.text.automatiskLagring.2')}</BodyShort>
                    </li>
                    <li>
                        <BodyShort>{getMessage(intl, 'personopplysninger.text.automatiskLagring.3')}</BodyShort>
                    </li>
                    <li>
                        <BodyShort>{getMessage(intl, 'personopplysninger.text.automatiskLagring.4')}</BodyShort>
                    </li>
                </ul>
            </div>

            <div className="blokk-xs">
                <Label className="blokk-xs">{getMessage(intl, 'personopplysninger.text.svarPåSøknaden')}</Label>
                <BodyShort className="blokk-xs">
                    {getMessage(intl, 'personopplysninger.text.svarPåSøknaden.ingress')}
                </BodyShort>
                <ul>
                    <li>
                        <BodyShort>{getMessage(intl, 'personopplysninger.text.svarPåSøknaden.1')}</BodyShort>
                    </li>
                    <li>
                        <BodyShort>{getMessage(intl, 'personopplysninger.text.svarPåSøknaden.2')}</BodyShort>
                    </li>
                    <li>
                        <BodyShort>{getMessage(intl, 'personopplysninger.text.svarPåSøknaden.3')}</BodyShort>
                    </li>
                </ul>
            </div>

            <div>
                <Label className="blokk-xs">
                    {getMessage(intl, 'personopplysninger.text.personvernerklæringeniNAV')}
                </Label>
                <BodyShort>
                    <FormattedMessage
                        id="personopplysninger.text.personvernerklering"
                        values={{
                            link: (
                                <Link href={lenker.personvernerklæring} target="_blank">
                                    <FormattedMessage id="personopplysninger.text.personvernerklering.link" />
                                </Link>
                            ),
                        }}
                    />
                </BodyShort>
            </div>
        </div>
    );
};
export default Personopplysninger;
