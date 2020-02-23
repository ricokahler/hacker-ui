import delay from 'delay';
import DeferredPromise from './DeferredPromise';

test('it allows resolve to be called outside of the scope of itself', async () => {
  const deferredPromise = new DeferredPromise();

  delay(0).then(() => deferredPromise.resolve('done'));

  const value = await deferredPromise;
  expect(value).toBe('done');
});

test('it allows reject to be called outside of the scope of itself', async () => {
  const deferredPromise = new DeferredPromise();
  const testError = new Error('test');

  delay(0).then(() => deferredPromise.reject(testError));

  let gotHere = false;
  try {
    await deferredPromise;
    gotHere = true;
  } catch (e) {
    expect(e).toBe(testError);
  } finally {
    expect(gotHere).toBe(false);
  }
});
