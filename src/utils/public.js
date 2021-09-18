export const getAuthorInfo = (createBy) => {
  if (!createBy || !createBy.objectId) {
    return {
      name: '',
      avatar: '',
      objectId: '',
    };
  }
  return {
    ...createBy,
    name: createBy.nickname || createBy.username || '',
    avatar: createBy.headPic || '',
    objectId: createBy.objectId || '',
  };
};

export const parseImages = (image) => {
  let images = [];
  if (!image || image.length === 0) {
    return images;
  }
  try {
    images = JSON.parse(image);
  } catch (error) {
    console.log('parseImages error:', error);
  }
  return images;
};
