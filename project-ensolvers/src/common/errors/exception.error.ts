import { HttpException, HttpStatus } from '@nestjs/common';

export default (message: string, title: string, status: HttpStatus) => {
  return new HttpException(
    {
      status: status,
      error: message,
    },
    status,
    { cause: new Error(title.toUpperCase()) },
  );
};
