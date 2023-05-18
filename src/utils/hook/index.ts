import {AppDispatch, RootState} from "../../store";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {instance} from "../axios";

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAuth = () => {
  const {isLogged} = useAppSelector((state) => state.auth);
  return isLogged
}

export const useUserFolder = (url: string, id: string) => {
  const [data, setData] = useState({
    folderId: '',
    name: '',
    created: null,
    parent_folder: null,
    folders: null,
    files: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`${url}/${id}`);
        setData(response.data);
        setLoading(false);
      } catch (e: any) {
        setError(e);
        setLoading(false);
      }
    };

    fetchData();
  }, [url, id]);
  return {data, loading, error}
}