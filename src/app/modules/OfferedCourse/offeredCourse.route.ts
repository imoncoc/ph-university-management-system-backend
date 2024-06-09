import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseValidations } from './offeredCourse.validation';
import { offeredCourseControllers } from './offeredCourse.controller';

const router = express.Router();

router.get('/', offeredCourseControllers.getAllOfferedCourses);

router.get('/:id', offeredCourseControllers.getSingleOfferedCourses);

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  offeredCourseControllers.createOfferedCourse,
);

router.patch(
  '/:id',
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  offeredCourseControllers.updateOfferedCourse,
);

router.delete('/:id', offeredCourseControllers.deleteOfferedCourseFromDB);

export const offeredCourseRoutes = router;
