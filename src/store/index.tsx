import { configureStore } from '@reduxjs/toolkit'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { TypedUseSelectorHook } from 'react-redux/es/types'

const store = configureStore({
  reducer: {}
})

type GetStateFnType = typeof store.getState

type IRootState = ReturnType<GetStateFnType>

type DispatchType = typeof store.dispatch

export type { IRootState }
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector

export const useAppDispatch: () => DispatchType = useDispatch
export const shallowEqualApp = shallowEqual

export default store
