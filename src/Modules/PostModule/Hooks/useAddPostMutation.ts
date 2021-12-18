import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useMutation} from 'react-query';
import {AuthStackParamList} from 'src/Navigation/StackNavigators/AuthStackNavigator';
import {queryClient} from 'src/Utils/ReactQueryConfig';
import SnackbarHandler from 'src/Utils/SnackbarHandler';
import PostService from '../Services/PostService';

function useAddPostMutation() {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList, 'Post'>>();

  return useMutation(PostService.addPost, {
    onSuccess: responseData => {
      const {data, status} = responseData;
      if (status === 201) {
        navigation.goBack();
        navigation.navigate('Detail', {id: data.data.id});
        SnackbarHandler.successToast(data.message);
        queryClient.refetchQueries();
      }
    },
  });
}

export default useAddPostMutation;
