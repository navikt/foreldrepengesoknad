import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import InformasjonOmUtenlandsopphold, {
    Utenlandsopphold
} from '../../../../app/types/søknad/InformasjonOmUtenlandsopphold';
import UtenlandsoppholdOppsummeringsliste from 'common/components/oppsummering/oppsummeringer/lister/UtenlandsoppholdOppsummeringsliste';
import Oppsummeringsseksjon from 'common/components/oppsummeringsseksjon/Oppsummeringsseksjon';
import Feltoppsummering from 'common/components/feltoppsummering/Feltoppsummering';
import KompleksFeltoppsummering from 'common/components/kompleks-feltoppsummering/KompleksFeltoppsummering';
import { Søkersituasjon } from '../../../../app/types/søknad/Søknad';
import * as moment from 'moment';
import { Tidsperiode } from 'common/types';

interface Props {
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    situasjon: Søkersituasjon;
    farEllerMedmor: boolean;
    familiehendelsedato: Date;
}

const erDatoITidsperiode = (dato: Date, tidsperiode: Tidsperiode) => {
    return moment(dato).isBetween(moment(tidsperiode.fom), moment(tidsperiode.tom), 'day', '[]');
};

const erFamiliehendelsedatoIEnUtenlandsoppholdPeriode = (
    familiehendelsedato: Date,
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold
) => {
    return (
        informasjonOmUtenlandsopphold.tidligereOpphold.some((tidligereOpphold: Utenlandsopphold) =>
            erDatoITidsperiode(familiehendelsedato, tidligereOpphold.tidsperiode)
        ) ||
        informasjonOmUtenlandsopphold.senereOpphold.some((senereOpphold: Utenlandsopphold) =>
            erDatoITidsperiode(familiehendelsedato, senereOpphold.tidsperiode)
        )
    );
};

const UtenlandsoppholdOppsummering: React.StatelessComponent<Props & InjectedIntlProps> = (props) => {
    const { situasjon, intl, farEllerMedmor, familiehendelsedato } = props;
    const { iNorgeNeste12Mnd, iNorgeSiste12Mnd, tidligereOpphold, senereOpphold } = props.informasjonOmUtenlandsopphold;

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

            {situasjon === Søkersituasjon.FØDSEL && (
                <Feltoppsummering
                    feltnavn={
                        farEllerMedmor
                            ? getMessage(intl, 'oppsummering.iNorgePåFødselstidspunktet.label.farMedmor')
                            : getMessage(intl, 'oppsummering.iNorgePåFødselstidspunktet.label')
                    }
                    verdi={
                        erFamiliehendelsedatoIEnUtenlandsoppholdPeriode(
                            familiehendelsedato,
                            props.informasjonOmUtenlandsopphold
                        )
                            ? getMessage(intl, 'nei')
                            : getMessage(intl, 'ja')
                    }
                />
            )}

            {situasjon === Søkersituasjon.ADOPSJON && (
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.iNorgePåDatoForOmsorgsovertakelse.label')}
                    verdi={
                        erFamiliehendelsedatoIEnUtenlandsoppholdPeriode(
                            familiehendelsedato,
                            props.informasjonOmUtenlandsopphold
                        )
                            ? getMessage(intl, 'nei')
                            : getMessage(intl, 'ja')
                    }
                />
            )}
        </Oppsummeringsseksjon>
    );
};
export default injectIntl(UtenlandsoppholdOppsummering);
