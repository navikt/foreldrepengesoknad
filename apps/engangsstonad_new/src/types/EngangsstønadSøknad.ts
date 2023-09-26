import { Attachment } from 'fpcommon/uploader/typer/Attachment';
import { Utenlandsopphold, UtenlandsoppholdNeste, UtenlandsoppholdSiste } from './Utenlandsopphold';

export interface EngangsstønadSøknadDto {
    type: string;
    erEndringssøknad: boolean;
    informasjonOmUtenlandsopphold: Utenlandsopphold & UtenlandsoppholdNeste & UtenlandsoppholdSiste;
    barn: any;
    vedlegg?: Attachment[];
    søker: {
        språkkode: string;
    };
}
