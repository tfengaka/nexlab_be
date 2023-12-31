import { GraphQLError } from 'graphql';
import otpGenerator from 'otp-generator';
import { IHandler } from '~/apis/types';
import model from '~/model';
import { IStudentAttributes } from '~/model/student';
import { otp_email_template, sendMail } from '~/utils';
import * as bcrypt from 'bcryptjs';

export const send_otp: IHandler<{ new: IStudentAttributes }> = async ({ payload }) => {
  const { email, full_name } = payload.new;
  const account = await model.Student.findOne({ where: { email } });
  if (!account) {
    throw new GraphQLError('Cant found account for this email!', {
      extensions: {
        code: 'FORBIDDEN',
      },
    });
  }
  const otp_code = otpGenerator.generate(6, { lowerCaseAlphabets: false, specialChars: false });
  const salt = await bcrypt.genSalt(10);
  const hashOtp = await bcrypt.hash(otp_code, salt);
  await model.OTPCode.create({ student_email: email, code: hashOtp });
  const mailBody = {
    to: email,
    subject: 'Verification Email',
    html: otp_email_template(full_name, otp_code),
  };
  const mailResponse = await sendMail(mailBody);
  return { messageId: mailResponse.messageId, message: `Sent to ${mailResponse.envelope.to}` };
};
