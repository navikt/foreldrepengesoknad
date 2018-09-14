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
        <div className="summary">
            {iNorgeSiste12Mnd ? (
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.utenlandsopphold.iNorgeSiste12MndLabel')}
                    text={getMessage(intl, 'oppsummering.utenlandsopphold.iNorgeSiste12MndTrue')}
                />
            ) : (
                <DisplayContentWithLabel
                    label={getMessage(intl, 'oppsummering.utenlandsopphold.iNorgeSiste12MndLabel')}>
                    <UtenlandsoppholdSummaryList informasjonOmUtenlandsopphold={tidligereOpphold} />
                </DisplayContentWithLabel>
            )}
            {iNorgeNeste12Mnd ? (
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.utenlandsopphold.iNorgeNeste12MndLabel')}
                    text={getMessage(intl, 'oppsummering.utenlandsopphold.iNorgeNeste12')}
                />
            ) : (
                <DisplayContentWithLabel
                    label={getMessage(intl, 'oppsummering.utenlandsopphold.iNorgeNeste12MndLabel')}>
                    <UtenlandsoppholdSummaryList informasjonOmUtenlandsopphold={senereOpphold} />
                </DisplayContentWithLabel>
            )}
            {erBarnetFødt === false &&
                fødselINorge !== undefined && (
                    <DisplayTextWithLabel
                        label={getMessage(intl, 'oppsummering.utenlandsopphold.fødselINorgeLabel')}
                        text={
                            fødselINorge
                                ? getMessage(intl, 'oppsummering.utenlandsopphold.fødselINorgeTrue')
                                : getMessage(intl, 'oppsummering.utenlandsopphold.fødselINorgeFalse')
                        }
                    />
                )}
        </div>
    );
};
export default injectIntl(UtenlandsoppholdSummary);
