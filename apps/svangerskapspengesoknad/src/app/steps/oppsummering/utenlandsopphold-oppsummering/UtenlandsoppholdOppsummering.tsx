import { Block, intlUtils } from '@navikt/fp-common';
import { FunctionComponent } from 'react';
import UtenlandsoppholdListe from './UtenlandsoppholdOppsummeringListe';
import { BodyShort } from '@navikt/ds-react';
import InformasjonOmUtenlandsopphold from 'app/types/InformasjonOmUtenlandsopphold';
import { useIntl } from 'react-intl';

interface Props {
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
}

const UtenlandsoppholdOppsummering: FunctionComponent<Props> = ({ informasjonOmUtenlandsopphold }) => {
    const intl = useIntl();
    const visINorgePåHendelsestidspunktet =
        informasjonOmUtenlandsopphold.senereOpphold.length > 0 ||
        informasjonOmUtenlandsopphold.tidligereOpphold.length > 0;
    return (
        <>
            {informasjonOmUtenlandsopphold.tidligereOpphold.length > 0 && (
                <Block padBottom="l">
                    <UtenlandsoppholdListe
                        utenlandsopphold={informasjonOmUtenlandsopphold.tidligereOpphold}
                        tidligereOpphold={true}
                    />
                </Block>
            )}
            {informasjonOmUtenlandsopphold.senereOpphold.length > 0 && (
                <Block padBottom="l">
                    <UtenlandsoppholdListe
                        utenlandsopphold={informasjonOmUtenlandsopphold.senereOpphold}
                        tidligereOpphold={false}
                    />
                </Block>
            )}
            {informasjonOmUtenlandsopphold.tidligereOpphold.length === 0 && (
                <Block padBottom="l">
                    <BodyShort>{intlUtils(intl, 'oppsummering.boddINorge')} </BodyShort>
                </Block>
            )}
            {informasjonOmUtenlandsopphold.senereOpphold.length === 0 && (
                <Block padBottom="l">
                    <BodyShort>{intlUtils(intl, 'oppsummering.skalboINorge')} </BodyShort>
                </Block>
            )}
            {visINorgePåHendelsestidspunktet && (
                <Block>
                    <BodyShort>
                        {informasjonOmUtenlandsopphold.iNorgePåHendelsestidspunktet
                            ? intlUtils(intl, 'oppsummering.iNorgePåHendelsestidspunktet')
                            : intlUtils(intl, 'oppsummering.ikkeINorgePåHendelsestidspunktet')}
                    </BodyShort>
                </Block>
            )}
        </>
    );
};

export default UtenlandsoppholdOppsummering;
