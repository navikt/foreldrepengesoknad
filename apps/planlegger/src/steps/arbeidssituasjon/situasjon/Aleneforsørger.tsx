import Infoboks from 'components/Infoboks';
import { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { Arbeidssituasjon, ArbeidssituasjonEnum } from 'types/Arbeidssituasjon';

import { BodyLong, Link } from '@navikt/ds-react';

import { HVOR_LENGE_LENKE, VEIVISER_LENKE } from '../ArbeidssituasjonSteg';

const Aleneforsørger: FunctionComponent = () => {
    const formMethods = useFormContext<Arbeidssituasjon>();

    const arbeidssituasjon = formMethods.watch('arbeidssituasjon');

    return (
        <>
            {arbeidssituasjon === ArbeidssituasjonEnum.JOBBER && (
                <Infoboks header={<FormattedMessage id="arbeid.jobber.infoboks.harRettTilForeldrepengerDeg" />}>
                    <BodyLong>
                        <FormattedMessage id="arbeid.jobber.infoboks.harJobbetSeksAvTiMnd" />
                    </BodyLong>
                </Infoboks>
            )}
            {arbeidssituasjon === ArbeidssituasjonEnum.UFØR && (
                <Infoboks header={<FormattedMessage id="arbeid.infoboks.harIkkeRettTilForeldrepengerDeg" />}>
                    <BodyLong>
                        <FormattedMessage id="arbeid.ufør.infoboks.erUførDeg" />
                    </BodyLong>
                    <BodyLong>
                        <FormattedMessage
                            id="arbeid.ufør.infoboks.lesMerDeg"
                            values={{
                                a: (msg: any) => (
                                    <Link href={HVOR_LENGE_LENKE} className="lenke" rel="noreferrer" target="_blank">
                                        {msg}
                                    </Link>
                                ),
                            }}
                        />
                    </BodyLong>
                </Infoboks>
            )}
            {arbeidssituasjon === ArbeidssituasjonEnum.INGEN && (
                <Infoboks header={<FormattedMessage id="arbeid.infoboks.harIkkeRettTilForeldrepengerDeg" />}>
                    <BodyLong>
                        <FormattedMessage id="arbeid.ingen.infoboks.manHarIkkeRett" />
                    </BodyLong>
                    <BodyLong>
                        <FormattedMessage
                            id="arbeid.ingen.infoboks.engangsstønadDeg"
                            values={{
                                a: (msg: any) => (
                                    <Link href={VEIVISER_LENKE} className="lenke" rel="noreferrer" target="_blank">
                                        {msg}
                                    </Link>
                                ),
                            }}
                        />
                    </BodyLong>
                </Infoboks>
            )}
        </>
    );
};

export default Aleneforsørger;
