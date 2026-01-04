// import type { InputRef, InputValidation } from '../components/Input';

// type ValidationRequest = {
//   validation: InputValidation[];
//   text: string;
// };

// export type ValidationResult = {
//   isValid: boolean;
//   message?: string[];
// };

// export const handleValidation = ({
//   validation,
//   text,
// }: ValidationRequest): ValidationResult => {
//   let messages: string[] = [];
//   validation.map((v) => {
//     if (!v.pattern.test(text)) {
//       messages.push(v.message);
//       console.log('object');
//     }
//   });
//   return messages.length > 0
//     ? { isValid: false, message: messages }
//     : { isValid: true };
// };
