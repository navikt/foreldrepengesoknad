import * as React from 'react';
import Block from 'common/components/block/Block';
import { Checkbox } from 'nav-frontend-skjema';
import FødselsnummerBolk from './FødselsnummerBolk';
import NavnPåAnnenForelderSpørsmål from '../../spørsmål/NavnPåAnnenForelderSpørsmål';
import Søknad, { Skjemanummer, Søkersituasjon } from '../../types/søknad/Søknad';
import { injectIntl, IntlShape } from 'react-intl';
import ErMorUførSpørsmål from '../../spørsmål/ErMorUførSpørsmål';
import ErAnnenForelderInformertSpørsmål from '../../spørsmål/ErAnnenForelderInformertSpørsmål';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import AttachmentsUploaderPure from 'app/components/storage/attachment/components/AttachmentUploaderPure';
import AnnenForelder from '../../types/søknad/AnnenForelder';
import getMessage from 'common/util/i18nUtils';
import AleneOmOmsorgSpørsmål from '../../spørsmål/AleneOmOmsorgSpørsmål';
import { Søker } from '../../types/søknad/Søker';
import RettPåForeldrepengerSpørsmål from '../../spørsmål/RettPåForeldrepengerSpørsmål';
import { Barn } from '../../types/søknad/Barn';
import { AttachmentType } from 'app/components/storage/attachment/types/AttachmentType';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import { AnnenForelderSpørsmålKeys, AnnenForelderStegVisibility } from './visibility/annenForelderStegVisibility';
import { DateValue } from '../../types/common';
import { getFamiliehendelsedato } from '../../util/uttaksplan';
import VeilederInfo from '../../components/veilederInfo/VeilederInfo';

export interface OwnProps {
    annenForelder: AnnenForelder;
    søkerFnr: string;
    søker: Søker;
    søknad: Partial<Søknad>;
    situasjon: Søkersituasjon;
    visibility: AnnenForelderStegVisibility;
    barn: Barn;
    onBarnChange: (barn: Partial<Barn>) => void;
    onAnnenForelderChange: (barn: Partial<AnnenForelder>) => void;
    onSøkerChange: (søker: Partial<Søker>) => void;
    onFilesSelect: (attachments: Attachment[]) => void;
    onFileDelete: (attachment: Attachment) => void;
    intl: IntlShape;
}

type Props = OwnProps;

