/* eslint-disable no-undef */
import app from '../../firebase/firebase';

describe('Firebase Folder', () => {
  it('defines app', () => {
    expect(app).toBeDefined();
    console.log(app);
  });
});

// it('should define auth when called getAuth', () => {
//   console.log(getAuth(app));
//   expect(3).toBe(3);
// });
