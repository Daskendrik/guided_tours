import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Layout from './Components/Additional/Layout';
import Calendar from './Components/Additional/Calendar';
import ListOfMuseum from './Components/Pages/Lists/ListOfMuseum';
import ListOfBus from './Components/Pages/Lists/ListOfBus';
import ListOfCompanyBus from './Components/Pages/Lists/ListOfCompanyBus';
import ListOfGuide from './Components/Pages/Lists/ListOfGuide';
import ListOfRestorant from './Components/Pages/Lists/ListOfRestorant';
import ListOfTour from './Components/Pages/Lists/ListOfTour';
import ListOfTypeLOV from './Components/Pages/Lists/ListOfTypeLOV';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Calendar />} />
            <Route path="*" element={<h3>Такого пункта неть</h3>} />
            <Route path="museum" element={<ListOfMuseum />} />
            <Route path="bus" element={<ListOfBus />} />
            <Route path="company_bus" element={<ListOfCompanyBus />} />
            <Route path="guide" element={<ListOfGuide />} />
            <Route path="restorant" element={<ListOfRestorant />} />
            <Route path="tour" element={<ListOfTour />} />
            <Route path="сalendar" element={<Calendar />} />
            <Route path="type_lov" element={<ListOfTypeLOV />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
