import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import InformasjonOmUtenlandsopphold from '../../../../app/types/søknad/InformasjonOmUtenlandsopphold';
import UtenlandsoppholdOppsummeringsliste from 'common/components/oppsummering/oppsummeringer/lister/UtenlandsoppholdOppsummeringsliste';
import Oppsummeringsseksjon from 'common/components/oppsummeringsseksjon/Oppsummeringsseksjon';
import Feltoppsummering from 'common/components/feltoppsummering/Feltoppsummering';
import KompleksFeltoppsummering from 'common/components/kompleks-feltoppsummering/KompleksFeltoppsummering';
import { Søkersituasjon } from '../../../../app/types/søknad/Søknad';

interface Props {
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    situasjon: Søkersituasjon;
    farEllerMedmor: boolean;
}

const UtenlandsoppholdOppsummering: React.StatelessComponent<Props & InjectedIntlProps> = (props) => {
    const { intl } = props;
    const { tidligereOpphold, senereOpphold } = props.informasjonOmUtenlandsopphold;

    return (
        <Oppsummeringsseksjon>
            {tidligereOpphold.length === 0 ? (
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.iNorgeSiste12Mnd.label')}
                    verdi={getMessage(intl, 'oppsummering.iNorgeSiste12MndTrue')}
                />
            ) : (
                <KompleksFeltoppsummering ledetekst={getMessage(intl, 'oppsummering.iNorgeSiste12Mnd.label')}>
                    <UtenlandsoppholdOppsummeringsliste informasjonOmUtenlandsopphold={tidligereOpphold} />
                </KompleksFeltoppsummering>
            )}
            {senereOpphold.length === 0 ? (
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.iNorgeNeste12Mnd.label')}
                    verdi={getMessage(intl, 'oppsummering.iNorgeNeste12MndTrue')}
                />
            ) : (
                <KompleksFeltoppsummering ledetekst={getMessage(intl, 'oppsummering.iNorgeNeste12Mnd.label')}>
                    <UtenlandsoppholdOppsummeringsliste informasjonOmUtenlandsopphold={senereOpphold} />
                </KompleksFeltoppsummering>
            )}
        </Oppsummeringsseksjon>
    );
};
export default injectIntl(UtenlandsoppholdOppsummering);
