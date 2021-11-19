export const removeEmpty = (obj: any) => {
  let newObj = {}
  Object.keys(obj).forEach((key) => {
    // @ts-ignore
    if (obj[key] === Object(obj[key])) newObj[key] = removeEmpty(obj[key])
    // @ts-ignore
    else if (obj[key] !== undefined) newObj[key] = obj[key]
  })
  return newObj
}