import privateClient from '../../api/client/private.client.js';
import publicClient from '../../api/client/public.client.js';

const userEndpoints = {
  signIn: 'user/login',
  signUp: 'user/signup',
  getInfo: 'user/info',
  updatePassword: 'user/update-password',
};

const userApi = {
  signIn: async ({ username, password }) => {
    try {
      const response = await publicClient.post(userEndpoints.signIn, {
        username,
        password,
      });

      return { response };
    } catch (error) {
      return { error };
    }
  },
  signUp: async ({ username, password, confirmPassword, displayName }) => {
    try {
      const response = await publicClient.post(userEndpoints.signUp, {
        username,
        password,
        confirmPassword,
        displayName,
      });

      return { response };
    } catch (error) {
      return { error };
    }
  },
  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getInfo);

      return { response };
    } catch (error) {
      return { error };
    }
  },
  updatePassword: async ({ password, newPassword, confirmNewPassword }) => {
    try {
      const response = await privateClient.put(userEndpoints.updatePassword, {
        password,
        newPassword,
        confirmNewPassword,
      });

      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default userApi;
