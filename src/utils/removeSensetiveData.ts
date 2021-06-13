type ObjectType = {
  [ key: string ]: string;
}

export const removeSensitiveData = (data: ObjectType, sensitiveFields: string[]): ObjectType => {
  const dataCopy = {...data};
  Object.keys(data).map((key: string) => sensitiveFields.forEach((elem: string) => {
    if (key === elem) {
      dataCopy[ key ] = '***';
    }
  }));
  return dataCopy;
};
