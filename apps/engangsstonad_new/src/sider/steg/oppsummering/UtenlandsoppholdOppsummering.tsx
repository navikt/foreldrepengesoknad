import { useIntl } from 'react-intl';
import dayjs from 'dayjs';
import { Label } from '@navikt/ds-react';
import { Block, DisplayTextWithLabel } from '@navikt/fp-common';
import LandOppsummering from './LandOppsummering';
import { FormValues as OmBarnetFormValues } from '../omBarnet/OmBarnetForm';
import { FormValues as UtenlandsoppholdFormFormValus } from '../utenlandsopphold/UtenlandsoppholdForm';

interface Props {
    barn: OmBarnetFormValues;
    informasjonOmUtenlandsopphold: UtenlandsoppholdFormFormValus;
}

const erDatoITidsperiode = (dato: string, fom: string, tom: string) => {
    return dayjs(dato).isBetween(dayjs(fom), dayjs(tom), 'day', '[]');
};

const erFamiliehendelsedatoIEnUtenlandsoppholdPeriode = (
    familiehendelsedato: string,
    informasjonOmUtenlandsopphold: UtenlandsoppholdFormFormValus,
) => {
    return (
        informasjonOmUtenlandsopphold.utenlandsoppholdSiste12Mnd.some((tidligereOpphold) =>
            erDatoITidsperiode(familiehendelsedato, tidligereOpphold.fom, tidligereOpphold.tom),
        ) ||
        informasjonOmUtenlandsopphold.utenlandsoppholdNeste12Mnd.some((senereOpphold) =>
            erDatoITidsperiode(familiehendelsedato, senereOpphold.fom, senereOpphold.tom),
        )
    );
};

const UtenlandsoppholdOppsummering: React.FunctionComponent<Props> = ({ barn, informasjonOmUtenlandsopphold }) => {
    const intl = useIntl();

    return (
        <Block>
            {informasjonOmUtenlandsopphold.harBoddUtenforNorgeSiste12Mnd === false ? (
                <Block padBottom="l">
                    <DisplayTextWithLabel
                        label={intl.formatMessage({ id: 'oppsummering.text.boddSisteTolv' })}
                        text={intl.formatMessage({ id: 'norge' })}
                    />
                </Block>
            ) : (
                <Block padBottom="l" className="textWithLabel">
                    <Label className="textWithLabel__label">
                        {intl.formatMessage({ id: 'oppsummering.text.boddSisteTolv' })}
                    </Label>
                    <LandOppsummering
                        utenlandsoppholdListe={informasjonOmUtenlandsopphold.utenlandsoppholdSiste12Mnd}
                    />
                </Block>
            )}
            {informasjonOmUtenlandsopphold.skalBoUtenforNorgeNeste12Mnd === false ? (
                <Block padBottom="l">
                    <DisplayTextWithLabel
                        label={intl.formatMessage({ id: 'oppsummering.text.neste12mnd' })}
                        text={intl.formatMessage({ id: 'medlemmskap.radiobutton.boNorge' })}
                    />
                </Block>
            ) : (
                <Block padBottom="l" className="textWithLabel">
                    <Label className="textWithLabel__label">
                        {intl.formatMessage({ id: 'oppsummering.text.neste12mnd' })}
                    </Label>
                    <LandOppsummering
                        utenlandsoppholdListe={informasjonOmUtenlandsopphold.utenlandsoppholdNeste12Mnd}
                    />
                </Block>
            )}
            {barn.erBarnetFødt === false && (
                <Block padBottom="l">
                    <DisplayTextWithLabel
                        label={intl.formatMessage({ id: 'oppsummering.text.ogKommerPåFødselstidspunktet' })}
                        text={
                            erFamiliehendelsedatoIEnUtenlandsoppholdPeriode(
                                barn.termindato!,
                                informasjonOmUtenlandsopphold,
                            )
                                ? intl.formatMessage({ id: 'medlemmskap.radiobutton.vareUtlandet' })
                                : intl.formatMessage({ id: 'medlemmskap.radiobutton.vareNorge' })
                        }
                    />
                </Block>
            )}
            {barn.erBarnetFødt && (
                <Block padBottom="l">
                    <DisplayTextWithLabel
                        label={intl.formatMessage({ id: 'oppsummering.text.varPåFødselstidspunktet' })}
                        text={
                            erFamiliehendelsedatoIEnUtenlandsoppholdPeriode(
                                barn.fødselsdatoer[0],
                                informasjonOmUtenlandsopphold,
                            )
                                ? intl.formatMessage({ id: 'oppsummering.utenlandsopphold.iUtlandet' })
                                : intl.formatMessage({ id: 'oppsummering.utenlandsopphold.iNorge' })
                        }
                    />
                </Block>
            )}
        </Block>
    );
};

export default UtenlandsoppholdOppsummering;
