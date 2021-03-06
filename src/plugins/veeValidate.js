// eslint-disable-next-line object-curly-newline
import { Form as VeeForm, Field as VeeField, defineRule, configure } from 'vee-validate';

import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  alpha_num as alphaNum,
  email,
  confirmed,
  url,
} from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);

    defineRule('required', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('alpha_spaces', alphaSpaces);
    defineRule('alpha_num', alphaNum);
    defineRule('email', email);
    defineRule('passwords_mismatch', confirmed);
    defineRule('url', url);
    defineRule('photoUrl', url);

    defineRule('requiredConditionally', (value, [target], ctx) => {
      const targetValue = ctx.form[target];
      if (!targetValue) return true;
      if (targetValue && value && value.length) {
        return true;
      }

      return `The field ${ctx.field} is required.`;
    });

    configure({
      // generateMessage: (ctx) => {
      generateMessage: ({ field, value, rule }) => {
        const messages = {
          required: `The field ${field} is required.`,
          min: `The field ${field} is too short. Minimum ${rule.params[0]} characters.`,
          max: `The field ${field} is too long.  Maximum ${rule.params[0]} characters.`,
          alpha_spaces: `The field ${field} can contain only alpabetical characters and spaces.`,
          alpha_num: `The field ${field} can contain only alpabetical characters and numbers.`,
          email: `${value} is not valid email.`,
          passwords_mismatch: "The passwords don't match.",
          url: `${value} is not valid url`,
          photoUrl: 'Not valid photo url. Only http:// and https:// protocols are allowed.',
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
