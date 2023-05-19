import {AppDispatch, RootState} from "../../store";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {instance} from "../axios";
import {useNavigate} from "react-router-dom";

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAuth = () => {
  const {isLogged} = useAppSelector((state) => state.auth);
  return isLogged
}

export const useUserFolder = (url: string, id: string, deletedFolder: boolean) => {
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
  const navigate = useNavigate()


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`${url}/${id}`);
        setData(response.data);
        setLoading(false);
      } catch (e: any) {
        navigate('*')
        setError(e);
        setLoading(false);
      }
    };

    (id && fetchData()) && (!deletedFolder && fetchData());

  }, [url, id, deletedFolder]);
  return {data, loading, error}
}

export const useDeleteFolder = (folderId: string) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDelete = async () => {
      try {
        await instance.delete(`folder/${folderId}`)
        setLoading(false)
      } catch (e: any) {
        setLoading(false)
        console.log(e.message)
      }
    }

    folderId && fetchDelete()
  }, [folderId])

  return loading
}