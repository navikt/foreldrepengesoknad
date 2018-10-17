import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import InformasjonOmUtenlandsopphold from '../../../../app/types/søknad/InformasjonOmUtenlandsopphold';
import InnholdMedLedetekst from 'common/components/innhold-med-ledetekst/InnholdMedLedetekst';
import UtenlandsoppholdOppsummeringsliste from 'common/components/oppsummering/steg-oppsummeringslister/UtenlandsoppholdOppsummeringsliste';
import Oppsummeringsseksjon from 'common/components/oppsummeringsseksjon/Oppsummeringsseksjon';
import Feltoppsummering from 'common/components/feltoppsummering/Feltoppsummering';

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
        <Oppsummeringsseksjon>
            {iNorgeSiste12Mnd ? (
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.iNorgeSiste12Mnd.label')}
                    verdi={getMessage(intl, 'oppsummering.iNorgeSiste12MndTrue')}
                />
            ) : (
                <InnholdMedLedetekst ledetekst={getMessage(intl, 'oppsummering.iNorgeSiste12Mnd.label')}>
                    <UtenlandsoppholdOppsummeringsliste informasjonOmUtenlandsopphold={tidligereOpphold} />
                </InnholdMedLedetekst>
            )}
            {iNorgeNeste12Mnd ? (
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.iNorgeNeste12Mnd.label')}
                    verdi={getMessage(intl, 'oppsummering.iNorgeNeste12MndTrue')}
                />
            ) : (
                <InnholdMedLedetekst ledetekst={getMessage(intl, 'oppsummering.iNorgeNeste12Mnd.label')}>
                    <UtenlandsoppholdOppsummeringsliste informasjonOmUtenlandsopphold={senereOpphold} />
                </InnholdMedLedetekst>
            )}
            {erBarnetFødt === false &&
                iNorgePåHendelsestidspunktet !== undefined && (
                    <Feltoppsummering
                        feltnavn={getMessage(intl, 'oppsummering.iNorgePåHendelsestidspunktet.label')}
                        verdi={
                            iNorgePåHendelsestidspunktet
                                ? getMessage(intl, 'oppsummering.fødselINorgeTrue')
                                : getMessage(intl, 'oppsummering.fødselINorgeFalse')
                        }
                    />
                )}
        </Oppsummeringsseksjon>
    );
};
export default injectIntl(UtenlandsoppholdOppsummering);
