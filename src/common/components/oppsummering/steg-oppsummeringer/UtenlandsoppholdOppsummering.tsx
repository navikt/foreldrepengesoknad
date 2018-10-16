import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import DisplayTextWithLabel from 'common/components/display-text-with-label/DisplayTextWithLabel';
import getMessage from 'common/util/i18nUtils';
import InformasjonOmUtenlandsopphold from '../../../../app/types/søknad/InformasjonOmUtenlandsopphold';
import DisplayContentWithLabel from 'common/components/display-content-with-label/DisplayContentWithLabel';
import UtenlandsoppholdOppsummeringsliste from 'common/components/oppsummering/steg-oppsummeringslister/UtenlandsoppholdOppsummeringsliste';

interface Props {
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    erBarnetFødt?: boolean;
}

const UtenlandsoppholdOppsummering: React.StatelessComponent<Props & InjectedIntlProps> = (props) => {
    const { intl, erBarnetFødt } = props;
    const {
        iNorgePåHendelsestidspunktet,
        iNorgeNeste12Mnd,
        iNorgeSiste12Mnd,
        tidligereOpphold,
        senereOpphold
    } = props.informasjonOmUtenlandsopphold;

    return (
        <React.Fragment>
            {iNorgeSiste12Mnd ? (
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.iNorgeSiste12Mnd.label')}
                    text={getMessage(intl, 'oppsummering.iNorgeSiste12MndTrue')}
                />
            ) : (
                <DisplayContentWithLabel label={getMessage(intl, 'oppsummering.iNorgeSiste12Mnd.label')}>
                    <UtenlandsoppholdOppsummeringsliste informasjonOmUtenlandsopphold={tidligereOpphold} />
                </DisplayContentWithLabel>
            )}
            {iNorgeNeste12Mnd ? (
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.iNorgeNeste12Mnd.label')}
                    text={getMessage(intl, 'oppsummering.iNorgeNeste12MndTrue')}
                />
            ) : (
                <DisplayContentWithLabel label={getMessage(intl, 'oppsummering.iNorgeNeste12Mnd.label')}>
                    <UtenlandsoppholdOppsummeringsliste informasjonOmUtenlandsopphold={senereOpphold} />
                </DisplayContentWithLabel>
            )}
            {erBarnetFødt === false &&
                iNorgePåHendelsestidspunktet !== undefined && (
                    <DisplayTextWithLabel
                        label={getMessage(intl, 'oppsummering.iNorgePåHendelsestidspunktet.label')}
                        text={
                            iNorgePåHendelsestidspunktet
                                ? getMessage(intl, 'oppsummering.fødselINorgeTrue')
                                : getMessage(intl, 'oppsummering.fødselINorgeFalse')
                        }
                    />
                )}
        </React.Fragment>
    );
};
export default injectIntl(UtenlandsoppholdOppsummering);
