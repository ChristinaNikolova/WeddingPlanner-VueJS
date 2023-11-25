export const global = {
  TITLE(min, max) {
    return `Title should be between ${min} and ${max} characters long`;
  },
  DESC(min, max) {
    return `Description should be between ${min} and ${max} characters long`;
  },
  IMAGE: 'Image is required',
  NAME(min, max) {
    return `Name should be between ${min} and ${max} characters long`;
  },
  REQUIRED: 'Field is required',
  DEFAULT: 'Error',
};

// export const article = {
//   CONTENT(min, max) {
//     return `Content should be between ${min} and ${max} characters long`;
//   },
//   CATEGOTY: 'Please select category',
// };

export const auth = {
  EMAIL: 'Invalid email',
  PASSWORD(min, max) {
    return `Password should be between ${min} and ${max} characters long`;
  },
  REPEAT_PASSWORD: 'Password und repeat password are not equal',
};

export const cost = {
  PRICE: 'Price should be a positive number',
};

// export const event = {
//   TIME: 'End time should be after the start time',
// };

export const planner = {
  BUDGET: 'Budget should be a positive number',
  LOCATION(min, max) {
    return `Location should be between ${min} and ${max} characters long`;
  },
  NAME: 'Name should contain first and last name',
  DATE: 'Date should be in format DD.MM.YYYY',
};
