import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { SemesterRegistrationService } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationService.createSemesterRegistrationsIntoDB(
        req.body,
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Registration is Created successfully',
      data: result,
    });
  },
);

const getAllSemesterRegistrations = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationService.getAllSemesterRegistrationsIntoDB(
        req.body,
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Registrations are retrieve successfully',
      data: result,
    });
  },
);
const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await SemesterRegistrationService.getSingleSemesterRegistrationsIntoDB(
        id,
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Registration is retrieve successfully',
      data: result,
    });
  },
);

const updateSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await SemesterRegistrationService.updateSemesterRegistrationIntoDB(
        id,
        req.body,
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Registration is retrieve successfully',
      data: result,
    });
  },
);

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
