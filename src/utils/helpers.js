import Moment from 'moment';

export const applyDrag = (arr, dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult
    if (removedIndex === null && addedIndex === null) return arr
  
    const result = [...arr]
    let itemToAdd = payload
  
    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0]
    }
  
    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd)
    }
  
    return result
  }

  export const convertUnixTimestampToTime = (duration) => {
    return new Moment.unix(duration).format('DD.MM.YYYY HH:mm:ss')
}

  export const convertTimeToUnixTimestamp = (duration) => {
    return new Date(duration).getTime() / 1000
}