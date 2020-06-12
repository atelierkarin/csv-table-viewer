const initialState = {
  file: null
}

const fileData = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_FILE':
      console.log(action.file);
      return {
        ...state,
        file: action.file
      }
    default:
      return state
  }
}

export default fileData
