import {AppDispatch, RootState} from "../../store";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {instance} from "../axios";
import {useNavigate} from "react-router-dom";
import {setFolderId, setStatusUpdate} from "../../store/slice/folderform";

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAuth = () => {
  const {isLogged} = useAppSelector((state) => state.auth);
  return isLogged
}

export const useFolderForm = () => {
  return useAppSelector((state) => state.folderId)
}


export const useCrumbs = (location: string) => {
  const [data, setData] = useState([{path: '', folderName: ''}])
  const [isLoading, setLoading] = useState(true)
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token')

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(location === '/user/root') {
          setData([{path: '/user/root', folderName: 'Root'}])
          setLoading(false)
          return
        }
        const splitPath = location.split('/')
        const id = splitPath[splitPath.length - 1]
        const data = await instance.get(`folder/path/${id}`, {headers: { Authorization: `Bearer ${token}`}})
        setLoading(false)
        setData(data.data)
      } catch (e: any) {
        if (e.response.data.message === 'Unauthorized') {
          navigate('/sign-in')
        }
        setLoading(false)
      }
    }
    fetchData()
  }, [location])

  return {isLoading, data}
}

export const useUserFolder = (isStatusUpdated: boolean, id?: string) => {
  const [data, setData] = useState({
    id: '',
    name: '',
    path: '',
    created: null,
    parent_folder: null,
    folders: null,
    files: null,
    owner: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = sessionStorage.getItem('token');
  const userName = sessionStorage.getItem('userName');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(
          id ?
            `folder/${id}?userName=${userName}` :
            `user/root?userName=${userName}`,
          {headers: { Authorization: `Bearer ${token}`}
        });
        console.log(response, 'getFolder', id)
        setData(response.data);
        setLoading(false);
        dispatch(setFolderId(response.data.folderId))
      } catch (e: any) {
        if (e.response.data.message === 'Unauthorized') {
          navigate('/sign-in')
        }
        setError(e);
        setLoading(false);
      }
    };
    fetchData()
    isStatusUpdated && dispatch(setStatusUpdate(false))

  }, [id, isStatusUpdated]);
  return {data, loading, error}
}

export const useDeleteFolder = (folderId: string, setDeleteFolder: (folderId: string) => void) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token')
  const userName = sessionStorage.getItem('userName');

  useEffect(() => {
    const fetchDelete = async () => {
      try {
        await instance.delete(`folder/${folderId}?userName=${userName}`, {headers: { Authorization: `Bearer ${token}`}})
        setDeleteFolder('')
        dispatch(setStatusUpdate(true))
      } catch (e: any) {
        if (e.response.data.message === 'Unauthorized') {
          navigate('/sign-in')
        }
        console.log(e, 'delete folder')
      }
    }

    folderId && fetchDelete()
  }, [folderId])

}

export const useDeleteFile = (fileId: string) => {
  const dispatch = useAppDispatch()
  const token = sessionStorage.getItem('token')
  const userName = sessionStorage.getItem('userName');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDelete = async () => {
      try {
        await instance.delete(`file/${fileId}?userName=${userName}`, {headers: { Authorization: `Bearer ${token}`}})
        dispatch(setStatusUpdate(true))
      } catch (e: any) {
        if (e.response.data.message === 'Unauthorized') {
          navigate('/sign-in')
        }
        console.log(e, 'deleteFile')
      }
    }

    fileId && fetchDelete()
  }, [fileId])
}