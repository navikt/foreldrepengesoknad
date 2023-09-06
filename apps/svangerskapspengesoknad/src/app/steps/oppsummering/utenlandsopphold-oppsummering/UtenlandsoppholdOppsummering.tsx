import { Block } from '@navikt/fp-common';
import { FunctionComponent } from 'react';
import UtenlandsoppholdListe from './UtenlandsoppholdOppsummeringListe';
import { BodyShort } from '@navikt/ds-react';
import InformasjonOmUtenlandsopphold from 'app/types/InformasjonOmUtenlandsopphold';

interface Props {
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
}

const UtenlandsoppholdOppsummering: FunctionComponent<Props> = ({ informasjonOmUtenlandsopphold }) => {
    return (
        <>
            <Block padBottom="m">
                <UtenlandsoppholdListe
                    utenlandsopphold={informasjonOmUtenlandsopphold.tidligereOpphold}
                    tidligereOpphold={true}
                />
            </Block>
            <Block padBottom="m">
                <UtenlandsoppholdListe
                    utenlandsopphold={informasjonOmUtenlandsopphold.senereOpphold}
                    tidligereOpphold={false}
                />
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
