import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import InformasjonOmUtenlandsopphold from '../../../../app/types/søknad/InformasjonOmUtenlandsopphold';
import UtenlandsoppholdOppsummeringsliste from 'common/components/oppsummering/oppsummeringer/lister/UtenlandsoppholdOppsummeringsliste';
import Oppsummeringsseksjon from 'common/components/oppsummeringsseksjon/Oppsummeringsseksjon';
import Feltoppsummering from 'common/components/feltoppsummering/Feltoppsummering';
import KompleksFeltoppsummering from 'common/components/kompleks-feltoppsummering/KompleksFeltoppsummering';

interface Props {
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
}

const UtenlandsoppholdOppsummering: React.StatelessComponent<Props & InjectedIntlProps> = (props) => {
    const { intl } = props;
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
                <KompleksFeltoppsummering ledetekst={getMessage(intl, 'oppsummering.iNorgeSiste12Mnd.label')}>
                    <UtenlandsoppholdOppsummeringsliste informasjonOmUtenlandsopphold={tidligereOpphold} />
                </KompleksFeltoppsummering>
            )}
            {iNorgeNeste12Mnd ? (
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.iNorgeNeste12Mnd.label')}
                    verdi={getMessage(intl, 'oppsummering.iNorgeNeste12MndTrue')}
                />
            ) : (
                <KompleksFeltoppsummering ledetekst={getMessage(intl, 'oppsummering.iNorgeNeste12Mnd.label')}>
                    <UtenlandsoppholdOppsummeringsliste informasjonOmUtenlandsopphold={senereOpphold} />
                </KompleksFeltoppsummering>
            )}
            {iNorgePåHendelsestidspunktet !== undefined && (
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
