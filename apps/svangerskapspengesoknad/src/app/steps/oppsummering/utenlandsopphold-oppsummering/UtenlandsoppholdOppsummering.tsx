import { Block } from '@navikt/fp-common';
import { FunctionComponent } from 'react';
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
    // const { senereOpphold, tidligereOpphold } = informasjonOmUtenlandsopphold;
    // const familiehendelsedato = getFamiliehendelsedato(barn);
    // const erINorgePåFamiliehendelsedato = getErINorgePåFamiliehendelsedato(
    //     familiehendelsedato,
    //     tidligereOpphold,
    //     senereOpphold
    // );

    return (
        <>
            <Block margin="m" padBottom="l">
                <BodyShort>
                    {informasjonOmUtenlandsopphold.iNorgeSiste12Mnd
                        ? 'Du har bodd i Norge de siste 12 månedene'
                        : 'Du har oppholdt deg i utlandet i de siste 12 månedene'}
                </BodyShort>
            </Block>
            <Block padBottom="xl">
                <UtenlandsoppholdListe utenlandsopphold={informasjonOmUtenlandsopphold.tidligereOpphold} />
            </Block>
            <Block padBottom="l">
                <BodyShort>
                    {informasjonOmUtenlandsopphold.iNorgeNeste12Mnd
                        ? 'Du skal bo i Norge de neste 12 månedene'
                        : 'Du skal oppholde deg i utlandet de neste 12 månedene'}
                </BodyShort>
            </Block>
            <Block padBottom="xl">
                <UtenlandsoppholdListe utenlandsopphold={informasjonOmUtenlandsopphold.senereOpphold} />
            </Block>
            <Block padBottom="xl">
                <BodyShort>
                    {informasjonOmUtenlandsopphold.iNorgePåHendelsestidspunktet
                        ? 'På fødselstidspunktet kommer du til å bo i Norge'
                        : 'På fødselstidpunktet kommer du ikke til å bo i Norge'}
                </BodyShort>
            </Block>
        </>
    );
};

export default UtenlandsoppholdOppsummering;
