import PeriodeKort from 'app/components/periode-kort/PeriodeKort';

import { SvangerskapspengeSak } from 'app/types/SvangerskapspengeSak';
import { SøkerinfoDTO, SøkerinfoDTOArbeidsforhold } from 'app/types/SøkerinfoDTO';
import { formaterDato } from 'app/utils/dateUtils';
import { XMarkIcon, CheckmarkIcon } from '@navikt/aksel-icons';

import { guid } from '@navikt/fp-common';

import { Arbeidsforhold, svpPerioder } from 'app/types/svpTypesSommer';
import { intlUtils } from '@navikt/fp-common';
import { IntlShape, useIntl } from 'react-intl';
//import { FormattedMessage } from 'react-intl';


interface Props {
    sak: SvangerskapspengeSak;
    søker: SøkerinfoDTO;
}

const getArbeidsgiverNavn = (
    søkerArbeidsforhold: SøkerinfoDTOArbeidsforhold[] | undefined,
    gjeldendeVedtakArbeidsforhold: Arbeidsforhold
): string => {
    if (gjeldendeVedtakArbeidsforhold.aktivitet.type === 'ORDINÆRT_ARBEID') {
        const arbeidsforhold = søkerArbeidsforhold
            ? søkerArbeidsforhold.find(
                  (i) => i.arbeidsgiverId === gjeldendeVedtakArbeidsforhold.aktivitet.arbeidsgiver.id
              )
            : undefined;
        return arbeidsforhold?.arbeidsgiverNavn || '';
    } else if (gjeldendeVedtakArbeidsforhold.aktivitet.type === 'FRILANS') {
        return 'frilanser';
    } else if (gjeldendeVedtakArbeidsforhold.aktivitet.type === 'SELVSTENDIG_NÆRINGSDRIVENDE') {
        return 'selvstendig næringsdrivende';
    } else {
        return 'Type not found';
    }
};

const getPeriodeType = (periodeType: svpPerioder, intl: IntlShape, arbeidgiverNavn: string) => {
    if (periodeType.type == 'INGEN') {
        return intlUtils(intl, 'søknad.periodeType.ingen', { arbeidsgiver: arbeidgiverNavn });
        /*
        return (
            <FormattedMessage
                id="søknad.periodeType.ingen"
                values={{ arbeidsgiver: arbeidgiverNavn, b: (msg: any) => <b>{msg}</b> }}
            />
        );
        */
    } else if (periodeType.type == 'DELVIS') {
        /*
        return (
            <FormattedMessage
                id="søknad.periodeType.delvis"
                values={{
                    arbeidsgiver: arbeidgiverNavn,
                    arbeidstidprosent: periodeType.arbeidstidprosent,
                    b: (msg: any) => <b>{msg}</b>,
                }}
            />
        );
        */
        return intlUtils(intl, 'søknad.periodeType.delvis', {
            arbeidsgiver: arbeidgiverNavn,
            arbeidstidprosent: periodeType.arbeidstidprosent,
        });
    } else {
        throw new Error('error med getPeriodeType()');
    }
};

export const SammendragSoknad: React.FC<Props> = ({ sak, søker }) => {
    const datoFormat = 'DD. MMMM';
    const intl = useIntl();
    let melding;

    if ('åpenBehandling' in sak) {
        return (
            <>
                <h2>Din søknad er under behandling</h2>
                {sak.åpenBehandling &&
                    sak.åpenBehandling.søknad &&
                    sak.åpenBehandling.søknad.arbeidsforhold.map((arbeidsforhold) => {
                        return arbeidsforhold.tilrettelegginger.map((periode) => {
                            melding = (
                                <p>
                                    <b>{formaterDato(periode.fom, datoFormat)}</b>
                                    {getPeriodeType(
                                        periode,
                                        intl,
                                        getArbeidsgiverNavn(søker.arbeidsforhold, arbeidsforhold)
                                    )}
                                </p>
                            );
                            return <PeriodeKort key={guid()}>{melding}</PeriodeKort>;
                        });
                    })}
            </>
        );
    } else if (sak.sakAvsluttet) {
        return (
            <>
                <h2>Din søknad er avslått</h2>
                {
                    <PeriodeKort>
                        <>
                            <p>
                                <b>{'Avslags årsak: ' + sak.gjeldendeVedtak?.avslagÅrsak}</b>
                            </p>
                        </>
                    </PeriodeKort>
                }
            </>
        );
    } else if ('gjeldendeVedtak' in sak) {
        return (
            <>
                <h2>Dine vedtak</h2>
                {sak.gjeldendeVedtak &&
                    sak.gjeldendeVedtak.arbeidsforhold.map((arbeidsforhold) => {
                        return arbeidsforhold.tilrettelegginger.map((periode) => {
                            melding = (
                                <>
                                    <p>
                                        <b>
                                            {' '}
                                            {formaterDato(periode.fom, datoFormat)} -{' '}
                                            {formaterDato(periode.tom, datoFormat)}{' '}
                                        </b>
                                        jobber du hos{' '}
                                        {søker.arbeidsforhold &&
                                            getArbeidsgiverNavn(søker.arbeidsforhold, arbeidsforhold)}{' '}
                                        og mottar {periode.resultat.utbetalingsgrad}% svangerskapspenger
                                        {periode.resultat.resultatType === 'INNVILGET' ? (
                                            <CheckmarkIcon title="a11y-title" fontSize="1rem" />
                                        ) : (
                                            <XMarkIcon title="a11y-title" fontSize="1rem" />
                                        )}
                                    </p>
                                </>
                            );
                            return <PeriodeKort key={guid()}>{melding}</PeriodeKort>;
                        });
                    })}
            </>
        );
    } else return <></>;
};
