type fetchActionType = {
  type: "FETCH_SUCCESS" | "FETCH_ERROR",
}

type initialStateType = {
  loading: boolean,
  data: {},
  error: string
}

type fetchReducer = {
  state: initialStateType
  action: fetchActionType
}