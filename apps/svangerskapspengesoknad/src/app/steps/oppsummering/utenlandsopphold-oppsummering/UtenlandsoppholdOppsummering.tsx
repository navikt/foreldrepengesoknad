import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { BodyShort } from '@navikt/ds-react';
import { Block, intlUtils } from '@navikt/fp-common';
import { Opphold, SenereOpphold, TidligereOpphold, Utenlandsopphold } from 'app/types/InformasjonOmUtenlandsopphold';
import UtenlandsoppholdListe from './UtenlandsoppholdOppsummeringListe';
import dayjs from 'dayjs';
import { Barn } from 'app/types/Barn';

const EMPTY_ARRAY = [] as Utenlandsopphold[];

const getErINorgePåFamiliehendelsedato = (
    familiehendelsedato: string,
    tidligereUtenlandsopphold: Utenlandsopphold[] = EMPTY_ARRAY,
    senereUtenlandsopphold: Utenlandsopphold[] = EMPTY_ARRAY,
): boolean => {
    let erINorge = true;

    tidligereUtenlandsopphold.forEach((tidOpphold) => {
        if (dayjs(familiehendelsedato).isBetween(tidOpphold.tidsperiode.fom, tidOpphold.tidsperiode.tom, 'day', '[]')) {
            erINorge = false;
        }
    });

    senereUtenlandsopphold.forEach((senOpphold) => {
        if (dayjs(familiehendelsedato).isBetween(senOpphold.tidsperiode.fom, senOpphold.tidsperiode.tom, 'day', '[]')) {
            erINorge = false;
        }
    });

    return erINorge;
};

interface Props {
    barn: Barn;
    utenlandsopphold: Opphold;
    tidligereUtenlandsopphold?: TidligereOpphold;
    senereUtenlandsopphold?: SenereOpphold;
}

const UtenlandsoppholdOppsummering: FunctionComponent<Props> = ({
    barn,
    utenlandsopphold,
    tidligereUtenlandsopphold,
    senereUtenlandsopphold,
}) => {
    const intl = useIntl();
    const familiehendelsedato = barn.erBarnetFødt ? barn.fødselsdato : barn.termindato;
    const iNorgePåHendelsestidspunktet = getErINorgePåFamiliehendelsedato(
        familiehendelsedato!,
        tidligereUtenlandsopphold?.tidligereOpphold,
        senereUtenlandsopphold?.senereOpphold,
    );

    return (
        <>
            {!utenlandsopphold.iNorgeSiste12Mnd && tidligereUtenlandsopphold && (
                <Block padBottom="l">
                    <UtenlandsoppholdListe
                        utenlandsopphold={tidligereUtenlandsopphold.tidligereOpphold}
                        tidligereOpphold={true}
                    />
                </Block>
            )}
            {!utenlandsopphold.iNorgeNeste12Mnd && senereUtenlandsopphold && (
                <Block padBottom="l">
                    <UtenlandsoppholdListe
                        utenlandsopphold={senereUtenlandsopphold.senereOpphold}
                        tidligereOpphold={false}
                    />
                </Block>
            )}
            {utenlandsopphold.iNorgeSiste12Mnd && (
                <Block padBottom="l">
                    <BodyShort>{intlUtils(intl, 'oppsummering.boddINorge')} </BodyShort>
                </Block>
            )}
            {utenlandsopphold.iNorgeNeste12Mnd && (
                <Block padBottom="l">
                    <BodyShort>{intlUtils(intl, 'oppsummering.skalboINorge')} </BodyShort>
                </Block>
            )}
            {(!utenlandsopphold.iNorgeSiste12Mnd || !utenlandsopphold.iNorgeNeste12Mnd) && (
                <Block>
                    <BodyShort>
                        {iNorgePåHendelsestidspunktet
                            ? intlUtils(intl, 'oppsummering.iNorgePåHendelsestidspunktet')
                            : intlUtils(intl, 'oppsummering.ikkeINorgePåHendelsestidspunktet')}
                    </BodyShort>
                </Block>
            )}
        </>
    );
};

export default UtenlandsoppholdOppsummering;
