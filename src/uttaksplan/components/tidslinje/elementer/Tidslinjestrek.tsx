import * as React from 'react';
import * as classnames from 'classnames';
import {
    Tidslinjeinnslag,
    TidslinjeinnslagType,
    InnslagHendelsetype,
    InnslagPeriodetype
} from '../types';
import { Periodetype } from '../../../types';
import { innslagErFortsettelse, innslagFortsetter } from '../tidslinjeUtils';

export interface Props {
    innslag: Tidslinjeinnslag;
    erSisteInnslagForForelder?: boolean;
}

const cls = (variant?: string) =>
    variant ? `tidslinjestrek--${variant}` : 'tidslinjestrek';

const hendelseClassNames = (innslag: InnslagHendelsetype): string =>
    classnames(cls(), cls('hendelse'), cls(`hendelse--${innslag.hendelse}`));

const periodeClassNames = (
    innslag: InnslagPeriodetype,
    erSisteInnslagForForelder?: boolean
): string =>
    classnames(
        cls(),
        cls('periode'),
        cls(innslag.periode.forelder),
        cls(innslag.periode.type),
        {
            'tidslinjestrek--fortsettelse':
                innslag.periode.type !== Periodetype.Utsettelse &&
                innslagErFortsettelse(innslag),
            'tidslinjestrek--fortsetter':
                innslag.periode.type !== Periodetype.Utsettelse &&
                innslagFortsetter(innslag) &&
                !erSisteInnslagForForelder
        }
    );

const Tidslinjestrek: React.StatelessComponent<Props> = ({
    innslag,
    erSisteInnslagForForelder
}) => {
    return (
        <div
            className={
                innslag.type === TidslinjeinnslagType.hendelse
                    ? hendelseClassNames(innslag)
                    : periodeClassNames(innslag, erSisteInnslagForForelder)
            }
        />
    );
};

export default Tidslinjestrek;
