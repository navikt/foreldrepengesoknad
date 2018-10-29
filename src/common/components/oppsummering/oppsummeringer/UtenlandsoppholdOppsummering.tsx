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
    const { situasjon, intl, farEllerMedmor } = props;
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
            {iNorgePåHendelsestidspunktet !== undefined &&
                situasjon === Søkersituasjon.FØDSEL && (
                    <Feltoppsummering
                        feltnavn={
                            farEllerMedmor
                                ? getMessage(intl, 'oppsummering.iNorgePåFødselstidspunktet.label.farMedmor')
                                : getMessage(intl, 'oppsummering.iNorgePåFødselstidspunktet.label')
                        }
                        verdi={iNorgePåHendelsestidspunktet ? getMessage(intl, 'ja') : getMessage(intl, 'nei')}
                    />
                )}

            {iNorgePåHendelsestidspunktet !== undefined &&
                situasjon === Søkersituasjon.ADOPSJON && (
                    <Feltoppsummering
                        feltnavn={getMessage(intl, 'oppsummering.iNorgePåDatoForOmsorgsovertakelse.label')}
                        verdi={iNorgePåHendelsestidspunktet ? getMessage(intl, 'ja') : getMessage(intl, 'nei')}
                    />
                )}
        </Oppsummeringsseksjon>
    );
};
export default injectIntl(UtenlandsoppholdOppsummering);
