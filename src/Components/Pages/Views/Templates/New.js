import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import FormApplet from '../../../FormApplets/FormApplet';
import ErrorServer from '../../../Additional/ErrorServer';
import Loading from '../../../Additional/Loading';
import ModalSave from '../../../ModalWin/ModalSave';
import ModalError from '../../../ModalWin/ModalError';

const New = () => {
  const [textError, setTextError] = useState(''); // экран ошибки
  const [isLoading, setIsLoading] = useState(true); // экран загрузки
  const isReadOnly = false; // РО
  const [newId, setNewId] = useState('000'); // Новый айди записи, получаем из бека
  const [saveErr, setSaveError] = useState('Нет ошибки'); // Ошибка при сохранении
  const goBtn = ['/contact', `/contact/${newId}`]; // кнопки для апплета удачного сохранения
  const [data, setData] = useState([
    //Сет, который передаем на сохранение УНИКАЛЬНЫЙ
    {
      Lable: 'Id',
      Value: '',
      Type: 'text',
      id: 'id',
    },
    {
      Lable: 'Фамилия*',
      Value: '',
      Type: 'text',
      id: 'last_name',
    },
    {
      Lable: 'Имя*',
      Value: '',
      Type: 'text',
      id: 'first_name',
    },
    {
      Lable: 'Отчество',
      Value: '',
      Type: 'text',
      id: 'middle_name',
    },
    {
      Lable: 'Телефон',
      Value: '',
      Type: 'tel',
      id: 'tel',
    },
    {
      Lable: 'Тип контакта*',
      Value: '',
      Type: 'select',
      id: 'type_code',
      arrSelect: [],
    },
    {
      Lable: 'Почта',
      Value: '',
      Type: 'email',
      id: 'email',
    },
    {
      Lable: 'Комментарий',
      Value: '',
      Type: 'textarea',
      id: 'comment',
    },
  ]);
  const buttons = [
    //Кнопки на апплет
    {
      title: 'Сохранить',
      func: function handleSaveData() {
        console.log('Заглушка');
        saveData();
      },
      id: uuidv4(),
    },
    {
      title: 'Отмена',
      id: uuidv4(),
      link: '/contact',
    },
  ];

  const changeData = (id, text) => {
    // Изменение данных при вводе (контролируемое изменение)
    let newdate;
    newdate = data.map((x) => (x.id === id ? { ...x, Value: text } : x));
    setData(newdate);
  };

  const changeDataFromInegration = (text, lov) => {
    //выгрузка лова и айдишника
    let newdate = data.map((x) => (x.id === 'id' ? { ...x, Value: text } : x));
    newdate = newdate.map((x) =>
      x.id === 'type_code' ? { ...x, arrSelect: lov } : x
    );
    setNewId(text);
    setData(newdate);
  };

  const saveData = async () => {
    // сохранение данных, интеграция с бек
    axios
      .post('http://localhost:3001/api/contact/create', data)
      .then((res) => {
        if (res.data.status === 'OK') {
          console.log('Контакт сохранен');
          window.location.href = '#openModalSave';
        } else {
          window.location.href = '#openModalError';
          setSaveError(res.data.text);
        }
        console.log(res);
      })
      .catch((error) => {
        setTextError(error.message);
      });
  };

  const handleCloserr = () => {
    //функция закрытия окна ошибки
    window.location.href = '#close';
  };

  useEffect(() => {
    //первая интеграция, подгрузка лова и айди
    async function fetchData() {
      try {
        const res = await fetch('http://localhost:3001/api/contact/getLast');
        const dataIntegration = await res.json();
        console.log(dataIntegration);
        if (!!dataIntegration) {
          const text = dataIntegration.req[0] + 1;
          const lov = dataIntegration.req[1];
          changeDataFromInegration(text, lov);
        }
      } catch (error) {
        setTextError(error.message);
      }
      setIsLoading(false);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (textError) {
    return <ErrorServer textError={textError} />;
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <ModalSave text={`Контакт №${newId} успешно сохранен`} goBtn={goBtn} />
      <ModalError func={handleCloserr} doing="сохранении" err={saveErr} />
      <FormApplet
        title={`Новый контакт №${newId}`}
        data={data}
        buttons={buttons}
        isReadOnly={isReadOnly}
        changeData={changeData}
      />
    </>
  );
};

export default New;
