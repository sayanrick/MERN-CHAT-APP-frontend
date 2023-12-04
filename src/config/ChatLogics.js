export const isSameSenderMargin = (messages, m, i, userId) => {
  const isLastMessage = i === messages.length - 1;
  const isSameSenderId = i < messages.length - 1 && messages[i + 1].sender._id === m.sender._id && messages[i].sender._id !== userId;

  if (isSameSenderId && !isLastMessage) {
    return 33;
  } else if ((isSameSenderId && !isLastMessage) || (isLastMessage && messages[i].sender._id !== userId)) {
    return 0;
  } else {
    return "auto";
  }
};

export const isSameSender = (messages, m, i, userId) => {
  return i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id || messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId;
};

export const isLastMessage = (messages, i, userId) => {
  return i === messages.length - 1 &&
    messages[i].sender._id !== userId &&
    messages[i].sender._id;
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};

export const getSender = (loggedUser, users) => {
  const firstUser = users[0];
  const secondUser = users[1];
  
  return firstUser && secondUser ? (firstUser._id === loggedUser?._id ? secondUser.name : firstUser.name) : "";
};

export const getSenderFull = (loggedUser, users) => {
  const firstUser = users[0];
  const secondUser = users[1];

  return firstUser && secondUser ? (firstUser._id === loggedUser._id ? secondUser : firstUser) : null;
};
