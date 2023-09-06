import { Block, bemUtils, formatDate } from '@navikt/fp-common';
import countries from 'i18n-iso-countries';
import { FunctionComponent } from 'react';
import { BodyShort, Label } from '@navikt/ds-react';
import { Utenlandsopphold } from 'app/types/InformasjonOmUtenlandsopphold';
import { FormattedMessage } from 'react-intl';

import './utenlandsoppholdOppsummeringListe.css';

interface Props {
    utenlandsopphold: Utenlandsopphold[];
    tidligereOpphold: boolean;
}

const UtenlandsoppholdOppsummeringListe: FunctionComponent<Props> = ({ utenlandsopphold, tidligereOpphold }) => {
    const bem = bemUtils('utenlandsoppholdOppsummering');

    return (
        <>
            {utenlandsopphold.map((opphold, index) => {
                return (
                    <Block padBottom={index !== utenlandsopphold.length - 1 ? 'l' : 'none'}>
                        <div className={bem.block}>
                            <Block padBottom="m">
                                {tidligereOpphold ? (
                                    <Label>
                                        <FormattedMessage
                                            id="oppsummering.utenlandsopphold.harBoddINorge.utenlands"
                                            values={{ land: countries.getName(opphold.land, 'nb') }}
                                        />
                                    </Label>
                                ) : (
                                    <Label>
                                        <FormattedMessage
                                            id="oppsummering.utenlandsopphold.skalBoINorge.utenlands"
                                            values={{ land: countries.getName(opphold.land, 'nb') }}
                                        />
                                    </Label>
                                )}
                            </Block>
                            <BodyShort>
                                {formatDate(opphold.tidsperiode.fom)} - {formatDate(opphold.tidsperiode.tom)}
                            </BodyShort>
                        </div>
                    </Block>
                );
            })}
        </>
    );
};

export default UtenlandsoppholdOppsummeringListe;
