// eslint-disable-next-line object-curly-newline
import { Form as VeeForm, Field as VeeField, defineRule, configure } from 'vee-validate';

import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  confirmed,
} from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);

    defineRule('required', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('alpha_spaces', alphaSpaces);
    defineRule('email', email);
    defineRule('passwords_mismatch', confirmed);

    configure({
      // generateMessage: (ctx) => {
      generateMessage: ({ field, value, rule }) => {
        const messages = {
          required: `The field ${field} is required.`,
          min: `The field ${field} is too short. Minimum ${rule.params[0]} charactrs.`,
          max: `The field ${field} is too long.  Maximum ${rule.params[0]} charactrs.`,
          alpha_spaces: `The field ${field} can contain only alpabetical characters and spaces.`,
          email: `${value} is not valid email.`,
          passwords_mismatch: "The passwords don't match",
        };

        const message = messages[rule.name]
          ? messages[rule.name]
          : `The field ${field} is invalid.`;

        return message;
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
      bails: false,
    });
  },
};
