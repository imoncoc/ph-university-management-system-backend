import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';
import { Request, Response } from 'express';

const createAcademicSemester = catchAsync(async (req, res) => {
  //const { password, student: studentData } = req.body;

  // const zodParsedData = studentValidationSchema.parse(studentData);

  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is created successfully',
    data: result,
  });
});

const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemestersFromDB();
  res.status(200).json({
    success: true,
    message: 'Academic semester fetched successfully!',
    data: result,
  });
});

const getSingleAcademicSemesterById = catchAsync(
  async (req: Request, res: Response) => {
    const { academicSemesterId } = req.params;
    const result =
      await AcademicSemesterServices.getSingleAcademicSemesterFromDB(
        academicSemesterId,
      );

    res.status(200).json({
      success: true,
      message: 'Academic semester fetched successfully!',
      data: result,
    });
  },
);

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
    semesterId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved successfully',
    data: result,
  });
});

export const academicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemesterById,
  updateAcademicSemester,
};
