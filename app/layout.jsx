import './globals.css';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';

export const metadata = {
  title: 'Elios Ambiente - Modello Dati Unico',
  description: 'Piattaforma enterprise data management',
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>
        <div className="app-container">
          <Sidebar />
          <div className="main-content">
            <TopHeader />
            <div className="page-content">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
