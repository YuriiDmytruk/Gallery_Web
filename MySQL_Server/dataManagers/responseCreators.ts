import { ResponseType, ImageType, UserType } from '../types';

const create200Response = (
  value:
    | ImageType
    | ImageType[]
    | UserType
    | UserType[]
    | number
    | null
    | string
): ResponseType => {
  return {
    statusCode: 200,
    value: value,
    errorMessage: '',
  };
};

const create403Response = (): ResponseType => {
  return {
    statusCode: 403,
    value: null,
    errorMessage: 'Wrong password',
  };
};

const create404Response = (errorMessage: string): ResponseType => {
  return {
    statusCode: 404,
    value: null,
    errorMessage: errorMessage,
  };
};

const create500Response = (): ResponseType => {
  return {
    statusCode: 500,
    value: null,
    errorMessage: 'An unexpected error occurred.',
  };
};

export {
  create200Response,
  create403Response,
  create404Response,
  create500Response,
};
