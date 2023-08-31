export const getShortString = (str: string, length: number) => {
  if (!str) return "";
  if (str.length > length) {
    return str.substring(0, length) + "...";
  } else {
    return str;
  }
};

export const checkImage = (url: string) => {
  if (!url) return false;
  return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
};

export const checkIfExist = (array: any[], item: any) => {
  return array.some((element: any) => element === item);
};
