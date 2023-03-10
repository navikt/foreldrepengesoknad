import { doesTidsperiodeContainDate, intlUtils } from '@navikt/fp-common';
import Barn, { isAdoptertAnnetBarn, isAdoptertStebarn } from 'app/context/types/Barn';
import InformasjonOmUtenlandsopphold, { Utenlandsopphold } from 'app/context/types/InformasjonOmUtenlandsopphold';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import OppsummeringsPunkt from '../OppsummeringsPunkt';
import UtenlandsoppholdListe from './UtenlandsoppholdOppsummeringListe';

interface Props {
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    barn: Barn;
}

const getErINorgePåFamiliehendelsedato = (
    familiehendelsedato: string,
    tidligereOpphold: Utenlandsopphold[],
    senereOpphold: Utenlandsopphold[]
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

const UtenlandsoppholdOppsummering: FunctionComponent<Props> = ({ informasjonOmUtenlandsopphold, barn }) => {
    const intl = useIntl();
    const { senereOpphold, tidligereOpphold } = informasjonOmUtenlandsopphold;
    const familiehendelsedato = getFamiliehendelsedato(barn);
    const erINorgePåFamiliehendelsedato = getErINorgePåFamiliehendelsedato(
        familiehendelsedato,
        tidligereOpphold,
        senereOpphold
    );

    return (
        <>
            <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.utenlandsopphold.harBoddINorge')}>
                {informasjonOmUtenlandsopphold.iNorgeSiste12Mnd ? (
                    <Normaltekst>{intlUtils(intl, 'oppsummering.utenlandsopphold.harBoddINorge.norge')}</Normaltekst>
                ) : null}

                <UtenlandsoppholdListe
                    utenlandsopphold={informasjonOmUtenlandsopphold.tidligereOpphold}
                    tidligereOpphold={true}
                />
            </OppsummeringsPunkt>

            <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.utenlandsopphold.skalBoINorge')}>
                {informasjonOmUtenlandsopphold.iNorgeNeste12Mnd ? (
                    <Normaltekst>{intlUtils(intl, 'oppsummering.utenlandsopphold.skalBoINorge.norge')}</Normaltekst>
                ) : null}

                <UtenlandsoppholdListe
                    utenlandsopphold={informasjonOmUtenlandsopphold.senereOpphold}
                    tidligereOpphold={false}
                />
            </OppsummeringsPunkt>

            <OppsummeringsPunkt
                title={
                    erAdoptertBarn(barn)
                        ? intlUtils(intl, 'oppsummering.utenlandsopphold.erINorgeOmsorgsovertakelsesdato')
                        : intlUtils(intl, 'oppsummering.utenlandsopphold.erINorgePåFødselstidspunkt')
                }
            >
                <Normaltekst>
                    <FormattedMessage id={erINorgePåFamiliehendelsedato ? 'ja' : 'nei'} />
                </Normaltekst>
            </OppsummeringsPunkt>
        </>
    );
};

export default UtenlandsoppholdOppsummering;
