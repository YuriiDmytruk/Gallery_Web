import User from '../models/user';
import handleError from './utill';
import {
  create200Response,
  create403Response,
  create404Response,
} from './responseCreators';
import { ResponseType, UserType } from '../types';

const postUser = async ({
  email,
  password,
  nickName,
}: {
  email: string;
  password: string;
  nickName: string;
}): Promise<ResponseType> => {
  const user = new User({ email, password, nickName, friends: [] });

  try {
    const result = await user.save();
    return create200Response(null);
  } catch (error) {
    return handleError(error);
  }
};

const getUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<ResponseType> => {
  try {
    const mongoUser = await User.findOne({ email: email });
    if (mongoUser != null) {
      const user = {
        ...mongoUser.toObject(),
        _id: mongoUser._id.toString(),
        friends: mongoUser.friends.map((friend) => friend.toString()),
        createdAt: mongoUser.createdAt.toString(),
        updatedAt: mongoUser.updatedAt.toString(),
      };
      if (user.password === password) {
        return create200Response(user);
      }
      return create403Response();
    }
    return create404Response('No such email');
  } catch (error) {
    return handleError(error);
  }
};

const getAuthorName = async (id: string): Promise<ResponseType> => {
  try {
    const user = (await User.findOne({ _id: id }))?.toObject();
    return user
      ? create200Response(user.nickName)
      : create404Response('No user with this ID');
  } catch (error) {
    return handleError(error);
  }
};

const getFriends = async (friendsId: string[]): Promise<ResponseType> => {
  try {
    const friendPromises: Promise<UserType | undefined>[] = friendsId.map(
      async (id: string) => {
        const mongoUser = await User.findOne({ _id: id });
        if (mongoUser != null) {
          const user = {
            ...mongoUser.toObject(),
            _id: mongoUser._id.toString(),
            friends: [],
            createdAt: '',
            updatedAt: '',
            password: '',
          };
          return user;
        }
        return undefined;
      }
    );

    const friends: UserType[] = (await Promise.all(friendPromises)).filter(
      (user) => user !== undefined
    ) as UserType[];

    return create200Response(friends);
  } catch (error) {
    return handleError(error);
  }
};

const searchUser = async (
  searchString: string,
  friendsId: string[],
  userId: string
): Promise<ResponseType> => {
  try {
    const userMongo = await User.find({});
    let users: UserType[] = userMongo.map((user) => {
      return { ...user.toObject(), password: '', friends: [] };
    });
    users = users.filter((user) => {
      return user.nickName.includes(searchString);
    });
    users = users.filter((user) => !friendsId.includes(user._id.toString()));
    users = users.filter((user) => user._id.toString() !== userId);
    return create200Response(users);
  } catch (error) {
    return handleError(error);
  }
};

const addFriend = async (
  userId: string,
  friendId: string
): Promise<ResponseType> => {
  try {
    const mongoUser = await User.findOne({ _id: userId });
    const friends = mongoUser
      ?.toObject()
      .friends.map((objectId) => objectId.toString());
    if (!friends?.includes(friendId)) {
      friends?.push(friendId);
    }
    await User.updateOne(
      { _id: userId },
      { $set: { ...mongoUser?.toObject(), friends: friends } }
    );
    return create200Response(null);
  } catch (error) {
    return handleError(error);
  }
};

const deleteFriend = async (
  userId: string,
  friendId: string
): Promise<ResponseType> => {
  try {
    const mongoUser = await User.findOne({ _id: userId });
    let friends = mongoUser
      ?.toObject()
      .friends.map((objectId) => objectId.toString());
    if (friends?.includes(friendId)) {
      friends = friends?.filter((id) => id !== friendId);
      await User.updateOne(
        { _id: userId },
        { $set: { ...mongoUser?.toObject(), friends: friends } }
      );
    }
    return create200Response(null);
  } catch (error) {
    return handleError(error);
  }
};

export {
  postUser,
  getUser,
  getAuthorName,
  getFriends,
  searchUser,
  addFriend,
  deleteFriend,
};