class AnnenForelderSpørsmål extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.annenForelderKanIkkeOppgis = this.annenForelderKanIkkeOppgis.bind(this);
    }
    annenForelderKanIkkeOppgis() {
        this.props.onAnnenForelderChange({
            kanIkkeOppgis: !this.props.annenForelder.kanIkkeOppgis,
            fornavn: undefined,
            etternavn: undefined,
            fnr: undefined,
            utenlandskFnr: undefined,
            harRettPåForeldrepenger: undefined,
        });
    }
    render() {
        const {
            søkerFnr,
            søker,
            annenForelder,
            barn,
            situasjon,
            visibility,
            onAnnenForelderChange,
            onBarnChange,
            onSøkerChange,
            onFileDelete,
            onFilesSelect,
            intl,
        } = this.props;

        const { kanIkkeOppgis, fornavn, etternavn } = annenForelder!;

        return (
            <>
                <Block margin="xs" visible={visibility.isVisible(AnnenForelderSpørsmålKeys.navnPåAnnenForelder)}>
                    <NavnPåAnnenForelderSpørsmål
                        fornavn={fornavn}
                        etternavn={etternavn}
                        kanIkkeOppgis={kanIkkeOppgis}
                        onChange={onAnnenForelderChange}
                    />
                </Block>

                <Block visible={visibility.isVisible(AnnenForelderSpørsmålKeys.kanIkkeOppgis)}>
                    <Checkbox
                        name="annenForelderKanIkkeOppgis"
                        checked={kanIkkeOppgis || false}
                        label={
                            situasjon === Søkersituasjon.ADOPSJON
                                ? getMessage(intl, 'annenForelder.spørsmål.adoptererAlene')
                                : getMessage(intl, 'annenForelder.spørsmål.kanOppgis')
                        }
                        onChange={this.annenForelderKanIkkeOppgis}
                    />
                </Block>

                <Block visible={visibility.isVisible(AnnenForelderSpørsmålKeys.fødselsnummer)} hasChildBlocks={true}>
                    <FødselsnummerBolk
                        kanIkkeOppgis={kanIkkeOppgis}
                        søkersFødselsnummer={søkerFnr}
                        navn={fornavn}
                        fnr={annenForelder.fnr}
                        utenlandskFnr={annenForelder.utenlandskFnr}
                        bostedsland={annenForelder.bostedsland}
                        onChange={onAnnenForelderChange}
                    />
                </Block>

                <Block visible={visibility.isVisible(AnnenForelderSpørsmålKeys.deltOmsorg)}>
                    <AleneOmOmsorgSpørsmål
                        aleneOmOmsorg={søker.erAleneOmOmsorg}
                        onChange={(erAleneOmOmsorg) => onSøkerChange({ erAleneOmOmsorg })}
                    />
                </Block>

                <Block
                    visible={
                        visibility.isVisible(AnnenForelderSpørsmålKeys.deltOmsorg) &&
                        søker.rolle === 'MOR' &&
                        søker.erAleneOmOmsorg !== undefined &&
                        søker.erAleneOmOmsorg
                    }
                >
                    <VeilederInfo
                        messages={[
                            {
                                type: 'normal',
                                contentIntlKey: 'annenForelder.veileder.aleneOmsorg.forBarnet',
                                values: {
                                    navn: annenForelder.fornavn,
                                },
                            },
                        ]}
                    />
                </Block>

                <Block visible={visibility.isVisible(AnnenForelderSpørsmålKeys.harRettPåForeldrepenger)}>
                    <RettPåForeldrepengerSpørsmål
                        navnAnnenForelder={annenForelder.fornavn}
                        harAnnenForelderRettPåForeldrepenger={annenForelder.harRettPåForeldrepenger}
                        onChange={(harRettPåForeldrepenger) => onAnnenForelderChange({ harRettPåForeldrepenger })}
                    />
                </Block>

                <Block visible={visibility.isVisible(AnnenForelderSpørsmålKeys.erMorUfør)}>
                    <ErMorUførSpørsmål
                        navn={annenForelder.fornavn}
                        erUfør={annenForelder.erUfør}
                        onChange={(erUfør) => onAnnenForelderChange({ erUfør })}
                    />
                </Block>

                <Block
                    visible={
                        visibility.isVisible(AnnenForelderSpørsmålKeys.harRettPåForeldrepenger) &&
                        annenForelder.harRettPåForeldrepenger === true
                    }
                >
                    <VeilederInfo
                        messages={[
                            {
                                type: 'normal',
                                contentIntlKey: 'annenForelder.veileder.rettigheterOgDelingAvUttaksplan',
                                values: {
                                    navn: annenForelder.fornavn,
                                },
                            },
                        ]}
                    />
                </Block>

                <Block visible={visibility.isVisible(AnnenForelderSpørsmålKeys.erAnnenForelderInformert)} margin="none">
                    <Block margin={annenForelder.erInformertOmSøknaden === false ? 'xs' : 'm'}>
                        <ErAnnenForelderInformertSpørsmål
                            navn={annenForelder.fornavn}
                            erAnnenForelderInformert={annenForelder.erInformertOmSøknaden}
                            onChange={(erInformertOmSøknaden) => onAnnenForelderChange({ erInformertOmSøknaden })}
                        />
                    </Block>
                    {annenForelder.erInformertOmSøknaden === false && (
                        <VeilederInfo
                            messages={[
                                {
                                    type: 'normal',
                                    contentIntlKey: 'erAnnenForelderInformert.veilederIkkeInformert',
                                    values: { navn: annenForelder.fornavn },
                                },
                            ]}
                        />
                    )}
                </Block>
                <Block visible={visibility.isVisible(AnnenForelderSpørsmålKeys.datoForAleneomsorg)}>
                    <DatoInput
                        name="datoForAleneomsorg"
                        id="datoForAleneomsorg"
                        label={getMessage(intl, 'datoForAleneomsorg.spørsmål')}
                        onChange={(datoForAleneomsorg: DateValue) => onBarnChange({ datoForAleneomsorg })}
                        dato={barn.datoForAleneomsorg}
                        datoAvgrensinger={{
                            minDato: getFamiliehendelsedato(barn, situasjon),
                        }}
                    />
                </Block>
                <Block
                    visible={
                        visibility.isVisible(AnnenForelderSpørsmålKeys.datoForAleneomsorg) &&
                        barn.datoForAleneomsorg !== undefined
                    }
                >
                    <Block margin="xs">
                        <VeilederInfo
                            messages={[
                                {
                                    type: 'normal',
                                    contentIntlKey: 'far.dokumantasjonAvAleneomsorg.vedlegg.veileder',
                                },
                            ]}
                        />
                    </Block>

                    <AttachmentsUploaderPure
                        attachments={barn.dokumentasjonAvAleneomsorg || []}
                        attachmentType={AttachmentType.ALENEOMSORG}
                        onFilesSelect={onFilesSelect}
                        onFileDelete={onFileDelete}
                        skjemanummer={Skjemanummer.DOK_AV_ALENEOMSORG}
                    />
                </Block>
            </>
        );
    }
}

export default injectIntl(AnnenForelderSpørsmål);
