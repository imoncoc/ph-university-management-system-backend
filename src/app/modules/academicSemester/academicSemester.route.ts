import express from 'express';
import { academicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  academicSemesterControllers.createAcademicSemester,
);

router.get('/', academicSemesterControllers.getAllAcademicSemesters);
router.get(
  '/:academicSemesterId',
  academicSemesterControllers.getSingleAcademicSemesterById,
);

router.patch(
  '/:semesterId',
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  academicSemesterControllers.updateAcademicSemester,
);

export const AcademicSemesterRoutes = router;
