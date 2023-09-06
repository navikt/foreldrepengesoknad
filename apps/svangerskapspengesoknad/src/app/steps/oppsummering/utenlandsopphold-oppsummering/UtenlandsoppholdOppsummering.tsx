import { intlUtils } from '@navikt/fp-common';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import UtenlandsoppholdListe from './UtenlandsoppholdOppsummeringListe';
import { BodyShort } from '@navikt/ds-react';
import InformasjonOmUtenlandsopphold from 'app/types/InformasjonOmUtenlandsopphold';

interface Props {
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
}

// const getErINorgePåFamiliehendelsedato = (
//     familiehendelsedato: string,
//     tidligereOpphold: Utenlandsopphold[],
//     senereOpphold: Utenlandsopphold[]
// ): boolean => {
//     let erINorge = true;

//     tidligereOpphold.forEach((tidOpphold) => {
//         if (doesTidsperiodeContainDate(tidOpphold.tidsperiode, familiehendelsedato)) {
//             erINorge = false;
//         }
//     });

//     senereOpphold.forEach((senOpphold) => {
//         if (doesTidsperiodeContainDate(senOpphold.tidsperiode, familiehendelsedato)) {
//             erINorge = false;
//         }
//     });

//     return erINorge;
// };

const UtenlandsoppholdOppsummering: FunctionComponent<Props> = ({ informasjonOmUtenlandsopphold }) => {
    const intl = useIntl();
    // const { senereOpphold, tidligereOpphold } = informasjonOmUtenlandsopphold;
    // const familiehendelsedato = getFamiliehendelsedato(barn);
    // const erINorgePåFamiliehendelsedato = getErINorgePåFamiliehendelsedato(
    //     familiehendelsedato,
    //     tidligereOpphold,
    //     senereOpphold
    // );

    return (
        <>
            <UtenlandsoppholdListe
                utenlandsopphold={informasjonOmUtenlandsopphold.tidligereOpphold}
                tidligereOpphold={true}
            />

            {informasjonOmUtenlandsopphold.iNorgeNeste12Mnd ? (
                <BodyShort>{intlUtils(intl, 'oppsummering.utenlandsopphold.skalBoINorge.norge')}</BodyShort>
            ) : null}

            <UtenlandsoppholdListe
                utenlandsopphold={informasjonOmUtenlandsopphold.senereOpphold}
                tidligereOpphold={false}
            />
            {/* <BodyShort>
                <FormattedMessage id={erINorgePåFamiliehendelsedato ? 'ja' : 'nei'} />
            </BodyShort> */}
        </>
    );
};

export default UtenlandsoppholdOppsummering;
