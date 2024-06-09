import Joi from 'joi';

const userNameSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .required()
    .pattern(/^[A-Z][a-zA-Z]*$/)
    .messages({
      'string.pattern.base': '{#label} must start with an uppercase letter',
      'string.empty': '{#label} is required',
      'string.max': '{#label} cannot be more than 20 characters',
    }),
  middleName: Joi.string().trim().allow(''),
  lastName: Joi.string()
    .trim()
    .required()
    .pattern(/^[A-Za-z]+$/)
    .messages({
      'string.pattern.base': '{#label} is not valid',
      'string.empty': '{#label} is required',
    }),
});

const guardianSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.empty': '{#label} is required',
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.empty': '{#label} is required',
  }),
  fatherContactNo: Joi.string().required().messages({
    'string.empty': '{#label} is required',
  }),
  mother: Joi.string().required().messages({
    'string.empty': '{#label} is required',
  }),
  motherOccupation: Joi.string().required().messages({
    'string.empty': '{#label} is required',
  }),
  motherContactNo: Joi.string().required().messages({
    'string.empty': '{#label} is required',
  }),
});

const localGuardianSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': '{#label} is required',
  }),
  occupation: Joi.string().required().messages({
    'string.empty': '{#label} is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.empty': '{#label} is required',
  }),
  address: Joi.string().required().messages({
    'string.empty': '{#label} is required',
  }),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': '{#label} is required',
  }),
  name: userNameSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': '{#label} is not valid',
    'string.empty': '{#label} is required',
  }),
  dateOfBirth: Joi.string().isoDate().allow(null, ''),
  email: Joi.string().email().required().messages({
    'string.email': '{#label} is not a valid email',
    'string.empty': '{#label} is required',
  }),
  contactNumber: Joi.string().required().messages({
    'string.empty': '{#label} is required',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'string.empty': '{#label} is required',
  }),
  bloodGroup: Joi.string()
    .valid('A-', 'A+', 'B+', 'B-', 'O-', 'O+', 'AB+', 'AB-')
    .allow(null, '')
    .messages({
      'any.only': '{#label} is not valid',
    }),
  presentAddress: Joi.string().required().messages({
    'string.empty': '{#label} is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'string.empty': '{#label} is required',
  }),
  guardian: guardianSchema.required(),
  localGuardian: localGuardianSchema.required(),
  profileImg: Joi.string().uri().allow(null, ''),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'any.only': '{#label} is not valid',
  }),
});

export default studentValidationSchema;
