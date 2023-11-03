import { Error } from 'mongoose';

import { create404Response, create500Response } from './responseCreators';

const handleError = (error: any) => {
  if (error instanceof Error) {
    return create404Response(error.message);
  } else {
    return create500Response();
  }
};

export default handleError;
