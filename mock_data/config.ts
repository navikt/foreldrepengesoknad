// import Søknad from "../types/s\u00F8knad/S\u00F8knad";

// type QuestionType = string | number | boolean;

// type QuestionId = string;

// enum DepencencyType {
//     'DEFINED',
//     'UNDEFINED',
//     'IS_TRUE',
//     'IS_FALSE',
//     'EQUALS',
//     'NOT_EQUALS',
//     'CUSTOM'
// }

// interface Dependency {
//     type: DepencencyType;
// }

// type ValueType = string | number | boolean | object;

// interface IsDefined extends Dependency {
//     type: DepencencyType.DEFINED;
// }

// interface IsUndefined extends Dependency {
//     type: DepencencyType.UNDEFINED;
// }

// interface IsTrue extends Dependency {
//     type: DepencencyType.IS_TRUE;
// }

// interface IsFalse extends Dependency {
//     type: DepencencyType.IS_FALSE;
// }

// interface Equals extends Dependency {
//     type: DepencencyType.EQUALS;
// }

// interface NotEquals extends Dependency {
//     type: DepencencyType.NOT_EQUALS;
//     value:
// }

// interface Custom extends Dependency {
//     type: DepencencyType.CUSTOM;
// }

// type Dependencies = IsDefined | IsUndefined | Equals | NotEquals | IsTrue | IsFalse |  Custom;

// interface QuestionDependency {
//     questionId: string;
//     type: DepencencyType;
//     value?: ValueType;
// }

// interface Question {
//     type: QuestionType;
//     id: QuestionId;
//     dependsOn?: QuestionDependency[];
// }

// interface Config {
//     [key: string]: Question;
// }

// const config: Config = {
//     "name": {
//         id: "abc",
//         type: "string",
//     },
//     "hasEmail": {
//         id: "hasEmail",
//         type: "boolean"
//     },
//     "email": {
//         id: "email",
//         type: "string",
//         dependsOn: [
//             {
//                 type: DepencencyType.IS_TRUE,
//                 questionId: "hasEmail"
//             }
//         ]

//     }
// };

// interface SimpleQuestion {
//     id: string;
//     name: string;
//     value: string | number | Date | undefined;
//     dependsOn?: string;
// }

// interface SimpleConfig {
//     [key: string]: SimpleQuestion;
// }

// const simpleConfig: SimpleConfig = {
//     "name": {
//         id: "name",
//         name: "name",
//         value: undefined
//     }
// }

// export type FormValue = string| number| boolean |Date  | undefined;
// export type ValueSelector = (søknad: Søknad) => string| number| boolean |Date  | undefined;
// export interface FormDependency {
//     selector: ValueSelector;
//     value: FormValue;
// }

// export interface FormDepencencies {
//     [key: string]: FormDependency;
// }

// export interface FormConfig {
//     [key: string]: {
//         value: ValueSelector;
//     }
// }

// export const simpleFormConfig: FormConfig = {
//     "abc": {
//         value: (søknad) => søknad.annenForelder.bostedsland
//     }
// }

// /**
//  *
//  * Skjema:
//  *  isVisible(key) => boolean;
//  *  - spørsmål og blokker - trenger grupper?
//  *
//  * Validering
//  *  - isVisible(key) -> validate(key) -> boolean; - Key + errorcode => feilmelding
//  *
//  * TreeShake/get included questions
//  * - Loop gjennom spørsmål - finn alle som har avhengighet til true, slett de som ikke er det
//  *
//  *
//  * Pseudokode
//  *  -   <Spørsmål key={}
//  *          render={
//  *              (question, onChange, errors, allValues) => <div/>
//  *          }
//  *      />
//  *
//  */
