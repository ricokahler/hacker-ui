export default class DeferredPromise<T> extends Promise<T> {
  private _promise: Promise<T>;
  resolve: (t?: T) => void;
  reject: (error?: any) => void;
  state: 'pending' | 'fulfilled' | 'rejected';
}
