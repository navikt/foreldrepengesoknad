import { Barn, doesTidsperiodeContainDate, isAdoptertAnnetBarn, isAdoptertStebarn } from '@navikt/fp-common';
import { Opphold, Utenlandsopphold } from 'app/context/types/InformasjonOmUtenlandsopphold';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import OppsummeringsPunkt from '../OppsummeringsPunkt';
import UtenlandsoppholdListe from './UtenlandsoppholdOppsummeringListe';
import { BodyShort, VStack } from '@navikt/ds-react';

interface Props {
    utenlandsopphold: Opphold;
    tidligereUtenlandsopphold?: Utenlandsopphold[];
    senereUtenlandsopphold?: Utenlandsopphold[];
    barn: Barn;
}

const getErINorgePåFamiliehendelsedato = (
    familiehendelsedato: string,
    tidligereOpphold: Utenlandsopphold[],
    senereOpphold: Utenlandsopphold[],
): boolean => {
    let erINorge = true;

    tidligereOpphold.forEach((tidOpphold) => {
        if (doesTidsperiodeContainDate(tidOpphold.tidsperiode, familiehendelsedato)) {
            erINorge = false;
        }
    });

    senereOpphold.forEach((senOpphold) => {
        if (doesTidsperiodeContainDate(senOpphold.tidsperiode, familiehendelsedato)) {
            erINorge = false;
        }
    });

    return erINorge;
};

const erAdoptertBarn = (barn: Barn): boolean => {
    return isAdoptertAnnetBarn(barn) || isAdoptertStebarn(barn);
};

const EMPTY_ARRAY = [] as Utenlandsopphold[];

const UtenlandsoppholdOppsummering: FunctionComponent<Props> = ({
    utenlandsopphold,
    tidligereUtenlandsopphold = EMPTY_ARRAY,
    senereUtenlandsopphold = EMPTY_ARRAY,
    barn,
}) => {
    const intl = useIntl();
    const familiehendelsedato = getFamiliehendelsedato(barn);
    const erINorgePåFamiliehendelsedato = getErINorgePåFamiliehendelsedato(
        familiehendelsedato,
        tidligereUtenlandsopphold,
        senereUtenlandsopphold,
    );

    return (
        <VStack gap="4">
            <OppsummeringsPunkt title={intl.formatMessage({ id: 'oppsummering.utenlandsopphold.harBoddINorge' })}>
                {utenlandsopphold.iNorgeSiste12Mnd ? (
                    <BodyShort>
                        {intl.formatMessage({ id: 'oppsummering.utenlandsopphold.harBoddINorge.norge' })}
                    </BodyShort>
                ) : null}

                <UtenlandsoppholdListe utenlandsopphold={tidligereUtenlandsopphold} tidligereOpphold={true} />
            </OppsummeringsPunkt>

            <OppsummeringsPunkt title={intl.formatMessage({ id: 'oppsummering.utenlandsopphold.skalBoINorge' })}>
                {utenlandsopphold.iNorgeNeste12Mnd ? (
                    <BodyShort>
                        {intl.formatMessage({ id: 'oppsummering.utenlandsopphold.skalBoINorge.norge' })}
                    </BodyShort>
                ) : null}

                <UtenlandsoppholdListe utenlandsopphold={senereUtenlandsopphold} tidligereOpphold={false} />
            </OppsummeringsPunkt>

            <OppsummeringsPunkt
                title={
                    erAdoptertBarn(barn)
                        ? intl.formatMessage({ id: 'oppsummering.utenlandsopphold.erINorgeOmsorgsovertakelsesdato' })
                        : intl.formatMessage({ id: 'oppsummering.utenlandsopphold.erINorgePåFødselstidspunkt' })
                }
            >
                <BodyShort>
                    <FormattedMessage id={erINorgePåFamiliehendelsedato ? 'ja' : 'nei'} />
                </BodyShort>
            </OppsummeringsPunkt>
        </VStack>
    );
};

export default UtenlandsoppholdOppsummering;
