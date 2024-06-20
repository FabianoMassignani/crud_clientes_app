import { RootReducer } from '../store/RootReducer';

declare global {
  type AppState = ReturnType<typeof RootReducer>;
}
