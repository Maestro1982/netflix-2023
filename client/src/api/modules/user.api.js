import privateClient from '../../api/client/private.client.js';
import publicClient from '../../api/client/public.client.js';

const userEndpoints = {
  signIn: '/login',
  signup: '/signup',
  getInfo: '/info',
  updatePassword: '/update-password',
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
  signup: async ({ username, password, confirmPassword, displayName }) => {
    try {
      const response = await publicClient.post(userEndpoints.signup, {
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
