class DeferredPromise {
  constructor() {
    this.state = 'pending';
    this._promise = new Promise((resolve, reject) => {
      this.resolve = value => {
        this.state = 'fulfilled';
        resolve(value);
      };
      this.reject = reason => {
        this.state = 'rejected';
        reject(reason);
      };
    });

    this.then = this._promise.then.bind(this._promise);
    this.catch = this._promise.catch.bind(this._promise);
    this.finally = this._promise.finally.bind(this._promise);
  }

  [Symbol.toStringTag] = 'Promise';
}

export default DeferredPromise;
