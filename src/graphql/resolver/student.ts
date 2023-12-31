import { YogaInitialContext } from 'graphql-yoga';
import {
  getAllStudents,
  getCurrentStudent,
  removeStudentByPk,
  updateStudentDataByPk,
} from '~/graphql/service/student.service';

const studentResolvers = {
  Query: {
    getMe: async (_: any, __: any, context: YogaInitialContext) => {
      try {
        const token = context.request.headers.get('authorization')?.split(' ')[1] as string;
        return await getCurrentStudent(token);
      } catch (error) {
        console.error(error);
        return error;
      }
    },
    getStudents: async () => await getAllStudents(),
  },
  Mutation: {
    deleteStudentByPk: async (_: any, args: { pk: string }) => {
      try {
        return await removeStudentByPk(args.pk);
      } catch (error) {
        console.error(error);
        return error;
      }
    },
    updateStudentByPk: async (_: any, args: { pk: string; form: FormUpdateStudent }) => {
      try {
        return await updateStudentDataByPk(args.pk, args.form);
      } catch (error) {
        console.error(error);
        return error;
      }
    },
  },
};

export default studentResolvers;
