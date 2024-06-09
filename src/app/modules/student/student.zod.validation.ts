import { z } from 'zod';

// Define individual validation schemas for nested objects first

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First Name can not be more than 20 characters')
    .refine(
      (value) => {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      { message: 'First Name is not in capitalize format' },
    ),
  middleName: z.string().optional(),
  lastName: z.string().refine((value) => /^[A-Za-z]+$/.test(value), {
    message: 'Last Name is not valid',
  }),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty('Father Name is required'),
  fatherOccupation: z.string().nonempty('Father Occupation is required'),
  fatherContactNo: z.string().nonempty('Father Contact No is required'),
  mother: z.string().nonempty('Mother Name is required'),
  motherOccupation: z.string().nonempty('Mother Occupation is required'),
  motherContactNo: z.string().nonempty('Mother Contact No is required'),
});

const localGuardianValidationSchema = z.object({
  name: z.string().nonempty('Local Guardian Name is required'),
  occupation: z.string().nonempty('Local Guardian Occupation is required'),
  contactNo: z.string().nonempty('Local Guardian Contact No is required'),
  address: z.string().nonempty('Local Guardian Address is required'),
});

// Define the main student schema using the nested schemas

export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other'], {
        invalid_type_error: 'Gender is not valid',
      }),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .nonempty('Email is required')
        .email('Email is not valid'),
      contactNumber: z.string().nonempty('Contact Number is required'),
      emergencyContactNo: z
        .string()
        .nonempty('Emergency Contact Number is required'),
      bloodGroup: z
        .enum(['A-', 'A+', 'B+', 'B-', 'O-', 'O+', 'AB+', 'AB-'])
        .optional(),
      presentAddress: z.string().nonempty('Present Address is required'),
      permanentAddress: z.string().nonempty('Permanent Address is required'),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      profileImg: z.string().optional(),
      academicDepartment: z.string(),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
