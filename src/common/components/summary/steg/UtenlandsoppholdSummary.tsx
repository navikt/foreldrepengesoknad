import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import DisplayTextWithLabel from 'common/components/display-text-with-label/DisplayTextWithLabel';
import getMessage from 'common/util/i18nUtils';

import InformasjonOmUtenlandsopphold from '../../../../app/types/søknad/InformasjonOmUtenlandsopphold';
import UtenlandsoppholdSummaryList from 'common/components/summary/utenlandsopphold-summary-list/UtenlandsoppholdSummaryList';
import DisplayContentWithLabel from 'common/components/display-content-with-label/DisplayContentWithLabel';

interface Props {
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    erBarnetFødt?: boolean;
}

const UtenlandsoppholdSummary: React.StatelessComponent<Props & InjectedIntlProps> = (props) => {
    const { intl, erBarnetFødt } = props;
    const {
        fødselINorge,
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
                    <UtenlandsoppholdSummaryList informasjonOmUtenlandsopphold={tidligereOpphold} />
                </DisplayContentWithLabel>
            )}
            {iNorgeNeste12Mnd ? (
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.iNorgeNeste12Mnd.label')}
                    text={getMessage(intl, 'oppsummering.iNorgeNeste12')}
                />
            ) : (
                <DisplayContentWithLabel label={getMessage(intl, 'oppsummering.iNorgeNeste12Mnd.label')}>
                    <UtenlandsoppholdSummaryList informasjonOmUtenlandsopphold={senereOpphold} />
                </DisplayContentWithLabel>
            )}
            {erBarnetFødt === false &&
                fødselINorge !== undefined && (
                    <DisplayTextWithLabel
                        label={getMessage(intl, 'oppsummering.fødselINorge.label')}
                        text={
                            fødselINorge
                                ? getMessage(intl, 'oppsummering.fødselINorgeTrue')
                                : getMessage(intl, 'oppsummering.fødselINorgeFalse')
                        }
                    />
                )}
        </React.Fragment>
    );
};
export default injectIntl(UtenlandsoppholdSummary);
