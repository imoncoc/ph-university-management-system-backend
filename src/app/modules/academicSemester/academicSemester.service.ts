import mongoose from 'mongoose';
import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import AppError from '../../errors/AppError';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // check semester name --> semester code

  // academicSemesterNameCodeMapper['Fall']
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(400, 'Invalid Semester Code');
  }
  const result = await AcademicSemester.create(payload);

  return result;
};

const getSingleAcademicSemesterFromDB = async (academicSemesterId: string) => {
  const result = await AcademicSemester.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(academicSemesterId) },
    },
  ]);
  return result;
};

const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(400, 'Invalid Semester Code');
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
};
