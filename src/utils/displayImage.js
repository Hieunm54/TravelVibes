import { CONST } from "../constaints";

export const displayImage = (images) => {
  if (!images || !images[0]) {
    return CONST.DEFAULT_EVENT_COVER;
  }
  return images[0].fileName;
};
