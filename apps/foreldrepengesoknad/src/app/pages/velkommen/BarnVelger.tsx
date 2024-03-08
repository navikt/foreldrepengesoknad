import { Radio } from '@navikt/ds-react';
import { DDMMMMYYY_DATE_FORMAT } from '@navikt/fp-constants';
import { RadioGroup } from '@navikt/fp-form-hooks';
import { isRequired } from '@navikt/fp-validation';
import { ValgtBarn, ValgtBarnType } from 'app/types/ValgtBarn';
import { formaterFødselsdatoerPåBarn, formaterNavnPåBarn, getTekstForAntallBarn } from 'app/utils/barnUtils';
import dayjs from 'dayjs';
import { FunctionComponent, ReactElement } from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

export enum SelectableBarnOptions {
    SØKNAD_GJELDER_NYTT_BARN = 'søknad_gjeder_nytt_barn',
}

const getRadioForUfødtBarn = (barna: ValgtBarn[], intl: IntlShape) => {
    return barna.map((barn) => {
        const saksStatus =
            barn.sak !== undefined ? getStatusTekst(barn.sak.åpenBehandling === undefined, intl) : undefined;
        const saksnummerTekst =
            barn.sak !== undefined
                ? intl.formatMessage({ id: 'velkommen.barnVelger.saksnummer' }, { saksnummer: barn.sak.saksnummer })
                : '';

        return (
            <Radio
                key={barn.id}
                value={barn.id}
                description={barn.sak !== undefined ? `${saksnummerTekst}, ${saksStatus}` : saksnummerTekst}
            >
                <FormattedMessage
                    id="velkommen.barnVelger.ufødtBarn"
                    values={{
                        antallBarnTekst: getTekstForAntallBarn(barn.antallBarn, intl),
                        termin: dayjs(barn.termindato!).format(DDMMMMYYY_DATE_FORMAT),
                        b: (chunks: any) => <b>{chunks}</b>,
                    }}
                />
            </Radio>
        );
    });
};

const getStatusTekst = (åpenBehandling: boolean, intl: IntlShape) => {
    return åpenBehandling
        ? intl.formatMessage({ id: 'velkommen.sak.status.ferdigBehandlet' })
        : intl.formatMessage({ id: 'velkommen.sak.status.underBehandling' });
};

const getRadioForFødtEllerAdoptertBarn = (barna: ValgtBarn[], intl: IntlShape) => {
    return barna.map((barn) => {
        const navnTekstEllerBarnMedUkjentNavnTekst = formaterNavnPåBarn(
            barn.fornavn,
            barn.fødselsdatoer,
            barn.omsorgsovertagelse,
            barn.alleBarnaLever,
            barn.antallBarn,
            intl,
        );
        const fødselsdatoerTekst = formaterFødselsdatoerPåBarn(barn.fødselsdatoer);
        const fødtAdoptertDatoTekst =
            barn.type === ValgtBarnType.FØDT || barn.type === ValgtBarnType.IKKE_UTFYLT
                ? fødselsdatoerTekst
                : dayjs(barn.omsorgsovertagelse!).format(DDMMMMYYY_DATE_FORMAT);
        const situasjonTekst =
            barn.type === ValgtBarnType.FØDT || barn.type === ValgtBarnType.IKKE_UTFYLT
                ? intl.formatMessage({ id: 'velkommen.barnVelger.født' })
                : intl.formatMessage({ id: 'velkommen.barnVelger.adopsjon' });

        const saksnummerTekst =
            barn.sak !== undefined
                ? intl.formatMessage({ id: 'velkommen.barnVelger.saksnummer' }, { saksnummer: barn.sak.saksnummer })
                : '';
        const saksStatus =
            barn.sak !== undefined ? getStatusTekst(barn.sak.åpenBehandling === undefined, intl) : undefined;

        return (
            <Radio
                key={barn.id}
                value={barn.id}
                description={saksStatus ? `${saksnummerTekst}, ${saksStatus}` : saksnummerTekst}
            >
                <b>
                    {barn.alleBarnaLever
                        ? `${navnTekstEllerBarnMedUkjentNavnTekst} ${situasjonTekst} ${fødtAdoptertDatoTekst}`
                        : navnTekstEllerBarnMedUkjentNavnTekst}
                </b>
            </Radio>
        );
    });
};

interface Props {
    selectableBarn: ValgtBarn[];
}

const BarnVelger: FunctionComponent<Props> = ({ selectableBarn }) => {
    const intl = useIntl();

    if (selectableBarn.length === 0) {
        return null;
    }

    const ufødteBarn = selectableBarn.filter((b) => b.type === ValgtBarnType.UFØDT);
    const fødteOgAdopterteBarn = selectableBarn.filter((b) => b.type !== ValgtBarnType.UFØDT);

    let radios = [] as ReactElement[];
    if (fødteOgAdopterteBarn.length > 0) {
        radios = radios.concat(getRadioForFødtEllerAdoptertBarn(fødteOgAdopterteBarn, intl));
    }
    if (ufødteBarn.length > 0) {
        radios = radios.concat(getRadioForUfødtBarn(ufødteBarn, intl));
    }

    return (
        <RadioGroup
            name="valgteBarn"
            label={<FormattedMessage id="velkommen.intro.harSaker.barnVelger.label" />}
            validate={[isRequired(intl.formatMessage({ id: 'steg.footer.spørsmålMåBesvares' }))]}
        >
            {radios.concat(
                <Radio
                    key={SelectableBarnOptions.SØKNAD_GJELDER_NYTT_BARN}
                    value={SelectableBarnOptions.SØKNAD_GJELDER_NYTT_BARN}
                    description={intl.formatMessage({ id: 'velkommen.intro.harSaker.barnVelger.info' })}
                >
                    <FormattedMessage
                        id="omBarnet.gjelderAnnetBarn"
                        values={{
                            b: (chunks: any) => <b>{chunks}</b>,
                        }}
                    />
                </Radio>,
            )}
        </RadioGroup>
    );
};

export default BarnVelger;
